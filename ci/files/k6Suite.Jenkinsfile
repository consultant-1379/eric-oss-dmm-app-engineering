#!/usr/bin/env groovy
/* IMPORTANT:
 *
 * In order to make this pipeline work, the following configuration on Jenkins is required
 * - slave with a specific label (see pipeline.agent.label below)
 */
def bob = "bob/bob -r \${WORKSPACE}/ci/rulesets/ruleset2.0.yaml"
def filesChangedInCommit(path) {
    return sh(returnStdout: true, script: "git diff-tree --diff-filter=ACM --no-commit-id --name-only -r $GIT_COMMIT -- $path").trim()
}
pipeline {
    agent {
        label params.SLAVE_LABEL
    }
    parameters {
  string(name: 'ARMDOCKER_USER_SECRET',
                defaultValue: 'cloudman-user-creds',
                description: 'ARM Docker secret')
        string(name: 'NAMESPACE',
		        defaultValue: 'dmm-test4',
                description: 'Namespace to install the EO Chart' )
        string(name: 'KUBECONFIG_FILE',
		        defaultValue: 'hall923_config',
                description: 'Kubernetes configuration file to specify which environment to install on' )
        string(name: 'SLAVE_LABEL',
                defaultValue: 'evo_docker_engine',
                description: 'Label of agent which be used')
        string(name: 'GAS_HOSTNAME',
                defaultValue: 'gas.dmm-test3.hall923-mm1.ews.gic.ericsson.se',
                description: 'gas host name')
        string(
            name: 'FUNCTIONAL_USER_CREDENTIALS',
            defaultValue: 'ossapps100-user-credentials',
            description: 'Jenkins Credentials ID for ARM Registry access'
        )
        string(name: 'KAFKA_HOSTNAME',
                defaultValue: 'bootstrap.hart171-x3.ews.gic.ericsson.se',
                description: 'kafka host name')
        string(name: 'IAM_HOSTNAME',
                defaultValue: 'iam.hart171-x3.ews.gic.ericsson.se',
                description: 'iam host name')
    }
    options { timestamps () }
    stages {
        stage('Prepare') {
            steps {
                sh 'git clean -xdff'
                sh 'git clone ssh://gerrit.ericsson.se:29418/adp-cicd/bob/'
                sh 'git submodule sync'
                sh 'git submodule update --init --recursive'
                sh "${bob} --help"
            }
        }
        stage('Checkout') {
            steps {
                sh "chmod +x -R ${env.WORKSPACE}"
            }
        }
         stage('Create Job') {
                    steps {
                        script {
                                sh "${bob} create-job"
                        }
                    }
        }
		
		
        stage('Deploy Testsuite') {
                    steps {
                        script {
                            withCredentials([
                                usernamePassword(credentialsId: params.FUNCTIONAL_USER_CREDENTIALS, usernameVariable: 'FUNCTIONAL_USER_USERNAME', passwordVariable: 'FUNCTIONAL_USER_PASSWORD'),
                                file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')
                                ]) {
                                sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                sh "${bob} deploy-testware"
                            }
                        }
                    }
        }
        stage('wait testware') {
                    steps {
                        script {
                            withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                                sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                sh "${bob} wait-testware"
                            }
                        }
                    }
                    post {
                        always {
                             withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                                  sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                  sh "${bob} collect-log"
                                  sh "${bob} collect-adp-log" 
                                  sh "${bob} uninstall-testware"                          
                             }               
                        }
                    }
        }
        stage('check status') {
                    steps {
                        getBuildStatus()
                    }
                    post {
                        failure { 
                             withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                                  sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                  sh "${bob} collect-adp-log"   
                             } 
                         }
                    }
        }
        stage('check rate metrics') {
                    steps {
                        script {
                                 sh "${bob} check-rate"
                               }
                          }
         }
        stage('HA Test For SCHEMA REG') {
            steps {
                withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                   sh "${bob} ha-test"
                }
                archiveArtifacts allowEmptyArchive: true, artifacts: 'build/ha-info.log'
            }
        }

    }
    post {
        always {
            archiveArtifacts 'summary.json*'
			archiveArtifacts 'execution-status.properties'
			archiveArtifacts '*.log'
            archiveArtifacts artifacts: 'logs_*.tgz, logs/*, *.tgz,*.gz', allowEmptyArchive: true
        }
    }
}
def getBuildStatus() {
    if ( !fileExists('execution-status.properties') ) {
        error("execution-status.properties file not found")
    }
    def props = readProperties  file: 'execution-status.properties'
    currentBuild.description = "<a href=\""+ props["reportLink"] +"\">Testware Report</a>"
    if (props['passed'] == 'False') {
        error 'Testware Failed: ' + props['failureReason']
    }
}
def addTestsSummary() {
    def summary = manager.createSummary("warning.gif");
    summary.appendText("<h2>Tests Status</h2>", false);
    jsonOutput = readJSON file: 'execution-status.json'
    echo "Status Response:\n$jsonOutput"
    if (jsonOutput) {
        if (jsonOutput.executions.size() > 0) {
            jsonOutput.executions.each{ e ->
                failureOrSuccess = e.status.trim().equals('SUCCESSFUL') ? '<span style="color:green">' : '<span style="color:red">'
                summary.appendText("<span style=\"color:blue\"><b>${e.testware.replace('main_', '').replace('_', ' ').toUpperCase()}</b></span><br>"
                    + "&emsp;> Status: ${failureOrSuccess}$e.status</span>"
                    + "&emsp;<a href=\"http://seliius22639.seli.gic.ericsson.se/dev/staging-reports/#execution-reports/execution-details?executionId=$e.id\">Live Report Link</a><br>")

                echo "Report link: http://seliius22639.seli.gic.ericsson.se/dev/staging-reports/#execution-reports/execution-details?executionId=$e.id"
            }
        } else {
            message = 'There are no registered executions with the job'
            echsummary.appendText("<h3>$message</h3>")
            echo message
        }
    } else {
        message = 'Status file not found'
        summary.appendText("<h3>$message</h3>", false);
        echo message
    }
}


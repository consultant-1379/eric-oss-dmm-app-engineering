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
		        defaultValue: 'dmm',
                description: 'Namespace to install the EO Chart' )
        string(name: 'KUBECONFIG_FILE',
		        defaultValue: 'hall923_config',
                description: 'Kubernetes configuration file to specify which environment to install on' )
        string(name: 'SLAVE_LABEL',
                defaultValue: 'evo_docker_engine',
                description: 'Label of agent which be used')
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
         stage('Build Image') {
                    steps {
                        script {
                                sh "${bob} build-image"
                        }
                    }
        }
        stage('Deploy Testsuite') {
                    steps {
                        script {
                            withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                                sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                sh "${bob} deploy-testsuite"
                            }
                        }
                    }
        }
        stage('Copy Testsuite Report') {
                    steps {
                        script {
                            withCredentials( [file(credentialsId: env.KUBECONFIG_FILE, variable: 'KUBECONFIG')]) {
                                sh "install -m 600 ${KUBECONFIG} ./admin.conf"
                                sh "${bob} copy-testsuite-report"
                            }
                        }
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

    }
    post {
        always {
            archiveArtifacts 'summary.json*'
			archiveArtifacts 'K6_Test_Report.html'
            archiveArtifacts artifacts: 'logs_*.tgz, logs/*,*.gz', allowEmptyArchive: true
        }
    }
}
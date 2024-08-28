#!/bin/bash
KUBECONFIG=$1
NAMESPACE=$2
REPORT_PATH=$3
retries="20";
while [ $retries -ge 0 ]
do
    kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} cp k6-testsuite:/reports/summary.json ${REPORT_PATH}/summary.json
    if [[ "$retries" -eq "0" ]]
    then
        echo no report file available
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} logs k6-testsuite > ${REPORT_PATH}/k6-testsuite.log
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete pod k6-testsuite
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol k6-eric-oss-data-catalog-policy
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol k6-eric-oos-dmm-dmaap-policy
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol eric-schema-registry-sr
        exit 1
    elif ! test -f ${REPORT_PATH}/summary.json;
    then
        let "retries-=1"
        echo report not available, Retries left = $retries :: Sleeping for 20 seconds
        sleep 20
    else
        echo report copied
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} cp k6-testsuite:/reports/K6_Test_Report.html ${REPORT_PATH}/K6_Test_Report.html
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} logs k6-testsuite > ${REPORT_PATH}/k6-testsuite.log
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete pod k6-testsuite
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol k6-eric-oss-data-catalog-policy
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol k6-eric-oos-dmm-dmaap-policy
        kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} delete netpol eric-schema-registry-sr
        #COMMAND=$(cat "${REPORT_PATH}"/summary.json | grep  "\"status_check_value\":\"false\"" | wc -l)
        #COMMAND=$(jq 'select(.type=="Point") | select(.data.tags.expected_response=="false") | length' "${REPORT_PATH}"/summary.json | wc -l)
        #failsCount=$(jq -r '.metrics.checks.values.fails' ${REPORT_PATH}/summary.json)
        httpFailedCount=$(jq -r '.metrics.http_req_failed.values.passes' ${REPORT_PATH}/summary.json)
        #[[ $failsCount -eq 0 && $httpFailedCount -eq 0 ]] && echo "all requests are successful in the report" && exit 0
        [[ $httpFailedCount -eq 0 ]] && echo "all requests are successful in the report" && exit 0
        echo "Failures detected in the report"
        exit 1
        break
    fi
done
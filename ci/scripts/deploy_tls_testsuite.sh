#!/bin/bash
KUBECONFIG=$1
NAMESPACE=$2
PODFILE=$3
GAS_URL=$4
kubectl delete po k6-testsuite -n ${NAMESPACE}
kubectl delete configmap gas-configmap -n ${NAMESPACE}
kubectl delete configmap ns-configmap -n ${NAMESPACE}
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} create configmap ns-configmap --from-literal=NAMESPACE=${NAMESPACE};
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} create configmap gas-configmap --from-literal=GAS_URL=https://${GAS_URL};
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} apply -f ${PODFILE}/deployment/chart/k6-data-catalog-policy.yaml;
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} apply -f ${PODFILE}/deployment/chart/k6-dmaap-policy.yaml;
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} apply -f ${PODFILE}/deployment/chart/k6-sr-policy.yaml;
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} apply -f ${PODFILE}/deployment/chart/k6-strimzi-bridge-policy.yaml;
kubectl --namespace ${NAMESPACE} --kubeconfig ${KUBECONFIG} apply -f ${PODFILE}/deployment/chart/tls/;

echo "Get config map"
kubectl get configmap gas-configmap -n ${NAMESPACE}
echo "GET ALL NETWORK POLICY New"
All_NETPOL=`kubectl get netpol --namespace ${NAMESPACE}`
echo "$All_NETPOL"
echo"==================================================="
echo "##Get all pods##"
All_PODS=`kubectl get pods --namespace ${NAMESPACE}`
echo "$All_PODS"
echo"==================================================="
echo "##Get all Ingress##"
All_Ingress=`kubectl get ingress --namespace ${NAMESPACE}`
echo "$All_Ingress"
echo"==================================================="
echo "##Get all services##"
All_SVC=`kubectl get svc --namespace ${NAMESPACE}`
echo "$All_SVC" 

sleep 100

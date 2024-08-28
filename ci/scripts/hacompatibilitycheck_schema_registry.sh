#! /bin/bash
#
# COPYRIGHT Ericsson 2021
#
#
#
# The copyright to the computer program(s) herein is the property of
#
# Ericsson Inc. The programs may be used and/or copied only with written
#
# permission from Ericsson Inc. or in accordance with the terms and
#
# conditions stipulated in the agreement/contract under which the
#
# program(s) have been supplied.
#

LOG_TIME=`date "+%d%m20%y_%H%M%S"`

echo "THE REPORT DATE IS :: " $LOG_TIME
echo ""

K8S_NAMESPACE=$1

#LOC_VALUES_YAML=$2
VALUE_PODANTIAFFINITY=soft;

MICROSERVICE1=schema-registry-sr
MICROSERVICE2=schema-registry-sr-agent

echo "K8S NAMESPACE: $K8S_NAMESPACE"
echo "MICROSERVICE: $MICROSERVICE1"
echo "CONFIG PODANTIAFFINITY VALUE: $VALUE_PODANTIAFFINITY"
echo ""

NOT_RUNNING=$(kubectl get pods -n $K8S_NAMESPACE --field-selector='status.phase!=Running' --no-headers | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | wc -l)
RUNNING=$(kubectl get pods -n $K8S_NAMESPACE --field-selector='status.phase=Running' --no-headers | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | wc -l)
POD_INFO=$(kubectl get pods -n $K8S_NAMESPACE -o wide | grep -E "NAME|$MICROSERVICE1*" | grep -v "$MICROSERVICE2*")

echo "Pods not running in the namespace: ${NOT_RUNNING}"
echo "Pods running in the namespace: ${RUNNING}"
echo "${POD_INFO}"
echo ""

##### HA MULTIPLE REPLICAS TEST ####

echo "##### TESTING THE HA FEATURE MULTIPLE REPLICAS #####"
echo ""

if [ $RUNNING -eq 2 ] && [ $NOT_RUNNING -eq 0 ]
then
    echo "HA feature \"Multiple Replicas\" is tested. Found - ${RUNNING} running replicas of schema-registry. Test is SUCCESSFULL !!"
    echo ""
else
    echo "HA feature \"Multiple Replicas\" is NOT implemented !!"
    echo "Please check the Running Pods or Configured Replicas value of schema-registry !!"
    echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
    echo ""
    #exit 1
fi

##### HA POD ANTIAFFINITY TEST ####
echo "##### HA POD ANTIAFFINITY TEST ####"

echo "Testing the HA feature PodAntiAffinity. The value is configured as : \"$VALUE_PODANTIAFFINITY\" in Values.yaml file !!"
echo ""

if [ $VALUE_PODANTIAFFINITY == "soft" ] || [ $VALUE_PODANTIAFFINITY == "hard" ]
then

    UNIQUE_NODES=$(kubectl get pods -n $K8S_NAMESPACE --field-selector='status.phase=Running' --no-headers -o wide | grep $MICROSERVICE1* | grep -v $MICROSERVICE2* | awk {'print $9'} | sort -u | wc -l)

  if [ "$RUNNING" -ge 2 ] && [ "$UNIQUE_NODES" -ge 1 ]
  then

    if [ $VALUE_PODANTIAFFINITY == "hard" ]
    then

      if [ $RUNNING -eq $UNIQUE_NODES ]
      then
        echo "HA feature \"Pod Antiaffinity\" values is configured as \"HARD\". Hence, All the - ${RUNNING} Pods are running on - ${UNIQUE_NODES} different nodes of schema-registry. Test is SUCCESSFULL !!"
        echo ""
      else
        echo "HA feature \"Pod Antiaffinity\" is configured as \"HARD\". But it seems that all the Running PODS are NOT running on different nodes or some other issues with the pods of schema-registry !!"
        echo "Please check the above Pods Info and make sure that Replicas/Pods are NOT running on the same NODES !!"
        echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
        echo ""
      fi

    elif [ $VALUE_PODANTIAFFINITY == "soft" ]
    then

       if [ $RUNNING -ge $UNIQUE_NODES ]
       then
         echo "HA feature \"Pod Antiaffinity\" values is configured as \"soft\". Hence, All the - ${RUNNING} Pods may not be running on then different nodes of schema-registry. Test is SUCCESSFULL !!"
         echo ""
       else
         echo "HA feature \"Pod Antiaffinity\" is configured as \"SOFT\". But it seems that there are some issues with pods of schema-registry !!"
         echo "Please check the above Pods Info and make sure that Replicas/Pods are NOT running on the same NODES !!"
         echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
         echo ""
       fi

    else
      echo "Pod Antiaffinity value configured in values.yaml is other that soft or hard. Please correct it manually !!"
    fi

  else
    echo "It seems that there is 0 or 1 Running Pods of schema-registry !! Please check it manually !!"
    echo ""
  fi

else
    echo "The Value of HA feature \"Pod Antiaffinity\" is NOT given correctly in values.yaml file !!"
    echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
    echo ""
fi


##### HA QoS TEST ####
echo "##### TESTING THE HA FEATURE QoS #####"
echo ""

SCHEMA_REGISTRY_STS_NAME=$(kubectl get statefulset -n $K8S_NAMESPACE | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | awk '{print $1}')

QoS_INFO=$(kubectl describe statefulset $SCHEMA_REGISTRY_STS_NAME -n $K8S_NAMESPACE | grep -E "eric-schema-registry-sr:|Limits:|cpu:|memory:|Requests:" | tail -7)
  
echo "QoS INFO are implemented as below :: "
echo "${QoS_INFO}"
echo ""

QoS_UTILIZED_INFO=$(kubectl top pods -n $K8S_NAMESPACE | grep -E "NAME|$MICROSERVICE1*" | grep -v "$MICROSERVICE2*")

echo "QoS utilized info currently as below by schema-registry Pods:: "
echo "${QoS_UTILIZED_INFO}"
echo ""


#QoS_VALUE_IN_YAML_FILE=`cat $LOC_VALUES_YAML | grep -E "Limits:|cpu:|memory:|Requests:" | cut -d ':' -f2 | sed 's/ //g'| sed 's/"//g'`
#if [ $QoS_INFO == $QoS_VALUE_IN_YAML_FILE ]
#then
#	echo "HA feature \"QoS\" is implemented in schema-registry. Test is SUCCESSFULL !!"
#	echo ""
#else
#	echo "HA feature \"QoS\" is NOT implemented in schema-registry. Please check the above QoS Info and make sure that it is configured properly!!"
#	echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
#	echo ""
#fi

##### HA PDB TEST ####

echo "##### TESTING THE HA FEATURE PDB #####"
echo ""

#PODDISRUPTIONBUDGET_INFO=$(kubectl get poddisruptionbudget -n $K8S_NAMESPACE |  grep -E "NAME|$MICROSERVICE1*" | grep -v "$MICROSERVICE2*")
echo "PODDISRUPTIONBUDGET INFO are implemented as below :: "
echo "$(kubectl get poddisruptionbudget -n $K8S_NAMESPACE |  grep -E "NAME|$MICROSERVICE1*" | grep -v "$MICROSERVICE2*")"
echo ""

PODDISRUPTIONBUDGET_VALUE=$(kubectl get poddisruptionbudget -n $K8S_NAMESPACE | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | awk '{print $3}')
echo "PODDISRUPTIONBUDGET_VALUE :: ${PODDISRUPTIONBUDGET_VALUE}"

PODDISRUPTIONBUDGET_VALUE_IN_YAML_FILE=1
echo "PODDISRUPTIONBUDGET_VALUE_IN_YAML_FILE :: ${PODDISRUPTIONBUDGET_VALUE_IN_YAML_FILE}"
echo ""

if [ $PODDISRUPTIONBUDGET_VALUE == $PODDISRUPTIONBUDGET_VALUE_IN_YAML_FILE ]
then
  echo "HA feature \"PDB\" is implemented in schema-registry. Test is SUCCESSFULL !!"
  echo ""
else
  echo "HA feature \"PDB\" is NOT implemented in schema-registry. Please check the above PDB Info and make sure that it is configured properly!!"
  echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
  echo ""
fi


##### HA HEALTH PROBE : LIVENESS AND READINESS TEST ####

echo "##### TESTING THE HA FEATURE HEALTH PROBE : LIVENESS AND READINESS #####"
echo ""
SCHEMA_REGISTRY_STS_NAME=$(kubectl get statefulset -n $K8S_NAMESPACE | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | awk '{print $1}')


HEALTH_PROBE_INFO=$(kubectl describe statefulset $SCHEMA_REGISTRY_STS_NAME -n $K8S_NAMESPACE | grep -E "Liveness:|Readiness:")

echo "HEALTH PROBES : LIVENESS AND READINESS are configured as below :: "
echo "${HEALTH_PROBE_INFO}"
echo ""

#HEALTH_PROBE_VALUE_IN_YAML_FILE=`cat $LOC_VALUES_YAML | grep -E "Liveness:|Readiness:" | cut -d ':' -f2 | sed 's/ //g'| sed 's/"//g'`
#if [ $HEALTH_PROBE_INFO == $HEALTH_PROBE_VALUE_IN_YAML_FILE ]
#then
# echo "HA feature \"HEALTH PROBES – LIVENESS AND READINESS\" is implemented in schema-registry. Test is SUCCESSFULL !!"
# echo ""
#else
# echo "HA feature \"HEALTH PROBES – LIVENESS AND READINESS\" is NOT implemented in schema-registry. Please check the above PDB Info and make sure that it is configured properly!!"
# echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
# echo ""
#fi


##### HA UPDATE STRATEGY TEST ####

echo "##### TESTING THE HA FEATURE UPDATE STRATEGY #####"
echo ""

SCHEMA_REGISTRY_STS_NAME=$(kubectl get statefulset -n $K8S_NAMESPACE | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | awk '{print $1}')
UPDATE_STRATEGY_INFO=$(kubectl describe statefulset $SCHEMA_REGISTRY_STS_NAME -n $K8S_NAMESPACE | grep -E "StrategyType:|RollingUpdate")

echo "UPDATE_STRATEGY_INFO are implemented as below :: "
echo "${UPDATE_STRATEGY_INFO}"
echo ""

UPDATE_STRATEGY_TYPE=$(kubectl describe statefulset $SCHEMA_REGISTRY_STS_NAME -n $K8S_NAMESPACE | grep "Update Strategy:" | cut -d ':' -f2 | sed 's/ //g'| sed 's/"//g')
if [ $UPDATE_STRATEGY_TYPE == "RollingUpdate" ]
then
  echo "HA feature \"UPDATE STRATEGY\" is implemented in schema-registry. Test is SUCCESSFULL !!"
  echo ""
else
  echo "HA feature \"UPDATE STRATEGY\" is NOT implemented in schema-registry. Please check the above UPDATE STRATEGY Info and make sure that it is configured properly!!"
  echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
  echo ""
fi


##### HA GRACEFULTERMINATIONTIMEOUT TEST ####

echo "##### TESTING THE HA FEATURE GRACEFULTERMINATIONTIMEOUT #####"
echo ""
SCHEMA_REGISTRY_POD_NAME=$(kubectl get pods -n $K8S_NAMESPACE -o wide | grep "$MICROSERVICE1*" | grep -v "$MICROSERVICE2*" | head -1 | awk '{print $1}')
echo "Schema-registry POD having name as :: $SCHEMA_REGISTRY_POD_NAME will be deleted now !!"
dt1=$(date +%Y-%m-%d\ %H:%M:%S);
t1=$(date --date="$dt1" +%s);
DELETION_STATUS=$(kubectl delete pod $SCHEMA_REGISTRY_POD_NAME -n $K8S_NAMESPACE)
dt2=$(date +%Y-%m-%d\ %H:%M:%S);
t2=$(date --date="$dt2" +%s);
let "tDiff=$t2-$t1" ;

echo "DELETION_STATUS :: $DELETION_STATUS";

echo "Time taken in Deleting the above schema-registry POD is :: $tDiff Seconds "
echo ""

TERMINATION_GRACE_PERIOD_SECONDS=30
echo "Configured value of terminationGracePeriodSeconds in values.yaml is :: $TERMINATION_GRACE_PERIOD_SECONDS"
echo ""

if [ $tDiff -ge $TERMINATION_GRACE_PERIOD_SECONDS ]
then
  echo "HA feature \"GRACEFULTERMINATIONTIMEOUT\" is implemented in schema-registry. Test is SUCCESSFULL !!"
  echo ""
else
  echo "HA feature \"GRACEFULTERMINATIONTIMEOUT\" is NOT implemented in schema-registry. Please check the above GRACEFULTERMINATIONTIMEOUT Info and make sure that it is configured properly!!"
  echo "CAN'T Proceed further with the next stages of this Jenkins PipeLine. Hence BUILD will be marked as FAILED !!"
  echo ""
fi

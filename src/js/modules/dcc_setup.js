import http from 'k6/http';
import { Namespace, dataCategory, dataProviderName, dataServiceInstanceName, dataServiceName, dataSpace, ms_dataCategory, ms_dataProviderName, ms_dataServiceInstanceName, ms_dataServiceName, ms_dataSpace, ms_ran_dataProviderName, ms_ran_dataServiceInstanceName, ms_ran_dataServiceName, ms_ran_dataSpace, ms_ran_schemaName, ms_ran_schemaVersion, ms_ran_topic, ms_schemaName, ms_schemaVersion, ms_topic, parameterName, schemaName, schemaVersion, topic } from './setup_constant.js';
import { CATALOG_V1_BASE, CATALOG_V2_BASE, DCC_BASE } from './endpoints.js';
import { bdr_s1_name, mb_s1_name, subscription } from './dcc_constant.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
let rappid;
let predicateParameterName;
let randomNumber = randomIntBetween(100, 999)

//This function gives predicateParameterName
export function getPredicateParameter() {
    const MESSAGE_SCHEMA = http.get(CATALOG_V2_BASE + 'message-schema?dataSpace=' + ms_ran_dataSpace + '&topic=' + ms_ran_topic);
    const body = JSON.parse(MESSAGE_SCHEMA.body);
    const predicateParameterName = body[0].dataService.predicateParameter[0].parameterName;
    return predicateParameterName
}

/*This method gets the BDR id by querying the BDR endpoint*/
export function queryBdr() {
    const BULK_DATA_REPOSITORY = http.get(CATALOG_V1_BASE + 'bulk-data-repository?nameSpace=' + Namespace + '&name=' + bdr_s1_name);
    if (BULK_DATA_REPOSITORY.status != 200) {
        console.error("Failed retrieving BDR, status is " + BULK_DATA_REPOSITORY.status);
        console.error("Failed retrieving BDR, body is " + BULK_DATA_REPOSITORY.body);
    }
    const body = JSON.parse(BULK_DATA_REPOSITORY.body);
    const bulkDataRepositoryId = body[0].id
    return bulkDataRepositoryId
}

/*This method is for getting rappid that is used for creating subscription*/
export function getRappId() {
    rappid = randomNumber;
    let GET_RAPPID = http.get(CATALOG_V2_BASE + 'subscriptions?rAppId=' + rappid)
    if (GET_RAPPID.status != 200) {
        console.error("Get rappid failed, body is " + GET_RAPPID.body);
        console.error("Get rappid failed, status is " + GET_RAPPID.status);
    }
    let body = JSON.parse(GET_RAPPID.body);
    while (body.length !== 0) {
        rappid = rappid + 1;
        GET_RAPPID = http.get(CATALOG_V2_BASE + 'subscriptions?rAppId=' + rappid)
        if (GET_RAPPID.status != 200) {
            console.error("Get rappid after incrementing value failed, body is " + GET_RAPPID.body);
            console.error("Get rappid after incrementing value failed, status is " + GET_RAPPID.status);
        }
        body = JSON.parse(GET_RAPPID.body);
    }
    return rappid;
}

/*This method gets the message bus id by querying the message bus endpoint*/
export function queryMessageBus() {
    const MESSAGE_BUS = http.get(CATALOG_V1_BASE + 'message-bus?nameSpace=' + Namespace + '&name=' + mb_s1_name);
    if (MESSAGE_BUS.status != 200) {
        console.error("Query message bus, status is " + MESSAGE_BUS.status);
        console.error("Query message bus, body is " + MESSAGE_BUS.body);
    }
    const body1 = JSON.parse(MESSAGE_BUS.body);
    const messageBusId = body1[0].id;
    return messageBusId
}

/*This method is for getting active rappid for subscription*/
export function getActiveRappId() {
    const GET_ACTIVE_RAPPID = http.get(CATALOG_V1_BASE + 'subscriptions?subscriptionName=' + subscription + '&serviceName=' + ms_ran_dataServiceName + '&serviceInstanceName=' + ms_ran_dataServiceInstanceName);
    if (GET_ACTIVE_RAPPID.status != 200) {
        console.error("Get active rappid failed, body is " + GET_ACTIVE_RAPPID.body);
        console.error("Get active rappid failed, status is " + GET_ACTIVE_RAPPID.status);
    }
    const body = JSON.parse(GET_ACTIVE_RAPPID.body);
    if (body.length !== 0) {
        rappid = body[0].ids.rAppId;
    }
    return rappid;
}

/*This method creates subscription for kafka certM (clientid)*/
export function createSubscriptionExternalForKafkaCertm() {
        
    const MESSAGE_SCHEMA = http.get(CATALOG_V2_BASE + 'message-schema?dataSpace='+ms_ran_dataSpace+'&topic='+ms_ran_topic);
    if (MESSAGE_SCHEMA.status == 200){
    const body = JSON.parse(MESSAGE_SCHEMA.body);
    predicateParameterName = body[0].dataService.predicateParameter[0].parameterName;
    
     //Subscription start
     
        const data = {
            "version": "1.0",
            "subscriptions": [
                {
                    "name": subscription,
                    "isMandatory": "yes",
                    "isOnHold": "no",
                    "isTagged": "no",
                    "dataType": {
                        "dataspace": ms_ran_dataSpace,
                        "dataCategory": ms_dataCategory,
                        "dataProvider": ms_ran_dataProviderName,
                        "schemaName": ms_ran_schemaName,
                        "schemaVersion": ms_ran_schemaVersion
                        },
                    "predicates": 
                        {
                            
                            [predicateParameterName] : ["NR100gNOdeBRadio00001"]
                        }
                }
            ]
        };
        const head = {
            headers: {
                accept: "application/json, text/plain, */*",
                "content-type": "application/json",
            }
        }
        const CREATE_SUBSCRIPTION = http.put(DCC_BASE + "/subscription/v1/"+ rAppClientId, JSON.stringify(data), head);
        if(CREATE_SUBSCRIPTION.status != 200 && CREATE_SUBSCRIPTION.status != 201 && CREATE_SUBSCRIPTION.status != 409){
            console.error("Create subscription for kafka cert-m failed, status is "+CREATE_SUBSCRIPTION.status);
            console.error("Create subscription for kafka cert-m failed, body is "+CREATE_SUBSCRIPTION.body);
        }
}
else{
    console.error("Failed retrieving message schema for creating subscription (cert-m), status is "+MESSAGE_SCHEMA.status);
    console.error("Failed retrieving message schema for creating subscription (cert-m), body is "+MESSAGE_SCHEMA.body);
        
}

}


/*This method registers message schema into data catalog*/
export function createFirstLevelMediation() {
    const message_bus_id = queryMessageBus();
    //create message scheama
    const data = {
        "dataSpace": {
            "name": ms_dataSpace
        },
        "dataService": {
            "dataServiceName": ms_dataServiceName
        },
        "dataCategory": {
            "dataCategoryName": ms_dataCategory
        },
        "dataProviderType": {
            "dataProviderName": ms_dataProviderName
        },
        "messageStatusTopic": {
            "name": ms_topic,
            "messageBusId": message_bus_id,
            "specificationReference": "SpecRef",
            "encoding": "JSON"
        },
        "messageDataTopic": {
            "name": ms_topic,
            "messageBusId": message_bus_id,
            "encoding": "JSON"
        },
        "dataServiceInstance": {
            "dataServiceInstanceName": ms_dataServiceInstanceName,
            "controlEndPoint": "http://localhost:8084",
            "consumedDataSpace": "",
            "consumedDataCategory": "",
            "consumedDataProvider": "",
            "consumedSchemaName": "",
            "consumedSchemaVersion": ""
        },
        "dataType": {
            "mediumType": "stream",
            "schemaName": ms_schemaName,
            "schemaVersion": ms_schemaVersion,
            "isExternal": false,
            "consumedDataSpace": "",
            "consumedDataCategory": "",
            "consumedDataProvider": "",
            "consumedSchemaName": "",
            "consumedSchemaVersion": ""
        },
        "supportedPredicateParameter": {
            "parameterName": parameterName,
            "isPassedToConsumedService": false
        },
        "messageSchema": {
            "specificationReference": "SpecRefFns101"
        }
    };
    const head = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }


    const MESSAGE_SCHEMA_FNS = http.put(CATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
    if (MESSAGE_SCHEMA_FNS.status != 200 && MESSAGE_SCHEMA_FNS.status != 201 && MESSAGE_SCHEMA_FNS.status != 409) {
        console.error("Create message schema FNS failed, status is :" + MESSAGE_SCHEMA_FNS.status);
        console.error("Create message schema FNS failed, body is :" + MESSAGE_SCHEMA_FNS.body);
    }
}

/*This method registers fileformat into data catalog*/
export function createSecondLevelMediation() {
    const message_bus_id = queryMessageBus();
    const bdr_id = queryBdr()
    const data = {
        "dataSpace": {
            "name": dataSpace
        },
        "dataService": {
            "dataServiceName": dataServiceName
        },
        "dataServiceInstance": {
            "dataServiceInstanceName": dataServiceInstanceName,
            "controlEndPoint": "http://localhost:8088",
            "consumedDataSpace": ms_dataSpace,
            "consumedDataCategory": ms_dataCategory,
            "consumedDataProvider": ms_dataProviderName,
            "consumedSchemaName": ms_schemaName,
            "consumedSchemaVersion": ms_schemaVersion
        },
        "supportedPredicateParameter": {
            "isPassedToConsumedService": true,
            "parameterName": parameterName
        },
        "dataCategory": {
            "dataCategoryName": dataCategory
        },
        "dataProviderType": {
            "dataProviderName": dataProviderName
        },
        "notificationTopic": {
            "encoding": "JSON",
            "messageBusId": message_bus_id,
            "name": topic,
            "specificationReference": "specRe"
        },
        "fileFormat": {
            "bulkDataRepositoryId": bdr_id,
            "reportOutputPeriodList": [0],
            "dataEncoding": "JSON",
            "specificationReference": "specRefSftp201"
        },
        "dataType": {
            "mediumType": "file",
            "schemaName": schemaName,
            "schemaVersion": schemaVersion,
            "isExternal": false
        }
    }

    const head = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }

    const FILE_FORMAT_SFTP = http.put(CATALOG_V1_BASE + 'file-format', JSON.stringify(data), head);
    if (FILE_FORMAT_SFTP.status != 200 && FILE_FORMAT_SFTP.status != 201 && FILE_FORMAT_SFTP.status != 409) {
        console.error("Create File format SFTP failed, status is  :" + FILE_FORMAT_SFTP.status);
        console.error("Create File format SFTP failed, body is  :" + FILE_FORMAT_SFTP.body);
    }
}

/*This method registers message schema into data catalog, this is used for the use case that are related to subscription in DCC*/
export function createThirdLevelMediation() {
    const message_bus_id = queryMessageBus();
    const data = {
        "dataSpace": {
            "name": ms_ran_dataSpace
        },
        "dataService": {
            "dataServiceName": ms_ran_dataServiceName
        },
        "dataCategory": {
            "dataCategoryName": ms_dataCategory
        },
        "dataProviderType": {
            "dataProviderName": ms_ran_dataProviderName
        },
        "messageStatusTopic": {
            "name": ms_ran_topic,
            "messageBusId": message_bus_id,
            "specificationReference": "SpecRef",
            "encoding": "JSON"
        },
        "messageDataTopic": {
            "name": ms_ran_topic,
            "messageBusId": message_bus_id,
            "encoding": "JSON"
        },
        "dataServiceInstance": {
            "dataServiceInstanceName": ms_ran_dataServiceInstanceName,
            "controlEndPoint": "http://localhost:8084",
            "consumedDataSpace": dataSpace,
            "consumedDataCategory": dataCategory,
            "consumedDataProvider": dataProviderName,
            "consumedSchemaName": schemaName,
            "consumedSchemaVersion": schemaVersion
        },
        "dataType": {
            "mediumType": "stream",
            "schemaName": ms_ran_schemaName,
            "schemaVersion": ms_ran_schemaVersion,
            "isExternal": true,
            "consumedDataSpace": dataSpace,
            "consumedDataCategory": dataCategory,
            "consumedDataProvider": dataProviderName,
            "consumedSchemaName": schemaName,
            "consumedSchemaVersion": schemaVersion
        },
        "supportedPredicateParameter": {
            "parameterName": parameterName,
            "isPassedToConsumedService": true
        },
        "messageSchema": {
            "specificationReference": "SpecRefRan301"
        }
    };
    const head = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }

    const MESSAGE_SCHEMA_RAN = http.put(CATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
    if (MESSAGE_SCHEMA_RAN.status != 200 && MESSAGE_SCHEMA_RAN.status != 201 && MESSAGE_SCHEMA_RAN.status != 409) {
        console.error("Create message schema RAN failed, status is  :" + MESSAGE_SCHEMA_RAN.status);
        console.error("Create message schema RAN failed,  body is  :" + MESSAGE_SCHEMA_RAN.body);
    }
}

/*This method creates and updates subscription using external details*/
export function createSubscriptionExternal() {

    const MESSAGE_SCHEMA = http.get(CATALOG_V2_BASE + 'message-schema?dataSpace=' + ms_ran_dataSpace + '&topic=' + ms_ran_topic);
    if (MESSAGE_SCHEMA.status == 200) {
        const body = JSON.parse(MESSAGE_SCHEMA.body);
        let predicateParameterName = body[0].dataService.predicateParameter[0].parameterName;

        //Subscription start

        const data = {
            "version": "1.0",
            "subscriptions": [
                {
                    "name": subscription,
                    "isMandatory": "yes",
                    "isOnHold": "no",
                    "isTagged": "no",
                    "dataType": {
                        "dataspace": ms_ran_dataSpace,
                        "dataCategory": ms_dataCategory,
                        "dataProvider": ms_ran_dataProviderName,
                        "schemaName": ms_ran_schemaName,
                        "schemaVersion": ms_ran_schemaVersion
                    },
                    "predicates":
                    {

                        [predicateParameterName]: ["NR100gNOdeBRadio00001"]
                    }
                }
            ]
        };
        const head = {
            headers: {
                accept: "application/json, text/plain, */*",
                "content-type": "application/json",
            }
        }
        rappid = getRappId();
        const CREATE_SUBSCRIPTION = http.put(DCC_BASE + "/subscription/v1/" + rappid, JSON.stringify(data), head);
        if (CREATE_SUBSCRIPTION.status != 200 && CREATE_SUBSCRIPTION.status != 201 && CREATE_SUBSCRIPTION.status != 409) {
            console.error("Create subscription failed, status is " + CREATE_SUBSCRIPTION.status);
            console.error("Create subscription failed, body is " + CREATE_SUBSCRIPTION.body);
        }
    }
    else {
        console.error("Failed while retrieving message schema for creating subscription, status is " + MESSAGE_SCHEMA.status);
        console.error("Failed while retrieving message schema for creating subscription, body is " + MESSAGE_SCHEMA.body);
    }
}
/*This method is use to get registration ID for delete the ods details*/
/*export function registerOds(){
const data = {
    "dataTypeInformation": {
      "dataTypeId": {
        "namespace": "string",
        "name": "1&,#-B5D*pi]{3w-5-B e`ss^YHar|9d%+FE\"QR([SmSuBa%SXd1@*;)f52{A3~v+'#M44@ ",
        "version": "string"
      },
      "isExternal": true,
      "metadata": {
        "dataCategory": [
          "string"
        ],
        "rat": [
          "string"
        ]
      },
      "dataProductionSchema": {
        "targetSelector": [
          "string"
        ],
        "dataSelector": [
          "string"
        ]
      },
      "dataDeliverySchemas": [
        {
          "type": "JSON_SCHEMA",
          "deliverySchemaId": "string",
          "schema": "string"
        }
      ],
      "dataDeliveryMechanisms": [
        {
          "deliveryMethod": "KAFKA_DATA_STREAM",
          "kafkaDeliveryConfiguration": {
            "numPartitions": 0,
            "cleanUpPolicy": "string",
            "compressionType": "string",
            "retentionBytes": 0,
            "retentionMs": 0
          }
        }
      ]
    },
    "dataProducerConstraints": {},
    "dataRequestEndpoint": {
      "ipv4Addr": "string",
      "ipv6Addr": "string",
      "fqdn": "oiA2BLnBG.r.t.4.Y-RR5e3ybWgAhj7frihO9DFlr4VIVJUTCCRzQ6s9PcvzBJOB6kLWcIFi3X4.EDLHTDPyl5sS5lvYmJSaYoYdwuDCYUO0Dz7Di2WHPpfgiZr6vw3.n.0.7.4.HG-p4gKRHimjM1MBZdilcWuI-GcsAormUJ4v-1RASUql1bAPpkNBCS.W.btFsTzHBKdWI7zcS.LCdAZOpSS9yOyxHbSETuLCnEqdjHISkS4jiIK8AGMPv",
      "port": 65535,
      "apiPrefix": "string",
      "qs": [
        "PSK"
      ]
    },
    "dataSubscriptionEndpoint": {
      "ipv4Addr": "string",
      "ipv6Addr": "string",
      "fqdn": "P.B.t.XEFDULS97hEFbqQPSuBymkZVtcF7xK53DRNA1wHFD00Wkd96vQ.Q2YLfWBEWbni17doaqSG3norsc365xbuHvKVJfyi.20TXbeuQMua6z-nAjjCvfrnA174tcBzV0yNYc7GnYktYG0FVN2.b.5.i.EQjEeaWyauj6cJn--w14O3OBFOaU5D4K.e.Y.Pfs5UEG74yQMj4t0kDGCYzfop6gKJmdXof.G.t.p.h.f.7gnLeiavqiH6DwdE",
      "port": 65535,
      "apiPrefix": "string",
      "qs": [
        "PSK"
      ]
    }
  }

const head = {
    headers: {
        accept: "application/json, text/plain, */
        //"content-type": "application/json",
    //}
//}
/*const ODS = http.post(DCC_BASE + 'datatypeprodcaps', JSON.stringify(data), head);
if (ODS.status != 201) {
    console.error("Create ODS for registration failed, status is  :" + ODS.status);
    console.error("Create ODS for registration failed,  body is  :" + ODS.body);
}
}*/
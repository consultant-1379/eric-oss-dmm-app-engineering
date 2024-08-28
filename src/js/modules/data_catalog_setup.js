import http from 'k6/http';
import {
    sleep
} from 'k6';
import {CATALOG_V1_BASE,DATACATALOG_V1_BASE} 
    from './endpoints.js';
import {name,namespace,streams_dataServiceInstanceName,version,streams_dataSpace,streams_dataCategory,streams_dataProviderTypeId,streams_schemaName,streams_schemaVersion,streams_dataServiceName,streams_topic,streams_dataProviderName,streams_prefix,} from '../modules/data_catalog_constant.js';
import {prefix, dataCategory, dataProviderName, dataServiceName, dataSpace, ms_dataCategory, ms_ran_dataProviderName, ms_ran_dataServiceName, ms_ran_dataSpace, ms_ran_schemaName, ms_ran_schemaVersion, schemaName, schemaVersion} from './setup_constant.js'
import { external_bdr_cluster, external_bdr_name, external_bdr_namespace } from './data_catalog_constant.js';
import { getUniqueRandomString ,getVus,getIter} from "./common_function.js"
export function registerBdr(scenario){
    let total_bdr_id={}
    let vus=getVus(scenario)
    for(let i = 0 ; i < vus.length; i++){
        let bdr_id=[];
        for(let j = 0 ; j < vus[i]; j++){
        let response;
        let count=0;
        const data = {
                "name": getUniqueRandomString(__VU),
                "clusterName": getUniqueRandomString(__VU),
                "nameSpace": getUniqueRandomString(__VU),
                "accessEndpoints": [prefix+"-data-object-storage-mn.sunshine-harii:9000"]
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            do{
            const BULK_DATA_REPOSITORY = http.post( CATALOG_V1_BASE + 'bulk-data-repository', JSON.stringify(data), head);
            response= BULK_DATA_REPOSITORY.status 
            if(response == 201){
                const body = JSON.parse(BULK_DATA_REPOSITORY.body);
                let ID = parseInt(body.id);
                bdr_id.push(ID)
                break;
            }
            count ++ 
            sleep(1)
            }
            while (count < 10)
            total_bdr_id[scenario]=bdr_id
        }
    }

return total_bdr_id;
}


export function registerMessageBus(scenario){
    let total_mb_id={}
    let vus=getVus(scenario)
    for(let i = 0 ; i < vus.length; i++){
        let mb_id=[];
        for(let j = 0 ; j < vus[i]; j++){
        let response;
        let count=0;
        const data = {
            "name": getUniqueRandomString(__VU),
            "clusterName": getUniqueRandomString(__VU),
            "nameSpace": getUniqueRandomString(__VU),
            "accessEndpoints": [prefix+"-data-object-storage-mn.sunshine-harii:9000"]
        };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            do{
                const MESSAGE_BUS = http.post( CATALOG_V1_BASE + 'message-bus', JSON.stringify(data), head);
                response= MESSAGE_BUS.status
                if(response == 201){
                    const body = JSON.parse(MESSAGE_BUS.body);
                    let ID = parseInt(body.id);
                    mb_id.push(ID)
                    break;
                }
                count ++ 
                sleep(1)
            }while (count < 10)
            total_mb_id[scenario]=mb_id
        }
    }

return total_mb_id;
}
//This function gives messagebus id for files
export function getMessageBusIdForFiles(){
    const DATA_TYPE = http.get(CATALOG_V1_BASE +'data-type?dataSpace='+dataSpace+'&dataCategory='
    +dataCategory+'&dataProvider='+dataProviderName+'&schemaName='+schemaName+'&schemaVersion='
    +schemaVersion+'&serviceName='+dataServiceName+'&isExternal=false');
    const body = JSON.parse(DATA_TYPE.body);
    const messageBusId = body[0].fileFormat.notificationTopic.messageBus.id;
    return messageBusId
  }
  
//This function gives messagebus id for streams
export function getMessageBusIdForStreams(){
    const DATA_TYPE = http.get(CATALOG_V1_BASE +'data-type?dataSpace='+ms_ran_dataSpace+
    '&dataCategory='+ms_dataCategory+'&dataProvider='+ms_ran_dataProviderName+'&schemaName='
    +ms_ran_schemaName+'&schemaVersion='+ms_ran_schemaVersion+
    '&serviceName='+ms_ran_dataServiceName+'&isExternal=true');
    const body = JSON.parse(DATA_TYPE.body);
    const messageBusId = body[0].messageSchema.messageDataTopic.messageBus.id;
    return messageBusId
  }
  
/*This method registers BDR  into data catalog using external details*/
export function createBdrExternal(){
    const data = {
        "name": external_bdr_name,
        "clusterName": external_bdr_cluster,
        "nameSpace": external_bdr_namespace,
        "accessEndpoints": [prefix+"-data-object-storage-mn.sunshine-harii:9000"],
        "endPointType": "external"
    };
    const head = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }
    const BULK_DATA_REPOSITORY = http.post( CATALOG_V1_BASE + 'bulk-data-repository', JSON.stringify(data), head);
    if(BULK_DATA_REPOSITORY.status != 200 && BULK_DATA_REPOSITORY.status !=201){
    console.error("Create BDR failed, status is "+BULK_DATA_REPOSITORY.status);
    console.error("Create BDR failed, body is "+BULK_DATA_REPOSITORY.body);
    }
}
/*This method registers message schema for query datatype */
/*export function registerMessageSchema(stage){
    const data ={
              "r1DataType": {
                "name":name ,
                "nameSpace": namespace,
                "version": version,
                "isExternal": true,
                "dataTypeInformation": [
                  {
                    "dataProductionSchema": {
                      "targetSelector": [
                        "string"
                      ],
                      "dataSelector": [
                        "string"
                      ]
                    },
                    "topicName": streams_topic,
                    "rat": "string",
                    "dataCategory": streams_dataCategory,
                    "deliveryMethod": "STREAMING_KAFKA",
                    "deliverySchemaID": [
                      "string"
                    ],
                    "deliverySchemaType": [
                      "string"
                    ],
                    "deliverySchema": [
                      "string"
                    ],
                    "dataProducer": {
                      "name": "string",
                      "type": "string"
                    }
                  }
                ],
                "dataType": [
                  {
                    "mediumType": "stream",
                    "schemaName": streams_schemaName,
                    "schemaVersion": streams_schemaVersion,
                    "isExternal": true,
                    "consumedDataSpace": "5G2",
                    "consumedDataCategory": "5G",
                    "consumedDataProvider": "5G",
                    "consumedSchemaName": "5G",
                    "consumedSchemaVersion": "2",
                    "messageSchema": {
                      "specificationReference": "SpecRef2021"
                    },
                    "dataSpace": {
                      "name": streams_dataSpace
                    },
                    "dataCategory": {
                      "name": streams_dataCategory
                    },
                    "dataProviderType": {
                      "name": streams_dataProviderName
                    },
                    "messageStatusTopic": {
                      "encoding": "AVRO",
                      "messageBusId": 1,
                      "name": "string",
                      "specificationReference": "SpecRef1011"
                    },
                    "messageDataTopic": {
                      "encoding": "AVRO",
                      "messageBusId": 1,
                      "name": "SpecRef102"
                    },
                    "dataService": {
                      "name": streams_dataServiceName
                    },
                    "dataServiceInstance": {
                      "name": streams_dataServiceInstanceName,
                      "controlEndPoint": "http://localhost:8082",
                      "consumedDataSpace": "5G",
                      "consumedDataCategory": "5G",
                      "consumedDataProvider": "5G",
                      "consumedSchemaName": "5G",
                      "consumedSchemaVersion": "2"
                    },
                    "supportedPredicateParameter": [
                      {
                        "name": "pd10111",
                        "isPassedToConsumedService": true
                      }
                    ]
                  }
                ]
              }
            }
          const head = {
              headers: {
                  accept: "application/json, text/plain, */
                  //"content-type": "application/json",
              //}
          //}
          /*const MESSAGE_SCHEMA = http.put(DATACATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
            if(MESSAGE_SCHEMA.status != 201){
              console.error("Create message schema for datajob failed, status is "+MESSAGE_SCHEMA.status);
              console.error("Create message schema for datajob failed, body is "+MESSAGE_SCHEMA.body);
              }
          }
    /*This method registers message schema for delete data service details */
    /*export function registerMessageSchemaDeleteDataservice(stage){
        const data ={
          "r1DataType": {
            "name":name ,
            "nameSpace": namespace,
            "version": version,
            "isExternal": true,
            "dataTypeInformation": [
              {
                "dataProductionSchema": {
                  "targetSelector": [
                    "string"
                  ],
                  "dataSelector": [
                    "string"
                  ]
                },
                "topicName": streams_topic,
                "rat": "string",
                "dataCategory": streams_dataCategory,
                "deliveryMethod": "STREAMING_KAFKA",
                "deliverySchemaID": [
                  "string"
                ],
                "deliverySchemaType": [
                  "string"
                ],
                "deliverySchema": [
                  "string"
                ],
                "dataProducer": {
                  "name": "string",
                  "type": "string"
                }
              }
            ],
            "dataType": [
              {
                "mediumType": "streams",
                "schemaName": streams_schemaName,
                "schemaVersion": streams_schemaVersion,
                "isExternal": true,
                "consumedDataSpace": "5G2",
                "consumedDataCategory": "5G",
                "consumedDataProvider": "5G",
                "consumedSchemaName": "5G",
                "consumedSchemaVersion": "2",
                "messageSchema": {
                  "specificationReference": "SpecRef2021"
                },
                "dataSpace": {
                  "name": streams_dataSpace
                },
                "dataCategory": {
                  "name": streams_dataCategory
                },
                "dataProviderType": {
                  "name": streams_dataProviderName
                },
                "messageStatusTopic": {
                  "encoding": "AVRO",
                  "messageBusId": 0,
                  "name": "string",
                  "specificationReference": "SpecRef1011"
                },
                "messageDataTopic": {
                  "encoding": "AVRO",
                  "messageBusId": 0,
                  "name": "SpecRef102"
                },
                "dataService": {
                  "name": streams_dataServiceName
                },
                "dataServiceInstance": {
                  "name": streams_dataServiceInstanceName,
                  "controlEndPoint": "http://localhost:8082",
                  "consumedDataSpace": "5G",
                  "consumedDataCategory": "5G",
                  "consumedDataProvider": "5G",
                  "consumedSchemaName": "5G",
                  "consumedSchemaVersion": "2"
                },
                "supportedPredicateParameter": [
                  {
                    "name": "pd10111",
                    "isPassedToConsumedService": true
                  }
                ]
              }
            ]
          }
        }
      const head = {
          headers: {
              accept: "application/json, text/plain, */
              //"content-type": "application/json",
          //}
      //}
      /*const MESSAGE_SCHEMA = http.put(DATACATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
        if(MESSAGE_SCHEMA.status != 201){
          console.error("Create message schema for delete dataservice failed, status is "+MESSAGE_SCHEMA.status);
          console.error("Create message schema for delete dataservice failed, body is "+MESSAGE_SCHEMA.body);
          }
      }*/







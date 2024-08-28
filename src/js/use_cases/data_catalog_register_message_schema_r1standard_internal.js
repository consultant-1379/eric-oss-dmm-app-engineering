import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {DATACATALOG_V1_BASE} 
    from '../modules/endpoints.js';
    import { getUniqueRandomString } from "../modules/common_function.js"
    import {name,namespace,streams_dataServiceInstanceName,version,streams_dataSpace,streams_dataCategory,streams_dataProviderTypeId,streams_schemaName,streams_schemaVersion,streams_dataServiceName,streams_topic,streams_dataProviderName,streams_prefix,} from '../modules/data_catalog_constant.js';
import { Put_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
    group('Register Message schema r1standard', function() {
        group('Register message schema details r1standard ', function() {
            const data ={
                "r1DataType": {
                  "name":name+getUniqueRandomString(__VU),
                  "nameSpace": namespace+getUniqueRandomString(__VU),
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
                      "topicName": streams_topic+getUniqueRandomString(__VU),
                      "rat": "string",
                      "dataCategory": streams_dataCategory+getUniqueRandomString(__VU),
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
                      "schemaName": streams_schemaName+getUniqueRandomString(__VU),
                      "schemaVersion": streams_schemaVersion+getUniqueRandomString(__VU),
                      "isExternal": true,
                      "consumedDataSpace": "5G2",
                      "consumedDataCategory": "5G",
                      "consumedDataProvider": "5G",
                      "consumedSchemaName": "5G",
                      "consumedSchemaVersion": "2",
                      "messageSchema": {
                        "specificationReference": "SpecRef2021"+getUniqueRandomString(__VU)
                      },
                      "dataSpace": {
                        "name": streams_dataSpace+getUniqueRandomString(__VU)
                      },
                      "dataCategory": {
                        "name": streams_dataCategory+getUniqueRandomString(__VU)
                      },
                      "dataProviderType": {
                        "name": streams_dataProviderName+getUniqueRandomString(__VU)
                      },
                      "messageStatusTopic": {
                        "encoding": "AVRO",
                        "messageBusId": 0,
                        "name": "string",
                        "specificationReference": "SpecRef1011"+getUniqueRandomString(__VU)
                      },
                      "messageDataTopic": {
                        "encoding": "AVRO",
                        "messageBusId": 0,
                        "name": "SpecRef102"+getUniqueRandomString(__VU)
                      },
                      "dataService": {
                        "name": streams_dataServiceName+getUniqueRandomString(__VU)
                      },
                      "dataServiceInstance": {
                        "name": streams_dataServiceInstanceName+getUniqueRandomString(__VU),
                        "controlEndPoint": "http://localhost:8082",
                        "consumedDataSpace": "5G",
                        "consumedDataCategory": "5G",
                        "consumedDataProvider": "5G",
                        "consumedSchemaName": "5G",
                        "consumedSchemaVersion": "2"
                      },
                      "supportedPredicateParameter": [
                        {
                          "name": "pd10111"+getUniqueRandomString(__VU),
                          "isPassedToConsumedService": true
                        }
                      ]
                    }
                  ]
                }
              }
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_SCHEMA = http.put(DATACATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
            Put_Data_Catalog.add(MESSAGE_SCHEMA.timings.duration);
            try{
            const result = check(MESSAGE_SCHEMA, {
                'Successfully registered message schema for r1standard': (r) => MESSAGE_SCHEMA.status === 200 || 201,
                'Response should return message schema details for r1standard ': (r) => MESSAGE_SCHEMA.body,

            },{legacy: "false"});
            if (!result) {
                console.error("Failed to create message schema for r1standard , status is "+MESSAGE_SCHEMA.status);
                console.error("Failed to create message schema for r1standard , body is "+MESSAGE_SCHEMA.body)
              }
            }catch(error){
                console.error("Failed to create message schema for r1standard , status is "+MESSAGE_SCHEMA.status);
                console.error("Failed to create message schema for r1standard , body is "+MESSAGE_SCHEMA.body)
            }
        });    
});


}





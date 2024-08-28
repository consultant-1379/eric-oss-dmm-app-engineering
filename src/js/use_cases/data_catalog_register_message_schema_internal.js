import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { getUniqueRandomString } from "../modules/common_function.js"
import { 
    Trend 
} from 'k6/metrics';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import {streams_dataSpace, streams_dataCategory,streams_topic, streams_dataProviderTypeId, streams_schemaName,streams_schemaVersion,streams_dataServiceName,Namespace,bdr_s1_name,mb_s1_name, streams_dataProviderName, streams_prefix}
    from '../modules/streams_constant.js';
import { Put_Data_Catalog } from '../modules/custom_metric.js';
export default function() {

    group('Register Message schema', function() {
        let topic = "My-topic-producer-S1" + getUniqueRandomString(__VU);
        group('Register message schema', function() {
            const data = {
                "dataSpace": {
                    "name": streams_prefix + getUniqueRandomString(__VU)
                },
                "dataService": {
                    "dataServiceName": streams_dataServiceName + getUniqueRandomString(__VU)
                },
                "dataCategory": {
                    "dataCategoryName": streams_dataCategory + getUniqueRandomString(__VU)
                },
                "dataProviderType": {
                    "dataProviderName": streams_dataProviderName + getUniqueRandomString(__VU)
                },
                "messageStatusTopic": {
                    "name":  streams_topic+ getUniqueRandomString(__VU),
                    "messageBusId": 1,
                    "specificationReference": "SpecRef101",
                    "encoding": "JSON"
                },
                "messageDataTopic": {
                    "name": topic+ getUniqueRandomString(__VU),
                    "messageBusId": 1,
                    "encoding": "JSON"
                },
                "dataServiceInstance": {
                    "dataServiceInstanceName": "dsinst1011"+ getUniqueRandomString(__VU),
                    "controlEndPoint": "http://localhost:8082",
                    "consumedDataSpace": "4G",
                    "consumedDataCategory": "4G",
                    "consumedDataProvider": "4G",
                    "consumedSchemaName": "SCH2",
                    "consumedSchemaVersion": "2"
                },
                "dataType": {
                    "mediumType": "stream",
                    "schemaName": streams_schemaName+ getUniqueRandomString(__VU),
                    "schemaVersion": streams_schemaVersion,
                    "isExternal": true,
                    "consumedDataSpace": "4G1",
                    "consumedDataCategory": "4G",
                    "consumedDataProvider": "4G",
                    "consumedSchemaName": "4G",
                    "consumedSchemaVersion": "2"
                },
                "supportedPredicateParameter": {
                    "parameterName": "pd1011"+ getUniqueRandomString(__VU),
                    "isPassedToConsumedService": true
                },
                "messageSchema": {
                    "specificationReference": "SpecRef2020"+ getUniqueRandomString(__VU)
                }
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_SCHEMA = http.put(CATALOG_V1_BASE + 'message-schema', JSON.stringify(data), head);
            Put_Data_Catalog.add(MESSAGE_SCHEMA.timings.duration);
            try{
            const result = check(MESSAGE_SCHEMA, {
                'Successfully registered message schema': (r) => MESSAGE_SCHEMA.status === 200 || 201,
                'Response should return Message Bus details': (r) => MESSAGE_SCHEMA.json().messageDataTopic.messageBus.name==mb_s1_name,

            });
            if (!result) {
                console.error("Failed to create message schema , status is "+MESSAGE_SCHEMA.status);
                console.error("Failed to create message schema , body is "+MESSAGE_SCHEMA.body)
              }
            }catch(error){
                console.error("Failed to create message schema , status is "+MESSAGE_SCHEMA.status);
                console.error("Failed to create message schema , body is "+MESSAGE_SCHEMA.body)
            }
        });    
});


}





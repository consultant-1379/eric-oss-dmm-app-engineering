import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { getUniqueRandomInt,getUniqueRandomString, } from "../modules/common_function.js"
import {dataSpace,files_prefix, dataCategory, dataProviderName, schemaName,schemaVersion,dataServiceName,Namespace,bdr_s1_name,mb_s1_name}
    from '../modules/files_constant.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import { Put_Data_Catalog  } from '../modules/custom_metric.js';

export default function() {
    let topic = "My-topic-producer-F" + getUniqueRandomInt(__VU);
    group(' Register file format', function() {
        /*This use case validates registration of file format details into data catalog.*/
        group('Register file format', function() {
            const data = {
                "dataSpace": {
                    "name": files_prefix +dataSpace+ getUniqueRandomString(__VU)
                },
                "dataService": {
                    "dataServiceName": dataServiceName + getUniqueRandomString(__VU)
                },
                "dataServiceInstance": {
                    "dataServiceInstanceName": "dsinstance2" + getUniqueRandomInt(__VU),
                    "controlEndPoint": "http://localhost:8080",
                    "consumedDataSpace": "",
                    "consumedDataCategory": "",
                    "consumedDataProvider": "",
                    "consumedSchemaName": "",
                    "consumedSchemaVersion": ""
                },
                "supportedPredicateParameter": {
                    "isPassedToConsumedService": false,
                    "parameterName": "pname2" + getUniqueRandomInt(__VU)
                },
                "dataCategory": {
                    "dataCategoryName": dataCategory + getUniqueRandomString(__VU)
                },
                "dataProviderType": {
                    "dataProviderName": dataProviderName + getUniqueRandomString(__VU)
                },
                "notificationTopic": {
                    "encoding": "JSON",
                    "messageBusId": 1,
                    "name": topic + getUniqueRandomString(__VU),
                    "specificationReference": "specRef"+getUniqueRandomInt(__VU)
                },
                "fileFormat": {
                    "bulkDataRepositoryId": 1,
                    "reportOutputPeriodList": [0],
                    "dataEncoding": "XML",
                    "specificationReference": "specRef2" + getUniqueRandomInt(__VU)
                },
                "dataType": {
                    "mediumType": "file",
                    "schemaName": schemaName + getUniqueRandomString(__VU),
                    "schemaVersion": schemaVersion,
                    "isExternal": true,
                    "consumedDataSpace": "",
                    "consumedDataCategory": "",
                    "consumedDataProvider": "",
                    "consumedSchemaName": "",
                    "consumedSchemaVersion": ""
                }
            }
 
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const FILE_FORMAT = http.put(CATALOG_V1_BASE + 'file-format', JSON.stringify(data), head);
            Put_Data_Catalog.add(FILE_FORMAT.timings.duration);
            try{
            const result = check(FILE_FORMAT, {
                'Successfully registered file format': (r) => FILE_FORMAT.status === 200 || 201,
                'Response should return file format details': (r) => FILE_FORMAT.json().notificationTopic.messageBus.name==mb_s1_name,
            });
            if (!result) {
                console.error("Failed to create file format , status is "+FILE_FORMAT.status);
                console.error("Failed to create file format , body is "+FILE_FORMAT.body)
                
              }
            }catch(error){
                console.error("Failed to create file format , status is "+FILE_FORMAT.status);
                console.error("Failed to create file format , body is "+FILE_FORMAT.body)
            }
             
        });

    });
}


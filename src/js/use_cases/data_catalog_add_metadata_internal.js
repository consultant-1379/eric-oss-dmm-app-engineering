import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
const BASE = 'http://eric-oss-data-catalog:9590/catalog/v1';
export const Post_Data_Space = new Trend('Adding data space metadata into data catalog')
export const Post_Data_Provider_Type = new Trend('Adding data provider type metadata into data catalog')
export const Post_Message_Bus = new Trend('Adding message bus metadata into data catalog')
export const Post_Message_status_topic = new Trend('Adding message status topic metadata into data catalog')
export const Post_Message_Data_Topic = new Trend('Adding message data topic metadata into data catalog')
export const Post_Notification_Topic = new Trend('Adding notification topic metadata into data catalog')
export const Post_Data_Collector = new Trend('Adding data collector metadata into data catalog')
export const Post_BDR = new Trend('Adding bulk data repository metadata into data catalog')
export const Post_File_Format = new Trend('Adding file format metadata into data catalog')
export const Post_Message_Schema= new Trend('Adding Message Schema metadata into data catalog')
export const Get_BDR = new Trend('Verifying bulk data repository metadata into data catalog')
export const Get_Message_Status_Topic = new Trend('Verifying Message status topic metadata into data catalog')
export const Get_Data_Provider_Type = new Trend('Verifying dataprovider type metadata into data catalog')
export const Get_Data_Space = new Trend('Verifying data space metadata into data catalog')
export const Get_File_Format = new Trend('Verifying file format metadata into data catalog')
export const Get_Message_Bus = new Trend('Verifying message bus metadata into data catalog')
export const Get_Notification_Topic = new Trend('Verifying Notification topic metadata into data catalog')
export const Get_Message_Data_topic = new Trend('Verifying message data topic metadata into data catalog')
export const Get_Message_Schema = new Trend('Verifying message Schema metadata into data catalog')

let dataSpaceId;
let messageBusId;
let messageStatusTopicId;
let dataProviderTypeId;
let notificationTopicId;
let bulkDataRepositoryId;
let messageDataTopicId;
let fileFormatId;
let MessageSchemaId;
let randomInt=randomIntBetween(10, 100);
let collectorId;
//let d=Math.floor(Math.random() * 100);

export default function() {

    group('Adding Metadata details into Data Catalog.', function() {
        //data space
        group('It shall be possible to register for the Data Space', function() {
            const data = {
                "id": 1,
                "name": randomString(10)+randomInt
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const DATA_SPACE = http.post(BASE+"/data-space", JSON.stringify(data), head);
            Post_Data_Space.add(DATA_SPACE.timings.duration);
            const result = check(DATA_SPACE, {
                'Successfully verified data space': (r) => DATA_SPACE.status === 201,
                'Response should return Data Space details': (r) => DATA_SPACE.body.includes("id"),

            });
            if (!result) {
                console.error("Data space status verification  failed , status is "+DATA_SPACE.status);
                console.error("Data space response verification failed, response is "+DATA_SPACE.body);
              }

            console.log(DATA_SPACE.status);
            console.log(DATA_SPACE.body);
            const body = JSON.parse(DATA_SPACE.body);
            dataSpaceId = parseInt(body.id);

        });

        //data provider type
        group('It shall be possible to register for the Data Provider Type', function() {
            const data = {
                "providerVersion": "pv1114",
                "dataCategory": "CM_EXPORT",
                "providerTypeId": "pviid_16",
                "dataSpaceId" : dataSpaceId
            };
           
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const DATA_PROVIDER_TYPE = http.post(BASE + '/data-provider-type', JSON.stringify(data), head);
            Post_Data_Provider_Type.add(DATA_PROVIDER_TYPE.timings.duration);
            const result = check(DATA_PROVIDER_TYPE, {
                'Successfully verified data provider type': (r) => DATA_PROVIDER_TYPE.status === 201,
                'Response should return Data Provider Type details': (r) => DATA_PROVIDER_TYPE.body.includes("id"),

            });
            if (!result) {
                console.error("Data provider status verification  failed , status is "+DATA_PROVIDER_TYPE.status);
                console.error("Data provider response verification failed, response is "+DATA_PROVIDER_TYPE.body);
            }
            
            console.log(DATA_PROVIDER_TYPE.status);
            console.log(DATA_PROVIDER_TYPE.body);
            const body = JSON.parse(DATA_PROVIDER_TYPE.body);
            dataProviderTypeId = parseInt(body.id);

        });

        //message bus
        group('It shall be possible to register for the Message Bus', function() {
            const data = {
                "clusterName": "KaaS",
                "nameSpace": "Sunshine-harii",
                "accessEndpoints": ["eric-data-object-storage-mn.sunshine-harii:9000"],
                "name" : randomString(10)+randomInt
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_BUS = http.post(BASE + '/message-bus', JSON.stringify(data), head);
            Post_Message_Bus.add(MESSAGE_BUS.timings.duration);
            const result = check(MESSAGE_BUS, {
                'Successfully verified message bus': (r) => MESSAGE_BUS.status === 201,
                'Response should return Message Bus details': (r) => MESSAGE_BUS.body.includes("name"),
            });
            if (!result) {
                console.error("Message bus status verification  failed , status is "+MESSAGE_BUS.status);
                console.error("Message bus response verification failed, response is "+MESSAGE_BUS.body);
            }
            
            console.log(MESSAGE_BUS.status);
            console.log(MESSAGE_BUS.body);
            const body = JSON.parse(MESSAGE_BUS.body);
            messageBusId = parseInt(body.id);

        });

        //message status topic
        group('It shall be possible to register for the Message Status topic', function() {
            const data = {
                "name": randomString(10),
                "messageBusId": 1,
                "specificationReference": "SpecRef",
                "encoding": "JSON",
                "messageBusId" : messageBusId
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_STATUS_TOPIC = http.post(BASE + '/message-status-topic', JSON.stringify(data), head);
            Post_Message_status_topic.add(MESSAGE_STATUS_TOPIC.timings.duration);
            const result = check(MESSAGE_STATUS_TOPIC, {
                'Successfully verified message status topic': (r) => MESSAGE_STATUS_TOPIC.status === 201,
                'Response should return Message Status topic details': (r) => MESSAGE_STATUS_TOPIC.body.includes("name"),
            });
            if (!result) {
                console.error("Message status topic status verification  failed , status is "+MESSAGE_STATUS_TOPIC.status);
                console.error("Message status topic response verification failed, response is "+MESSAGE_STATUS_TOPIC.body);
            }
            
            console.log(MESSAGE_STATUS_TOPIC.status);
            console.log(MESSAGE_STATUS_TOPIC.body);
            const body = JSON.parse(MESSAGE_STATUS_TOPIC.body);
            messageStatusTopicId = parseInt(body.id);

        });

        //Message data topic
        group('It shall be possible to register for the message data Topic', function() {
            const data = {
                "name": randomString(10),
                "encoding": "JSON",
                "messageBusId": messageBusId,
                "messageStatusTopicId": messageStatusTopicId
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_DATA_TOPIC = http.post(BASE + '/message-data-topic', JSON.stringify(data), head);
            Post_Message_Data_Topic.add(MESSAGE_DATA_TOPIC.timings.duration);
            const result = check(MESSAGE_DATA_TOPIC, {
                'Successfully verified message data topic': (r) => MESSAGE_DATA_TOPIC.status === 201,
                'Response should return message data Topic details': (r) => MESSAGE_DATA_TOPIC.body.includes("name"),
            });
            if (!result) {
                console.error("Message data topic status verification  failed , status is "+MESSAGE_DATA_TOPIC.status);
                console.error("Message data topic response verification failed, response is "+MESSAGE_DATA_TOPIC.body);
            }
            
            console.log(MESSAGE_DATA_TOPIC.status);
            console.log(MESSAGE_DATA_TOPIC.body);
            const body = JSON.parse(MESSAGE_DATA_TOPIC.body);
            messageDataTopicId = parseInt(body.id);

        });
        //notification topic
        group('It shall be possible to register for the Notification Topic', function() {
            const data = {
                "id": 1,
                "name": randomString(10),
                "encoding": "JSON",
                "specificationReference": "specref1",
                "fileFormatIds": [1],
                "messageBusId": messageBusId
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const NOTIFICATION_TOPIC = http.post(BASE + '/notification-topic', JSON.stringify(data), head);
            Post_Notification_Topic.add(NOTIFICATION_TOPIC.timings.duration);
            const result = check(NOTIFICATION_TOPIC, {
                'Successfully verified notification topic': (r) => NOTIFICATION_TOPIC.status === 201,
                'Response should return Notification Topic details': (r) => NOTIFICATION_TOPIC.body.includes("name"),
            });
            if (!result) {
                console.error("Notification topic status verification  failed , status is "+NOTIFICATION_TOPIC.status);
                console.error("Notification topic response verification failed, response is "+NOTIFICATION_TOPIC.body);
            }
            
            console.log(NOTIFICATION_TOPIC.status);
            console.log(NOTIFICATION_TOPIC.body);
            const body = JSON.parse(NOTIFICATION_TOPIC.body);
            notificationTopicId = parseInt(body.id);

        });
        //Data collector
        group('It shall be possible to register for the Data Collector', function() {
            const data = {
                "controlEndpoint": "http://8.8.8.8:9090/end_point",
                "name": randomString(10)+randomInt
             };

             collectorId = "d65f5"+randomInt+"0-"+randomInt+"93-4ae1-9f1d-ab9104180f01";
             data["collectorId"] = collectorId
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const DATA_COLLECTOR = http.post( BASE + '/data-collector', JSON.stringify(data), head);
            Post_Data_Collector.add(DATA_COLLECTOR.timings.duration);
            const result = check(DATA_COLLECTOR, {
                'Successfully verified data collector': (r) => DATA_COLLECTOR.status === 201,
                'Response should return Data Collector details': (r) => DATA_COLLECTOR.body.includes("name"),
            });
            if (!result) {
                console.error("Data collector status verification  failed , status is "+DATA_COLLECTOR.status);
                console.error("Data collector response verification failed, response is "+DATA_COLLECTOR.body);
            }
            
            console.log(DATA_COLLECTOR.status);
            console.log(DATA_COLLECTOR.body);

        });
        //Bulk data repository start
        group('Create a new Bulk data Repository', function() {
            const data = {
                "clusterName": "KaaS",
                "nameSpace": "sunshine-harii",
                "accessEndpoints": ["eric-data-object-storage-mn.sunshine-harii:9000"],
                "name" : randomString(10)+randomInt
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const BULK_DATA_REPOSITORY = http.post(BASE + '/bulk-data-repository', JSON.stringify(data), head);
            Post_BDR.add(BULK_DATA_REPOSITORY.timings.duration);
            const result = check(BULK_DATA_REPOSITORY, {
                'Successfully verified bulk data repository' : (r) => BULK_DATA_REPOSITORY.status === 201,
            });
            if (!result) {
                console.error("Bulk data repository status verification  failed , status is "+BULK_DATA_REPOSITORY.status);
                
            }
            
            console.log(BULK_DATA_REPOSITORY.status);
            console.log(BULK_DATA_REPOSITORY.body);
            const body = JSON.parse(BULK_DATA_REPOSITORY.body);
            bulkDataRepositoryId = parseInt(body.id);
        });
        //File format
        group('It shall be possible to register for the File Format', function() {
            const data = {
                "id": 1,
                "reportOutputPeriodList": [15],
                "dataEncoding": "XML",
                "specificationReference": "specref1",
                "dataProviderTypeId" : dataProviderTypeId,
                "notificationTopicId" : notificationTopicId,
                "bulkDataRepositoryId" : bulkDataRepositoryId,
                "dataCollectorId" : collectorId
            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const FILE_FORMAT = http.post(BASE + '/file-format', JSON.stringify(data), head);
            Post_File_Format.add(FILE_FORMAT.timings.duration);            
            const result = check(FILE_FORMAT, {
                'Successfully verified file format': (r) => FILE_FORMAT.status === 201,
                'Response should return File Format details': (r) => FILE_FORMAT.body.includes("id"),
            });
            if (!result) {
                console.error("File format status verification failed , status is "+FILE_FORMAT.status);
                console.error("File format response verification failed, response is "+FILE_FORMAT.body);
            }
            console.log(FILE_FORMAT.status);
            console.log(FILE_FORMAT.body);
            const body = JSON.parse(FILE_FORMAT.body);
            fileFormatId = parseInt(body.id);

        });


        //message schema 
        group('It shall be possible to register for the message schema ', function() {
            const data = {
                "id": 2,
                "specificationReference": "specref1",
                "dataProviderTypeId" : dataProviderTypeId,
                "messageDataTopicId" : messageDataTopicId,
                "dataCollectorId" : collectorId

            };
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_SCHEMA = http.post(BASE + '/message-schema', JSON.stringify(data), head);
            Post_Message_Schema.add(MESSAGE_SCHEMA.timings.duration);
            const result = check(MESSAGE_SCHEMA, {
                'Successfully verified message schema': (r) => MESSAGE_SCHEMA.status === 201,
                'Response should return message schema details': (r) => MESSAGE_SCHEMA.body.includes("id"),
            });
            if (!result) {
                console.error("Message schema status verification failed , status is "+MESSAGE_SCHEMA.status);
                console.error("Message schema response verification failed, response is "+MESSAGE_SCHEMA.body);
            }
            
            console.log(MESSAGE_SCHEMA.status);
            console.log(MESSAGE_SCHEMA.body);
            const body = JSON.parse(MESSAGE_SCHEMA.body);
            MessageSchemaId = parseInt(body.id);

        });
    })
    //verify
    group(' Verify Metadata details stored in Data-catalog.', function() {
        //Bulk data repository start
        group('Verify Bulk data Repository details', function() {

            const BULK_DATA_REPOSITORY = http.get(BASE + '/bulk-data-repository/'+bulkDataRepositoryId);
            Get_BDR.add(BULK_DATA_REPOSITORY.timings.duration);
            const result = check(BULK_DATA_REPOSITORY, {
                'Successfully verified bulk data repository status': (r) => BULK_DATA_REPOSITORY.status === 200,
                'Response should return file Bulk data Repository details': (r) => BULK_DATA_REPOSITORY.body.includes("name"),
            });
            if (!result) {
                console.error("Bulk data repository status verification failed , status is "+BULK_DATA_REPOSITORY.status);
                console.error("Bulk data repository response verification failed, response is "+BULK_DATA_REPOSITORY.body);
            }
            console.log(BULK_DATA_REPOSITORY.body);
            console.log(BULK_DATA_REPOSITORY.status);
        });
        
        //msg status topic
        group('Verify Message status topic', function() {
            const MESSAGE_STATUS_TOPIC = http.get(BASE + '/message-status-topic/'+messageStatusTopicId);
            Get_Message_Status_Topic.add(MESSAGE_STATUS_TOPIC.timings.duration);
            const result = check(MESSAGE_STATUS_TOPIC, {
                'Successfully verified message status topic status': (r) => MESSAGE_STATUS_TOPIC.status === 200,
                'Response should return file Message status topic details': (r) => MESSAGE_STATUS_TOPIC.body.includes("name"),
            });
            if (!result) {
                console.error("Message status topic status verification failed , status is "+MESSAGE_STATUS_TOPIC.status);
                console.error("Message status topic response verification failed, response is "+MESSAGE_STATUS_TOPIC.body);
            }
            
            console.log(MESSAGE_STATUS_TOPIC.status);

        });

        //data provider type
        group('Verify Data Provider Type', function() {
            const DATA_PROVIDER_TYPE = http.get(BASE + '/data-provider-type/'+dataProviderTypeId);
            Get_Data_Provider_Type.add(DATA_PROVIDER_TYPE.timings.duration);
            const result = check(DATA_PROVIDER_TYPE, {
                'Successfully verified data provider type status': (r) => DATA_PROVIDER_TYPE.status === 200,
                'Response should return file Data Provider Type details': (r) => DATA_PROVIDER_TYPE.body.includes("name"),
            });
            if (!result) {
                console.error("Data provider type status verification failed , status is "+DATA_PROVIDER_TYPE.status);
                console.error("Data provider type response verification failed, response is "+DATA_PROVIDER_TYPE.body);
            }
            
            console.log(DATA_PROVIDER_TYPE.body);

        });

        //data space
        group('Verify Data Space', function() {
            const DATA_SPACE = http.get(BASE + '/data-space/'+dataSpaceId);
            Get_Data_Space.add(DATA_SPACE.timings.duration);
            const result = check(DATA_SPACE, {
                'Successfully verified data space status': (r) => DATA_SPACE.status === 200,
                'Response should return file Data Space details': (r) => DATA_SPACE.body.includes("name"),
            });
            if (!result) {
                console.error("Data space status verification failed , status is "+DATA_SPACE.status);
                console.error("Data space response verification failed, response is "+DATA_SPACE.body);
            }

        });

        //File format
        group('Verify File Format ', function() {
            const FILE_FORMAT = http.get(BASE + '/file-format/'+fileFormatId);
            Get_File_Format.add(FILE_FORMAT.timings.duration);
            const result = check(FILE_FORMAT, {
                'Successfully verified file format status': (r) => FILE_FORMAT.status === 200,
                'Response should return file File Format details': (r) => FILE_FORMAT.body.includes("dataProviderTypeId"),
            });
            if (!result) {
                console.error("File format status verification failed , status is "+FILE_FORMAT.status);
                console.error("File format response verification failed, response is "+FILE_FORMAT.body);
            }


        });

        //message bus
        group('Verify Message Bus', function() {
            const MESSAGE_BUS = http.get(BASE + '/message-bus/'+messageBusId);
            Get_Message_Bus.add(MESSAGE_BUS.timings.duration);
            const result = check(MESSAGE_BUS, {
                'Successfully verified message bus status': (r) => MESSAGE_BUS.status === 200,
                'Response should return file Message Bus details': (r) => MESSAGE_BUS.body.includes("name"),
            });
            if (!result) {
                console.error("Message bus status verification failed , status is "+MESSAGE_BUS.status);
                console.error("Message bus response verification failed, response is "+MESSAGE_BUS.body);
            }

        });

        //notification topic
        group('Verify Notification Topic details', function() {
            const NOTIFICATION_TOPIC = http.get(BASE + '/notification-topic/'+notificationTopicId);
            Get_Notification_Topic.add(NOTIFICATION_TOPIC.timings.duration);
            const result = check(NOTIFICATION_TOPIC, {
                'Successfully verified notification topic status': (r) => NOTIFICATION_TOPIC.status === 200,
                'Response should return file Notification Topic details': (r) => NOTIFICATION_TOPIC.body.includes("id"),
            });
            if (!result) {
                console.error("Notification topic status verification failed , status is "+NOTIFICATION_TOPIC.status);
                console.error("Notification topic response verification failed, response is "+NOTIFICATION_TOPIC.body);
            }

        });

        //Message data topic
        group('Verify Message Data Topic details', function() {
            const MESSAGE_DATA_TOPIC = http.get(BASE + '/message-data-topic/'+messageDataTopicId);
            Get_Message_Data_topic.add(MESSAGE_DATA_TOPIC.timings.duration);
            const result = check(MESSAGE_DATA_TOPIC, {
                'Successfully verified message data topic status': (r) => MESSAGE_DATA_TOPIC.status === 200,
                'Response should return Message data topic details': (r) => MESSAGE_DATA_TOPIC.body.includes("name"),
            });
            if (!result) {
                console.error("Message data topic status verification failed , status is "+MESSAGE_DATA_TOPIC.status);
                console.error("Message data topic response verification failed, response is "+MESSAGE_DATA_TOPIC.body);
            }

        });

        //message schema 
        group('Verify Message schema  details', function() {
            const MESSAGE_SCHEMA = http.get(BASE + '/message-schema/'+MessageSchemaId);
            Get_Message_Schema.add(MESSAGE_SCHEMA.timings.duration);
            const result = check(MESSAGE_SCHEMA, {
                'Successfully verified message schema status': (r) => MESSAGE_SCHEMA.status === 200,
                'Response should return file Message schema details': (r) => MESSAGE_SCHEMA.body.includes("name"),
            });
            if (!result) {
                console.error("Message schema status verification failed , status is "+MESSAGE_SCHEMA.status);
                console.error("Message schema response verification failed, response is "+MESSAGE_SCHEMA.body);
            }

        });


    })
}
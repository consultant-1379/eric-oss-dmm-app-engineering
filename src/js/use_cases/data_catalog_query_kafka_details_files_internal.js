import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {CATALOG_V2_BASE} 
    from '../modules/endpoints.js';
import { topic, dataCategory } 
    from '../modules/setup_constant.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function(messageBusId) {
    /*This use case validates retrieval of Kafka details for files from data catalog.These details are registered
    in the setup*/
    group('Query Kafka Details for files from data catalog  ', function() {
       group('Query Kafka Details for files from data catalog ', function() {
            const KAFKA_FILES = http.get(CATALOG_V2_BASE +'notification-topic?name='+topic+'&messageBusId='+messageBusId);
            Query_Data_Catalog.add(KAFKA_FILES.timings.duration);
            const body = JSON.parse(KAFKA_FILES.body);
            try{
            const result = check(KAFKA_FILES, {
                'Successfully Retrieve Kafka details': (r) => KAFKA_FILES.status === 200,
                'Response should return Kafka details': (r) => body[0].dataProviderType.dataCategoryType.dataCategoryName==dataCategory,
            });
            if (!result) {
                console.error("Kafka status verification failed , status is " + KAFKA_FILES.status);
                console.error("Kafka body verification failed , body is " + KAFKA_FILES.body);
            }
        }catch(error){
            console.error("Kafka status verification failed , status is " + KAFKA_FILES.status);
            console.error("Kafka body verification failed , body is " + KAFKA_FILES.body);
        }
        });
    });  
}
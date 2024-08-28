import http from 'k6/http';
import {check,group} from 'k6';
import { Trend} 
         from 'k6/metrics';
import {ms_ran_topic,mb_s1_name} 
        from '../modules/setup_constant.js';
import {CATALOG_V2_BASE}
        from '../modules/endpoints.js';
        import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function(messageBusId) {
        /*This use case validates retrieval of Kafka details for streams from data catalog.These details are registered
        in the setup*/
        group('Query Kafka Details for Streams from data catalog  ', function() {
             group('Query Kafka Details for streams from data catalog ', function() {
                const KAFKA_STREAMS = http.get(CATALOG_V2_BASE +'message-data-topic?name='+ms_ran_topic+'&messageBusId='+messageBusId);
                Query_Data_Catalog.add(KAFKA_STREAMS.timings.duration);
                const body = JSON.parse(KAFKA_STREAMS.body);
                try{
                const result = check(KAFKA_STREAMS, {
                               'Successfully Retrieve Kafka details': (r) => KAFKA_STREAMS.status === 200,
                               'Response should return Kafka details': (r) => body[0].messageBus.name==mb_s1_name,
                 });
                 if (!result) {
                    console.error("Kafka status verification failed , status is " + KAFKA_STREAMS.status);
                    console.error("Kafka body verification failed , body is " + KAFKA_STREAMS.body);
                }
            }catch(error){
                console.error("Kafka status verification failed , status is " + KAFKA_STREAMS.status);
                console.error("Kafka body verification failed , body is " + KAFKA_STREAMS.body);
            }
                 });
            });

}

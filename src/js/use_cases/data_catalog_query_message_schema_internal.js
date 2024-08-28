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
import { mb_s1_name, ms_ran_dataSpace, ms_ran_topic } from '../modules/setup_constant.js';
import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
    /*This use case validates retrieval of MessagSchema details from data catalog.These details are registered
    in the setup*/
    group('Query Message Schema in data catalog', function() {
        group('Query Message Schema in data catalog', function() {        
            const MESSAGE_SCHEMA = http.get(CATALOG_V2_BASE + 'message-schema?dataSpace='+ms_ran_dataSpace+'&topic='+ms_ran_topic);
            Query_Data_Catalog.add(MESSAGE_SCHEMA.timings.duration);
            const body = JSON.parse(MESSAGE_SCHEMA.body);
            try{
            const result = check(MESSAGE_SCHEMA, {
                'Successfully retrived message schema': (r) => MESSAGE_SCHEMA.status == 200,
                'Response should return message schema details ': (r) => body[0].messageDataTopic.messageBus.name == mb_s1_name,
            });
            if (!result) {
                console.error("Retrive message schema failed, status is " + MESSAGE_SCHEMA.status);
                console.error("Retrive message schema failed, body is " + MESSAGE_SCHEMA.body)
            }
            }catch(error){
                console.error("Retrive message schema failed, status is " + MESSAGE_SCHEMA.status);
                console.error("Retrive message schema failed, body is " + MESSAGE_SCHEMA.body)
            }
        }); 
    }); 
}
import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {mb_s1_name,Namespace}
    from '../modules/setup_constant.js';
import {DC_GAS_URL,DC_EIC_URL,kafkaServer} 
    from '../modules/endpoints.js';
    import {bootstrap_external} 
    from '../modules/common_variable.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function(access_token) {
        /*This use case validates retrieval of message bus details via external endpoint from data catalog.These message details are registered
        in the setup*/
        group('Query messagebus Details for external from data catalog ', function() {
            group('Query messagebus Details from data catalog ', function() {
                const head = {
                   headers: {
                    Authorization: `Bearer ${access_token}`,
                   }
              };
              let QUERY_MESSAGE_BUS;
              if (__ENV.GATEWAY == 'SEF'){
                QUERY_MESSAGE_BUS = http.get(DC_EIC_URL + '/catalog/v1/message-bus/?nameSpace='+Namespace+'&name='+mb_s1_name, head);
               }
              else if (__ENV.GATEWAY == 'APIGW'){
                QUERY_MESSAGE_BUS = http.get(DC_GAS_URL + '/catalog/v1/message-bus/?nameSpace='+Namespace+'&name='+mb_s1_name, head);
               }
               Query_Data_Catalog.add(QUERY_MESSAGE_BUS.timings.duration);
               try{
               const body = JSON.parse(QUERY_MESSAGE_BUS.body);
               const result = check(QUERY_MESSAGE_BUS, {
                   'Successfully Retrieve Message bus details': (r) => QUERY_MESSAGE_BUS.status === 200,
                   'Response should return Message bus details for external': (r) => body[0].accessEndpoints[0]==bootstrap_external || kafkaServer,
               });
               if (!result) {
                   console.error("Message bus status verification failed for external in "+__ENV.GATEWAY+", status is " + QUERY_MESSAGE_BUS.status);
                   console.error("Message bus body verification failed for external in "+__ENV.GATEWAY+", body is " + QUERY_MESSAGE_BUS.body);
               }
           }catch(error){
                  console.error("Message bus status verification failed for external in "+__ENV.GATEWAY+", status is " + QUERY_MESSAGE_BUS.status);
                  console.error("Message bus body verification failed for external in "+__ENV.GATEWAY+", body is " + QUERY_MESSAGE_BUS.body);
           }
           });
    });
}
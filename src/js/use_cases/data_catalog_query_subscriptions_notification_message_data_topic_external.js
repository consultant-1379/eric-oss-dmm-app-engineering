import http from 'k6/http';
import { check,group} from 'k6';
import { Trend} from 'k6/metrics';
import {DC_GAS_URL,DC_EIC_URL} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
import { subscription } from '../modules/dcc_constant.js';
export default function(rappid,access_token) {
       /*This use case validates retrieval of notification topic details for subscription from data catalog via external endpoint.These details are registered
        in the setup*/
        group('Query notification topic Details for subscription from data catalog for external ', function() {
         group('Query notification topic Details for subscription from data catalog ', function() {
            const head = {
                 headers: {
                  Authorization: `Bearer ${access_token}`
                 }
            };
            let NOTIFICATION_TOPIC_SUBSCRIPTION;
            if (__ENV.GATEWAY == 'SEF'){
               NOTIFICATION_TOPIC_SUBSCRIPTION = http.get(DC_EIC_URL +'/catalog/v1/subscription-notification-topic?rAppId='+rappid ,head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){
                NOTIFICATION_TOPIC_SUBSCRIPTION = http.get(DC_GAS_URL +'/catalog/v1/subscription-notification-topic?rAppId='+rappid ,head);
             }
              Query_Data_Catalog.add(NOTIFICATION_TOPIC_SUBSCRIPTION.timings.duration); 
              try{           
              const result = check(NOTIFICATION_TOPIC_SUBSCRIPTION, {
                            'Successfully notification topic details': (r) => NOTIFICATION_TOPIC_SUBSCRIPTION.status === 200,
                            'Response should return notification topic details': (r) => NOTIFICATION_TOPIC_SUBSCRIPTION.json().subscriptions[0].name==subscription,
 
      });
     if (!result) {
         console.error("notification topic status verification failed in "+__ENV.GATEWAY+", status is " + NOTIFICATION_TOPIC_SUBSCRIPTION.status);
         console.error("notification topic response verification failed in "+__ENV.GATEWAY+", response is " + NOTIFICATION_TOPIC_SUBSCRIPTION.body);
      }
    }catch(error){
       console.error("notification topic status verification failed in "+__ENV.GATEWAY+", status is " + NOTIFICATION_TOPIC_SUBSCRIPTION.status);
       console.error("notification topic response verification failed in "+__ENV.GATEWAY+", response is " + NOTIFICATION_TOPIC_SUBSCRIPTION.body);
    }
       
    });
});
      /*This use case validates retrieval of message data topic details for subscription from data catalog via external endpoint.These details are registered
        in the setup*/
        group('Query messagedata topic Details for subscription from data catalog for external ', function() {
     group('Query messagedata topic Details for subscription from data catalog ', function() {
         const head = {
                headers: {
                  Authorization: `Bearer ${access_token}`
                }
           };
           let MESSAGEDATA_TOPIC_SUBSCRIPTION;
           if (__ENV.GATEWAY == 'SEF'){
             MESSAGEDATA_TOPIC_SUBSCRIPTION = http.get(DC_EIC_URL +'/catalog/v1/subscription-message-data-topic?rAppId='+rappid, head);
           }
            else if (__ENV.GATEWAY == 'APIGW'){
              MESSAGEDATA_TOPIC_SUBSCRIPTION = http.get(DC_GAS_URL +'/catalog/v1/subscription-message-data-topic?rAppId='+rappid, head);
             }
             Query_Data_Catalog.add(MESSAGEDATA_TOPIC_SUBSCRIPTION.timings.duration);
             try{ 
             const result = check(MESSAGEDATA_TOPIC_SUBSCRIPTION, {
                           'Successfully messagedata topic details': (r) =>MESSAGEDATA_TOPIC_SUBSCRIPTION.status === 200,
                           'Response should return messagedata topic details': (r) =>MESSAGEDATA_TOPIC_SUBSCRIPTION.json().subscriptions[0].name==subscription,
            });
                if (!result) {
                    console.error("messagedata topic status verification failed in "+__ENV.GATEWAY+", status is " +MESSAGEDATA_TOPIC_SUBSCRIPTION.status);
                    console.error("messagedata topic response verification failed in "+__ENV.GATEWAY+", response is " +MESSAGEDATA_TOPIC_SUBSCRIPTION.body);
                 }
               }catch(error){
                  console.error("messagedata topic status verification failed in "+__ENV.GATEWAY+", status is " +MESSAGEDATA_TOPIC_SUBSCRIPTION.status);
                  console.error("messagedata topic response verification failed in "+__ENV.GATEWAY+", response is " +MESSAGEDATA_TOPIC_SUBSCRIPTION.body);
               }
                  
             });
            });
}

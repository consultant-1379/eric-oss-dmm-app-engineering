import http from 'k6/http';
import { check,group} from 'k6';
import { Trend} from 'k6/metrics';
import {DC_GAS_URL,DC_EIC_URL}
        from '../modules/endpoints.js';
import {ms_ran_dataServiceInstanceName,ms_ran_dataServiceName } 
        from '../modules/setup_constant.js';
        import { Query_Data_Catalog } from '../modules/custom_metric.js';
import { subscription } from '../modules/dcc_constant.js';
export default function(access_token) {
        /*This use case validates retrieval of subscription details from data catalog via external endpoint.These details are registered
        in the setup*/
         group('Retrive subscription details from data catalog for external ', function() {
       group('Query details for subscription from data catalog for external ', function() {
                 const head = {
                headers: {
                        Authorization: `Bearer ${access_token}`,
                }
           };
           let RETRIVE_SUBSCRIPTION;
           if (__ENV.GATEWAY == 'SEF'){
             RETRIVE_SUBSCRIPTION = http.get(DC_EIC_URL +'/catalog/v1/subscriptions?subscriptionName='+subscription+'&serviceName='+ms_ran_dataServiceName+'&serviceInstanceName='+ms_ran_dataServiceInstanceName, head);
           }
           else if (__ENV.GATEWAY == 'APIGW'){
              RETRIVE_SUBSCRIPTION = http.get(DC_GAS_URL +'/catalog/v1/subscriptions?subscriptionName='+subscription+'&serviceName='+ms_ran_dataServiceName+'&serviceInstanceName='+ms_ran_dataServiceInstanceName, head);
           }
            Query_Data_Catalog.add(RETRIVE_SUBSCRIPTION.timings.duration);
            try{
            const body = JSON.parse(RETRIVE_SUBSCRIPTION.body);
            const result = check(RETRIVE_SUBSCRIPTION, {
                          'Successfully retrive subscription details': (r) => RETRIVE_SUBSCRIPTION.status === 200,
                          'Response should retrive subscription topic details': (r) => body[0].status=='Active',
            });
            if (!result) {
            console.error("retrive subscription status verification failed in "+__ENV.GATEWAY+", status is " + RETRIVE_SUBSCRIPTION.status);
            console.error("retrive subscription body verification failed in "+__ENV.GATEWAY+", body is " + RETRIVE_SUBSCRIPTION.body);
            }
        }catch(error){
                console.error("retrive subscription status verification failed in "+__ENV.GATEWAY+", status is " + RETRIVE_SUBSCRIPTION.status);
                console.error("retrive subscription body verification failed in "+__ENV.GATEWAY+", body is " + RETRIVE_SUBSCRIPTION.body);
        }
        });
});
    }

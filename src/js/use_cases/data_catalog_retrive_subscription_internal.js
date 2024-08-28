import http from 'k6/http';
import { check,group} from 'k6';
import { Trend} from 'k6/metrics';
import {CATALOG_V1_BASE}
        from '../modules/endpoints.js';
import {ms_ran_dataServiceInstanceName,ms_ran_dataServiceName } 
        from '../modules/setup_constant.js';
        import { Query_Data_Catalog } from '../modules/custom_metric.js';
import { subscription } from '../modules/dcc_constant.js';
export default function() {
        /*This use case validates retrieval of subscription details from data catalog.These details are registered
        in the setup*/
        group('Retrive subscription details from data catalog for internal ', function() {
        group('Query details for subscription from data catalog for internal ', function() {
            const RETRIVE_SUBSCRIPTION = http.get(CATALOG_V1_BASE +'subscriptions?subscriptionName='+subscription+'&serviceName='+ms_ran_dataServiceName+'&serviceInstanceName='+ms_ran_dataServiceInstanceName);
            Query_Data_Catalog.add(RETRIVE_SUBSCRIPTION.timings.duration);
            const body = JSON.parse(RETRIVE_SUBSCRIPTION.body);
            try{
            const result = check(RETRIVE_SUBSCRIPTION, {
                          'Successfully retrive subscription details': (r) => RETRIVE_SUBSCRIPTION.status === 200,
                          'Response should retrive subscription topic details': (r) => body[0].status=='Active',
            });
            if (!result) {
            console.error("retrive subscription status verification failed , status is " + RETRIVE_SUBSCRIPTION.status);
            console.error("retrive subscription body verification failed , status is " + RETRIVE_SUBSCRIPTION.body);
            }
        }catch(error){
                console.error("retrive subscription status verification failed , status is " + RETRIVE_SUBSCRIPTION.status);
                console.error("retrive subscription body verification failed , status is " + RETRIVE_SUBSCRIPTION.body);
        }
        });
});
    }

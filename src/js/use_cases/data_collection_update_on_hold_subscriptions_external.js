import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { getUniqueRandomInt, getCurrentDateTime} from "../modules/common_function.js"
import {DCC_GAS_URL, DCC_EIC_URL} 
    from '../modules/endpoints.js';
	import {ms_ran_dataSpace, ms_dataCategory, ms_ran_dataProviderName, ms_ran_schemaName,
         ms_ran_schemaVersion,  ms_ran_topic, prefix}
    from '../modules/setup_constant.js';
import { subscription } from '../modules/dcc_constant.js';


export default function(access_token,predicateParameterName) {
    let rappid = prefix+getUniqueRandomInt(__VU)+getCurrentDateTime();
    /*This use case creates an onhold subscription, validates updating it with 100 preciate item values via external endpoint*/
    group('Create & Update on hold Subscription with 100 predicate item values for Data collection controller', function() {
        if (__ENV.MYVAR == 'DCC'){
        //Subscription start
        group('Create an ON-HOLD Subscription', function() {
            const data = {
                "version": "1.0",
                "subscriptions": [
                    {
                        "name": subscription,
                        "isMandatory": "yes",
                        "isOnHold": "yes",
                        "isTagged": "no",
                        "consumer": "EBCCCC",
                        "dataType": {
                                   "dataspace": ms_ran_dataSpace,
                                   "dataCategory": ms_dataCategory,
                                   "dataProvider": ms_ran_dataProviderName,
                                   "schemaName": ms_ran_schemaName,
                                   "schemaVersion": ms_ran_schemaVersion
                                },
                        "predicates": 
                            {
                                [predicateParameterName]: ["NR100gNOdeBRadio00001"]
                            }
                    }
                ]
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            }

            let CREATE_SUBSCRIPTION;
            if (__ENV.GATEWAY == 'SEF'){              
                 CREATE_SUBSCRIPTION = http.put(DCC_EIC_URL + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
                 CREATE_SUBSCRIPTION = http.put(DCC_GAS_URL + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
            }
            const result = check(CREATE_SUBSCRIPTION, {
                'Successfully verified creation of subscription' : (r) => CREATE_SUBSCRIPTION.status === 200,
            });
            
            if (!result) {
                console.error("Subscription creation status verification failed in "+__ENV.GATEWAY+", status is "+CREATE_SUBSCRIPTION.status);
                
            }
        });
        
        //Update subscription with 100 predicate param values
        group('Update ON-HOLD Subscription with 100 predicate item values', function() {
                        
            const data =   {
                [predicateParameterName]: 
                                [ 'value-1',  'value-2',  'value-3',  'value-4',  'value-5',
                                'value-6',  'value-7',  'value-8',  'value-9',  'value-10',
                                'value-11', 'value-12', 'value-13', 'value-14', 'value-15',
                                'value-16', 'value-17', 'value-18', 'value-19', 'value-20',
                                'value-21', 'value-22', 'value-23', 'value-24', 'value-25',
                                'value-26', 'value-27', 'value-28', 'value-29', 'value-30',
                                'value-31', 'value-32', 'value-33', 'value-34', 'value-35',
                                'value-36', 'value-37', 'value-38', 'value-39', 'value-40',
                                'value-41', 'value-42', 'value-43', 'value-44', 'value-45',
                                'value-46', 'value-47', 'value-48', 'value-49', 'value-50',
                                'value-51', 'value-52', 'value-53', 'value-54', 'value-55',
                                'value-56', 'value-57', 'value-58', 'value-59', 'value-60',
                                'value-61', 'value-62', 'value-63', 'value-64', 'value-65',
                                'value-66', 'value-67', 'value-68', 'value-69', 'value-70',
                                'value-71', 'value-72', 'value-73', 'value-74', 'value-75',
                                'value-76', 'value-77', 'value-78', 'value-79', 'value-80',
                                'value-81', 'value-82', 'value-83', 'value-84', 'value-85',
                                'value-86', 'value-87', 'value-88', 'value-89', 'value-90',
                                'value-91', 'value-92', 'value-93', 'value-94', 'value-95',
                                'value-96', 'value-97', 'value-98', 'value-99', 'value-100']
                        }
                        const head = {
                            headers: {
                                accept: "application/json, text/plain, */*",
                                "content-type": "application/json",
                                Authorization: `Bearer ${access_token}`,
                            }
                        }
            let UPDATE_SUBSCRIPTION;
            if (__ENV.GATEWAY == 'SEF'){   
            UPDATE_SUBSCRIPTION = http.patch(DCC_EIC_URL + "/subscription/v1/"+ rappid +"/"+subscription+"/predicates", JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){   
            UPDATE_SUBSCRIPTION = http.patch(DCC_GAS_URL + "/subscription/v1/"+ rappid +"/"+subscription+"/predicates", JSON.stringify(data), head);
            }
            console.log("========"+DCC_GAS_URL + "/subscription/v1/"+ rappid +"/"+subscription+"/predicates"+"======")
            try{
            const result = check(UPDATE_SUBSCRIPTION, {
                'Successfully verified updating the subscription for 100 predicate values' : (r) => UPDATE_SUBSCRIPTION.status === 200,
            });

            if (!result) {
                console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+" for 100 predicate values, status is "+UPDATE_SUBSCRIPTION.status);
                
            }
        }catch(error){
            console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+" for 100 predicate values, status is "+UPDATE_SUBSCRIPTION.status);
                
        }
        });
    }
})
}
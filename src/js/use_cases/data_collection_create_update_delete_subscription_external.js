import http from 'k6/http';
import {
    check,
    group, sleep
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { getUniqueRandomInt,getCurrentDateTime } from "../modules/common_function.js"
import {DCC_GAS_URL, DCC_EIC_URL} 
    from '../modules/endpoints.js';
import {ms_dataSpace, ms_ran_dataSpace, ms_ran_schemaName, ms_ran_schemaVersion,
     ms_ran_dataProviderName,ms_dataCategory, prefix, ms_ran_topic}
    from '../modules/setup_constant.js';
import { Create_Subscription } from '../modules/custom_metric.js';
import { Update_Predicate } from '../modules/custom_metric.js';
import { Delete_Subscription } from '../modules/custom_metric.js';

export default function(access_token,predicateParameterName) {
    let rappid = prefix+getUniqueRandomInt(__VU)+getCurrentDateTime();
    let subscription_name=prefix+"-subscription"
    /*This use case validates creation, updation and deletion of subsription for message schema via external endpoint using DCC*/
    group('Create, update & delete subscription using Data collection controller & message schema', function() {
        if (__ENV.MYVAR == 'DCC'){
        //Subscription start
        group('Create an active Subscription', function() {
            const data = {
                "version": "1.0",
                "subscriptions": [
                    {
                        "name": subscription_name,
                        "isMandatory": "yes",
                        "isOnHold": "no",
                        "isTagged": "no",
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
            Create_Subscription.add(CREATE_SUBSCRIPTION.timings.duration);
            const result = check(CREATE_SUBSCRIPTION, {
                'Successfully verified creation of subscription' : (r) => CREATE_SUBSCRIPTION.status === 200,
            });
            
            if (!result) {
                console.error("Subscription creation status verification failed in "+__ENV.GATEWAY+", status is "+CREATE_SUBSCRIPTION.status);
                console.error("Subscription creation status verification failed in "+__ENV.GATEWAY+", body is "+CREATE_SUBSCRIPTION.body);
                
            }
            
        });
        
        //Update subscription
        group('Update predicate for active Subscription', function() {
                        
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
             UPDATE_SUBSCRIPTION = http.patch(DCC_EIC_URL + "/subscription/v1/"+ rappid +"/"+subscription_name+"/predicates", JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){
             UPDATE_SUBSCRIPTION = http.patch(DCC_GAS_URL + "/subscription/v1/"+ rappid +"/"+subscription_name+"/predicates", JSON.stringify(data), head);
            }
            Update_Predicate.add(UPDATE_SUBSCRIPTION.timings.duration);
            try{
            const result = check(UPDATE_SUBSCRIPTION, {
                'Successfully verified updating of subscription' : (r) => UPDATE_SUBSCRIPTION.status === 200,
            });
            if (!result) {
                console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+", status is "+UPDATE_SUBSCRIPTION.status);
                console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+", body is "+UPDATE_SUBSCRIPTION.body);
            }
        }catch(error){
            console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+", status is "+UPDATE_SUBSCRIPTION.status);
            console.error("Subscription updation status verification failed in "+__ENV.GATEWAY+", body is "+UPDATE_SUBSCRIPTION.body);
        }
        });
        group('Delete Subscription', function() {      
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            }              
            let DELETE_SUBSCRIPTION ;
            if (__ENV.GATEWAY == 'SEF'){              
             DELETE_SUBSCRIPTION = http.del(DCC_EIC_URL + "/subscription/v1/"+ rappid, null,  head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
             DELETE_SUBSCRIPTION = http.del(DCC_GAS_URL + "/subscription/v1/"+ rappid, null,  head);
            }
            Delete_Subscription.add(DELETE_SUBSCRIPTION.timings.duration);
            try{
            const result = check(DELETE_SUBSCRIPTION, {
                'Successfully verified deleting the subscription using Messge Schema' : (r) => DELETE_SUBSCRIPTION.status === 200,
                'Response should return registered schema details': (r) => DELETE_SUBSCRIPTION.body.includes("Subscription deactivated successfully and access has been revoked on the associated message bus topics"),
            });
            if (!result) {
                console.error("Subscription deletion status verification using Message Schema failed in "+__ENV.GATEWAY+", status is "+DELETE_SUBSCRIPTION.status);
                console.error("Subscription deletion status verification using Message Schema failed in "+__ENV.GATEWAY+", body is "+DELETE_SUBSCRIPTION.body);
            }
        }catch(error){
            console.error("Subscription deletion status verification using Message Schema failed in "+__ENV.GATEWAY+", status is "+DELETE_SUBSCRIPTION.status);
            console.error("Subscription deletion status verification using Message Schema failed in "+__ENV.GATEWAY+", body is "+DELETE_SUBSCRIPTION.body);
        }
            
        });
    }
    });
}
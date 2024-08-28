import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { getUniqueRandomInt } from "../modules/common_function.js"
import {DCC_GAS_URL,DCC_EIC_URL} 
    from '../modules/endpoints.js';
	import {ms_ran_dataSpace, ms_dataCategory, ms_ran_dataProviderName, ms_ran_schemaName,
		ms_ran_schemaVersion, ms_ran_topic}
    from '../modules/setup_constant.js';
import { Create_Thirty_Subscription } from '../modules/custom_metric.js';
import { subscription } from '../modules/dcc_constant.js';



export default function(access_token,predicateParameterName) {
	let rappid = getUniqueRandomInt(__VU)
/*This use case validates creation of thirty subscriptions using DCC via external endpoint.*/
    group('Create Thirty subscriptions using Data collection controller.', function() {
		if (__ENV.MYVAR == 'DCC'){
        //Create 30 Subscriptions
        group('Create Thirty Subscription using one IDS ', function() {
            const data = {
                "version": "1.0",
            "subscriptions": [{
		"name": subscription+"-1",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-2",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-3",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-4",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-5",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-6",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-7",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-8",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-9",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-10",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-11",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-12",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-13",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-14",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-15",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-16",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-17",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-18",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-19",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-20",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-21",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-22",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-23",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-24",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-25",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-26",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-27",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-28",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-29",
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
		"predicates": {
			[predicateParameterName]: ["NR100gNOdeBRadio00001"]
		}
	},
	{
		"name": subscription+"-30",
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
		"predicates": {
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
        
			let CREATE_THIRTY_SUBSCRIPTION;    
            if (__ENV.GATEWAY == 'SEF'){
             CREATE_THIRTY_SUBSCRIPTION = http.put(DCC_EIC_URL + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
			}
			else if (__ENV.GATEWAY == 'APIGW'){
			 CREATE_THIRTY_SUBSCRIPTION = http.put(DCC_GAS_URL + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
			}
            Create_Thirty_Subscription.add(CREATE_THIRTY_SUBSCRIPTION.timings.duration);
			try{
            const result = check(CREATE_THIRTY_SUBSCRIPTION, {
                'Successfully verified creation of 30 subscriptions using 1 IDS' : (r) => CREATE_THIRTY_SUBSCRIPTION.status === 200,
            });
            
            if (!result) {
                console.error("Creation of 30 Subscriptions using 1 IDS status verification failed in "+__ENV.GATEWAY+", status is "+CREATE_THIRTY_SUBSCRIPTION.status);
				console.error("Creation of 30 Subscriptions using 1 IDS body verification failed in "+__ENV.GATEWAY+", body is "+CREATE_THIRTY_SUBSCRIPTION.body);
                
            }
		}catch(error){
			console.error("Creation of 30 Subscriptions using 1 IDS status verification failed in "+__ENV.GATEWAY+", status is "+CREATE_THIRTY_SUBSCRIPTION.status);
			console.error("Creation of 30 Subscriptions using 1 IDS body verification failed in "+__ENV.GATEWAY+", body is "+CREATE_THIRTY_SUBSCRIPTION.body);
		}
        });
		}
    });
}
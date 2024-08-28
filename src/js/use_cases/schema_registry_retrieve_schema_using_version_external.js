import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { Counter } from 'k6/metrics';
import { SR_BASE, SR_GAS_URL,SR_EIC_URL} 
    from '../modules/endpoints.js';
import { subject } 
    from '../modules/schema_registry_constant.js';

import { getSchemaVersion } from '../modules/custom_metric.js';

let version;

export default function(access_token) {
 /*This use case validates retrieving schema using version from schema registry via external endpoint*/   
 group('Retrieve schema from schema registry using version via external endpoint', function() {
    
    group('It shall be possible to get the schema using version from schema registry', function() {
    
    if(__ITER == 0 || __ITER == 1){
    const Response = http.get(SR_BASE + '/schemas');
    const body = JSON.parse(Response.body);
    version = body[0].version;
    console.log("Version got is "+version);
    }
    //version = __ITER+1;
    const head = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
           };
    let Response;
    if (__ENV.GATEWAY == 'SEF'){
     Response = http.get(SR_EIC_URL +'/view/subjects/'+subject+'/versions/'+version, head);
    }
    else if (__ENV.GATEWAY == 'APIGW'){
     Response = http.get(SR_GAS_URL +'/view/subjects/'+subject+'/versions/'+version, head);
    }
    getSchemaVersion.add(Response.timings.duration);
    
    try{
    const result = check(Response, {
        'Successfully verified getting the schema string identified by version': (r) => Response.status === 200,
        'Response should return details of schema string identified by version': (r) => Response.body.includes(subject),
    });
    if (!result) {
        console.error("Get the schema string identified by version failed in "+__ENV.GATEWAY+", status is "+Response.status)
        console.error("Get the schema string identified by version failed in "+__ENV.GATEWAY+", body is "+Response.body)
      }
    }catch(error){
        console.error("Get the schema string identified by version failed in "+__ENV.GATEWAY+", status is "+Response.status)
        console.error("Get the schema string identified by version failed in "+__ENV.GATEWAY+", body is "+Response.body)
    }
      
      
})
})
}
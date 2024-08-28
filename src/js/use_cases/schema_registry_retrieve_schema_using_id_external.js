import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { Counter } from 'k6/metrics';
import { SR_BASE, SR_GAS_URL,SR_EIC_URL} 
    from '../modules/endpoints.js';

import { getSchemaID } from '../modules/custom_metric.js';

let schemaId;

export default function(access_token) {
    /*This use case validates retrieving schema using ID from schema registry via external endpoint*/
    group('Retrieve schema from schema registry using ID via external endpoint', function() {
        group('It shall be possible to get the schema using ID from schema registry', function() {
        
        if(__ITER == 0 || __ITER == 1){
        const Response = http.get(SR_BASE + '/schemas');
        //console.log("Body is "+Response.body);
        const body = JSON.parse(Response.body);
        schemaId = body[0].id;
        console.log("ID got is "+schemaId);
        }
        const head = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
       };
       let Response;
       if (__ENV.GATEWAY == 'SEF'){
         Response = http.get(SR_EIC_URL +'/view/schemas/ids/'+schemaId, head);
       }
       else if (__ENV.GATEWAY == 'APIGW'){
         Response = http.get(SR_GAS_URL +'/view/schemas/ids/'+schemaId, head);
       }
        getSchemaID.add(Response.timings.duration);
        try{
        const result = check(Response, {
            'Successfully verified getting the schema string identified by the input ID': (r) => Response.status === 200,
        });
        if (!result) {
            console.error("Get the schema string identified by the input ID failed in "+__ENV.GATEWAY+", status is "+Response.status)
            console.error("Get the schema string identified by the input ID failed in "+__ENV.GATEWAY+", body is "+Response.body)
          }
        }catch(error){
            console.error("Get the schema string identified by the input ID failed in "+__ENV.GATEWAY+", status is "+Response.status)
            console.error("Get the schema string identified by the input ID failed in "+__ENV.GATEWAY+", body is "+Response.body)
        }
          
          
    })
})

}
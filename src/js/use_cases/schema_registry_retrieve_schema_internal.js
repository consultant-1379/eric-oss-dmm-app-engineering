import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { Counter } from 'k6/metrics';
import { subject } from '../modules/schema_registry_constant.js';
import { SR_BASE} 
    from '../modules/endpoints.js';
import { getSchemaVersion } from '../modules/custom_metric.js';
const BASE = 'http://eric-schema-registry-sr:8081';


export default function() {
    /*This use case validates retrieving schema using version from schema registry*/
    group('Retrieve schema from schema registry', function() {
        let version = __ITER+1;
        const maxRetries = 5;
        //let version = 1;
        group('It shall be possible to get the schema from schema registry', function() {
        //for(let version=1;version<501;version++){
        let Response = http.get(SR_BASE +"/subjects/"+subject+"/versions/"+version);
        getSchemaVersion.add(Response.timings.duration);
        if(Response.status!=200){
            console.log("Response status received is "+Response.status);
            for(let j= 1; j <= maxRetries; j++){
                console.log("Retry num "+j)
                Response = http.get(SR_BASE +"/subjects/"+subject+"/versions/"+version);
                console.log("New response status received is "+Response.status);
                if(Response.status==200)
                {
                getSchemaVersion.add(Response.timings.duration);
                break;
                }
            }
        }
        try{
        const result = check(Response, {
            'Successfully verified getting the schema string identified by the input ID': (r) => Response.status === 200,
            'Response should return details of schema string identified by the input ID': (r) => Response.json().subject==subject,
        });
        if (!result) {
            console.error("Get the schema string identified by the input ID failed, status is "+Response.status)
            console.error("Get the schema string identified by the input ID failed, body is "+Response.body)
          }
        }catch(error){
            console.error("Get the schema string identified by the input ID failed, status is "+Response.status)
            console.error("Get the schema string identified by the input ID failed, body is "+Response.body)
        }
    })
})
}
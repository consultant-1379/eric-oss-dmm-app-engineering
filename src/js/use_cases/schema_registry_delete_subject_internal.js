import http from 'k6/http';
import {
    group,check
} from 'k6';

import { SR_BASE} 
    from '../modules/endpoints.js';
import { subject_to_delete } from '../modules/schema_registry_constant.js';

export default function() {
        /*This use case validates deleting a subject from schema registry*/
        group('Delete subject from schema registry', function() {
            const maxRetries = 5;
            console.log("delete subject in schema registry")
            let Response = http.del(SR_BASE +"/subjects/"+subject_to_delete, null);
            console.log("Response body is "+Response.body)
            console.log("Response status is "+Response.status)
            if(Response.status!=200){
                console.log("Response status received is "+Response.status);
                for(let j= 1; j <= maxRetries; j++){
                    console.log("Retry num "+j)
                    Response = http.del(SR_BASE +"/subjects/"+subject_to_delete, null);
                    console.log("New response status received is "+Response.status);
                    if(Response.status==200)
                    {
                    break;
                    }
                   
                }
            }
            try{
            const result = check(Response, {
                'Successfully soft deleted subject from Schema Registry': (r) => Response.status === 200,
            });
            if (!result) {
                console.error("Schema registry subject Soft-deleted failed, status is "+Response.status)
              }
            }catch(error){
                console.error("Schema registry subject Soft-deleted failed, status is "+Response.status)
            }

            console.log("Schema registry subject Soft-deleted successfully , status is  :" +Response.status);
              
            const Response2 = http.del(SR_BASE +"/subjects/"+subject_to_delete+"?permanent=true", null);
            console.log("Response2 body is "+Response2.body)
            console.log("Response2 status is "+Response2.status)
            
            try{
            const result2 = check(Response2, {
                'Permanently deleted subject from Schema Registry': (r) => Response2.status === 200,
            });
            if (!result2) {
                console.error("Schema registry subject Permanent deletion failed, status is "+Response2.status)
              }
            }catch(error){
                console.error("Schema registry subject Permanent deletion failed, status is "+Response2.status)
            }
            console.log("Schema registry subject permanently deleted successfully , status is  :" +Response2.status);
})
}







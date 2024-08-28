import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {DCC_GAS_URL, DCC_EIC_URL} 
    from '../modules/endpoints.js';


export default function(access_token) {
    
    /*This use case retrieves data job for the given consumer via external endpoint*/
    group('Retrieve multiple data jobs', function() {
        if (__ENV.MYVAR == 'DCC'){
        
        group('Retrieve data jobs for the given consumer', function() {
            
            const head = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }

            let response_datajob;
            if (__ENV.GATEWAY == 'SEF'){              
                response_datajob = http.get(DCC_EIC_URL + "/data-access/<api-version>/<consumer-id>/dataJobs", JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
                response_datajob = http.get(DCC_GAS_URL + "/data-access/<api-version>/<consumer-id>/dataJobs", JSON.stringify(data), head);
            }
            const result = check(response_datajob, {
                'Successfully retrieved data job' : (r) => response_datajob.status === 200,
                'Response should return expected details' : (r) => response_datajob.body.includes("")
            }, {legacy: "false"});
            
            if (!result) {
                console.error("Data job retrieval failed in "+__ENV.GATEWAY+", status is "+response_datajob.status);
                console.error("Data job retrieval failed in "+__ENV.GATEWAY+", body is "+response_datajob.body);
            }
        });
        
       
    }
})
}
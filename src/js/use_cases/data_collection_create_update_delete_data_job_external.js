import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {DCC_GAS_URL, DCC_EIC_URL} 
    from '../modules/endpoints.js';


export default function(access_token) {
    
    /*This use case creates data job for the given consumer via external endpoint*/
    group('Create data job', function() {
        if (__ENV.MYVAR == 'DCC'){
        
        group('Create data job for the given consumer', function() {
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            }

            let response_datajob;
            if (__ENV.GATEWAY == 'SEF'){              
                response_datajob = http.post("ACMR mock URL", JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
                response_datajob = http.post("ACMR mock URL", JSON.stringify(data), head);
            }
            const result = check(response_datajob, {
                'Successfully created data job' : (r) => response_datajob.status === 200,
                'Response should return expected details' : (r) => response_datajob.body.includes("")
            }, {legacy: "false"});
            
            if (!result) {
                console.error("Data job creation failed in "+__ENV.GATEWAY+", status is "+response_datajob.status);
                console.error("Data job creation failed in "+__ENV.GATEWAY+", body is "+response_datajob.body);
            }
        });
        
       
    }
})

    /*This use case retrieves data job for the given consumer via external endpoint*/
    group('Update data job', function() {
        if (__ENV.MYVAR == 'DCC'){
        
        group('Update data job for the given consumer', function() {
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            }

            let response_datajob;
            if (__ENV.GATEWAY == 'SEF'){              
                response_datajob = http.put(DCC_EIC_URL + "/data-access/<api-version>/<consumer-id>/dataJobs/<data-job-id>", JSON.stringify(data), head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
                response_datajob = http.put(DCC_GAS_URL + "/data-access/<api-version>/<consumer-id>/dataJobs/<data-job-id>", JSON.stringify(data), head);
            }
            const result = check(response_datajob, {
                'Successfully updated data job' : (r) => response_datajob.status === 200,
                'Response should return expected details' : (r) => response_datajob.body.includes("")
            }, {legacy: "false"});
            
            if (!result) {
                console.error("Data job updation failed in "+__ENV.GATEWAY+", status is "+response_datajob.status);
                console.error("Data job updation failed in "+__ENV.GATEWAY+", body is "+response_datajob.body);
            }
        });
        
    }   
    })

    /*This use case deletes data job for the given consumer via external endpoint*/
    group('Delete data job', function() {
        if (__ENV.MYVAR == 'DCC'){
        
        group('Delete data job for the given consumer', function() {
            
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                }
            }

            let response_datajob;
            if (__ENV.GATEWAY == 'SEF'){              
                response_datajob = http.del("ACMR mock URL", JSON.stringify(data), null, head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){              
                response_datajob = http.del("ACMR mock URL", JSON.stringify(data), null, head);
            }
            const result = check(response_datajob, {
                'Successfully deleted data job' : (r) => response_datajob.status === 200,
                'Response should return expected details' : (r) => response_datajob.body.includes("")
            }, {legacy: "false"});
            
            if (!result) {
                console.error("Data job deletion failed in "+__ENV.GATEWAY+", status is "+response_datajob.status);
                console.error("Data job deletion failed in "+__ENV.GATEWAY+", body is "+response_datajob.body);
            }
        });
        
    }   
    })
}
import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {DC_GAS_URL,DC_EIC_URL}
    from '../modules/endpoints.js';
import {name,namespace,version} from '../modules/data_catalog_constant.js';
import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function(access_token) {
    /*This use case validates retriveal of Datatype details external from data catalog as per r1standard.These details are registered
    in the setup*/
    group('Query Datatype r1standard Details from data catalog external', function() {
        group('Query Datatype r1standard Details from data catalog external', function() {
            const head = {
                headers: {
                        Authorization: `Bearer ${access_token}`,
                }
           };
           let RETRIVE_DATATYPE;
           if (__ENV.GATEWAY == 'SEF'){
            RETRIVE_DATATYPE = http.get(DC_EIC_URL +'/datadiscovery/v1/datatypes?name='+name+'&nameSpace='+namespace+'&version='+version, head);
           }
           else if (__ENV.GATEWAY == 'APIGW'){
            RETRIVE_DATATYPE = http.get(DC_GAS_URL +'/datadiscovery/v1/datatypes?name='+name+'&nameSpace='+namespace+'&version='+version, head);
           }
        Query_Data_Catalog.add(RETRIVE_DATATYPE.timings.duration);
        //const body = JSON.parse(RETRIVE_DATATYPE.body);
        try{
        const result = check(RETRIVE_DATATYPE, {
            'Successfully Retrieve Datatype r1standard details external': (r) => RETRIVE_DATATYPE.status === 200,
            'Response should return Datatype r1standard details external': (r) => RETRIVE_DATATYPE.body,
        },{legacy: "false"});
        if (!result) {
            console.error("Datatype r1standard status verification failed external in "+__ENV.GATEWAY+", status is " + RETRIVE_DATATYPE.status);
            console.error("Datatype r1standard status verification failed external in "+__ENV.GATEWAY+", body is " + RETRIVE_DATATYPE.body);
        }
        }catch(error){
            console.error("Datatype r1standard status verification failed external in "+__ENV.GATEWAY+", status is " + RETRIVE_DATATYPE.status);
            console.error("Datatype r1standard status verification failed external in "+__ENV.GATEWAY+", body is " + RETRIVE_DATATYPE.body);
        }
        });
    });
}

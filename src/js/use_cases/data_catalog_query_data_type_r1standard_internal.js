import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {DATACATALOG_V1_BASE} 
    from '../modules/endpoints.js';
    import {name,namespace,version} from '../modules/data_catalog_constant.js';
import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
    /*This use case validates retrieval of Datatype details from data catalog as per r1standard.These details are registered
    in the setup*/
    group('Query Datatype r1standard Details from data catalog internal ', function() {
        group('Query Datatype r1standard Details from data catalog internal ', function() {
        const DATA_TYPE = http.get(DATACATALOG_V1_BASE +'data-type?name='+name+'&nameSpace='+namespace+'&version='+version);
        Query_Data_Catalog.add(DATA_TYPE.timings.duration);
        const body = JSON.parse(DATA_TYPE.body);
        try{
        const result = check(DATA_TYPE, {
            'Successfully Retrieve Datatype r1standard details internal': (r) => DATA_TYPE.status === 200,
            'Response should return Datatype r1standard details': (r) => DATA_TYPE.body,
        },{legacy: "false"});
        if (!result) {
            console.error("Datatype r1standard status verification failed internal , status is " + DATA_TYPE.status);
            console.error("Datatype r1standard status verification failed internal, body is " + DATA_TYPE.body);
        }
        }catch(error){
            console.error("Datatype r1standard status verification failed internal, status is " + DATA_TYPE.status);
            console.error("Datatype r1standard status verification failed internal, body is " + DATA_TYPE.body);
        }
        });
    });
}

import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {Namespace,bdr_s1_name}
    from '../modules/setup_constant.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import {bdr_endpoint_name} 
    from '../modules/files_constant.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
        /*This use case validates retrieval of BDR details from data catalog.These BDR details are registered
        in the setup*/
        group('Query Bulk Data Repository from data catalog for internal', function(){
            group('Query BDR Details from data catalog ', function() {
                const BULK_DATA_REPOSITORY = http.get(CATALOG_V1_BASE + 'bulk-data-repository?nameSpace='+Namespace+'&name='+bdr_s1_name);
                Query_Data_Catalog.add(BULK_DATA_REPOSITORY.timings.duration);
                const body = JSON.parse(BULK_DATA_REPOSITORY.body);
                try{
                const result = check(BULK_DATA_REPOSITORY, {
                    'Successfully Retrieve bdr details': (r) => BULK_DATA_REPOSITORY.status === 200,
                    'Response should return bulk data repository details': (r) =>  body[0].accessEndpoints[0]==bdr_endpoint_name,
                });
                if (!result) {
                    console.error("Bulk data repository status verification failed for internal , status is " + BULK_DATA_REPOSITORY.status);
                    console.error("Bulk data repository body verification failed for internal , body is " + BULK_DATA_REPOSITORY.body);
                }
            }catch(error){
                console.error("Bulk data repository status verification failed for internal , status is " + BULK_DATA_REPOSITORY.status);
                console.error("Bulk data repository body verification failed for internal , body is " + BULK_DATA_REPOSITORY.body);
            }
            });
    });
}
import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {prefix}
    from '../modules/setup_constant.js';
import {DC_GAS_URL,DC_EIC_URL} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
import { external_bdr_name, external_bdr_namespace } from '../modules/data_catalog_constant.js';
export default function(access_token) {
        /*This use case validates retrieval of BDR details via external endpoint from data catalog.These BDR details are registered
        in the setup*/
        group('Query Bulk Data Repository from data catalog for external', function(){
       group('Query BDR Details from data catalog ', function() {
             const head = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
           };
           let BULK_DATA_REPOSITORY;
            if (__ENV.GATEWAY == 'SEF'){
             BULK_DATA_REPOSITORY = http.get(DC_EIC_URL + '/catalog/v1/bulk-data-repository/?nameSpace='+external_bdr_namespace+'&name='+external_bdr_name , head);
            }
            else if (__ENV.GATEWAY == 'APIGW'){
             BULK_DATA_REPOSITORY = http.get(DC_GAS_URL + '/catalog/v1/bulk-data-repository/?nameSpace='+external_bdr_namespace+'&name='+external_bdr_name , head);
            }
            Query_Data_Catalog.add(BULK_DATA_REPOSITORY.timings.duration);
            try{
            const body = JSON.parse(BULK_DATA_REPOSITORY.body);
            const result = check(BULK_DATA_REPOSITORY, {
                'Successfully Retrieve bdr details': (r) => BULK_DATA_REPOSITORY.status === 200,
                'Response should return bulk data repository details': (r) =>  body[0].accessEndpoints[0]==prefix+"-data-object-storage-mn.sunshine-harii:9000",
            });
            if (!result) {
                console.error("Bulk data repository status verification failed in "+__ENV.GATEWAY+", status is " + BULK_DATA_REPOSITORY.status);
                console.error("Bulk data repository body verification failed in "+__ENV.GATEWAY+", body is " + BULK_DATA_REPOSITORY.body);
            }
            }catch(error){
                console.error("Bulk data repository status verification failed in "+__ENV.GATEWAY+", status is " + BULK_DATA_REPOSITORY.status);
                console.error("Bulk data repository body verification failed in "+__ENV.GATEWAY+", body is " + BULK_DATA_REPOSITORY.body);
            }
        });
    });
}
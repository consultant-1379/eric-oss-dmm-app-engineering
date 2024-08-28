import http from 'k6/http';
import {
    check,
    sleep,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics'; 
import { scenario } from 'k6/execution';
import {CATALOG_V1_BASE,DC_GAS_URL} 
    from '../modules/endpoints.js';
import {Delete_Data_Catalog } from '../modules/custom_metric.js';
var BDR_ID;
export default function(bdr_id,access_token) {
    /*This use case validates deletion of BDR details from data catalog via external endpoint.First the BDR details are registered 
    into data catalog and the its deleted*/
     group('DELETE BULK DATA REPOSITORY ID', function() {
        group('Delete specific Bulk data repository Id Details', function() {
            const head = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
           };       
            const ID = scenario.iterationInTest
            const BULK_DATA_REPOSITORY = http.del(CATALOG_V1_BASE + 'bulk-data-repository/' + bdr_id[ID] ,null,head);
            Delete_Data_Catalog.add(BULK_DATA_REPOSITORY.timings.duration);
            try{
            const result3 = check(BULK_DATA_REPOSITORY, {
                'Successfully deleted bulk data repository': (r) => BULK_DATA_REPOSITORY.status == 204,
            });
            if (!result3) {
                console.error("Failed to delete bulk data repository , status is "+BULK_DATA_REPOSITORY.status);
            }
        }catch(error){
            console.error("Failed to delete bulk data repository , status is "+BULK_DATA_REPOSITORY.status);
        }

        });
    });

}

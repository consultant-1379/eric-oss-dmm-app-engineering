import http from 'k6/http';
import {
    check,
    sleep,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics'; 
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import { prefix } from '../modules/setup_constant.js';
import { getUniqueRandomString } from "../modules/common_function.js"
import { Post_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
    //post data-space
    /*This use case validates registration of BDR details into data catalog.*/
    group('Register bulk data repository into data catalog', function() {
        group('It shall be possible to register for the Bulk data repository', function() {
            const data = {
                "name": getUniqueRandomString(__VU),
                "clusterName":getUniqueRandomString(__VU),
                "nameSpace": getUniqueRandomString(__VU),
                "accessEndpoints": [prefix+"-data-object-storage-mn.sunshine-harii:9000"],
                "endPointType": "external"
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const BULK_DATA_REPOSITORY = http.post( CATALOG_V1_BASE + 'bulk-data-repository', JSON.stringify(data), head);
            Post_Data_Catalog.add(BULK_DATA_REPOSITORY.timings.duration);
            try{
            const result = check(BULK_DATA_REPOSITORY, {
                'Successfully created Bulk data repository': (r) => BULK_DATA_REPOSITORY.status === 201,
                'Response should return Bulk data repository details': (r) => BULK_DATA_REPOSITORY.json().accessEndpoints[0]==prefix+"-data-object-storage-mn.sunshine-harii:9000",
            });
            if (!result) {
                console.error("Failed to create bulk data repository , status is "+BULK_DATA_REPOSITORY.status);
                console.error("Failed to create bulk data repository, response is "+BULK_DATA_REPOSITORY.body);
            }
        }catch(error){
            console.error("Failed to create bulk data repository , status is "+BULK_DATA_REPOSITORY.status);
            console.error("Failed to create bulk data repository, response is "+BULK_DATA_REPOSITORY.body);
        }
        });

    });

}
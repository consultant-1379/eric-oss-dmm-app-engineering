import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {dataSpace}
    from '../modules/setup_constant.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
        /*This use case validates retrieval of data space details from data catalog.These details are registered
        in the setup*/
        group('Retrieve Data space name from data catalog ', function() {
         group('Retrieve data space from data catalog ', function() {
            const Retrieve_data_space = http.get(CATALOG_V1_BASE +'data-space?name='+dataSpace);
            Query_Data_Catalog.add(Retrieve_data_space.timings.duration);
            try{
            const result = check(Retrieve_data_space, {
                'Successfully Retrieve data space details': (r) => Retrieve_data_space.status === 200,
                'Response should return Retrieve data  details': (r) => Retrieve_data_space.json().name==dataSpace,
            });
            if (!result) {
                console.error("Retrieve data space status verification failed , status is " + Retrieve_data_space.status);
                console.error("Retrieve data space body verification failed , body is " + Retrieve_data_space.body);
            }
        }catch(error){
            console.error("Retrieve data space status verification failed , status is " + Retrieve_data_space.status);
            console.error("Retrieve data space body verification failed , body is " + Retrieve_data_space.body);
        }
        });
    });
}
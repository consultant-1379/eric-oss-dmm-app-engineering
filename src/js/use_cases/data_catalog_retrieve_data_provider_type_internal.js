import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {dataSpace,dataCategory}
    from '../modules/setup_constant.js';
import {CATALOG_V2_BASE} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
        /*This use case validates retrieval of data provider type details using data space from data catalog.These details are registered
        in the setup*/
        group('Retrieve Data space  for data provider type from data catalog ', function(){
         group('Retrieve data provider type from data catalog ', function() {
            const Retrieve_data_provider = http.get(CATALOG_V2_BASE +'data-provider-type?dataSpace='+dataSpace);
            Query_Data_Catalog.add(Retrieve_data_provider.timings.duration);
            const body = JSON.parse(Retrieve_data_provider.body);
            try{
            const result = check(Retrieve_data_provider, {
                'Successfully Retrieve data provider details': (r) => Retrieve_data_provider.status === 200,
                'Response should return Retrieve data provider type details': (r) => body[0].dataCategoryType.dataCategoryName==dataCategory,
            });
            if (!result) {
                console.error("Retrieve data provider status verification failed , status is " + Retrieve_data_provider.status);
                console.error("Retrieve data provider body verification failed , body is " + Retrieve_data_provider.body);
            }
        }catch(error){
            console.error("Retrieve data provider status verification failed , status is " + Retrieve_data_provider.status);
            console.error("Retrieve data provider body verification failed , body is " + Retrieve_data_provider.body);
        }

        });
    });
}
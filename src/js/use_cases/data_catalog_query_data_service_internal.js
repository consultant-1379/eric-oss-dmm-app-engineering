import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { dataServiceName,dataServiceInstanceName } from '../modules/setup_constant.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
        /*This use case validates retrieval of Data service details from data catalog.These details are registered
        in the setup*/
        group('Query Data service name for data service  from data catalog ', function(){
            group('Query Data service Details from data catalog ', function() {
                const DATA_SERVICE = http.get(CATALOG_V1_BASE +'data-service?dataServiceName='+dataServiceName);
                Query_Data_Catalog.add(DATA_SERVICE.timings.duration);
                try{
                const result = check(DATA_SERVICE, {
                    'Successfully Retrieve Data service details': (r) => DATA_SERVICE.status === 200,
                    'Response should return Data service details': (r) => DATA_SERVICE.json().dataServiceInstance[0].dataServiceInstanceName==dataServiceInstanceName,
                });
                if (!result) {
                    console.error("Data service status verification failed , status is " + DATA_SERVICE.status);
                    console.error("Data service body verification failed , body is " + DATA_SERVICE.body);
                }
            }catch(error){
                console.error("Data service status verification failed , status is " + DATA_SERVICE.status);
                console.error("Data service body verification failed , body is " + DATA_SERVICE.body);
            }
            });
    });
}
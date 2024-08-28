import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {dataServiceInstanceName,ms_schemaName}
    from '../modules/setup_constant.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
    import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
        /*This use case validates retrieval of Data service instance details from data catalog.These details are registered
        in the setup*/
        group('Query Data service instance name for data service instance from data catalog ', function(){
         group('Query Data service instance Details from data catalog ', function() {
            const DATA_SERVICE_INSTANCE = http.get(CATALOG_V1_BASE +'data-service-instance?dataServiceInstanceName='+dataServiceInstanceName);
            Query_Data_Catalog.add(DATA_SERVICE_INSTANCE.timings.duration);
            try{
            const body = JSON.parse(DATA_SERVICE_INSTANCE.body);
            const result = check(DATA_SERVICE_INSTANCE, {
                'Successfully Retrieve Data service instance details': (r) => DATA_SERVICE_INSTANCE.status === 200,
                'Response should return Data service instance details': (r) => body[0].consumedSchemaName == ms_schemaName,
            });
            if (!result) {
                console.error("Data service instance status verification failed , status is " + DATA_SERVICE_INSTANCE.status);
                console.error("Data service instance body verification failed , body is " + DATA_SERVICE_INSTANCE.body);
            }
        }catch(error){
            console.error("Data service instance status verification failed , status is " + DATA_SERVICE_INSTANCE.status);
            console.error("Data service instance body verification failed , body is " + DATA_SERVICE_INSTANCE.body);
        }
        });
    });
}
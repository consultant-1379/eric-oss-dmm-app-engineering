import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {DATACATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import {Delete_Data_Catalog } from '../modules/custom_metric.js';
import {streams_dataServiceInstanceName,streams_dataServiceName} from '../modules/data_catalog_constant.js';
export default function() {
    /*This use case validates deletion of Data service details from data catalog via internal endpoint.First the data service details are registered 
    into data catalog and the its deleted*/
     group('Delete data service r1standard', function() {
        group('Delete data service details r1standard', function() {       
            const DATA_SERVICE = http.del(DATACATALOG_V1_BASE + 'data-service?dataServiceName='+streams_dataServiceName+'&dataServiceInstanceName='+streams_dataServiceInstanceName, null);
            Delete_Data_Catalog.add(DATA_SERVICE.timings.duration);
            try{
            const result3 = check(DATA_SERVICE, {
                'Successfully deleted data service details': (r) => DATA_SERVICE.status == 204,
                'Response should return  deleted data service details': (r) =>DATA_SERVICE.body 
            },{legacy: "false"});
            if (!result3) {
                console.error("Failed to delete data service details , status is "+DATA_SERVICE.status);
                console.error("Failed to delete data service details , body is "+DATA_SERVICE.body);
            }
        }catch(error){
            console.error("Failed to delete data service details , status is "+DATA_SERVICE.status);
            console.error("Failed to delete data service details , body is "+DATA_SERVICE.body);
        }

        });
    });

}

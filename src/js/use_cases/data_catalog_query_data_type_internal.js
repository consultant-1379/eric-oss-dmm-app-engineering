import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import { mb_s1_name, ms_dataCategory, ms_ran_dataProviderName, ms_ran_dataServiceName, ms_ran_dataSpace, ms_ran_schemaName, ms_ran_schemaVersion } from '../modules/setup_constant.js';
import { Query_Data_Catalog } from '../modules/custom_metric.js';
export default function() {
    /*This use case validates retrieval of Datatype details from data catalog.These details are registered
    in the setup*/
    group('Query Datatype Details from data catalog ', function() {
        group('Query Datatype Details from data catalog ', function() {
        const DATA_TYPE = http.get(CATALOG_V1_BASE +'data-type?dataSpace='+ms_ran_dataSpace+
        '&dataCategory='+ms_dataCategory+'&dataProvider='+ms_ran_dataProviderName+'&schemaName='
        +ms_ran_schemaName+'&schemaVersion='+ms_ran_schemaVersion+
        '&serviceName='+ms_ran_dataServiceName+'&isExternal=true');
        Query_Data_Catalog.add(DATA_TYPE.timings.duration);
        const body = JSON.parse(DATA_TYPE.body);
        try{
        const result = check(DATA_TYPE, {
            'Successfully Retrieve Datatype details': (r) => DATA_TYPE.status === 200,
            'Response should return Datatype details': (r) => body[0].messageSchema.messageDataTopic.messageBus.name == mb_s1_name,
        });
        if (!result) {
            console.error("Datatype status verification failed , status is " + DATA_TYPE.status);
            console.error("Datatype status verification failed , body is " + DATA_TYPE.body);
        }
        }catch(error){
            console.error("Datatype status verification failed , status is " + DATA_TYPE.status);
            console.error("Datatype status verification failed , body is " + DATA_TYPE.body);
        }
        });
    });
}
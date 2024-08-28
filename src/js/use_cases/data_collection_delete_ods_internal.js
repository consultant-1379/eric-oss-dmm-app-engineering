import http from 'k6/http';
import {
    check,
    group
} from 'k6'; 
import {DCC_BASE} 
    from '../modules/endpoints.js';
export default function() {
    /*This use case validates deletion of ODS details from DCC.First the ODS details are registered 
    into data catalog and the its deleted*/
     group('DELETE ODS DETAILS', function() {
        group('Delete specific ODS registration Id Details', function() {
            const DELETE_ODS = http.del(DCC_BASE + '/datatypeprodcaps/{registrationId}/', null);
            try{
            const result = check(DELETE_ODS, {
                'Successfully deleted ODS details': (r) => DELETE_ODS.status == 204,
                'Response should return  deleted ODS registration Id details': (r) =>DATA_SERVICE.body
            },{legacy: "false"});
            if (!result) {
                console.error("Failed to delete ODS details , status is "+DELETE_ODS.status);
                console.error("Failed to delete ODS details , body is "+DELETE_ODS.body);
            }
        }catch(error){
            console.error("Failed to delete ODS details , status is "+DELETE_ODS.status);
            console.error("Failed to delete ODS details , body is "+DELETE_ODS.body);
        }

        });
    });

}

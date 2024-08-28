import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_service_account_delete } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a delete Service account for OSM */
group('Object storage access manager delete service account', function() {
    group('Delete Service account for OSM - Object storage access manager', function() {
            const OSM = http.del( OSM_BASE + '/v1/clients/'+osm_service_account_delete+'?clientType=service', null);
            try{
            const result = check(OSM, {
                'Successfully deleted OSM service account': (r) => OSM.status === 204,
            });
            if (!result) {
                console.error("Failed to delete OSM service account , status is "+OSM.status);
                console.error("Failed to delete OSM service account, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to delete OSM service account , status is "+OSM.status);
            console.error("Failed to delete OSM service account, response is "+OSM.body);
        }
    });
});
}
import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import {osm_clientid_delete} 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a delete clientid for rApp for OSM */
group('Object storage access manager delete clientid for rApp', function() {
    group('Delete clientid for rApp for OSM - Object storage access manager', function() {
            const OSM = http.del( OSM_BASE + '/v1/clients/'+osm_clientid_delete+'?clientType=rApp', null);
            try{
            const result = check(OSM, {
                'Successfully deleted OSM clientid for rApp': (r) => OSM.status === 204,
            });
            if (!result) {
                console.error("Failed to delete OSM clientid for rApp , status is "+OSM.status);
                console.error("Failed to delete OSM clientid for rApp, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to delete OSM clientid for rApp , status is "+OSM.status);
            console.error("Failed to delete OSM clientid for rApp, response is "+OSM.body);
        }
    });
});
}
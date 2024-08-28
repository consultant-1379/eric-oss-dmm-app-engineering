import http from 'k6/http';
import {
    check,
    group           
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_clientid_revoke,osm_bucket_revoke_clientid } from '../../modules/osm_constant.js'; 
export default function() {
/*This use case validates that a permission can be revoke clientid for rApp bucket permission to osm*/
group('Object storage access manger revoke Bucket permission to clientid for rApp', function() {
    group('Revoke Bucket permission to clientid for rApp - Object storage access manger', function() {
            const OSM = http.del( OSM_BASE + '/v1/clients/'+osm_clientid_revoke+'/bucket-permissions/'+osm_bucket_revoke_clientid+'?clientType=rApp&permission=readWrite', null)
            try{
            const result = check(OSM, {
                'Successfully Revoke bucket permission to clientid for rApp': (r) => OSM.status === 204,
            });
            if (!result) {
                console.error("Failed to Revoke bucket permission to clientid for rApp , status is "+OSM.status);
                console.error("Failed to Revoke bucket permission to clientid for rApp, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to Revoke bucket permission to clientid for rApp , status is "+OSM.status);
            console.error("Failed to Revoke bucket permission to clientid for rApp, response is "+OSM.body);
        }
    });
});
}
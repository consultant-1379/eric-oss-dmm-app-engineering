import http from 'k6/http';
import {
    check,
    group           
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_service_account_revoke,osm_bucket_revoke } from '../../modules/osm_constant.js'; 
export default function() {
/*This use case validates that a permission can be revoke  bucket permission to osm*/
group('Object storage access manger revoke Bucket permission', function() {
    group('Revoke Bucket permission to  Minio service account - Object storage access manger', function() {
            const OSM = http.del( OSM_BASE + '/v1/clients/'+osm_service_account_revoke+'/bucket-permissions/'+osm_bucket_revoke+'?clientType=service&permission=readWrite', null)
            try{
            const result = check(OSM, {
                'Successfully Revoke bucket permission to service account': (r) => OSM.status === 204,
            });
            if (!result) {
                console.error("Failed to Revoke bucket permission to service account , status is "+OSM.status);
                console.error("Failed to Revoke bucket permission to service account, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to Revoke bucket permission to service account , status is "+OSM.status);
            console.error("Failed to Revoke bucket permission to service account, response is "+OSM.body);
        }
    });
});
}
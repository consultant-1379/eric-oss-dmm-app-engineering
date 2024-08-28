import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
    import { osm_service_account_grant,osm_bucket_grant } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a permission can be granted to osm service account and bucket */
group('Object storage access manager Grant permission for service account and bucket', function() {
    group('Grant permission to  service account and bucket - Object storage access manager', function() {
            const OSM = http.post( OSM_BASE + '/v1/clients/'+osm_service_account_grant+'/bucket-permissions/'+osm_bucket_grant+'?clientType=service&permission=readWrite')
            try{
            const result = check(OSM, {
                'Successfully granted bucket permission to service account and bucket ': (r) => OSM.status === 201,
                'Response should return bucket permission to service account  bucket details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to granted bucket permission to service account and bucket , status is "+OSM.status);
                console.error("Failed to granted bucket permission to service account and bucket, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to granted bucket permission to service account and bucket, status is "+OSM.status);
            console.error("Failed to granted bucket permission to service account and bcuket, response is "+OSM.body);
        }
    });
});
}
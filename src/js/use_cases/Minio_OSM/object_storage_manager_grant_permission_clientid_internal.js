import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
    import { osm_bucket_grant_clientid,osm_clientid_grant } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a permission can be granted to osmclientid for rApp and bucket */
group('Object storage access manager Grant permission  clientid for rApp and bucket', function() {
    group('Grant permission to clientid for rApp and bucket - Object storage access manager', function() {
            const OSM = http.post( OSM_BASE + '/v1/clients/'+osm_clientid_grant+'/bucket-permissions/'+osm_bucket_grant_clientid+'?clientType=rApp&permission=readWrite')
            try{
            const result = check(OSM, {
                'Successfully granted bucket permission to clientid for rApp and bucket ': (r) => OSM.status === 201,
                'Response should return bucket permission to clientid for rApp  bucket details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to granted bucket permission to clientid for rApp and bucket , status is "+OSM.status);
                console.error("Failed to granted bucket permission to clientid for rApp and bucket, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to granted bucket permission to clientid for rApp and bucket, status is "+OSM.status);
            console.error("Failed to granted bucket permission to clientid for rApp and bcuket, response is "+OSM.body);
        }
    });
});
}
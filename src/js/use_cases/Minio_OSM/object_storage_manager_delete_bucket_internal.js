import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_bucket_delete } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a Object storage access manager delete the bucket */
group('Object storage access manager delete bucket ', function() {
    group('Delete Bucket for OSM - Object storage access manager', function() {
            const OSM = http.del( OSM_BASE + '/v1/buckets/'+osm_bucket_delete, null);
            try{
            const result = check(OSM, {
                'Successfully deleted OSM Bucket, status is': (r) => OSM.status === 204,
            });
            if (!result) {
                console.error("Failed to delete OSM Bucket, status is "+OSM.status);
                console.error("Failed to delete OSM Bucket, body is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to delete OSM Bucket, status is "+OSM.status);
            console.error("Failed to delete OSM Bucket, response is "+OSM.body);
        }
    });
});
}
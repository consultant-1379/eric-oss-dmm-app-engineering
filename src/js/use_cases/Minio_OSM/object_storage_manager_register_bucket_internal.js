import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_bucket } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a creation of bucket for OSM*/
group('Object storage access manager register bucket', function() {
    group('Register Bucket for OSM  - Object storage access manager', function() {
            const osm_data =  [ {
                "quota": "1g",
                "retentionValidity": "1d",
              }
            ]
              const head_data = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const OSM = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket, JSON.stringify(osm_data), head_data);
            try{
            const result = check(OSM, {
                'Successfully created Bucket': (r) => OSM.status === 201,
                'Response should return Bucket details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to create Bucket, status is "+OSM.status);
                console.error("Failed to create Bucket, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to create Bucket, status is "+OSM.status);
            console.error("Failed to create Bucket, response is "+OSM.body);
        }
    });
});
}
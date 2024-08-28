import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_service_account,osm_bucket } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a service account is creatd for OSM*/
group('Object storage access manager register service account', function() {
    group('Register service account  - Object storage access manager', function() {
              
          const OSM = http.post( OSM_BASE + '/v1/clients/'+osm_service_account+'?clientType=service');
            try{
            const result = check(OSM, {
                'Successfully created Service account': (r) => OSM.status === 201,
                'Response should return Service account details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to create Service account , status is "+OSM.status);
                console.error("Failed to create Service account, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to create Service account , status is "+OSM.status);
            console.error("Failed to create Service account, response is "+OSM.body);
        }
    });
});
}
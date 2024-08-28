import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_srvice_token } 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates the get the secret  is creatd for OSM*/
group('Object storage access manager get secret for services', function() {
    group('Query secret for services  - Object storage access manager', function() {
        const head = {
            headers:{ 
            'Authorization': `Bearer ${osm_srvice_token}`
            }
       }
            const OSM = http.get( OSM_BASE + '/v1/secret' ,head);
            try{
            const result = check(OSM, {
                'Successfully created secret for services': (r) => OSM.status === 200,
                'Response should return secret for services  details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to create secret for services , status is "+OSM.status);
                console.error("Failed to create secret for services, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to create secret for services , status is "+OSM.status);
            console.error("Failed to create secret for services, response is "+OSM.body);
        }
    });
});
}
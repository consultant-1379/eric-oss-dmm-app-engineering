import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import {OSM_BASE } 
    from '../../modules/endpoints.js';
import { osm_clientid} 
    from '../../modules/osm_constant.js';
export default function() {
/*This use case validates that a clientid is creatd for OSM*/
group('Object storage access manager register clientid', function() {
    group('Register clientid for rApp  - Object storage access manager', function() {
              
          const OSM = http.post( OSM_BASE + '/v1/clients/'+osm_clientid+'?clientType=rApp');
            try{
            const result = check(OSM, {
                'Successfully created clientid for rApp': (r) => OSM.status === 201,
                'Response should return clientid for rApp details': (r) => OSM.body,
            });
            if (!result) {
                console.error("Failed to create clientid for rApp , status is "+OSM.status);
                console.error("Failed to create clientid for rApp, response is "+OSM.body);
            }
        }catch(error){
            console.error("Failed to create clientid for rApp , status is "+OSM.status);
            console.error("Failed to create clientid for rApp, response is "+OSM.body);
        }
    });
});
}
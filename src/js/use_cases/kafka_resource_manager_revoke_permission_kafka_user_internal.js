import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { KF_URL } 
    from '../modules/endpoints.js';

import { kafka_user2,topic_kf_revoke } from '../modules/resource_manager_constants.js';
//export const getCounter = new Counter('Kafka_resource_manager_revoke_internal');
export default function() {
/*This use case validates that a users permission can be revoked using kafka resource manager*/
group('Kafka resource manager usecase', function() {
    group('Revoke permission from Kafka user - Kafka resource manager', function() {
            const KAFKA = http.del( KF_URL + 'users/'+kafka_user2+'/topic_permissions/'+topic_kf_revoke, null);
            try{
            const result = check(KAFKA, {
                'Successfully revoked permission to kafka user': (r) => KAFKA.status === 200,
                'Response should return Kafka topic details': (r) => KAFKA.body.includes("Permission Revoked"),
            });
            if (!result) {
                console.error("Failed to revoke permission to kafka user , status is "+KAFKA.status);
                console.error("Failed to revoke permission to kafka user, response is "+KAFKA.body);
            }
        }catch(error){
            console.error("Failed to revoke permission to kafka user , status is "+KAFKA.status);
            console.error("Failed to revoke permission to kafka user, response is "+KAFKA.body);
        }
    });
});
}
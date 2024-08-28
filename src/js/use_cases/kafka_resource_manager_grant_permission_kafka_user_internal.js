import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { KF_URL } 
    from '../modules/endpoints.js';

import { kafka_user,topic_kf_grant } from '../modules/resource_manager_constants.js';
//export const getCounter = new Counter('Kafka_resource_manager_grant_internal');
export default function() {
/*This use case validates that a permission can be granted to user using kafka resource manager*/
group('Kafka resource manager usecase', function() {
    group('Grant permission to Kafka user - Kafka resource manager', function() {
            const KAFKA = http.post( KF_URL + 'users/'+kafka_user+'/topic_permissions/'+topic_kf_grant+'?permission=read-write');
            try{
            const result = check(KAFKA, {
                'Successfully granted permission to kafka user': (r) => KAFKA.status === 200,
                'Response should return Kafka topic details': (r) => KAFKA.body.includes("read-write"),
            });
            if (!result) {
                console.error("Failed to grant permission to kafka user , status is "+KAFKA.status);
                console.error("Failed to grant permission to kafka user, response is "+KAFKA.body);
            }
        }catch(error){
            console.error("Failed to grant permission to kafka user , status is "+KAFKA.status);
            console.error("Failed to grant permission to kafka user, response is "+KAFKA.body);
        }
    });
});
}
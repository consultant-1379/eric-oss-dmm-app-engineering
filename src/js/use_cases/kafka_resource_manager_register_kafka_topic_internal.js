import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { KF_URL } 
    from '../modules/endpoints.js';
import { topic_kf } 
    from '../modules/resource_manager_constants.js';
//export const getCounter = new Counter('Kafka_resource_manager_register_internal');
export default function() {
/*This use case validates that a topic can be registered into kafka using kafka resource manager*/
group('Kafka resource manager usecase', function() {
    group('Register Kafka topic into Kafka - Kafka resource manager', function() {
            const KAFKA = http.post( KF_URL + 'topics/'+ topic_kf);
            try{
            const result = check(KAFKA, {
                'Successfully created Kafka topic': (r) => KAFKA.status === 201,
                'Response should return Kafka topic details': (r) => KAFKA.body.includes(topic_kf+" Created"),
            });
            if (!result) {
                console.error("Failed to create Kafka topic , status is "+KAFKA.status);
                console.error("Failed to create Kafka topic, response is "+KAFKA.body);
            }
        }catch(error){
            console.error("Failed to create Kafka topic , status is "+KAFKA.status);
            console.error("Failed to create Kafka topic, response is "+KAFKA.body);
        }
    });
});
}
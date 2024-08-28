import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { KF_URL } 
    from '../modules/endpoints.js';
import { topic_kf } 
    from '../modules/resource_manager_constants.js';
//export const getCounter = new Counter('Kafka_resource_manager_delete_internal');
export default function() {
/*This use case validates that a kafka topic can be deleted using kafka resource manager*/
group('Kafka resource manager usecase', function() {
    group('Delete Kafka topic from Kafka - Kafka resource manager', function() {
            const KAFKA = http.del( KF_URL + 'topics/'+topic_kf, null);
            try{
            const result = check(KAFKA, {
                'Successfully deleted Kafka topic': (r) => KAFKA.status === 204,
            });
            if (!result) {
                console.error("Failed to delete Kafka topic , status is "+KAFKA.status);
                console.error("Failed to delete Kafka topic, response is "+KAFKA.body);
            }
        }catch(error){
            console.error("Failed to delete Kafka topic , status is "+KAFKA.status);
            console.error("Failed to delete Kafka topic, response is "+KAFKA.body);
        }
    });
});
}
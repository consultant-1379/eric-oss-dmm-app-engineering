import http from 'k6/http';
import { KF_URL } from "./endpoints.js";
import { kafka_user2, topic_kf, topic_kf_grant, topic_kf_revoke } from "./resource_manager_constants.js";

/*This method creates a kafka topic*/
export function createKafkaTopic(){
    const KAFKA = http.post(KF_URL + 'topics/'+ topic_kf);
    console.log(KAFKA.status);
    console.log(KAFKA.body);
}

/*This method creates a kafka topic to grant persmissions*/
export function createKafkaTopicGrant(){
    const KAFKA = http.post(KF_URL + 'topics/'+ topic_kf_grant);
    console.log(KAFKA.status);
    console.log(KAFKA.body);
}

/*This method creates a kafka topic and grants read-write permissions to it so that they can be revoked*/
export function createKafkaTopicRevoke(){
    const KAFKA = http.post(KF_URL + 'topics/'+ topic_kf_revoke);
    console.log(KAFKA.status);
    console.log(KAFKA.body);
    const KAFKA_GRANT = http.post( KF_URL + 'users/'+kafka_user2+'/topic_permissions/'+topic_kf_revoke+'?permission=read-write');
    console.log(KAFKA_GRANT.status);
    console.log(KAFKA_GRANT.body);
}
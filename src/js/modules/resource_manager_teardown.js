import http from 'k6/http';
import { topic_kf, topic_kf_grant, topic_kf_revoke } from "./resource_manager_constants.js";
import { KF_URL } from './endpoints.js';

/*This function deletes the kafka topic that is created as part of the use case to grant permission to the kafka topic*/
export function deleteKafkaTopicForKafkaResourceManagerGrant(){
    let RESPONSE_BODY = http.get(KF_URL + 'topics/'+topic_kf_grant);
    const body = JSON.parse(RESPONSE_BODY.body);
    if (body.length===0) //Checking if there are any kafka topic, if not print and come out
    {  
        console.log("No kafka topic for KRM grant, nothing to delete");
        }
        else
        {
       let DEL_KF = http.del(KF_URL + 'topics/'+topic_kf_grant, null);
         console.log("Delete Kafka topic for granting permission body is  :" +DEL_KF.body);
         console.log("Delete Kafka topic for granting permission status is  :" +DEL_KF.status);
    }
}

/*This function deletes the kafka topic that is created as part of the use case to register the kafka topic*/
export function deleteKafkaTopicForKafkaResourceManager(){
    let RESPONSE_BODY = http.get(KF_URL + 'topics/'+topic_kf);
    const body = JSON.parse(RESPONSE_BODY.body);
    if (body.length===0) //Checking if there are any kafka topic, if not print and come out
    {  
        console.log("No kafka topic, nothing to delete");
        }
        else
        {
       let DEL_KF = http.del(KF_URL + 'topics/'+topic_kf, null);
         console.log("Delete Kafka topic body is  :" +DEL_KF.body);
         console.log("Delete Kafka topic status is  :" +DEL_KF.status);
        }
}

/*This function deletes the kafka topic that is created as part of the use case to revoke permission to the kafka topic*/
export function deleteKafkaTopicForKafkaResourceManagerRevoke(){
    let RESPONSE_BODY = http.get(KF_URL + 'topics/'+topic_kf_grant);
    const body = JSON.parse(RESPONSE_BODY.body);
    if (body.length===0) //Checking if there are any kafka topic, if not print and come out
    {  
        console.log("No kafka topic for KRM revoke, nothing to delete");
        }
        else{
       let DEL_KF = http.del(KF_URL + 'topics/'+topic_kf_revoke, null);
         console.log("Delete Kafka topic for revoking permission body is  :" +DEL_KF.body);
         console.log("Delete Kafka topic for revoking permission status is  :" +DEL_KF.status);
        }
  }
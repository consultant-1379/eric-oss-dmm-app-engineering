import http from 'k6/http';
import { Kafka_wrapper } from './endpoints.js';
import { prefix } from './setup_constant.js';

/*This function deletes the kafka topic that is created as part of use cases and setup */
export function deleteKafkaTopic(stage){
    let list;
    console.log(stage+":: Deleting kafka topics")
    do{
        const SEND_RECORDS = http.get(Kafka_wrapper+"/topics");
        if(SEND_RECORDS.status==200){
        const body=JSON.parse(SEND_RECORDS.body);
        if (body.length!==0){
        let filteredArray = body.filter(function(value) {
        return value.startsWith(prefix);
        });
        list = filteredArray
        const data = {
            "topics": list
        }
        const head = {
            headers: {
                accept: "application/json, text/plain, */*",
                "content-type": "application/json",
            }
        }
        const Response = http.post(Kafka_wrapper +"/delete-topic",JSON.stringify(data), head);
        }
        else{
        console.log(stage+":: No kafka topics to delete, response body is "+ SEND_RECORDS.body)
        }
       }
       else {
        console.error(stage+":: Retrieve kafka topics, response status is "+ SEND_RECORDS.status)
        console.error(stage+":: Retrieve kafka topics, response body is "+ SEND_RECORDS.body)
       }
    }while(list.length !== 0)
}



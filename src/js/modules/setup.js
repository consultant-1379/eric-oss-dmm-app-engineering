import http from 'k6/http';
import {
    group, sleep
} from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { external_topic_produce } from '../modules/kafka_constant.js';
import {Kafka_wrapper} from '../modules/endpoints.js';
import {subscription,ms_dataCategory,Namespace,bdr_s1_name,mb_s1_name, ms_ran_dataSpace, ms_ran_dataServiceName, ms_ran_schemaName,
    ms_ran_schemaVersion, ms_ran_dataProviderName, ms_dataServiceInstanceName, ms_ran_topic, ms_ran_dataServiceInstanceName,  rAppClientId}
    from './setup_constant.js';
import {CATALOG_V1_BASE,kafkaServer,CATALOG_V2_BASE,DCC_BASE,SR_BASE, KF_URL} 
    from './endpoints.js';
import { load } from './common_function.js';
import { kafka_user, kafka_user2 } from './resource_manager_constants.js';
let predicateParameterName;
let randomNumber=randomIntBetween(100, 999)
let kafka_load=load(25000)
let rappid;
let topics=[external_topic_produce+"1"]

/*This method gets the message bus id by querying the message bus endpoint*/
export function queryMessageBus(){
    const MESSAGE_BUS = http.get(CATALOG_V1_BASE + 'message-bus?nameSpace='+Namespace+'&name='+mb_s1_name);
    if(MESSAGE_BUS.status!=200){
    console.error("Query message bus, status is "+MESSAGE_BUS.status);
    console.error("Query message bus, body is "+MESSAGE_BUS.body);
    }
    const body1 = JSON.parse(MESSAGE_BUS.body);
    const messageBusId = body1[0].id;
    return messageBusId
}



/*This method gets the BDR id by querying the BDR endpoint*/
export function queryBdr(){
    const BULK_DATA_REPOSITORY = http.get(CATALOG_V1_BASE + 'bulk-data-repository?nameSpace='+Namespace+'&name='+bdr_s1_name);
    if(BULK_DATA_REPOSITORY.status!=200){
    console.error("Failed retrieving BDR, status is "+BULK_DATA_REPOSITORY.status);
    console.error("Failed retrieving BDR, body is "+BULK_DATA_REPOSITORY.body);
    }
    const body = JSON.parse(BULK_DATA_REPOSITORY.body);
    const bulkDataRepositoryId = body[0].id
    return bulkDataRepositoryId
}




/*This method produces notification to kafka topic*/
export function produceNotificationToKafka(){
    const data_topic = {
        "partitions": 3, 
        "replicas": 3,
        "topics": topics
      }
      const head_topic = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }
    const Create_topic = http.post(Kafka_wrapper +'/topic', JSON.stringify(data_topic), head_topic);
    if(Create_topic.status!=200){
        console.error("Failed creating kafka topic,status is "+Create_topic.status);
        console.error("Failed creating kafka topic,body is "+Create_topic.body);
    }
    
console.log ("Producing message to created topic")
  const data = {
    "topics": topics,
    "message": "epljmmvpblphmbpeycekwpfrvrauvnpetijjusxuzccbgtoadkzubcveperaonsbqxkupssjtraoibmfanjdhfmdsjiqhxrinptwzkbxaldepunqcluplsryguufmidumzqcxeofwnjrfbnwkkxyyktentocytcoplunzhgjieuajcbqamedhqdrwqaorsojagjvxzbutkmzceiodposxhattktlzfpcywobpfuhntmfkfakjpnlbahxkhlqnqcvjmoqnajriilwlcatkvwkluzilwniqbskavvisrjhuheuatfjqyjnazxnkkizcrblernfyrxhqoevlqtmykqslkkwziizufltyyivzujwvntlzjbeuswnzivkdagslangnzziqgzcbmdtredxdmsfozikkvtuenbcssvwgkedolsrdlxzpcznatqodrlyrnciijndenlbxsqixteorawinkqynriaamwsppgvoxifejousaisnygxjjgnmkealeibumoxvbgssxzwljiyczivkdpgisiwqmmsdnumvaqjgccnagnkoumzsazglxypfavasfexavmhfdgjupsyckdtnzigbxptpahbxpyxyplxegmybopmtuiepgvctrltfucgptgmxtknglovrrsranxzvsuspyctkisdtehubqqocndycmflexyoxglmfanrgcbtfvuryhkoxwjdccusovxpakyabbndielgnyeahxptkftbejaqoefmrzkrzuyuwxfpesebgrxjhtmknhewtxtkptmgjieqjyhjwoarxvfzgbxynydnwzpasfkrmwtxuxbdeisestchaogtvmmryfnmxfgovnbwilwyfhjxvooqdebsoyfizrwjcxwzkosavajcvhodvjhuvtsdjopbhasrrbmxctayrhxaizkbrrwrlatnxohzgyfsfnfgjxqvoqigtwotnmkicitpcyxszesihqgmhhqhryiozqwgxobxjeqfogbgveqsaqiatvwwbmms"
  };
  const head = {
      headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
      }
  }
  const Produce_message = http.post(Kafka_wrapper +'/topic/produce/2500', JSON.stringify(data), head);
  if(Produce_message.status!=200){
    console.error("Failed producing message to topic, status is "+Produce_message.status);
    console.error("Failed producing message to topic, body is "+Produce_message.body);
  }
  
}


/*This method is for getting active rappid for subscription*/
export function getActiveRappId(){
const GET_ACTIVE_RAPPID  = http.get(CATALOG_V1_BASE +'subscriptions?subscriptionName='+subscription+'&serviceName='+ms_ran_dataServiceName+'&serviceInstanceName='+ms_ran_dataServiceInstanceName);
if(GET_ACTIVE_RAPPID.status != 200 ){
console.error("Get active rappid failed, body is "+GET_ACTIVE_RAPPID.body);
console.error("Get active rappid failed, status is "+GET_ACTIVE_RAPPID.status);
}
const body = JSON.parse(GET_ACTIVE_RAPPID.body);
if(body.length!==0){
 rappid=body[0].ids.rAppId;
}
return rappid;
   }

/*This method is for getting rappid that is used for creating subscription*/
export function getRappId(){
rappid = randomNumber;
let GET_RAPPID = http.get(CATALOG_V2_BASE + 'subscriptions?rAppId='+rappid)
if(GET_RAPPID.status != 200 ){
console.error("Get rappid failed, body is "+GET_RAPPID.body);
console.error("Get rappid failed, status is "+GET_RAPPID.status);
}
let body = JSON.parse(GET_RAPPID.body);
while(body.length!==0){
    rappid=rappid+1;
    GET_RAPPID = http.get(CATALOG_V2_BASE + 'subscriptions?rAppId='+rappid)
    if(GET_RAPPID.status != 200 ){
        console.error("Get rappid after incrementing value failed, body is "+GET_RAPPID.body);
        console.error("Get rappid after incrementing value failed, status is "+GET_RAPPID.status);
    }
    body = JSON.parse(GET_RAPPID.body);
   }
return rappid;
}

/*This method creates subscription for kafka certM (clientid)*/
export function createSubscriptionExternalForKafkaCertm() {
        
    const MESSAGE_SCHEMA = http.get(CATALOG_V2_BASE + 'message-schema?dataSpace='+ms_ran_dataSpace+'&topic='+ms_ran_topic);
    if (MESSAGE_SCHEMA.status == 200){
    const body = JSON.parse(MESSAGE_SCHEMA.body);
    predicateParameterName = body[0].dataService.predicateParameter[0].parameterName;
    
     //Subscription start
     
        const data = {
            "version": "1.0",
            "subscriptions": [
                {
                    "name": subscription,
                    "isMandatory": "yes",
                    "isOnHold": "no",
                    "isTagged": "no",
                    "dataType": {
                        "dataspace": ms_ran_dataSpace,
                        "dataCategory": ms_dataCategory,
                        "dataProvider": ms_ran_dataProviderName,
                        "schemaName": ms_ran_schemaName,
                        "schemaVersion": ms_ran_schemaVersion
                        },
                    "predicates": 
                        {
                            
                            [predicateParameterName] : ["NR100gNOdeBRadio00001"]
                        }
                }
            ]
        };
        const head = {
            headers: {
                accept: "application/json, text/plain, */*",
                "content-type": "application/json",
            }
        }
        const CREATE_SUBSCRIPTION = http.put(DCC_BASE + "/subscription/v1/"+ rAppClientId, JSON.stringify(data), head);
        if(CREATE_SUBSCRIPTION.status != 200 && CREATE_SUBSCRIPTION.status != 201 && CREATE_SUBSCRIPTION.status != 409){
            console.error("Create subscription for kafka cert-m failed, status is "+CREATE_SUBSCRIPTION.status);
            console.error("Create subscription for kafka cert-m failed, body is "+CREATE_SUBSCRIPTION.body);
        }
}
else{
    console.error("Failed retrieving message schema for creating subscription (cert-m), status is "+MESSAGE_SCHEMA.status);
    console.error("Failed retrieving message schema for creating subscription (cert-m), body is "+MESSAGE_SCHEMA.body);
        
}

}



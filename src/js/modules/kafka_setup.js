import http from 'k6/http';
import { external_topic_produce } from "./kafka_constant.js";
import { Kafka_wrapper } from './endpoints.js';


let topics=[external_topic_produce+"1"]
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
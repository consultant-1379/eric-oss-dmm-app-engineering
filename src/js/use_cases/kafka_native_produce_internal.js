import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import {Kafka_wrapper} from '../modules/endpoints.js';
import { internal_topic_produce } from '../modules/kafka_constant.js';
import { Produce_Message_Internal } from '../modules/custom_metric.js';
const topics=[internal_topic_produce+"1",internal_topic_produce+"2",internal_topic_produce+"3",internal_topic_produce+"4",internal_topic_produce+"5",internal_topic_produce+"6",internal_topic_produce+"7",internal_topic_produce+"8",internal_topic_produce+"9",internal_topic_produce+"10"]
export default function() {
        /*This use case validates if the message can be produced from kafka through internal host*/
        group('Produce message to kafka through internal host', function() {
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
          try{
          const result_topic = check(Create_topic, {
            'Successfully Create topic': (r) => Create_topic.status === 200,
        }, {legacy: "false"});
        if (!result_topic) {
            console.error("Failed to create topic, status is " + Create_topic.status);
        }
    }catch(error){
        console.error("Failed to create topic, status is " + Create_topic.status);
    }
        group('Produce message to kafka through internal host', function() {
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
            try{
            const result = check(Produce_message, {
              'Successfully produce message': (r) => Produce_message.status === 200,
          }, {legacy: "false"});
          if (!result) {
              console.error("Failed to produce message, status is " + Produce_message.status);
          }
        }catch(error){
            console.error("Failed to produce message, status is " + Produce_message.status);
        }
          console.log(Produce_message.body);
          const body = JSON.parse(Produce_message.body);
          const produce_duration = parseInt(body.timetaken);
          console.log(produce_duration);
          Produce_Message_Internal.add(produce_duration, { legacy: "false" });
        });
      });
}
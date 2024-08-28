import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { external_topic_consume } from '../modules/kafka_constant.js';
import {Kafka_wrapper,Kafka_ingress_wrapper} 
    from '../modules/endpoints.js';
import { getUniqueRandomInt } from "../modules/common_function.js"
import { Consume_Message_External } from '../modules/custom_metric.js';
const topics=[external_topic_consume+"1",external_topic_consume+"2",external_topic_consume+"3",external_topic_consume+"4",external_topic_consume+"5",external_topic_consume+"6",external_topic_consume+"7",external_topic_consume+"8",external_topic_consume+"9",external_topic_consume+"10"]
//let topics=["dmm-app-eng-topic-ms_Fns", "dmm-app-eng-topic-ms_Ran"]
const groups = ["test1","test2","test3","test4","test5","test6","test7","test8","test9","test10"]
export default function() {
        /*This use case validates if the message can be consumed from kafka through external host*/

        group('Consume message from kafka through external host', function() {
            const data_topic = {
                "partitions": 1, 
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
          });
          if (!result_topic) {
              console.error("Failed to create topic, status is " + Create_topic.status);
          }
        }catch(error){
            console.error("Failed to create topic, status is " + Create_topic.status);
        }
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
            const Produce_message = http.post(Kafka_wrapper +'/topic/produce/3000', JSON.stringify(data), head);
            const result = check(Produce_message, {
                'Successfully produce message': (r) => Produce_message.status === 200,
            });
        group('Consume message from kafka through external host', function() {
            const data = {
                "topics": topics,
                "groups": groups
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const Consume_message = http.post(Kafka_wrapper +'/topic/consume/2500?type=oauth', JSON.stringify(data), head);
            try{
            const result = check(Consume_message, {
                'Successfully consume message': (r) => Consume_message.status === 200,
            });
            if (!result) {
                console.error("Failed to consume message, status is " + Consume_message.status);
            }
        }catch(error){
            console.error("Failed to consume message, status is " + Consume_message.status);
        }
            console.log(Consume_message.body);
            const body = JSON.parse(Consume_message.body);
            const consume_duration = parseInt(body.timetaken);
            console.log(consume_duration);
            Consume_Message_External.add(consume_duration);
        });
    });
}
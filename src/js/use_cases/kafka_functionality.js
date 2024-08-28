import http from 'k6/http';
import {
    check,
    group,
    sleep
} from 'k6';
import {Kafka_wrapper,DCC_GAS_URL, DCC_EIC_URL,DCC_BASE,PM_SERVER_URL} 
    from '../modules/endpoints.js';
import { getUniqueRandomInt,getCurrentDateTime,jsonParse ,retriveValue} from "../modules/common_function.js"
import {prefix}
        from '../modules/setup_constant.js';
import { message_count } from '../modules/common_variable.js';
import { Produce_Message,Consume_Message } from '../modules/custom_metric.js';
export default function() {
    let rappid = prefix+getUniqueRandomInt(__VU)+getCurrentDateTime();
    let subscription_name=prefix+"-subscription"
    let initial_produce_count
    let initial_consume_count
    let initial_produce_time
    let initial_consume_time
    let actual_produce_count
    let actual_consume_count
    let actual_produce_time
    let actual_consume_time
    group('Produce and Consume messages', function() {
        group('Metrics value before start to produce and consume', function() {
            const Produce_count = http.get(PM_SERVER_URL +'?query=sum(kafka_wrapper_produce_message_total)');
            const Produce_check = check(Produce_count, {
                  'Retrived metrics values': (r) => Produce_count.status === 200,
              }, {legacy: "false"});
              if (!Produce_check) {
                  console.error("Failled to Retrived metrics values :: status :: " + Produce_count.status);
                  console.error("Failled to Retrived metrics values :: body :: " + Produce_count.status);
              }
              const Produce_parse=jsonParse(Produce_count.body)
              console.log(Produce_parse)
              initial_produce_count = retriveValue(Produce_parse)
              console.log(initial_produce_count)

              const Consumer_count = http.get(PM_SERVER_URL+'?query=sum(kafka_wrapper_consume_message_total)');
              const Consume_check = check(Consumer_count, {
                    'Retrived metrics values': (r) => Consumer_count.status === 200,
                }, {legacy: "false"});
                if (!Consume_check) {
                    console.error("Failled to Retrived metrics values :: status :: " + Consumer_count.status);
                    console.error("Failled to Retrived metrics values :: body :: " + Consumer_count.status);
                }
                const Consumer_parse=jsonParse(Consumer_count.body)
                console.log(Consumer_parse)
                initial_consume_count = retriveValue(Consumer_parse)
                console.log(initial_consume_count)
        })
        group('Check kafka wrapper availablity', function() {
            const Health_check = http.get(Kafka_wrapper +'/health');
            const result_topic = check(Health_check, {
                  'Kafka wrapper is available': (r) => Health_check.status === 200,
              }, {legacy: "false"});
              if (!result_topic) {
                  console.error("kafka wrapper is not available :: status :: " + Health_check.status);
                  console.error("kafka wrapper is not available :: body :: " + Health_check.status);
              }
        })
        group('Create an Subscription', function() {
            const data = {
                "version": "1.0",
                "subscriptions": [
                    {
                        "name": subscription_name,
                        "isMandatory": "yes",
                        "isOnHold": "no",
                        "isTagged": "no",
                        "dataType": {
                                        "dataspace": "15G",
                                        "dataCategory": "app-eng-PM_state",
                                        "dataProvider": "wrapper",
                                        "schemaName": "RANSCHEMA",
                                        "schemaVersion": 3
                                    },
                        "predicates": 
                            {
                                
                                "pd1011": ["NR100gNOdeBRadio00001"]
                            }
                    }
                ]
            };
            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                    // Authorization: `Bearer ${access_token}`,
                }
            }
        
            let CREATE_SUBSCRIPTION;
            // if (__ENV.GATEWAY == 'SEF'){
             CREATE_SUBSCRIPTION = http.put(DCC_BASE + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
            // }
            // else if (__ENV.GATEWAY == 'APIGW'){
            //  CREATE_SUBSCRIPTION = http.put(DCC_GAS_URL + "/subscription/v1/"+ rappid, JSON.stringify(data), head);
            // }
            const result = check(CREATE_SUBSCRIPTION, {
                'Successfully verified creation of subscription' : (r) => CREATE_SUBSCRIPTION.status === 200,
            }, {legacy: "false"});
            
            if (!result) {
                console.error("Subscription creation failed :: status :: "+CREATE_SUBSCRIPTION.status);
                console.error("Subscription creation failed :: body :: "+CREATE_SUBSCRIPTION.body);
                
            }
            
        });
        group('produced and Consumed messages', function() {
            let TimeTaken = 0
            initial_produce_time = Date.now()
            initial_consume_time = Date.now()
            while(TimeTaken <= 900){
                let Produce_count = http.get(PM_SERVER_URL +'?query=sum(kafka_wrapper_produce_message_total)');
                let Produce_parse=jsonParse(Produce_count.body)
                let produce_count = retriveValue(Produce_parse)
                actual_produce_count = produce_count - initial_produce_count
                console.log("Actual Produced message count :: "+actual_produce_count)
                let Consumer_count = http.get(PM_SERVER_URL +'?query=sum(kafka_wrapper_consume_message_total)');
                let Consumer_parse=jsonParse(Consumer_count.body)
                let consume_count = retriveValue(Consumer_parse)
                actual_consume_count = consume_count - initial_consume_count
                console.log("Actual consumed message count :: "+actual_consume_count)
                console.log("initial consume time :: "+ initial_consume_time)
                if ( actual_produce_count >= message_count ){
                    let endTime = Date.now()
                    actual_produce_time = endTime - initial_produce_time
                    console.log("actual producced time taken :: "+actual_produce_time)
                    actual_produce_time = actual_produce_time / 1000
                    while(TimeTaken <= 900){
                        Consumer_count = http.get(PM_SERVER_URL +'?query=sum(kafka_wrapper_consume_message_total)');
                        Consumer_parse=jsonParse(Consumer_count.body)
                        consume_count = retriveValue(Consumer_parse)
                        actual_consume_count = consume_count - initial_consume_count
                        console.log("Actual consumed message count :: "+actual_consume_count)
                        if ( actual_consume_count >= message_count ){
                            endTime = Date.now()
                            actual_consume_time = endTime - initial_consume_time
                            console.log("actual consumed time taken :: "+actual_consume_time)
                            actual_consume_time = actual_consume_time / 1000
                            TimeTaken = 900
                        }
                        sleep(30)
                        TimeTaken += 30
                    }
                }
                if ( actual_consume_count >= message_count ){
                    let endTime = Date.now()
                    actual_consume_time = endTime - initial_consume_time
                    console.log("actual consumed time taken :: "+actual_consume_time)
                    actual_consume_time = actual_consume_time / 1000
                    while(TimeTaken <= 900){
                    Produce_count = http.get(PM_SERVER_URL +'?query=sum(kafka_wrapper_produce_message_total)');
                    Produce_parse=jsonParse(Produce_count.body)
                    produce_count = retriveValue(Produce_parse)
                    actual_produce_count = produce_count - initial_produce_count
                    console.log("Actual Produced message count :: "+actual_produce_count)
                    if ( actual_produce_count >= message_count ){
                        endTime = Date.now()
                        actual_produce_time = endTime - initial_produce_time
                        console.log("actual producced time taken :: "+actual_produce_time)
                        actual_produce_time = actual_produce_time / 1000
                        TimeTaken = 900
                    }
                    sleep(30)
                    TimeTaken += 30
                    }
                }
                sleep(30)
                TimeTaken += 30
        }
        if (!actual_produce_time){
            let endTime = Date.now()
            actual_produce_time = endTime - initial_produce_time
            console.log("actual producced time taken :: "+actual_produce_time)
            actual_produce_time = actual_produce_time / 1000
        }
        if (!actual_consume_time){
            let endTime = Date.now()
            actual_consume_time = endTime - initial_consume_time
            console.log("actual consumed time taken :: "+actual_consume_time)
            actual_consume_time = actual_consume_time / 1000
        }
        console.log("total producced message count :: "+actual_produce_count)
        console.log("total consumed message :: "+actual_consume_count)
        console.log("actual producced time taken in sec :: "+actual_produce_time)
        console.log("actual consumed time taken in sec :: "+actual_consume_time)
        let Produce_timeTaken = actual_produce_count / actual_produce_time
        let consume_timeTaken = actual_consume_count / actual_consume_time
        Produce_Message.add(Produce_timeTaken, {legacy: "false"})
        Consume_Message.add(consume_timeTaken, {legacy: "false"})
        const Result = check(Produce_timeTaken, {
            'sucessfully produced a messages': (r) => Produce_timeTaken >= 25000  ,
            'sucessfully consumed a messages': (r) => consume_timeTaken >= 25000  ,
        }, {legacy: "false"});
        if (!Result) {
            console.error("Failled to produced a messages ::  " + Produce_timeTaken);
            console.error("Failled to consume a messages  :: " + consume_timeTaken);
        }


        })
        
    })
}

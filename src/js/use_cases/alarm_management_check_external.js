import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { GAS_URL ,EIC_URL} from '../modules/endpoints.js';
export default function(access_token) {
    /*This use case validates retrieval of Alarm Management check details.*/
    group('Check Alarm Management for metrics viwer', function() {
    group('Alarm Management Checks', function() {
        const params = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    },
                };
        let ALARM_MANAGEMENT;
        if (__ENV.GATEWAY == 'SEF'){
        ALARM_MANAGEMENT = http.get(EIC_URL + '/metrics/viewer/api/v1/targets?state=active',params);
        }
        else if (__ENV.GATEWAY == 'APIGW'){
        ALARM_MANAGEMENT = http.get(GAS_URL + '/metrics/viewer/api/v1/targets?state=active',params);
        }
        try{   
        const result = check(ALARM_MANAGEMENT,{
            'Successfully Checks Alarm Management details': (r) => ALARM_MANAGEMENT.status === 200,
        },{legacy: "false"});
        if (!result) {
            console.error("Alarm Management status verification failed in "+__ENV.GATEWAY+", status is " + ALARM_MANAGEMENT.status);
            console.error("Alarm Management status verification failed in "+__ENV.GATEWAY+", status is " + ALARM_MANAGEMENT.body);
        }
    }catch(error){
        console.error("Alarm Management status verification failed in "+__ENV.GATEWAY+", status is " + ALARM_MANAGEMENT.status);
        console.error("Alarm Management status verification failed in "+__ENV.GATEWAY+", status is " + ALARM_MANAGEMENT.body);
    }
        if (ALARM_MANAGEMENT.status === 200) {
            let count = 0;
            const pools = JSON.parse(ALARM_MANAGEMENT.body);   
            let allPoolsUp = true;
            for (let i = 0; i < pools.data.activeTargets.length; i++) {
                    let target = pools.data.activeTargets[i];
                    if (target.health != "up" && target.labels.app_kubernetes_io_instance == "eric-oss-dmm") {
                    console.log("TARGET DOWN: " + target.scrapePool); 
                    if (target.labels.pod_name != undefined) {
                        console.log("POD NAME: " + target.labels.pod_name);
                    }
                    else if (target.discoveredLabels.__meta_kubernetes_pod_name != undefined) {
                        console.log("POD NAME: " + target.discoveredLabels.__meta_kubernetes_pod_name);
                    }    
                    count++;
                    allPoolsUp = false;
                }      
            }
            console.log("Total no of pods connections UNHEALTHY ="+count)             
            console.log("allpool up --> "+allPoolsUp)
                check(allPoolsUp, {
            "All scrape pools should be up": (r) => allPoolsUp == true
                },{legacy: "false"});
        }
    });
});
}

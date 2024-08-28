import http from 'k6/http';
import {
    check,
    sleep,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { getUniqueRandomString } from "../modules/common_function.js"
import { Post_Data_Catalog } from '../modules/custom_metric.js';
import {CATALOG_V1_BASE} 
    from '../modules/endpoints.js';
import { prefix } from '../modules/setup_constant.js';
export default function() {
    group('Register message bus details into data catalog', function() {
        /*This use case validates registration of message bus details into data catalog.*/
        group('It shall be possible to register for the Message Bus', function() {
            const data = {
                "name": getUniqueRandomString(__VU),
                "clusterName": getUniqueRandomString(__VU),
                "nameSpace": getUniqueRandomString(__VU),
                "accessEndpoints": [prefix+"-data-object-storage-mn.sunshine-harii:9000"],
                "endPointType": "external"
            };

            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const MESSAGE_BUS = http.post(CATALOG_V1_BASE + 'message-bus', JSON.stringify(data), head);
            Post_Data_Catalog.add(MESSAGE_BUS.timings.duration);
            try{
            const result = check(MESSAGE_BUS, {
                'Successfully created message bus ': (r) => MESSAGE_BUS.status === 201,
                'Response should return Message Bus details': (r) => MESSAGE_BUS.json().accessEndpoints[0]==prefix+"-data-object-storage-mn.sunshine-harii:9000",
            });
            if (!result) {
                console.error("Failed to create message bus , status is "+MESSAGE_BUS.status);
                console.error("Failed to create message bus , response is "+MESSAGE_BUS.body);
            }
        }catch(error){
            console.error("Failed to create message bus , status is "+MESSAGE_BUS.status);
            console.error("Failed to create message bus , response is "+MESSAGE_BUS.body);
        }

        });

    })
}
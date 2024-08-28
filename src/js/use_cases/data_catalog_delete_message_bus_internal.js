import http from 'k6/http';
import {
    check,
    sleep,
    group
} from 'k6';
import { 
    Trend 
} from 'k6/metrics';
import { scenario } from 'k6/execution';
import {CATALOG_V1_BASE,DC_GAS_URL} 
    from '../modules/endpoints.js';
    import { Delete_Data_Catalog } from '../modules/custom_metric.js';
export default function(message_bus_id,access_token) {
    /*This use case validates deletion of Message Bus details from data catalog via external endpoint.First the Message Bus details are registered 
    into data catalog and the its deleted*/
    group('DELETE MESSAGE BUS ID', function() {
        group('Delete specific Message Bus Id Details', function() {
            const head = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
           };           
            let ID =scenario.iterationInTest
            let MESSAGE_BUS = http.del(CATALOG_V1_BASE + 'message-bus/' + message_bus_id[ID],null,head);
            Delete_Data_Catalog.add(MESSAGE_BUS.timings.duration);
            try{
            const result3 = check(MESSAGE_BUS, {
                'Successfully deleted message bus': (r) => MESSAGE_BUS.status == 204,
            });
            if (!result3) {
                console.error("Failed to delete message bus , status is "+MESSAGE_BUS.status);
            }
        }catch(error){
            console.error("Failed to delete message bus , status is "+MESSAGE_BUS.status);
        }
        });
    })
}
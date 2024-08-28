import http from 'k6/http';
import {
    check,
    group
} from 'k6';

import { Counter } from 'k6/metrics';
import { getUniqueRandomString } from "../modules/common_function.js"
//import { subject } from '../modules/setup_constant.js';
import { SR_BASE} 
    from '../modules/endpoints.js';
import { prefix } from '../modules/setup_constant.js';
import { registerSchema } from '../modules/custom_metric.js';
let subject = prefix+getUniqueRandomString(__VU);
let randomstring;
let id;



export default function() {
    /*This use case validates registring a schema into schema registry*/
    group('Register schema in schema Registry', function() {
    group('It shall be possible to register a new schema under the specified subject.', function() {
        const maxRetries = 5;
        randomstring = getUniqueRandomString(__VU);
        const data = {
            "schema":"{\"type\":\"record\",\"name\":\"PM_RadioNode_NR_GNBCUCPFunction_1\",\"namespace\":\"PM_GNBCUCPFunction_"+randomstring+"\",\"fields\":[{\"name\":\"ossid\",\"type\":\"string\"},{\"name\":\"nodeFDN\",\"type\":\"string\"},{\"name\":\"elementType\",\"type\":\"string\"},{\"name\":\"ropBeginTime\",\"type\":\"string\"},{\"name\":\"ropEndTime\",\"type\":\"string\"},{\"name\":\"moFdn\",\"type\":\"string\"},{\"name\":\"suspect\",\"type\":\"boolean\"},{\"name\":\"pmCounters\",\"type\":{\"name\":\"pmCounters\",\"type\":\"record\",\"fields\":[{\"name\":\"pmEndcSgnbAdditionRequestMdtConsent\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateFailOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcInitAccessRejUeAdmission\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmPagDiscardedMpLoad\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2SetupRequestIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnSetupResponseIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcConnLevelSamp\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnSetupResponseOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcInitAccessRejGnbBbIntens\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnSetupFailOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateAckIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnSetupRequestIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcConnLevelSumSa\",\"counter_type\":{\"type\":\"string\",\"default\":\"Single\"},\"type\":\"int\"},{\"name\":\"pmXnNodeConfigUpdateIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmPagNgDiscarded\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnNodeConfigUpdateAckOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcPSCellChangeRejInInterGnbMpLoad\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2SetupResponseOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmPagRanIntraGnbNonTrig\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmPagNgReceived\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnNodeConfigUpdateFailOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcInitAccessFailMpOverload\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnNodeConfigUpdateAckIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmNgLinkBreak\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcInitAccessRejGnbMpLoad\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnNodeConfigUpdateOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmPagRanIntraGnbTrig\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcInactLevelSamp\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcSgnbAdditionRequest\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcPSCellChangeRejInInterGnbBbIntens\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateFailIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmNrdcInitAccessRejUeAdmission\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnNodeConfigUpdateFailIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmNrdcPSCellChangeRejInInterGnbUeAdmission\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2ConfigUpdateAckOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcConnLevelSumEnDc\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcUeSupportGnssLocation\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcConnLevelMaxSa\",\"counter_type\":{\"type\":\"string\",\"default\":\"Single\"},\"type\":\"int\"},{\"name\":\"pmXnSetupFailIn\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcPSCellChangeRejInInterGnbUeAdmission\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcInactLevelSum\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmXnSetupRequestOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcUeMeasurementReportMdt\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcUeMeasurementReport\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcInactLevelMax\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmEndcX2SetupFailOut\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}},{\"name\":\"pmRrcConnLevelMaxEnDc\",\"counter_type\":{\"type\":\"string\",\"default\":\"PDF\"},\"type\":{\"type\":\"array\",\"items\":\"int\"}}]}}]}"
            }
        const head = {
            headers: {
                accept: "application/json, text/plain, */*",
                "content-type": "application/vnd.schemaregistry.v1+json",
            }
        }
        const Response = http.post(SR_BASE +"/subjects/"+subject+"/versions",JSON.stringify(data), head);
        registerSchema.add(Response.timings.duration);

        if(Response.status!=200){
            console.log("Response status received is "+Response.status);
            for(let j= 1; j <= maxRetries; j++){
                console.log("Retry num "+j)
                Response = http.post(SR_BASE +"/subjects/"+subject+"/versions",JSON.stringify(data), head);
                console.log("New response status received is "+Response.status);
                if(Response.status==200)
                {
                    registerSchema.add(Response.timings.duration);
                break;
                }
            }
        }
        try{
        const result = check(Response, {
            'Successfully registered schema': (r) => Response.status === 200,
            'Response should return registered schema details': (r) => Response.body.includes("id"),
        });
        if (!result) {
            console.error("Register a new schema failed, status is "+Response.status)
            console.error("Register a new schema failed, body is "+Response.body)
          }
        }catch(error){
            console.error("Register a new schema failed, status is "+Response.status)
            console.error("Register a new schema failed, body is "+Response.body)
        }
    })
})
}
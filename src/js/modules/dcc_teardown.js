import http from 'k6/http';
import { CATALOG_V1_BASE, DCC_BASE } from "./endpoints.js";
import { subscription } from './dcc_constant.js';
import { prefix } from './setup_constant.js';


/*This function deletes the input data specification from data catalog*/
export function deleteIds(stage){
    console.log("Delete subscription ")
    const Response1 = http.get(CATALOG_V1_BASE + 'subscriptions?status=Active');
    if(Response1.status==200){
    const body=JSON.parse(Response1.body);
    if (body.length===0)
    {  
        console.log(stage+":: No Subscription, nothing to delete");
    }
    else
    {
        let filteredArray = body.filter(obj => {
            return typeof obj.name === "string" && obj.name.startsWith(prefix);
            });   
    const namesArray = filteredArray.map(obj => obj.ids.rAppId);
    console.log(stage+":: Array names "+namesArray);
    const uniqueNumbers = Array.from(new Set(namesArray));
    console.log(stage+":: Unique numbers "+uniqueNumbers);
    for (let i = 0; i < uniqueNumbers.length; i++) {  
    const Response = http.del(DCC_BASE +"/subscription/v1/"+uniqueNumbers[i], null);
    console.info(stage+":: Response body for deleting subscription is "+Response.body)
    console.info(stage+":: Response status for subscription IDS is "+Response.status)
}
}
}
else{
console.error(stage+":: subscription retrieve failed, body is "+Response1.body);
console.error(stage+":: subscription retrieve failed, status is "+Response1.status);
}
}
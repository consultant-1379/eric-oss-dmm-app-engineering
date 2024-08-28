import http from 'k6/http';
import { SR_BASE } from "./endpoints.js";
import { prefix } from "./setup_constant.js";

/*This function deletes the subject from the schema registry  created as part of setup and use cases*/
export function deleteSubject(stage){
    console.log(stage+":: Delete subject in schema registry")
    const Response1 = http.get(SR_BASE +"/subjects/");
    if(Response1.status==200){
    const body = JSON.parse(Response1.body);
    if (body.length===0){  //Checking if there are any subjects, if not print and come out
    console.log(stage+":: No Subjects, nothing to delete");
    }
    else
    {
    let filteredArray = body.filter(function(value) {
        return value.startsWith(prefix);
      });
      const list = filteredArray
    for (let i = 0; i < list.length; i++) {  
    const Response = http.del(SR_BASE +"/subjects/"+list[i], null);
    if(Response.status!=204){
    console.error(stage+":: Response body for deleting subject is "+Response.body)
    console.error(stage+":: Response status for deleting subject is "+Response.status)
    }
    const Response2 = http.del(SR_BASE +"/subjects/"+list[i]+"?permanent=true", null);
    if(Response2.status!=204){
    console.error(stage+":: Response body for permanently deleting subject is "+Response2.body)
    console.error(stage+":: Response status for permanently deleting subject is "+Response2.status)
    }
    }
 }
    }
    else{
        console.error(stage+":: Failed to delete the subject");
        console.error(stage+":: Subject deletion failed, body is "+Response1.body);
        console.error(stage+":: Subject deletion failed, status is "+Response1.status);
        
    }
}
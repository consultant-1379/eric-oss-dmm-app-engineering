import http from 'k6/http';
import { CATALOG_V1_BASE, DC_GAS_URL,CATALOG_V2_BASE } from "./endpoints.js";
import { prefix } from "./setup_constant.js";
import { files_prefix } from "./files_constant.js";
import { streams_prefix } from "./streams_constant.js";
import { all_dataSpaces } from './common_variable.js';

/*This function deletes the message bus and bulk data repository from data catalog via external endpoint*/
export function deleteBdrMbExternal(access_token, stage){
    const head = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    };
    console.log(stage+":: Deleting BDR and MB external")
    let BULK_DATA_REPOSITORY = http.get(DC_GAS_URL + '/catalog/v1/bulk-data-repository/', head);
    console.log(stage+":: Status of query BDR to delete BDR external is "+BULK_DATA_REPOSITORY.status);
    console.log(stage+":: Body of query BDR to delete BDR external is "+BULK_DATA_REPOSITORY.body);
    if(BULK_DATA_REPOSITORY.status==200){
    const body = JSON.parse(BULK_DATA_REPOSITORY.body);
    if (body.length===0)
    {  
        console.log(stage+":: No external BDR, nothing to delete");
    }
    else
    {
    let filteredArray = body.filter(obj => {
       let values=obj.accessEndpoints;
       return values.some(value => typeof value === "string" && value.startsWith(prefix));
       });
       let list=filteredArray;
       let key = "id";
    let valuesArray = list.map(obj => obj[key]);
    for (let i = 0; i < valuesArray.length; i++) {
    BULK_DATA_REPOSITORY = http.del(CATALOG_V1_BASE + 'bulk-data-repository/' + valuesArray[i], null);
    if(BULK_DATA_REPOSITORY.status!=204){
        console.error(stage+":: BULK_DATA_REPOSITORY external delete failed, body is "+BULK_DATA_REPOSITORY.body);
        console.error(stage+":: BULK_DATA_REPOSITORY external delete failed, status is "+BULK_DATA_REPOSITORY.status);
        }
    }
    }
}
else {
console.error(stage+":: Failed to delete BDR external");
console.error(stage+":: BULK_DATA_REPOSITORY external retrieve failed, body is "+BULK_DATA_REPOSITORY.body);
console.error(stage+":: BULK_DATA_REPOSITORY external retrieve failed, status is "+BULK_DATA_REPOSITORY.status);
}

    let MESSAGE_BUS = http.get(DC_GAS_URL + '/catalog/v1/message-bus/', head);
    if(MESSAGE_BUS.status==200){
    const message_bus_body = JSON.parse(MESSAGE_BUS.body);
    if (message_bus_body.length===0)
    {  
      console.log(stage+":: No external MB, nothing to delete");
    }
    else
    {
    let message_bus_filteredArray = message_bus_body.filter(obj => {
        let message_bus_values=obj.accessEndpoints;
        return message_bus_values.some(value => typeof value === "string" && value.startsWith(prefix));
        });
        let message_bus_list=message_bus_filteredArray;
        let message_bus_key = "id";
     let message_bus_valuesArray = message_bus_list.map(obj => obj[message_bus_key]);
     for (let i = 0; i < message_bus_valuesArray.length; i++) {
    MESSAGE_BUS = http.del(CATALOG_V1_BASE + 'message-bus/' + message_bus_valuesArray[i], null);
    if(MESSAGE_BUS.status!=204){
    console.error(stage+":: MESSAGE_BUS delete external failed, body is "+MESSAGE_BUS.body);
    console.error(stage+":: MESSAGE_BUS delete external failed, status is "+MESSAGE_BUS.status);
    }
    }
    }
}
else {
    console.error(stage+":: Failed to delete MBdeleteBdrMbInternal external");
    console.error(stage+":: Message Bus external retrieve failed, body is "+MESSAGE_BUS.body);
    console.error(stage+":: Message Bus external retrieve failed, status is "+MESSAGE_BUS.status);
    }
}

/*This function deletes the message bus and bulk data repository from data catalog*/
export function deleteBdrMbInternal(stage){
    console.log(stage+":: Deleting BDR and MB internal")
    let BULK_DATA_REPOSITORY = http.get(CATALOG_V1_BASE + 'bulk-data-repository/');
    console.log(stage+":: Status of query BDR to delete BDR internal is "+BULK_DATA_REPOSITORY.status);
    console.log(stage+":: Body of query BDR to delete BDR internal is "+BULK_DATA_REPOSITORY.body);
    if(BULK_DATA_REPOSITORY.status==200){
    const body = JSON.parse(BULK_DATA_REPOSITORY.body);
    if (body.length===0)
    {  
        console.log(stage+":: No internal BDR, nothing to delete");
        }
    else
    {
       let filteredArray = body.filter(obj => {
       let values=obj.accessEndpoints;
       return values.some(value => typeof value === "string" && value.startsWith(prefix));
       });
       let list=filteredArray;
       let key = "id";
    let valuesArray = list.map(obj => obj[key]);
    for (let i = 0; i < valuesArray.length; i++) {
    BULK_DATA_REPOSITORY = http.del(CATALOG_V1_BASE + 'bulk-data-repository/' + valuesArray[i], null);
    if(BULK_DATA_REPOSITORY.status!=204){
        console.error(stage+":: BULK_DATA_REPOSITORY internal delete failed, body is "+BULK_DATA_REPOSITORY.body);
        console.error(stage+":: BULK_DATA_REPOSITORY internal delete failed, status is "+BULK_DATA_REPOSITORY.status);
        }
      }
    }
    }
   else{
    console.error(stage+":: Failed to delete BDR internal");
    console.error(stage+":: BULK_DATA_REPOSITORY internal retrieve failed, body is "+BULK_DATA_REPOSITORY.body);
    console.error(stage+":: BULK_DATA_REPOSITORY internal retrieve failed, status is "+BULK_DATA_REPOSITORY.status);
  }
    
    let MESSAGE_BUS = http.get(CATALOG_V1_BASE + 'message-bus/');
    if(MESSAGE_BUS.status==200){
    const message_bus_body = JSON.parse(MESSAGE_BUS.body);
    if (message_bus_body.length===0)
    {  
        console.log(stage+":: No internal MB, nothing to delete");
        }
    else
    {
    let message_bus_filteredArray = message_bus_body.filter(obj => {
        let message_bus_values=obj.accessEndpoints;
        return message_bus_values.some(value => typeof value === "string" && value.startsWith(prefix));
        });
        let message_bus_list=message_bus_filteredArray;
        let message_bus_key = "id";
     let message_bus_valuesArray = message_bus_list.map(obj => obj[message_bus_key]);
    for (let i = 0; i < message_bus_valuesArray.length; i++) {
    MESSAGE_BUS = http.del(CATALOG_V1_BASE + 'message-bus/' + message_bus_valuesArray[i], null);
    if(MESSAGE_BUS.status!=204){
        console.error(stage+":: MESSAGE_BUS internal delete failed, body is "+MESSAGE_BUS.body);
        console.error(stage+":: MESSAGE_BUS internal delete failed, status is "+MESSAGE_BUS.status);
        }
     }
    }
}
    else{
    console.error(stage+":: Failed to delete Message Bus internal");
    console.error(stage+":: MESSAGE_BUS internal retrieve failed, status is "+MESSAGE_BUS.status);
    console.error(stage+":: MESSAGE_BUS internal retrieve failed, body is "+MESSAGE_BUS.body);
    }
 }

 /*This function deletes the message schema*/
export function deleteMessageSchema(stage){
    const MESSAGE_SCHEMA = http.get(CATALOG_V1_BASE + 'data-space'); //Retrives all the registered message Schemas
    console.log(stage+":: Status of query data space to delete message schema is "+MESSAGE_SCHEMA.status);
    console.log(stage+":: Body of query data space to delete message schema is "+MESSAGE_SCHEMA.body);
    if(MESSAGE_SCHEMA.status==200){
    const body = JSON.parse(MESSAGE_SCHEMA.body);
    if (body.length===0){  //Checking if there are any messages schemas, if not print and come out
    console.log(stage+":: No Message Schema, nothing to delete");
    }
    else
    {
        body.forEach(value => { //Traverse through whole body of JSON
        let dataspacename=value.name;
        if (dataspacename.startsWith(streams_prefix)) //Check if the registered message schema is done from App. Engg.
        {
            let dataproviderid=value.dataProviderTypeIds //Fetch dataProviderTypeId for resp. Message Schema
            console.log(stage+":: Deleting dataproviderid: "+dataproviderid[0]);
            let DATA_PROVIDER_TYPE = http.del(CATALOG_V2_BASE + 'data-provider-type/' + dataproviderid[0], null); //Delete dataProviderTypeId
            if(DATA_PROVIDER_TYPE.status!=204){
            console.error(stage+":: Delete message schema, body is  :" +DATA_PROVIDER_TYPE.body);
            console.error(stage+":: Delete message schema, status is  : "+DATA_PROVIDER_TYPE.status);
            }
        }
        else{
            console.log(stage+":: No Message Schema from App. Engg. to delete, Dataspace name is "+dataspacename); //If registered message schema is not from App. Engg. then print and come out
            }
    });
    }
}
else {
    console.error(stage+":: Failed to delete message schema, body is  :" +MESSAGE_SCHEMA.body);
    console.error(stage+":: Failed to delete message schema, status is  : "+MESSAGE_SCHEMA.status);
}
}

/*This function fetches the dataprovider id using the dataspace*/
export function query(dataSpace){
    const FILE_FORMAT = http.get(CATALOG_V2_BASE + 'data-provider-type?dataSpace='+dataSpace);
    if (FILE_FORMAT.status!=200){  //Checking if there are any dataprovider id, if not print and come out
        console.log("No dataprovider id for specified data space: "+dataSpace);
        }
    else
    {
    const body = JSON.parse(FILE_FORMAT.body);
    const dataproviderid = body[0].id; 
    return dataproviderid;
    }
}

/*This function deletes the file format using data provider type id*/
export function deleteFileFormat(stage){

    if(all_dataSpaces.length!==0){
     for (let i=0; i<all_dataSpaces.length; i++)
     {
         let data_provider_id=query(all_dataSpaces[i])
         if(data_provider_id){
             let DATA_PROVIDER_TYPE = http.del(CATALOG_V2_BASE + 'data-provider-type/' + data_provider_id, null);
             if(DATA_PROVIDER_TYPE.status!=204){
             console.error(stage+":: Delete dataspace file format data provider type body is  :" +DATA_PROVIDER_TYPE.body);
             console.error(stage+":: Delete dataspace file format data provider type status is  : "+DATA_PROVIDER_TYPE.status);
             }
         }
     }
     const FILE_FORMAT = http.get(CATALOG_V1_BASE + 'data-space'); //Retrives all the registered file format
     console.log(stage+":: Status of query data space to delete file format is "+FILE_FORMAT.status);
     console.log(stage+":: Body of query data space to delete file format is "+FILE_FORMAT.body);
     if(FILE_FORMAT.status==200){
     const body = JSON.parse(FILE_FORMAT.body);
     if (body.length===0){  //Checking if there are any messages schemas, if not print and come out
     console.log(stage+":: No file format, nothing to delete");
     }
     else
     {
         body.forEach(value => { //Traverse through whole body of JSON
         let dataspacename=value.name;
         if (dataspacename.startsWith(files_prefix)) //Check if the registered file format is done from App. Engg.
         {
             let dataproviderid=value.dataProviderTypeIds //Fetch dataProviderTypeId for resp. Message Schema
             let DATA_PROVIDER_TYPE = http.del(CATALOG_V2_BASE + 'data-provider-type/' + dataproviderid[0], null); //Delete dataProviderTypeId
             if(DATA_PROVIDER_TYPE.status!=204){
                 console.error(stage+":: Delete file format, body is  :" +DATA_PROVIDER_TYPE.body);
                 console.error(stage+":: Delete file format, status is  : "+DATA_PROVIDER_TYPE.status);
             }
         else{
             console.log(stage+":: No file format from App. Engg. to delete,  Dataspace name is "+dataspacename); //If registered file format is not from App. Engg. then print and come out
         }
     }
     });
     }
 }
   else {
     console.error(stage+":: Failed to delete file format, body is  :" +FILE_FORMAT.body);
     console.error(stage+":: Failed to delete file format, status is  : "+FILE_FORMAT.status);
 }
 }
 else{
     console.log(stage+":: No file format records to delete")
 }
 }
import http from 'k6/http';
import { OSM_BASE } from "./endpoints.js";
import { osm_bucket,osm_srvice_token,osm_bucket_revoke,osm_service_account_revoke,osm_service_account,osm_bucket_grant,osm_service_account_grant, osm_clientid, osm_clientid_grant, osm_bucket_revoke_clientid, osm_clientid_revoke, osm_bucket_grant_clientid } from "./osm_constant.js";

   
   /*This function deletes the bucket  that is created as part of the use case to register the bucket name*/
    export function deleteBucketOsm(stage){
        let del_bucket = http.del(OSM_BASE + '/v1/buckets/'+osm_bucket, null);
        if(del_bucket.status!=204){
          console.error(stage+":: Failed to delete bucket, body is  :" +del_bucket.body);
          console.error(stage+":: Failed to delete bucket,  status is  :" +del_bucket.status);
 }
 }
     /*This function deletes the service account  that is created as part of the use case to register the service account*/
 export function deleteServiceAccountOsm(stage){   
         let del_serviceaccount = http.del(OSM_BASE + '/v1/clients/'+osm_service_account+'?clientType=service', null);
         if(del_serviceaccount.status!=204){
          console.error(stage+":: Failed to delete service account, body is  :" +del_serviceaccount.body);
          console.error(stage+":: Failed to delete service account,  status is  :" +del_serviceaccount.status);
 }
 }
 /*This function deletes the service account and bucket  that is created as part of the use case to grant the permission*/
 export function deleteServiceAccountBucketGrantOsm(stage){
     let del_bucket_grant = http.del(OSM_BASE + '/v1/buckets/'+osm_bucket_grant, null);
     if(del_bucket_grant.status!=204){
         console.error(stage+":: Failed to delete bucket for grant, body is  :" +del_bucket_grant.body);
         console.error(stage+"::  Failed to delete bucket for grant,  status is  :" +del_bucket_grant.status);
 }
     let del_serviceaccount_grant = http.del(OSM_BASE + '/v1/clients/'+osm_service_account_grant+'?clientType=service', null);
     if(del_serviceaccount_grant.status!=204){
         console.error(stage+":: Failed to delete service account for grant, body is  :" +del_serviceaccount_grant.body);
         console.error(stage+"::  Failed to delete service account for grant,  status is  :" +del_serviceaccount_grant.status);
 }
 }
 /*This function deletes the service account and bucket  that is created as part of the use case to revoke the permission*/
 export function deleteServiceAccountBucketRevokeOsm(stage){
     let del_bucket_revoke = http.del(OSM_BASE + '/v1/buckets/'+osm_bucket_revoke, null);
     if(del_bucket_revoke.status!=204){
         console.error(stage+":: Failed to delete bucket for revoke, body is  :" +del_bucket_revoke.body);
         console.error(stage+"::  Failed to delete bucket for revoke,  status is  :" +del_bucket_revoke.status);
 }
     let del_serviceaccount_revoke = http.del(OSM_BASE + '/v1/clients/'+osm_service_account_revoke+'?clientType=service', null);
     if(del_serviceaccount_revoke.status!=204){
         console.error(stage+":: Failed to delete service account for revoke, body is  :" +del_serviceaccount_revoke.body);
         console.error(stage+"::  Failed to delete service account for revoke,  status is  :" +del_serviceaccount_revoke.status);
 }
 }
     /*This function deletes the service account  that is created as part of the use case to query the secret*/
 export function deleteServiceAccountQuerySecretOSm(stage){   
     let del_serviceaccount_secret = http.del(OSM_BASE + '/v1/clients/'+osm_srvice_token+'?clientType=service', null);
     if(del_serviceaccount_secret.status!=204){
      console.error(stage+":: Failed to delete service account, body is  :" +del_serviceaccount_secret.body);
      console.error(stage+":: Failed to delete service account,  status is  :" +del_serviceaccount_secret.status);
 }
 }
 /*This function deletes the clientid that is created as part of the use case to register the clientid for rApp*/
 export function deleteClientidOsm(stage){   
    let del_clientid = http.del(OSM_BASE + '/v1/clients/'+osm_clientid+'?clientType=rApp', null);
    if(del_clientid.status!=204){
     console.error(stage+":: Failed to delete clientid for rApp, body is  :" +del_clientid.body);
     console.error(stage+":: Failed to delete clientid for rAppt,  status is  :" +del_clientid.status);
}
}
/*This function deletes the clientid for Rapp and bucket  that is created as part of the use case to grant the permission*/
export function deleteClientidBucketGrantOsm(stage){
let del_clientid_bucket_grant = http.del(OSM_BASE + '/v1/buckets/'+osm_bucket_grant_clientid, null);
if(del_clientid_bucket_grant.status!=204){
    console.error(stage+":: Failed to delete bucket for client for rApp grant, body is  :" +del_clientid_bucket_grant.body);
    console.error(stage+"::  Failed to delete bucket for client for rApp grant,  status is  :" +del_clientid_bucket_grant.status);
}
let del_clientid_grant = http.del(OSM_BASE + '/v1/clients/'+osm_clientid_grant+'?clientType=rApp', null);
if(del_clientid_grant.status!=204){
    console.error(stage+":: Failed to delete for client for rApp grant, body is  :" +del_clientid_grant.body);
    console.error(stage+"::  Failed to delete for client for rApp grant,  status is  :" +del_clientid_grant.status);
}
}
/*This function deletes the service account and bucket  that is created as part of the use case to revoke the permission*/
export function deleteClientidBucketRevokeOsm(stage){
let del_bucket_revoke = http.del(OSM_BASE + '/v1/buckets/'+osm_bucket_revoke_clientid, null);
if(del_bucket_revoke.status!=204){
    console.error(stage+":: Failed to delete bucket clientid for rApp revoke, body is  :" +del_bucket_revoke.body);
    console.error(stage+"::  Failed to delete bucket clientid for rApp revoke,  status is  :" +del_bucket_revoke.status);
}
let del_serviceaccount_revoke = http.del(OSM_BASE + '/v1/clients/'+osm_clientid_revoke+'?clientType=rApp', null);
if(del_serviceaccount_revoke.status!=204){
    console.error(stage+":: Failed to delete clientid for rApp  revoke, body is  :" +del_serviceaccount_revoke.body);
    console.error(stage+"::  Failed to delete clientid for rApp  revoke,  status is  :" +del_serviceaccount_revoke.status);
}
}

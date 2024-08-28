import http from 'k6/http';
import { OSM_BASE } 
    from '../modules/endpoints.js';
import { osm_srvice_token,osm_bucket_revoke_clientid,osm_grant_revoke,osm_bucket_grant_clientid,osm_service_account_delete,osm_bucket_delete,osm_service_account_grant,osm_bucket_grant,osm_service_account_revoke,osm_bucket_revoke, osm_clientid_delete, osm_clientid_grant, osm_clientid_revoke } 
    from '../modules/osm_constant.js';

/*This method creates a service account to delete*/
export function createServiceAccountDelete(stage){
const osm = http.post( OSM_BASE + '/v1/clients/'+osm_service_account_delete+'?clientType=service');
 if(osm.status!=201){
    console.error(stage+"::failed to creating a service account for delete, status is"+osm.status);
    console.error(stage+"::failed to creating a service account for delete, body is"+osm.body);
}
}
/*This method creates a service account to query the secret*/
export function createServiceAccountQuerySecret(stage){
  const osm = http.post( OSM_BASE + '/v1/clients/'+osm_srvice_token+'?clientType=service');
   if(osm.status!=201){
      console.error(stage+"::failed to creating a service account for query secret, status is"+osm.status);
      console.error(stage+"::failed to creating a service account for query secret, body is"+osm.body);
  }
  }
/*This method creates a bucket*/
export function createBucketDelete(stage){
const osm_data = [{
    "quota": "1g",
    "retentionValidity": "1d",
  }
]
  const head_data = {
    headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
    }
}
const OSM = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket_delete, JSON.stringify(osm_data), head_data);
if(OSM.status!=201){
    console.error(stage+"::failed to creating a bucket for delete, status is"+OSM.status);
    console.error(stage+"::failed to creating a buckett for delete, body is"+OSM.body);
}
}
/*This method creates a service account and bucket  to grant*/
export function createServiceBucketGrant(stage){
    const osm = http.post( OSM_BASE + '/v1/clients/'+osm_service_account_grant+'?clientType=service');
    if(osm.status!=201){
    console.error(stage+"::failed to creating a service account for grant permission  status is"+osm.status);
    console.error(stage+"::failed to creating a service account for grant permission body is"+osm.body);
    }
    const osm_data1= [
        {
        "quota": "1g",
        "retentionValidity": "1d",
      }
    ]
      const head_data1 = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }
    const osm1 = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket_grant, JSON.stringify(osm_data1), head_data1);
    if(osm1.status!=201){
    console.error(stage+"::failed to creating a bucket for grant permission  status is"+osm1.status);
    console.error(stage+"::failed to creating a buket for grant permission  body is"+osm1.body);

}
}
/*This method creates a service account and bucket  to revoke*/
export function createServiceBucketRevoke(stage){
    const osm = http.post( OSM_BASE + '/v1/clients/'+osm_service_account_revoke+'?clientType=service');
    if(osm.status!=201){
    console.error(stage+"::failed to creating a service account for revoke the permission  status is"+osm.status);
    console.error(stage+"::failed to creating a service account for revoke the permission body is"+osm.body);
    }
    const osm_data1= [
        {
        "quota": "1g",
        "retentionValidity": "1d",
      }
    ]
      const head_data1 = {
        headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
        }
    }
    const osm1 = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket_revoke, JSON.stringify(osm_data1), head_data1);
    if(osm1.status!=201){
    console.error(stage+"::failed to creating a bucket for revoke the permission status is"+osm1.status);
    console.error(stage+"::failed to creating a bucket for revoke the permission body is"+osm1.body);

}
const bucket_grant = http.post( OSM_BASE + '/v1/clients/'+osm_service_account_revoke+'/bucket-permissions/'+osm_bucket_revoke+'?clientType=service&permission=readWrite')
if(bucket_grant.status!=201){
console.error(stage+"::failed to osm grant permission for revoke bucket status"+bucket_grant.status)
console.error(stage+"::failed to osm grant permission for revoke bucket body"+bucket_grant.body)
}
}
/*This method creates a clientid to delete*/
export function creatClientidDelete(stage){
  const osm = http.post( OSM_BASE + '/v1/clients/'+osm_clientid_delete+'?clientType=rApp');
   if(osm.status!=201){
      console.error(stage+"::failed to creating a clientid for rApp to delete, status is"+osm.status);
      console.error(stage+"::failed to creating a clientid for rApp to delete, body is"+osm.body);
  }
  }
  /*This method creates a clientid and bucket  to grant*/
export function createClientidBucketGrant(stage){
  const osm = http.post( OSM_BASE + '/v1/clients/'+osm_clientid_grant+'?clientType=rApp');
  if(osm.status!=201){
  console.error(stage+"::failed to creating  clientid for rApp grant permission  status is"+osm.status);
  console.error(stage+"::failed to creating  clientid for rApp grant permission body is"+osm.body);
  }
  const osm_data1= [
      {
      "quota": "1g",
      "retentionValidity": "1d",
    }
  ]
    const head_data1 = {
      headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
      }
  }
  const osm1 = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket_grant_clientid, JSON.stringify(osm_data1), head_data1);
  if(osm1.status!=201){
  console.error(stage+"::failed to creating bucket to clientid for rApp grant permission  status is"+osm1.status);
  console.error(stage+"::failed to creating bucket to clientid for rApp grant permission  body is"+osm1.body);

}
}
/*This method creates a service account and bucket  to revoke*/
export function createClientidBucketRevoke(stage){
  const osm = http.post( OSM_BASE + '/v1/clients/'+osm_clientid_revoke+'?clientType=rApp');
  if(osm.status!=201){
  console.error(stage+"::failed to creating a clientid for rApp revoke the permission  status is"+osm.status);
  console.error(stage+"::failed to creating a clientid for rApp revoke the permission body is"+osm.body);
  }
  const osm_data1= [
      {
      "quota": "1g",
      "retentionValidity": "1d",
    }
  ]
    const head_data1 = {
      headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
      }
  }
  const osm1 = http.post( OSM_BASE+'/v1/buckets/'+osm_bucket_revoke_clientid, JSON.stringify(osm_data1), head_data1);
  if(osm1.status!=201){
  console.error(stage+"::failed to creating a bucket clientid for rApp revoke the permission status is"+osm1.status);
  console.error(stage+"::failed to creating a bucket clientid for rApp revoke the permission body is"+osm1.body);

}
const bucket_grant_clientid = http.post( OSM_BASE + '/v1/clients/'+osm_clientid_revoke+'/bucket-permissions/'+osm_bucket_revoke_clientid+'?clientType=rApp&permission=readWrite')
if(bucket_grant_clientid.status!=201){
console.error(stage+"::failed to osm grant permission clientid for rApp revoke bucket status"+bucket_grant_clientid.status)
console.error(stage+"::failed to osm grant permission clientid for rApp revoke bucket body"+bucket_grant_clientid.body)
}
}

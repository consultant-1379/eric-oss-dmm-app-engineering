import http from 'k6/http';
import { app_client_id, app_client_psw } from "./common_variable.js";
import { EIC_URL, GAS_URL, IAM_URL } from "./endpoints.js";
/*This function assigns roles to client*/
export function createClientAndAssignRolesToClient(access_token) {
    
     const data = {
      "clientId": app_client_id,
      "enabled": true,
      "attributes": {
          "ExternalClient": "True",
          "access.token.lifespan": 1800
      },
      "serviceAccountsEnabled": true,
      "standardFlowEnabled": false,
      "secret": app_client_psw,
      "protocolMappers": [
          {
              "config": {
                  "id.token.claim": "true",
                  "access.token.claim": "true",
                  "included.custom.audience": "kafka"
              },
              "name": "kafkaAd",
              "protocol": "openid-connect",
              "protocolMapper": "oidc-audience-mapper"
          },
          {
              "config": {
                  "claim.value": app_client_id,
                  "userinfo.token.claim": "true",
                  "id.token.claim": "false",
                  "access.token.claim": "true",
                  "claim.name": "oauth\\.username\\.claim",
                  "jsonType.label": "String"
              },
              "name": "hardcodeclaim",
              "protocol": "openid-connect",
              "protocolMapper": "oidc-hardcoded-claim-mapper"
          }    ]
    }


      const head = {
        headers: {
          "content-type": "application/json",
           Authorization: `Bearer ${access_token}`,
        }
      };

    const createClientResponse = http.post(IAM_URL+"/auth/admin/realms/master/clients", JSON.stringify(data), head);
    if(createClientResponse.status!=201 || createClientResponse.status!=409 ) {
    console.error("Create client response status is "+createClientResponse.status);
    console.error("Create client response body is "+createClientResponse.body);
    }
    

    const response = http.get(IAM_URL+"/auth/admin/realms/master/clients?clientId="+app_client_id, head);
    const parsedResponse = JSON.parse(response.body);
    console.log("Response on getting clientid is "+response.body);
    const clientId = parsedResponse[0].id;
    console.log("Clientid is "+clientId);

    const serviceAccountResponse = http.get(IAM_URL+"/auth/admin/realms/master/clients/"+clientId+"/service-account-user", head);
    const parsedserviceAccountResponse = JSON.parse(serviceAccountResponse.body);
    console.log("Response on getting service account id is "+serviceAccountResponse.body);
    const serviceAccountId = parsedserviceAccountResponse.id;
    console.log("Service account id is "+serviceAccountId);

    const rolesResponse = http.get(IAM_URL+"/auth/admin/realms/master/roles", head);
    const parsedRolesResponse = JSON.parse(rolesResponse.body);
    console.log("Response on getting roles is "+rolesResponse.body);
    const key = "name";
    const values = ["OSSPortalAdmin","DataCatalogAdmin","DataCatalog_Application_ReadOnly","DataCatalog_Producer_Application_Operator","SchemaRegistry_Producer_Application_Operator","SchemaRegistry_Consumer_Application_Operator","DataCollectionControl_Subscriber_Application_Operator"];
    const desiredRoles = parsedRolesResponse.filter(obj => values.includes(obj[key]));
    console.log("Desired roles are "+JSON.stringify(desiredRoles));

    const assignRolesResponse = http.post(IAM_URL+"/auth/admin/realms/master/users/"+serviceAccountId+"/role-mappings/realm",JSON.stringify(desiredRoles), head);
    if(assignRolesResponse.status!=204){
    console.error("Assign roles response status is "+assignRolesResponse.status);
    console.error("Assign roles response body is "+assignRolesResponse.body);
    }


  }

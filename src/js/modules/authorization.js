import http from 'k6/http';
import { app_client_id , app_client_psw , kc_admin_id, kc_password} from "./common_variable.js";
import { IAM_URL , EIC_URL, GAS_URL} from "./endpoints.js";
import { logCookie } from "./common_function.js";
/*This function authorizes the client*/
export function authorize() {
    
    const data = {
        "client_id": app_client_id,
        "client_secret": app_client_psw,
        "grant_type": "client_credentials",
      }
    const head = {
      headers: {
         "content-type": "application/x-www-form-urlencoded",
      },
    };
    
    let response = http.post(IAM_URL+"/auth/realms/master/protocol/openid-connect/token", data);
    const parsedBody = JSON.parse(response.body);
    console.log("Response body for access token is "+response.body);
    //console.log("Response status for access token is "+response.status);
    return parsedBody.access_token
    }

/*This function authorizes the kc-user*/
  export function authorize_KcUser() {
    console.log("Authorizing kc user with "+kc_admin_id+" and "+kc_password);
    const data = {
        "username": kc_admin_id,
        "password": kc_password,
        "grant_type": "password",
        "client_id": "admin-cli"
      }
    const head = {
      headers: {
         "content-type": "application/x-www-form-urlencoded",
      },
    };
    
    const response = http.post(IAM_URL+"/auth/realms/master/protocol/openid-connect/token", data);
    const parsedBody = JSON.parse(response.body);
    console.log("Response body of access token for KC user is "+response.body);
    //console.log("Response status for access token is "+response.status);
    return parsedBody.access_token
    }
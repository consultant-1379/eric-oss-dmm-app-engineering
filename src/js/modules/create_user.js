import http from 'k6/http';
import {USER_MGMT_URL} from './endpoints.js';
import {newUserName} from './user_mgmt_constant.js';

export  function createNewUser(session_Id) {
    /*This use case creates a new user with roles assigned*/
            const head = {
                headers: {
                    'content-type' : 'application/json',
                   cookie: session_Id
                }
           };
           const data = {
            "user": {
                "username": newUserName,
                "privileges": [
                    "SchemaRegistryAdmin",
                    "DataCatalogAdmin"
                ],
                "status": "ENABLED"
            },
            "password": "Ericsson123!",
            "passwordResetFlag": false
        }
        const Response = http.post(USER_MGMT_URL, JSON.stringify(data), head);
        console.log("Creation of new user, status is "+Response.status);
  	    console.log("Creation of new user, body is "+Response.body)
}
import {ms_dataSpace,dataSpace,ms_ran_dataSpace}
    from './setup_constant.js';
export const load_percentage = `${__ENV.LOAD_PERCENTAGE}`
export const bootstrap_external = `${__ENV.BOOTSTRAP_EXTERNAL}`+':443'
export const app_client_id = `${__ENV.APP_CLIENT_ID}`
export const app_client_psw = `${__ENV.APP_CLIENT_PSW}`
export const kc_admin_id = `${__ENV.KC_ADMIN_ID}`
export const kc_password = `${__ENV.KC_PASSWD}`
export const message_count = `${__ENV.MESSAGE_COUNT}`;
export const sharedData={
                            active_rappId:null,
                            max_messagebus_Id:null,
                            max_bdr_Id:null,
                            forty_bdr_Id:null,
                            forty_messagebus_Id:null,
                            messageBusId_files:null,
                            messageBusId_streams:null,
                            predicateParameterName:null,
                            access_token:null,
                            kcaccess_token:null
                        }
export const all_dataSpaces = [ms_dataSpace, dataSpace, ms_ran_dataSpace]
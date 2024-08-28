import exec from 'k6/execution';
import data_catalog_retrieve_data_space from "./use_cases/data_catalog_retrieve_data_space_internal.js";
import data_catalog_query_kafka_details_streams_internal from "./use_cases/data_catalog_query_kafka_details_streams_internal.js";
import data_catalog_query_subscriptions_notification_message_data_topic_external from "./use_cases/data_catalog_query_subscriptions_notification_message_data_topic_external.js";
import data_catalog_retrive_subscription_external from "./use_cases/data_catalog_retrive_subscription_external.js";
import data_catalog_retrive_subscription_internal from "./use_cases/data_catalog_retrive_subscription_internal.js";
import data_catalog_retrieve_data_provider_type from "./use_cases/data_catalog_retrieve_data_provider_type_internal.js";
import schema_registry_delete from "./use_cases/schema_registry_delete_subject_internal.js";
import data_catalog_add_metadata from "./use_cases/data_catalog_add_metadata_internal.js";
import data_catalog_delete_BDR from "./use_cases/data_catalog_delete_BDR_internal.js";
import data_catalog_delete_message_bus from "./use_cases/data_catalog_delete_message_bus_internal.js";
import data_catalog_register_file_format from "./use_cases/data_catalog_register_file_format_internal.js";
import data_catalog_register_message_schema from "./use_cases/data_catalog_register_message_schema_internal.js";
import schema_registry_register_schema from "./use_cases/schema_registry_register_schema_internal.js";
import schema_registry_retrieve_schema from "./use_cases/schema_registry_retrieve_schema_internal.js";
import schema_registry_retrieve_schema_using_id_ext from "./use_cases/schema_registry_retrieve_schema_using_id_external.js";
import schema_registry_retrieve_schema_using_version_ext from "./use_cases/schema_registry_retrieve_schema_using_version_external.js";
import kafka_native_produce from "./use_cases/kafka_native_produce_internal.js";
import data_collection_create_update_delete_subscription from "./use_cases/data_collection_create_update_delete_subscription_external.js";
import data_collection_create_thirty_subscriptions from "./use_cases/data_collection_create_thirty_subscriptions_external.js";
import data_collection_update_on_hold_subscriptions from "./use_cases/data_collection_update_on_hold_subscriptions_external.js";
import kafka_native_consume from "./use_cases/kafka_native_consume_external.js";
import data_catalog_register_messagebus from "./use_cases/data_catalog_register_messagebus_internal.js";
import data_catalog_register_bdr from "./use_cases/data_catalog_register_bdr_internal.js";
import data_catalog_query_bdr_external from "./use_cases/data_catalog_query_bdr_external.js";
import data_catalog_query_bdr_internal from "./use_cases/data_catalog_query_bdr_internal.js";
import data_catalog_query_message_bus_external from "./use_cases/data_catalog_query_message_bus_external.js";
import data_catalog_query_kafka_details_for_files from "./use_cases/data_catalog_query_kafka_details_files_internal.js";
import data_catalog_query_data_service_instance from "./use_cases/data_catalog_query_data_service_instance_internal.js"
import data_catalog_query_data_service from "./use_cases/data_catalog_query_data_service_internal.js";
import data_catalog_query_data_type from "./use_cases/data_catalog_query_data_type_internal.js";
import data_catalog_query_message_schema from "./use_cases/data_catalog_query_message_schema_internal.js";
import kafka_resource_manager_register_topic from "./use_cases/kafka_resource_manager_register_kafka_topic_internal.js";
import kafka_resource_manager_delete_topic from "./use_cases/kafka_resource_manager_delete_kafka_topic_internal.js";
import kafka_resource_manager_grant_permission from "./use_cases/kafka_resource_manager_grant_permission_kafka_user_internal.js";
import kafka_resource_manager_revoke_permission from "./use_cases/kafka_resource_manager_revoke_permission_kafka_user_internal.js";
import kafka_external_produce from "./use_cases/kafka_external_produce.js";
import kafka_external_consume from "./use_cases/kafka_external_consume.js";
import alarm_management_check from "./use_cases/alarm_management_check_external.js";
import object_storage_manager_delete_bucket_internal from "./use_cases/Minio_OSM/object_storage_manager_delete_bucket_internal.js";
import object_storage_manager_delete_service_account_internal from "./use_cases/Minio_OSM/object_storage_manager_delete_service_account_internal.js";
import object_storage_manager_grant_permission_service_account_internal from "./use_cases/Minio_OSM/object_storage_manager_grant_permission_service_account_internal.js";
import object_storage_manager_revoke_permission_service_account_internal from "./use_cases/Minio_OSM/object_storage_manager_revoke_permission_service_account_internal.js";
import object_storage_manager_register_bucket_internal from "./use_cases/Minio_OSM/object_storage_manager_register_bucket_internal.js";
import object_storage_manager_register_service_account_internal from "./use_cases/Minio_OSM/object_storage_manager_register_service_account_internal.js";
import object_storage_manager_query_secret_for_services_internal from "./use_cases/Minio_OSM/object_storage_manager_query_secret_for_services_internal.js";
import object_storage_manager_register_clientid_internal from "./use_cases/Minio_OSM/object_storage_manager_register_clientid_internal.js";
import object_storage_manager_grant_permission_clientid_internal from "./use_cases/Minio_OSM/object_storage_manager_grant_permission_clientid_internal.js";
import object_storage_manager_revoke_permission_clientid_internal from "./use_cases/Minio_OSM/object_storage_manager_revoke_permission_clientid_internal.js";
import object_storage_manger_delete_clientid_internal from "./use_cases/Minio_OSM/object_storage_manger_delete_clientid_internal.js";
import kafka_functionality from "./use_cases/kafka_functionality.js";
import data_catalog_query_data_type_r1standard_external from "./use_cases/data_catalog_query_data_type_r1standard_external.js";
import data_catalog_query_data_type_r1standard_internal from "./use_cases/data_catalog_query_data_type_r1standard_internal.js";
import data_catalog_register_message_schema_r1standard_internal from "./use_cases/data_catalog_register_message_schema_r1standard_internal.js";
import data_catalog_query_datajob_datatype_r1standard_internal from "./use_cases/data_catalog_query_datajob_datatype_r1standard_internal.js";
import data_catalog_delete_data_service_details_r1standard_internal from "./use_cases/data_catalog_delete_data_service_details_r1standard_internal.js";
import data_collection_register_ods_internal from "./use_cases/data_collection_register_ods_internal.js";
import data_collection_delete_ods_internal from "./use_cases/data_collection_delete_ods_internal.js";
import { deleteKafkaTopic } from "./modules/kafka_teardown.js"
import { option_thresholds,optionScenarios } from "./modules/common_function.js";
import { summary } from "./modules/handlesummary.js";
import { sharedData } from "./modules/common_variable.js";
import { createBdrExternal, getMessageBusIdForFiles, getMessageBusIdForStreams, registerBdr,registerMessageBus,registerMessageSchema,registerDataJob,registerMessageSchemaDeleteDataservice  } from "./modules/data_catalog_setup.js";
import { createFirstLevelMediation, createSecondLevelMediation, createSubscriptionExternal, createSubscriptionExternalForKafkaCertm, createThirdLevelMediation,getActiveRappId,getPredicateParameter,registerOds } from "./modules/dcc_setup.js";
import { configuation } from "./modules/configuration_value.js";
import { createServiceAccountQuerySecret,createServiceAccountDelete,createBucketDelete,createServiceBucketGrant,createServiceBucketRevoke,creatClientidDelete,createClientidBucketGrant,createClientidBucketRevoke} from "./modules/osm_setup.js";
import { deleteBdrMbExternal,deleteBdrMbInternal, deleteFileFormat, deleteMessageSchema } from "./modules/data_catalog_teardown.js";
import { deleteSubject } from "./modules/schema_registry_teardown.js";
import { createSchemas, createSchemasConstantSubject } from "./modules/schema_registry_setup.js";
import { deleteIds } from "./modules/dcc_teardown.js";
import { deleteKafkaTopicForKafkaResourceManager, deleteKafkaTopicForKafkaResourceManagerGrant, deleteKafkaTopicForKafkaResourceManagerRevoke } from "./modules/resource_manager_teardown.js";
import { createKafkaTopic, createKafkaTopicGrant, createKafkaTopicRevoke } from "./modules/resource_manager_setup.js";
import { authorize, authorize_KcUser } from "./modules/authorization.js"
import { createClientAndAssignRolesToClient } from "./modules/role.js"
import { deleteBucketOsm,deleteServiceAccountOsm,deleteServiceAccountBucketGrantOsm,deleteServiceAccountBucketRevokeOsm,deleteServiceAccountQuerySecretOSm, deleteClientidBucketRevokeOsm, deleteClientidBucketGrantOsm, deleteClientidOsm} from "./modules/osm_teardown.js";
import { produceNotificationToKafka } from "./modules/kafka_setup.js";

export function handleSummary(data) {
  const update_thresholds=["Register_new_schema{scenario:schema_registry_register_5_schemas_internal}","Get_schema_string_by_input_id{scenario:schema_registry_get_60_external}","Get_schema_string_by_version{scenario:schema_registry_get_60_external}","Get_schema_string_by_version{scenario:schema_registry_get_60_internal}"];
  data=summary(update_thresholds,data)
  return {
      '/reports/summary.json': JSON.stringify(data),
      // 'stdout': publishSummary(data, {uuid: UUID, startTime: startTime, reportingToolURL: K6_API_URL}),
  };
}
const startTime = Date.now();
// Set the UUID generated by the K6 image as a constant to be used in your code.
const UUID = `${__ENV.UUID}`;
//Set the API url used to publish results to the K6 Reporting Tool
const K6_API_URL = `${__ENV.K6_API_URL}`;


let load_options=optionScenarios()
export const options = {
  thresholds: option_thresholds,
  scenarios: load_options,
  setupTimeout: '180s',
  teardownTimeout: '180s',
};
/*The setup function sets up the data that can be used by use cases*/
export function setup() {
configuation()
const currentStage = "SetUp";
sharedData.kcaccess_token = authorize_KcUser();
createClientAndAssignRolesToClient(sharedData.kcaccess_token);
//sharedData.access_token = authorize();
if(load_options["kafka_native_consume_external"]){
    produceNotificationToKafka()
  }
if(load_options["data_collection_update_on_hold_subscriptions_external"] || load_options["data_collection_create_thirty_subscriptions_external"] || load_options["data_collection_create_update_delete_subscription_external"] || load_options["data_catalog_get_24_user_internal"]|| load_options["data_catalog_get_24_user_external"]|| load_options["data_catalog_get_max_user_external"]|| load_options["data_catalog_get_max_user_internal"]){
  deleteIds(currentStage)
  deleteMessageSchema(currentStage)
  deleteFileFormat(currentStage)
  createFirstLevelMediation()
  createSecondLevelMediation()
  createThirdLevelMediation()
  createSubscriptionExternal()
  sharedData.active_rappId=getActiveRappId()
  sharedData.predicateParameterName=getPredicateParameter()
}
if(load_options["schema_registry_get_60_internal"] || load_options["schema_registry_get_60_external"]){
  deleteSubject(currentStage)
  createSchemas()
}
if(load_options["data_catalog_get_max_user_internal"] || load_options["data_catalog_get_24_user_internal"]){
  deleteBdrMbInternal(currentStage)
  sharedData.messageBusId_files=getMessageBusIdForFiles()
  sharedData.messageBusId_streams=getMessageBusIdForStreams()
}
if(load_options["data_catalog_get_max_user_external"] || load_options["data_catalog_get_24_user_external"]){
  var access_token = authorize();
  deleteBdrMbExternal(access_token, currentStage)
  createBdrExternal()
}
if(load_options["schema_registry_delete_subject_internal"] ){
  createSchemasConstantSubject()
}
if(load_options["kafka_resource_manager_delete_topic_internal"]){
  deleteKafkaTopicForKafkaResourceManager()
  createKafkaTopic() 
}
if(load_options["kafka_resource_manager_grant_permission_kafka_user_internal"]){
  deleteKafkaTopicForKafkaResourceManagerGrant()
  createKafkaTopicGrant() 
}
if(load_options["kafka_resource_manager_revoke_permission_kafka_user_internal"]){
  deleteKafkaTopicForKafkaResourceManagerRevoke()
  createKafkaTopicRevoke() 
}
if(load_options["data_catalog_register_delete_max_user_internal"]){
  sharedData.max_bdr_Id=registerBdr("data_catalog_register_delete_max_user_internal");
  sharedData.max_messagebus_Id=registerMessageBus("data_catalog_register_delete_max_user_internal");
}
if(load_options["data_catalog_register_delete_40_internal"]){
  sharedData.forty_bdr_Id=registerBdr("data_catalog_register_delete_40_internal");
  sharedData.forty_messagebus_Id=registerMessageBus("data_catalog_register_delete_40_internal");
}
if(load_options["kafka_consume_external"]){
  //createSubscriptionExternalForKafkaCertm()
}
if(load_options["object_storage_manager_post_internal"]){
  deleteBucketOsm(currentStage)
  deleteServiceAccountOsm(currentStage)
  deleteServiceAccountBucketGrantOsm(currentStage)
  deleteClientidOsm(currentStage)
  deleteClientidBucketGrantOsm(currentStage)
  createServiceBucketGrant(currentStage)
  createClientidBucketGrant(currentStage)
}
if(load_options["object_storage_manager_delete_internal"]){
  deleteServiceAccountBucketRevokeOsm(currentStage)
  deleteClientidBucketRevokeOsm(currentStage)
  createServiceAccountDelete(currentStage)
  createBucketDelete(currentStage) 
  createServiceBucketRevoke(currentStage)
  creatClientidDelete(currentStage)
  createClientidBucketRevoke(currentStage)
}
if(load_options["object_storage_manager_get_internal"]){
  deleteServiceAccountQuerySecretOSm(currentStage)
  createServiceAccountQuerySecret(currentStage)
}
if(load_options["data_catalog_get_50_user_r1standard_internal"] || ["data_catalog_delete_50_user_r1standard_delete"] || "data_catalog_delete_50_user_r1standard_external" ){
  //registerDataJob(currentStage)
  //registerMessageSchema(currentStage)
  //registerMessageSchemaDeleteDataservice(currentStage)
}
if(load_options[ "data_collection_delete_ODS_50_user_internal"]){
 //registerOds(currentStage)
}
return sharedData;
}
export function data_catalog_add_metadata_internal() {
  data_catalog_add_metadata();
}
export function data_catalog_delete_internal(data) {
  if (exec.scenario.name === 'data_catalog_register_delete_max_user_internal'){
  var access_token = authorize();
  data_catalog_delete_BDR(data.max_bdr_Id.data_catalog_register_delete_max_user_internal,access_token);
  data_catalog_delete_message_bus(data.max_messagebus_Id.data_catalog_register_delete_max_user_internal,access_token);
  }
  if (exec.scenario.name === 'data_catalog_register_delete_40_internal'){
    var access_token = authorize();
    data_catalog_delete_BDR(data.forty_bdr_Id.data_catalog_register_delete_40_internal,access_token);
    data_catalog_delete_message_bus(data.forty_messagebus_Id.data_catalog_register_delete_40_internal,access_token);
    }
    data_catalog_delete_data_service_details_r1standard_internal();
}
export function data_catalog_post_internal() {
  data_catalog_register_messagebus();
  data_catalog_register_bdr();
  //data_catalog_register_message_schema_r1standard_internal();
}
export function data_catalog_register_internal() {
  data_catalog_register_file_format();
  data_catalog_register_message_schema();
}
export function data_catalog_get_internal(data) {
  data_collection_create_thirty_subscriptions();
  data_catalog_query_bdr_internal();
  data_catalog_query_data_service();
  data_catalog_query_data_service_instance();
  data_catalog_query_kafka_details_for_files(data.messageBusId_files);
  data_catalog_retrieve_data_provider_type();
  data_catalog_retrieve_data_space();
  data_catalog_retrive_subscription_internal();
  data_catalog_query_kafka_details_streams_internal(data.messageBusId_streams);
  data_catalog_query_data_type();
  data_catalog_query_message_schema();
  data_catalog_query_data_type_r1standard_internal();
  data_catalog_query_datajob_datatype_r1standard_internal();
}
export function data_catalog_get_external(data) {
  var access_token = authorize();
  data_catalog_query_bdr_external(access_token);
  data_catalog_query_message_bus_external(access_token);
  data_catalog_query_subscriptions_notification_message_data_topic_external(data.active_rappId,access_token);
  data_catalog_retrive_subscription_external(access_token);
  data_catalog_query_data_type_r1standard_external(access_token);
}
export function schema_registry_register_schema_internal() {
  schema_registry_register_schema();
}
export function schema_registry_retrieve_schema_internal() {
  schema_registry_retrieve_schema();
}
export function kafka_native_produce_internal() {
  kafka_native_produce();
}
export function data_collection_create_update_delete_subscription_external(data) {
  var access_token = authorize();
  data_collection_create_update_delete_subscription(access_token,data.predicateParameterName);
  
}
export function data_collection_create_thirty_subscriptions_external(data) {
  var access_token = authorize();
  data_collection_create_thirty_subscriptions(access_token,data.predicateParameterName);
 }
export function data_collection_update_on_hold_subscriptions_external(data) {
  var access_token = authorize();
  data_collection_update_on_hold_subscriptions(access_token,data.predicateParameterName);
}
export function kafka_native_consume_external() {
  kafka_native_consume();
}
export function schema_registry_retrieve_schema_external(data) {
  var access_token = authorize();
  schema_registry_retrieve_schema_using_id_ext(access_token);
  schema_registry_retrieve_schema_using_version_ext(access_token);

}


export function schema_registry_delete_subject_internal() {
  schema_registry_delete();
}
export function kafka_resource_manager_register_topic_internal() {
  kafka_resource_manager_register_topic();
}
export function kafka_resource_manager_delete_topic_internal() {
  kafka_resource_manager_delete_topic();
}
export function kafka_resource_manager_grant_permission_kafka_user_internal() {
  kafka_resource_manager_grant_permission();
}
export function kafka_resource_manager_revoke_permission_kafka_user_internal() {
  kafka_resource_manager_revoke_permission();
}
export function kafka_consume_external() {
  kafka_external_consume();
}
export function kafka_produce_external() {
  kafka_external_produce();
}
export function alarm_management_check_external(data) {
  var access_token = authorize();
  alarm_management_check(access_token);
}
export function object_storage_manager_post_internal() {
  object_storage_manager_grant_permission_service_account_internal();
  object_storage_manager_register_bucket_internal();
  object_storage_manager_register_service_account_internal();
  object_storage_manager_register_clientid_internal();
  object_storage_manager_grant_permission_clientid_internal();
}
export function object_storage_manager_delete_internal(){
  object_storage_manager_delete_bucket_internal();
  object_storage_manager_delete_service_account_internal();
  object_storage_manager_revoke_permission_service_account_internal();
  object_storage_manger_delete_clientid_internal();
  object_storage_manager_revoke_permission_clientid_internal();
}
export function object_storage_manager_get_internal(){
  object_storage_manager_query_secret_for_services_internal();
}
export function functional_usecases_external(data) {
  var access_token = authorize();
  data_catalog_query_bdr_external(access_token);
  data_catalog_query_message_bus_external(access_token);
  data_catalog_query_subscriptions_notification_message_data_topic_external(data.active_rappId,access_token);
  data_catalog_retrive_subscription_external(access_token);
  data_collection_create_update_delete_subscription(access_token,data.predicateParameterName);
  data_collection_create_thirty_subscriptions(access_token,data.predicateParameterName);
  data_collection_update_on_hold_subscriptions(access_token,data.predicateParameterName);
  schema_registry_retrieve_schema_using_id_ext(access_token);
  schema_registry_retrieve_schema_using_version_ext(access_token);
  
}
export function kafka_usecase(){
  kafka_functionality()
}
export function data_collection_post_internal(){
data_collection_register_ods_internal();
}
export function data_collection_delete_internal(){
 data_collection_delete_ods_internal();
}

/*The tear down function deletes or cleans up the data that was created as part of setup or usecases*/
export function teardown(data){
  const currentStage = "TearDown";
  if(load_options["data_collection_update_on_hold_subscriptions_external"] || load_options["data_collection_create_thirty_subscriptions_external"] || load_options["data_collection_create_update_delete_subscription_external"] || load_options["data_catalog_get_24_user_internal"] ){
    deleteIds(currentStage)
    deleteFileFormat(currentStage)
    deleteMessageSchema(currentStage)
  }
  
  if(load_options["data_catalog_get_max_user_internal"] || load_options["data_catalog_get_24_user_internal"] || load_options["data_catalog_get_max_user_external"]){
    //authorize();
    var access_token = authorize();
    deleteBdrMbExternal(access_token, currentStage)
    deleteBdrMbInternal(currentStage)
  }
  if(load_options["kafka_resource_manager_register_topic_internal"]){
    deleteKafkaTopicForKafkaResourceManager();
  }
  if(load_options["kafka_resource_manager_grant_permission_kafka_user_internal"]){
    deleteKafkaTopicForKafkaResourceManagerGrant();
  }
  if(load_options["kafka_resource_manager_revoke_permission_kafka_user_internal"]){
    deleteKafkaTopicForKafkaResourceManagerRevoke(); 
  }  
  if(load_options["schema_registry_get_60_internal"] || load_options["schema_registry_get_60_external"]){
    deleteSubject(currentStage)
  }
  if(load_options["kafka_native_consume_external"] || load_options["kafka_native_produce_internal"]){
    deleteKafkaTopic(currentStage)
  }
  if(load_options["object_storage_manager_post_internal"]){
    deleteBucketOsm(currentStage)
    deleteServiceAccountOsm(currentStage)
    deleteServiceAccountBucketGrantOsm(currentStage)
    deleteClientidOsm(currentStage)
    deleteClientidBucketGrantOsm(currentStage)

  }
  if(load_options["object_storage_manager_delete_internal"]){
    deleteServiceAccountBucketRevokeOsm(currentStage)
    deleteClientidBucketRevokeOsm(currentStage)
  }
  if(load_options["object_storage_manager_get_internal"]){
    deleteServiceAccountQuerySecretOSm(currentStage)
  }
  
}


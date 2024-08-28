
import { 
    Trend,Counter 
} from 'k6/metrics';
export const Delete_Data_Catalog = new Trend('Delete data catalog')
export const Query_Data_Catalog = new Trend('Query from data catalog')
export const Post_Data_Catalog = new Trend('Post to data catalog')
export const Put_Data_Catalog = new Trend('Register fileformat and message schema')
export const Create_Thirty_Subscription = new Trend('Creating Thirty subscription')
export const Create_Subscription = new Trend('Creating Subscription')
export const Update_Predicate = new Trend('Updating predicate parameter for subscription')
export const Delete_Subscription = new Trend('Deleting subscription')
export const Consume_Message_External = new Trend('Consume Message from kafka through external host')
export const Produce_Message_External = new Trend('Produce Message to kafka through external host')
export const Consume_Message_Internal = new Trend('Consume Message from kafka through internal host')
export const Produce_Message_Internal = new Trend('Produce Message to kafka through internal host')
export const registerSchema = new Counter('Register_new_schema');
export const getSchemaID = new Counter('Get_schema_string_by_input_id');
export const getSchemaVersion = new Counter('Get_schema_string_by_version');
export const Consume_Message = new Trend('Consume Message from kafka')
export const Produce_Message = new Trend('Produce Message to kafka')


import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const option_thresholds=JSON.parse(
    open(`${__ENV.OPTIONS_FILE}`),
  ).thresholds;
const scenario=JSON.parse(
    open(`${__ENV.OPTIONS_FILE}`),
  ).scenarios;
import { load_percentage } from "./common_variable.js";

/*This funtion calculates the load based on the load percentage defined through environment variable
Parameters:
basevalue - It is the value for which load has to be calculated
*/
export function load(basevalue){
  let applied_value=(load_percentage/100)*basevalue
  applied_value=Math.ceil(applied_value);
  return applied_value;
}

export function logCookie(cookie) {
  return cookie.name + "=" + cookie.value
}

/*This funtion calculates the load based on the number of iterations provided in options.json file
It is called in handle summary
Parameters:
value - It is the value for which load has to be calculated
*/
export function getRate(value){
  let basevalue=scenario[value].iterations;
  let applied_value=load(basevalue)
  return applied_value;
}
/*This funtion reads the options file and apply the load based on the load percentage defined through environment variable 
and returns the updated json scenarios
*/
export function optionScenarios() {
    const keys = Object.keys(scenario);
    for(let i=0;i<keys.length;i++){
      if(keys[i]!=="schema_registry_delete_subject_internal" && keys[i]!=="schema_registry_register_5_schemas_internal" && keys[i]!=="schema_registry_get_60_internal" && keys[i]!=="schema_registry_register_900_schemas_internal" && keys[i]!=="kafka_native_produce_internal" && keys[i]!=="kafka_native_consume_external"){
        let basevalue=scenario[keys[i]].vus
        let applied_value=load(basevalue)
        scenario[keys[i]].vus=applied_value
      }
      else if(keys[i]=="schema_registry_delete_subject_internal" || keys[i]=="schema_registry_register_5_schemas_internal" || keys[i]=="schema_registry_get_60_internal" || keys[i]=="schema_registry_register_900_schemas_internal"){
        let basevalue=scenario[keys[i]].iterations
        let applied_value=load(basevalue)
        scenario[keys[i]].iterations=applied_value
      }
      else{
          console.log("kafka scenario update")
      }
    }
    return scenario;
  }

export function getVus(){
  let vus;
  let total_vus=[];
  for (let i = 0; i < arguments.length; i++) {
  try{
    let options = optionScenarios()
    vus = options[arguments[i]].vus
  }
  catch(error){
    vus = 0
  }
  finally{
    total_vus.push(vus)
  }
}
return total_vus;
}

export function getIter(){
  let iterations;
  let total_iterations=[];
  for (let i = 0; i < arguments.length; i++) {
  try{
    let options = optionScenarios()
    iterations = options[arguments[i]].vus
  }
  catch(error){
    iterations = 0
  }
  finally{
    total_iterations.push[iterations]
  }
}
return total_iterations;
}
//This function accepts VU number in the argument, generates and returns unique random alphanumeric characters
export function getUniqueRandomString(vu){
  let unique_random_string = randomIntBetween(1, 9999)+randomString(5)+vu
  return unique_random_string
}

//This function accepts VU number in the argument, generates and returns unique integer
export function getUniqueRandomInt(vu){
  let unique_random_int = randomIntBetween(1, 999999)+vu
  return unique_random_int
}

//This function gives current date and time
export function getCurrentDateTime(){
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2,'0');
  const day = String(currentDateTime.getDate()).padStart(2,'0');
  const hours = String(currentDateTime.getHours()).padStart(2,'0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2,'0');
  const seconds = String(currentDateTime.getSeconds()).padStart(2,'0');
  const milliSeconds = String(currentDateTime.getMilliseconds()).padStart(3,'0');
  const formattedDateTime = year+month+day+hours+minutes+seconds+milliSeconds;
  return formattedDateTime
}

export function jsonParse(jsonString){
  try {
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  
  } catch (error) {
    return 'Error parsing JSON:', error.message
  }
}
export function retriveValue(obj){
  try {
    const value = obj["data"]["result"][0]["value"][1]
    return value;
  
  } catch (error) {
    console.error('Error fetching value', error.message)
    return 0
  }
}
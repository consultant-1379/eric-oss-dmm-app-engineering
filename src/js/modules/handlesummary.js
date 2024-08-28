import { getRate } from "./common_function.js"
import { optionScenarios,option_thresholds } from "./common_function.js";
export function summary(thresholds,data){
  let options=optionScenarios()
  const keys = Object.keys(options);
  thresholds.forEach(threshold => {
    try{
      const thresholdvalue = option_thresholds[threshold][0]
      const value=option_thresholds[threshold][0].split('=')[1].trim()
      const match=threshold.match(/\{([^}]+)\}/);
      const scenario=match[1].split(":")[1].trim()
      if(keys.includes(scenario)&& data.metrics[threshold]!== undefined){
        const total_count=data.metrics[threshold].values.count/1000
        const rate=getRate(scenario)
        const per_second=rate/total_count
        data.metrics[threshold].values.rate=per_second
        if(per_second >= value){
          data.metrics[threshold].thresholds[thresholdvalue].ok=true
          console.info(`Sucessfully updated threshold "${threshold}"`)
          }
        else{
          data.metrics[threshold].thresholds[thresholdvalue].ok=false
          console.error(`failed to updated threshold "${threshold}"`)
        }

      }
      }catch(error){
        console.error(`Error processing threshold "${threshold}": ${error.message}`)
      } 
  });
  return data;

}
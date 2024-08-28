REPORT_PATH=$1
gunzip ${REPORT_PATH}/summary.json.gz || true

rate_count_ext=$(jq -r '.metrics["Get_schema_string_by_input_external{scenario:schema_registry_get_60_external}"].values.count' ${REPORT_PATH}/summary.json)
num2=1000
num3=400
rate_count_ext_per_sec=$(echo "scale=2; $rate_count_ext / $num2" | bc)
echo $rate_count_ext_per_sec
rate_ext=$(echo "scale=2; $num3 / $rate_count_ext_per_sec" | bc)
echo $rate_ext
result_ext=$(printf "%.0f" "$rate_ext")
echo $result_ext
if [ $result_ext -lt 7 ]
then
   echo rate check for schema registry external failed && exit 1
else
   echo rate check for schema registry external passed
fi

rate_count_int=$(jq -r '.metrics["Get_schema_string_by_input_id{scenario:schema_registry_get_60_internal}"].values.count' ${REPORT_PATH}/summary.json)
rate_count_int_per_sec=$(echo "scale=2; $rate_count_int / $num2" | bc)
echo $rate_count_int_per_sec
rate_int=$(echo "scale=2; $num3 / $rate_count_int_per_sec" | bc)
echo $rate_int
result_int=$(printf "%.0f" "$rate_int")
echo $result_int
if [ $result_int -lt 60 ]
then
   echo rate check for schema registry internal failed && exit 1
else
   echo rate check for schema registry internal passed
fi

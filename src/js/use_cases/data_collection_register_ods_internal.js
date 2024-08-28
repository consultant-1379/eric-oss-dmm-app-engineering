import http from 'k6/http';
import {
    check,
    group
} from 'k6';
import { getUniqueRandomString } from "../modules/common_function.js"
import {DCC_BASE} 
    from '../modules/endpoints.js';
export default function() {
    /*This use case validates registration of ODS details in dcc.*/
    group('Register ODS details into DCC', function() {
        group('It shall be possible to register ODS details', function() {
            const data = {
                "dataTypeInformation": {
                  "dataTypeId": {
                    "namespace": "string",
                    "name": "1&,#-B5D*pi]{3w-5-B e`ss^YHar|9d%+FE\"QR([SmSuBa%SXd1@*;)f52{A3~v+'#M44@ ",
                    "version": "string"
                  },
                  "isExternal": true,
                  "metadata": {
                    "dataCategory": [
                      "string"
                    ],
                    "rat": [
                      "string"
                    ]
                  },
                  "dataProductionSchema": {
                    "targetSelector": [
                      "string"
                    ],
                    "dataSelector": [
                      "string"
                    ]
                  },
                  "dataDeliverySchemas": [
                    {
                      "type": "JSON_SCHEMA",
                      "deliverySchemaId": "string",
                      "schema": "string"
                    }
                  ],
                  "dataDeliveryMechanisms": [
                    {
                      "deliveryMethod": "KAFKA_DATA_STREAM",
                      "kafkaDeliveryConfiguration": {
                        "numPartitions": 0,
                        "cleanUpPolicy": "string",
                        "compressionType": "string",
                        "retentionBytes": 0,
                        "retentionMs": 0
                      }
                    }
                  ]
                },
                "dataProducerConstraints": {},
                "dataRequestEndpoint": {
                  "ipv4Addr": "string",
                  "ipv6Addr": "string",
                  "fqdn": "oiA2BLnBG.r.t.4.Y-RR5e3ybWgAhj7frihO9DFlr4VIVJUTCCRzQ6s9PcvzBJOB6kLWcIFi3X4.EDLHTDPyl5sS5lvYmJSaYoYdwuDCYUO0Dz7Di2WHPpfgiZr6vw3.n.0.7.4.HG-p4gKRHimjM1MBZdilcWuI-GcsAormUJ4v-1RASUql1bAPpkNBCS.W.btFsTzHBKdWI7zcS.LCdAZOpSS9yOyxHbSETuLCnEqdjHISkS4jiIK8AGMPv",
                  "port": 65535,
                  "apiPrefix": "string",
                  "qs": [
                    "PSK"
                  ]
                },
                "dataSubscriptionEndpoint": {
                  "ipv4Addr": "string",
                  "ipv6Addr": "string",
                  "fqdn": "P.B.t.XEFDULS97hEFbqQPSuBymkZVtcF7xK53DRNA1wHFD00Wkd96vQ.Q2YLfWBEWbni17doaqSG3norsc365xbuHvKVJfyi.20TXbeuQMua6z-nAjjCvfrnA174tcBzV0yNYc7GnYktYG0FVN2.b.5.i.EQjEeaWyauj6cJn--w14O3OBFOaU5D4K.e.Y.Pfs5UEG74yQMj4t0kDGCYzfop6gKJmdXof.G.t.p.h.f.7gnLeiavqiH6DwdE",
                  "port": 65535,
                  "apiPrefix": "string",
                  "qs": [
                    "PSK"
                  ]
                }
              }

            const head = {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "content-type": "application/json",
                }
            }
            const ODS = http.post(DCC_BASE + 'datatypeprodcaps', JSON.stringify(data), head);
            try{
            const result = check(ODS, {
                'Successfully created ODS ': (r) => ODS.status === 201,
                'Response should return ODS details': (r) => ODS.body,
            },{legacy: "false"});
            if (!result) {
                console.error("Failed to create ODS , status is "+ODS.status);
                console.error("Failed to create ODS , response is "+ODS.body);
            }
        }catch(error){
            console.error("Failed to create ODS , status is "+ODS.status);
            console.error("Failed to create ODS , response is "+ODS.body);
        }

        });

    })
}
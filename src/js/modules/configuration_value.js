export function configuation(){
    const testWareProperties = {
        gasUrl: `${__ENV.GAS_URL}`,
        eicUrl: `${__ENV.EIC_URL}`,
        iamUrl: `${__ENV.IAM_URL}`,
        namespace: `${__ENV.Namespace}`,
        kafkaServer: `${__ENV.KAFKA_SERVER}`,
        kafkaUser: `${__ENV.KAFKA_USER}`,
        loadPercentage: `${__ENV.LOAD_PERCENTAGE}`,
        clientId: `${__ENV.CLIENT_ID}`,
        appClientId: `${__ENV.APP_CLIENT_ID}`,
        appClientPwd: `${__ENV.APP_CLIENT_PSW}`,
        kcAdminId: `${__ENV.KC_ADMIN_ID}`,
        kcPassword: `${__ENV.KC_PASSWD}`,
        bootstrapExternalHost: `${__ENV.BOOTSTRAP_EXTERNAL}`,
        tlsEnabled:`${__ENV.TLS}`,
        PmServerUrl:`${__ENV.PM_SERVER}`,
        TARGET_CLUSTER : `${__ENV.TARGET_CLUSTER}`,
        TARGET_NAMESPACE : `${__ENV.TARGET_NAMESPACE}`,

      };
      console.log('========== Testware Properties ==========');
        for (const key in testWareProperties) {
          console.log(`${key}: ${testWareProperties[key]}`);
        }
        console.log('=======================================');
}
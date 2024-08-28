import { prefix } from "./setup_constant.js";

export const kafka_user = `${__ENV.KAFKA_USER}`
export const kafka_user2 = "kafkauser2"

//kafka resource manager
export const topic_kf = prefix+"-kafka-topic";
export const topic_kf_grant = prefix+"-kafka-topic-grant";
export const topic_kf_revoke = prefix+"-kafka-topic-revoke";
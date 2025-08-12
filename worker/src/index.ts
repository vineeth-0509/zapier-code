import {PrismaClient} from "@prisma/client";
import {Kafka} from "kafkajs";
const client = new PrismaClient();
const TOPIC_NAME ='zap_events'
const kafka = new Kafka({
    clientId:"",
    brokers:['localhost:9092']
})
async function main(){
while(1){

}
}

main()
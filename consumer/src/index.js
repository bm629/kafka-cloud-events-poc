const { Kafka } = require('kafkajs');
const CeKafka = require('cloudevents-kafka');
const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');

const server = process.env.KAFKA_SERVER || "localhost:9092";
const topic = process.env.KAFKA_TOPIC || "test";
const registryURL = process.env.KAFKA_SCHEMA_REGISTRY_URL || "localhost:8081";
const registry = new SchemaRegistry({ host: registryURL });
// const schemaName = 'myschema';

const kafka = new Kafka({
    clientId: 'consumer-app',
    brokers: [server]
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consumerFunction() {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const receivedEvent = await registry.decode(message.value);
            console.log(JSON.stringify(receivedEvent)); 
        }
    });
}

consumerFunction();
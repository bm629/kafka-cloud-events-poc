const { Kafka } = require('kafkajs');
const CeKafka = require('cloudevents-kafka');

const server = process.env.KAFKA_SERVER || "localhost:9092";
const topic = process.env.KAFKA_TOPIC || "test";

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
            const receivedEvent = CeKafka.deserialize(message);
            console.log(JSON.stringify(receivedEvent)); 
        }
    });
}

consumerFunction();
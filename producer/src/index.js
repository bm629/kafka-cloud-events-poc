const { Kafka } = require('kafkajs');
const { Version } = require('cloudevents');
const CeKafka = require('cloudevents-kafka');
const uuid = require('uuid');

const server = process.env.KAFKA_SERVER || "localhost:9092";
const topic = process.env.KAFKA_TOPIC || "test";

const kafka = new Kafka({
    clientId: 'producer-app',
    brokers: [server]
});

const producer = kafka.producer();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/produce', async (req, res) => {

  const event = new CeKafka.CloudEventStrict({
    specversion: Version.V1,
    type: 'message.send',
    source: '/produce',
    value: { message:req.query.message },
    partitionkey: 'hello',
    id: uuid.v4()
  })

  const message = CeKafka.structured(event);

  console.log(JSON.stringify(message));

  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      message
    ],
  });
  res.send('success');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const { Kafka } = require('kafkajs');
// const { Version } = require('cloudevents');
// const CeKafka = require('cloudevents-kafka');
// const uuid = require('uuid');

const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');

const server = process.env.KAFKA_SERVER || "localhost:9092";
const topic = process.env.KAFKA_TOPIC || "test";
const registryURL = process.env.KAFKA_SCHEMA_REGISTRY_URL || "localhost:8081";
const registry = new SchemaRegistry({ host: registryURL });
const schemaName = 'myschema';

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

  const payload = { ...req.query };
  const schemaId = await registry.getRegistryId(schemaName, 1);
  const encodedValue = await registry.encode(schemaId, payload);

  // const event = new CeKafka.CloudEventStrict({
  //   specversion: Version.V1,
  //   type: 'message.send',
  //   source: '/produce',
  //   value: encodedValue,
  //   partitionkey: 'hello',
  //   id: uuid.v4()
  // })

  // const message = CeKafka.structured(event);

  // console.log(JSON.stringify(message));

  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      { key: 'hello', value: encodedValue }
    ],
  });
  res.send('success');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
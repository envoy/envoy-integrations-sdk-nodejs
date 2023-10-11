const { Kafka } = require('kafkajs')

function buildConfig(clientId) {
  return {
    clientId: clientId,
    brokers: [
      process.env.KAFKA_BROKER_1,
      process.env.KAFKA_BROKER_2,
      process.env.KAFKA_BROKER_3
    ],
    ssl: true,
    sasl: {
      mechanism: 'SCRAM-SHA-512',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  };
};

class KafkaClient {
  constructor(clientId, topic, groupId) {
    this.config = buildConfig(clientId);
    this.topic = topic;
    this.groupId = groupId;
  }

  async produce(key, message) {
    const kafka = new Kafka(this.config);
    const producer = kafka.producer({ allowAutoTopicCreation: true });
    await producer.connect();
    await producer.send({
      topic: this.topic,
      messages: [{ key: key, value: message }],
    });
  }

  async consume(consumeFunction) {
    const kafka = new Kafka(this.config);
    const consumer = kafka.consumer({ groupId: this.groupId });
    await consumer.connect();
    await consumer.subscribe({ topic: this.topic });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value.toString();
        await consumeFunction(messageValue);
      },
    });
  }
};

module.exports = KafkaClient;
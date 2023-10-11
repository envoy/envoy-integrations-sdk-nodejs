import { Kafka, KafkaConfig } from 'kafkajs';

type ConsumeFunction = (message: string | undefined) => void;

function buildConfig(clientId: string): KafkaConfig {
  return {
    clientId: clientId,
    brokers: [
      process.env.KAFKA_BROKER_1!,
      process.env.KAFKA_BROKER_2!,
      process.env.KAFKA_BROKER_3!
    ],
    ssl: true,
    sasl: {
      mechanism: 'scram-sha-512',
      username: process.env.KAFKA_USERNAME!,
      password: process.env.KAFKA_PASSWORD!,
    },
  };
};

class KafkaClient {
  protected readonly config: KafkaConfig;
  protected readonly topic: string;

  constructor(clientId: string, topic: string) {
    this.config = buildConfig(clientId);
    this.topic = topic;
  }

  consumer(groupId: string, consumeFunction: ConsumeFunction): KafkaConsumer {
    const kafka = new Kafka(this.config);
    return new KafkaConsumer(kafka, this.topic, groupId, consumeFunction);
  }

  producer(): KafkaProducer {
    const kafka = new Kafka(this.config);
    return new KafkaProducer(kafka, this.topic);
  }
};

class KafkaConsumer {
  protected readonly kafka: Kafka;
  protected readonly topic: string;
  protected readonly groupId: string;
  protected readonly consumeFunction: ConsumeFunction;

  constructor(kafka: Kafka, topic: string, groupId: string, consumeFunction: ConsumeFunction) {
    this.kafka = kafka;
    this.topic = topic;
    this.groupId = groupId;
    this.consumeFunction = consumeFunction;
  }

  async consume() {
    const consumer = this.kafka.consumer({ groupId: this.groupId });
    await consumer.connect();
    await consumer.subscribe({ topic: this.topic });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value?.toString();
        await this.consumeFunction(messageValue);
      },
    });
  }
};

class KafkaProducer {
  protected readonly kafka: Kafka;
  protected readonly topic: string;

  constructor(kafka: Kafka, topic: string) {
    this.kafka = kafka;
    this.topic = topic;
  }

  async produce(key: string, message: string) {
    const producer = this.kafka.producer({ allowAutoTopicCreation: true });
    await producer.connect();
    return await producer.send({
      topic: this.topic,
      messages: [{ key: key, value: message }],
    });
  }
};

module.exports = KafkaClient;
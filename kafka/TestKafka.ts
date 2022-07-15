// @ts-ignore
const { Kafka } = require('kafkajs');

// @ts-ignore
export const run = async (): Promise<void> => {
  const kafka = new Kafka({
    clientId: 'Testing-Kafka',
    brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092']
    // brokers: ['kafka1:9092', 'kafka2:9092', 'kafka3:9092']
  });

  const groupId = 'Testing-kafka';
  const topic = 'Testing-topic';

  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId })

  await producer.connect()
  await producer.send({
    topic,
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  await consumer.run({
    // @ts-ignore
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().then(() => {
  console.log(`=================================`)
  console.log(`============All Done=============`);
}).catch((error) => {
  console.log(`============Error Alert==========`)
  console.log(error)
  console.log(`=================================`)
});
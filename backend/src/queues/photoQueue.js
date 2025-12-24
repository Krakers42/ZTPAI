import amqplib from "amqplib";

let channel;

export const connectQueue = async () => {
  const connection = await amqplib.connect("amqp://rabbitmq");
  channel = await connection.createChannel();
  await channel.assertQueue("photoQueue", { durable: true });
  return channel;
};

export const sendToQueue = async (msg) => {
  if (!channel) await connectQueue();
  channel.sendToQueue("photoQueue", Buffer.from(JSON.stringify(msg)), {
    persistent: true,
  });
};

export const consumeQueue = async (callback) => {
  if (!channel) await connectQueue();
  channel.consume("photoQueue", async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      await callback(data);
      channel.ack(msg);
    }
  });
};

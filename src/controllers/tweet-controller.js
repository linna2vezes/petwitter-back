import { prisma } from "../helpers/utils.js";

export const createTweet = async (request, reply) => {
  try {
    const { body } = request.body
    const { id } = request.user
    const createTweet = await prisma.tweet.create({
      data: {
        body,
        user: { connect: { id: +(id) } }
      },
    });
    return reply.send(createTweet).status(200);
  } catch (error) {
    console.error("user", error);
    reply.status(500).send("Não possível criar o tweet");
  }
};

export const getAllTweets = async (request, reply) => {
  const {take, skip} = request.query;
  const data = {orderBy: { id: 'desc'}};
  if (take) data.take = Number(take);
  if (skip) data.skip = Number(skip);
  try {
    const tweet = await prisma.tweet.findMany(data)
    reply.send(tweet).status(200);
  } catch (error) {
    console.error("user", error);
    reply.status(500).send("Não possível listar todos os tweets");
  }
};

export const deleteTweet = async (request, reply) => {
    try {
      const { id } = request.params
      console.log(id)
      const deleteTweet = await prisma.tweet.delete({ 
        where: { id: +id },
        
       })
      return reply.send(deleteTweet).status(200);
    } catch (error) {
      console.error("user", error);
      reply.status(500).send("Não possível deletar o tweet");
    }
  };

export const getUserTweet = async (request, reply) => {
  try {
    
    const { id } = request.params
    const getUserTweet = await prisma.tweet.findMany({ 
      where: { user_id: +id },
      orderBy: { id: 'desc' },
     })
    return reply.send(getUserTweet).status(200);
  } catch (error) {
    console.error("users", error);
    reply.status(500).send("Não possível listar todos os tweets do usuário");
  }
};
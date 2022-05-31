import { prisma } from "../helpers/utils.js";

export const getAllUsers = async (request, reply) => {
  try {
    let users = await prisma.user.findMany({
      // select: { email: true },
    });
    return reply.send({  users  });
  } catch (error) {
    console.error("users", error);
    reply.status(500).send({ error: `Cannot fetch users` });
  }
};

export const getUser = async (request, reply) => {
  try {
      const { id } = request.params
      const user = await prisma.user.findUnique({
          where: { id: Number(id) },
      })
     reply.status(200).send(user)
  } catch (error) {
      reply.status(500).send("Não foi possível encontrar o usuário")
  }
}

export const patchUser= async (request, reply) => {
  try {
    const data = { };

    if (request.body.name){
      data.name = request.body.name;
    };

    if (request.body.emai){
      data.email = request.body.email;
    };

    if (request.body.username){
      data.username = request.body.username;
    };
     
    if (request.file?.path){
      data.image = request.file.path
    };
   
    
    const {id} = request.params
    const user = await prisma.user.update({
      where: {
        id: +id,
      },
      data,
    })
    reply.send(user);
 } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar dado do usuário");
  }
};



export const updateProfilePhoto = async (request, reply) => {
  try {
    const id = Number(request.params.id)
    const image = request.file?.path ? request.file.path : ''
    const newPhoto = await prisma.user.update({
      where: { id },
      data: { image: image }
    })
    reply.send(newPhoto)
  } catch (error) {
    console.log(error);
    reply.status(500).send('Não foi possível atualizar foto.');
  }
};

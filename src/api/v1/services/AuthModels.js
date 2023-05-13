import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPassword(email) {
    try {
      const user = await prisma.users.findMany({
        where: { mail: email },
      });
      console.log('Found user:', user);
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }


async function createUser(userData) {
    try {
      const user = await prisma.users.create({
        data: userData,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

async function getUser(id) {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw error;
  }
}


async function getUserByEmail(mail) {
  try {
    const user = await prisma.users.findUnique({ where: { mail : mail } });
    return user;
  } catch (error) {
    throw error;
  }
}

export { getPassword, getUserByEmail ,createUser, getUser };

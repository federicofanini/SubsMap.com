import { prisma } from "@/lib/db";

export async function countUsers(): Promise<number> {
  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    console.error("Error counting users:", error);
    throw error;
  }
}

export async function getUsersLeft(): Promise<number> {
  try {
    const totalUsers = await countUsers();
    const usersLeft = Math.max(20 - totalUsers, 0);
    return usersLeft;
  } catch (error) {
    console.error("Error calculating users left:", error);
    throw error;
  }
}

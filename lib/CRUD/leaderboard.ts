import { prisma } from "@/lib/db";

export async function sumMonthlySubscriptionsByUser(month: number, year: number, userId: string) {
  try {
    const result = await prisma.subscription.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  } catch (error) {
    console.error("Error summing monthly subscriptions:", error);
    throw error;
  }
}

import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/db";
import { sumMonthlySubscriptionsByUser } from "@/lib/CRUD/leaderboard";
import { eurToUsd } from "@/lib/eurusd";
import { Decimal } from '@prisma/client/runtime/library';

interface LeaderboardEntry {
  id: string;
  name: string | null;
  surname: string | null;
  image: string | null;
  totalExpenseEUR: number;
  totalExpenseUSD: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()));

    const { getUser } = getKindeServerSession();
    const currentUser = await getUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
      },
    });

    const leaderboardData: LeaderboardEntry[] = await Promise.all(
      users.map(async (user) => {
        const totalExpenseEUR = await sumMonthlySubscriptionsByUser(month, year, user.id);
        const totalExpenseUSD = eurToUsd(Number(totalExpenseEUR));

        return {
          id: user.id,
          name: user.firstName,
          surname: user.lastName,
          image: user.imageUrl,
          totalExpenseEUR: totalExpenseEUR instanceof Decimal ? totalExpenseEUR.toNumber() : totalExpenseEUR || 0,
          totalExpenseUSD: parseFloat(totalExpenseUSD.toFixed(2)),
        };
      })
    );

    // Sort the leaderboard by total expense in descending order
    leaderboardData.sort((a, b) => b.totalExpenseEUR - a.totalExpenseEUR);

    return NextResponse.json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

interface KindeUser {
  id: string;
  email: string | null;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

interface DbUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  customer_id: string;
  price_id: string;
  has_access: boolean;
}

export async function GET(req: NextRequest) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id)
    throw new Error("Something went wrong, please try again");

  let dbUser: DbUser | null = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        imageUrl: user.picture ?? null,
        customer_id: "",
        price_id: "",
        has_access: false,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? new URL("http://localhost:3000/dashboard")
      : new URL("https://start.app/dashboard")
  );
}
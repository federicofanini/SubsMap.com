import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id)
    throw new Error("something went wrong please try again");

  let dbUser = await prisma.user.findUnique({
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
          imageUrl: user.picture,
          customer_id: "",
          price_id: "",
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/dashboard"
      : "https://start.app/dashboard"
  );
}
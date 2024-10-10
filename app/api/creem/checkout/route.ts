import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export interface CheckoutSession {
  id: string;
  object: string;
  product: string;
  status: string;
  checkout_url: string;
  success_url: string;
  mode: string;
}

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
  }

  const apiKey = process.env.CREEM_API_KEY;
  const creemTestUrl = "https://test-api.creem.io/v1/checkouts";
  const checkoutSessionResponse = await axios.post(
    creemTestUrl,
    {
      product_id: "prod_7iEgop41OX7hWWmoITtI9b",
      request_id: "PAID",
      customer: {
        email: user.email
      }
    },
    { headers: { "x-api-key": apiKey } },
  );
  
  console.log(checkoutSessionResponse);
  console.log(checkoutSessionResponse.status);
  console.log(checkoutSessionResponse.data);
  
  if (checkoutSessionResponse.status !== 200) {
    return NextResponse.json({ success: false, message: "Failed to create checkout session" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    checkout: checkoutSessionResponse.data as CheckoutSession,
  });
}
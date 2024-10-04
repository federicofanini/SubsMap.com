  import { NextResponse } from 'next/server';
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import { prisma } from '@/lib/db';


  export async function POST(request: Request) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { name, description, imageUrl, websiteUrl, twitterUrl, githubUrl, revenueSource, apiKey } = await request.json();

      const startup = await prisma.startup.create({
        data: {
          name,
          description,
          imageUrl,
          websiteUrl,
          twitterUrl,
          githubUrl,
          revenueSource,
          apiKey,
          userId: user.id,
        },
      });

      return NextResponse.json(startup, { status: 201 });
    } catch (error) {
      console.error('Error adding startup:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }


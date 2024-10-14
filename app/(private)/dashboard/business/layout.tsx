import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { prisma } from '@/lib/db';

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect('/api/auth/login');
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { has_access: true },
  });

  if (!dbUser || !dbUser.has_access) {
    redirect('/#pricing');
  }

  return <>{children}</>;
}

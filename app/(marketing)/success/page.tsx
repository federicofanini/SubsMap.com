import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { prisma } from '@/lib/db';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect('/api/auth/login');
  }

  const requestId = searchParams.request_id as string;
  const checkoutId = searchParams.checkout_id as string;
  const customerId = searchParams.customer_id as string;
  const orderId = searchParams.order_id as string;
  const productId = searchParams.product_id as string;
  const signature = searchParams.signature as string;

  if (requestId === 'PAID') {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          has_access: true,
          checkout_id: checkoutId,
          customer_id: customerId,
          order_id: orderId,
          product_id: productId,
          signature: signature,
        },
      });
      console.log('User updated successfully');
      
    } catch (error) {
      console.error('Error updating user access:', error);
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">An error occurred</h1>
          <p className="text-lg">We couldn&apos;t process your payment. Please try again later.</p>
        </div>
      );
    }
  }

  return redirect('/dashboard');
}

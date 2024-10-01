import { NextResponse } from 'next/server';
import { getUsersLeft } from '@/lib/CRUD/users';

export async function GET() {
  try {
    const usersLeft = await getUsersLeft();
    return NextResponse.json({ usersLeft }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users left:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import ConnectToDatabase from '@/lib/connect';
import User from '@/models/user-model';

export async function GET() {
  try {
    await ConnectToDatabase();
    const users = await User.find({}).select("name email _id seller created ");
    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: 'No Users Found', data: null, error: '' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Users successfully retrieved', data: users || [], error: '' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error or invalid request method', message: '', data: undefined },
      { status: 500 }
    );
  }
}
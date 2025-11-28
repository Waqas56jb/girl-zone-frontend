import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || 'https://girl-zone-backend.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe = false } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required.' },
        { status: 400 },
      );
    }

    const upstreamResponse = await fetch(`${BACKEND_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const responseText = await upstreamResponse.text();
    let data: any = responseText;
    try {
      data = JSON.parse(responseText);
    } catch {
      // leave as text
    }

    return NextResponse.json(
      typeof data === 'string' ? { message: data } : data,
      { status: upstreamResponse.status },
    );
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      {
        error: 'Unable to complete login.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJWT, setAuthCookie } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { AuthError } from '@/lib/errors';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(req: Request) {
  try {
    logger.info('Starting user login');

    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AuthError('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthError('Invalid credentials');
    }

    logger.info('User logged in successfully', { userId: user.id });

    const token = await signJWT({ userId: user.id });
    await setAuthCookie(token);

    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      status: 'success',
      data: userWithoutPassword
    });

  } catch (error) {
    logger.error('Login error', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 'error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }, { status: 400 });
    }

    if (error instanceof AuthError) {
      return NextResponse.json({
        status: 'error',
        message: error.message
      }, { status: error.statusCode });
    }

    return NextResponse.json({
      status: 'error',
      message: 'Login failed. Please try again later.'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
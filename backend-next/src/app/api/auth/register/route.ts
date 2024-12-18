import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJWT, setAuthCookie } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { ValidationError, AppError } from '@/lib/errors';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and hyphens'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  referralCode: z.string().optional()
});

export async function POST(req: Request) {
  try {
    logger.info('Starting user registration');

    // Parse and validate request body
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.email === validatedData.email ? 'email' : 'username';
      throw new ValidationError(`User with this ${field} already exists`);
    }

    // Verify referral code if provided
    if (validatedData.referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: validatedData.referralCode }
      });

      if (!referrer) {
        throw new ValidationError('Invalid referral code');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        referredBy: validatedData.referralCode
      }
    });

    logger.info('User created successfully', { userId: user.id });

    // Generate token
    const token = await signJWT({ userId: user.id });
    await setAuthCookie(token);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      status: 'success',
      data: userWithoutPassword
    });

  } catch (error) {
    logger.error('Registration error', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 'error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }, { status: 400 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({
        status: 'error',
        message: error.message
      }, { status: error.statusCode });
    }

    return NextResponse.json({
      status: 'error',
      message: 'Registration failed. Please try again later.'
    }, { status: 500 });
  }
}

// Handle preflight requests
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
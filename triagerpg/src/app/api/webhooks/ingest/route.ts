import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    
    // Basic API Key validation (in a real app, this would be tied to the user)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const apiKey = authHeader.split(' ')[1];
    
    // Find user by API key
    const user = await prisma.user.findUnique({
      where: { apiKey }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, source, severity } = body;

    if (!title || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine XP reward based on severity
    let xpReward = 10;
    if (severity === 'medium') xpReward = 20;
    if (severity === 'high') xpReward = 50;
    if (severity === 'critical') xpReward = 100;

    const newCase = await prisma.case.create({
      data: {
        userId: user.id,
        title,
        description,
        source,
        severity: severity || 'low',
        xpReward,
        status: 'open',
      },
    });

    return NextResponse.json({ success: true, case: newCase }, { status: 201 });
  } catch (error) {
    console.error('Error ingesting case:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

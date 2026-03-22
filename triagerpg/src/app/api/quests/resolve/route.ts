import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { addXP, updateStreak } from '@/lib/gamification';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { caseId } = await req.json();

    if (!caseId) {
      return NextResponse.json({ error: 'Missing caseId' }, { status: 400 });
    }

    const targetCase = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!targetCase || targetCase.userId !== session.user.id) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (targetCase.status === 'closed') {
      return NextResponse.json({ error: 'Case is already closed' }, { status: 400 });
    }

    // Mark case as closed
    await prisma.case.update({
      where: { id: caseId },
      data: { status: 'closed' },
    });

    // Award XP and update streak
    const { user, leveledUp } = await addXP(session.user.id, targetCase.xpReward, `resolved_case_${caseId}`);
    await updateStreak(session.user.id);

    return NextResponse.json({ 
      success: true, 
      leveledUp, 
      newXp: user.xp, 
      newLevel: user.level 
    });
  } catch (error) {
    console.error('Error resolving case:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

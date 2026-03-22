import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GoogleGenAI } from '@google/genai';

const AI_TRIAGE_COST = 5;

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    // 1. Fetch the case details
    const targetCase = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!targetCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // 2. Call Gemini API for Triage Summary (Structured JSON)
    const prompt = `
      You are an expert cybersecurity analyst. Analyze this case and output ONLY a raw JSON object with the following structure. Do not wrap it in markdown block quotes.
      {
        "investigation": ["bullet point 1", "bullet point 2", "bullet point 3"],
        "whatHappened": "A detailed 2-3 sentence explanation of what occurred.",
        "nextSteps": ["step 1", "step 2", "step 3"]
      }

      Case Title: ${targetCase.title}
      Source: ${targetCase.source}
      Severity: ${targetCase.severity}
      Description: ${targetCase.description || 'No description provided.'}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Clean up potential markdown formatting from Gemini
    const summary = response.text.replace(/```json\n?|\n?```/g, '').trim();

    // Save the summary to the database and log the AI action
    await prisma.$transaction([
      prisma.case.update({
        where: { id: caseId },
        data: { aiSummary: summary },
      }),
      prisma.activityLog.create({
        data: {
          userId: session.user.id,
          action: `ai_triage_used_case_${caseId}`,
          xpGained: 0,
        }
      })
    ]);

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error('Error during AI Triage:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

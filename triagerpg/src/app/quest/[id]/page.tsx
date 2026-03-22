import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import QuestClient from './QuestClient';

export default async function QuestPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/');
  }

  const resolvedParams = await params;

  const quest = await prisma.case.findUnique({
    where: { 
      id: resolvedParams.id,
    }
  });

  if (!quest || quest.userId !== session.user.id) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Quest Not Found</h1>
          <p className="text-gray-400 mb-6">This quest doesn't exist or you don't have permission to view it.</p>
          <a href="/" className="text-indigo-400 hover:underline">Return to Dashboard</a>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <QuestClient initialQuest={quest} />
    </div>
  );
}

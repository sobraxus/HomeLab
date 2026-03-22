import HeroStats from '@/components/HeroStats';
import QuestBoard from '@/components/QuestBoard';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // If not logged in, show a simple landing page with a login button
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-6">
          TriageRPG
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-md text-center">
          Turn your backlog into an adventure. Level up by closing cases, fixing bugs, and writing code.
        </p>
        <a 
          href="/api/auth/signin" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
        >
          Sign in with GitHub
        </a>
      </main>
    );
  }

  // Fetch real user data from the database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      cases: {
        where: { status: 'open' },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="mb-8 flex justify-between items-center bg-[#25293c] p-6 rounded-xl border border-[#343b54] shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Welcome back, {user.name || 'Analyst'}.
          </h2>
          <p className="text-gray-400 text-sm">Here is your active workload for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/api/auth/signout" className="text-sm text-gray-400 hover:text-white bg-[#1e2130] px-4 py-2 rounded-md border border-[#343b54] transition-colors">
            Sign Out
          </a>
        </div>
      </header>

      <HeroStats 
        level={user.level} 
        xp={user.xp} 
        streak={user.streak} 
        credits={user.credits} 
      />

      <QuestBoard initialQuests={user.cases} />
    </div>
  );
}

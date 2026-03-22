import { prisma } from './prisma';

// XP required for each level (e.g., Level 1 -> 2 requires 100 XP, 2 -> 3 requires 200 XP)
export const calculateRequiredXP = (level: number) => {
  return level * 100;
};

export async function addXP(userId: string, amount: number, action: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    throw new Error('User not found');
  }

  let newXp = user.xp + amount;
  let newLevel = user.level;
  let requiredXP = calculateRequiredXP(newLevel);

  // Level up logic
  while (newXp >= requiredXP) {
    newXp -= requiredXP;
    newLevel += 1;
    requiredXP = calculateRequiredXP(newLevel);
  }

  // Update user and log activity
  const updatedUser = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, level: newLevel },
    }),
    prisma.activityLog.create({
      data: {
        userId,
        action,
        xpGained: amount,
      },
    }),
  ]);

  return {
    user: updatedUser[0],
    leveledUp: newLevel > user.level,
    previousLevel: user.level,
  };
}

export async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    throw new Error('User not found');
  }

  // Basic streak logic: just increment for now. 
  // In a real app, we'd check the last activity date to see if it's consecutive.
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { streak: user.streak + 1 },
  });

  return updatedUser;
}

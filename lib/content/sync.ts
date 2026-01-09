"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface PackProgressData {
  correctQuestionIds: string[];
  incorrectQuestionIds: string[];
}

type GlobalProgress = Record<string, PackProgressData>;

export async function syncProgress(localProgress: GlobalProgress) {
  if (process.env.NODE_ENV === "development") {
    console.log("[syncProgress] START", { packCount: Object.keys(localProgress).length });
  }

  const session = await auth();
  if (!session?.user?.id) {
    if (process.env.NODE_ENV === "development") {
      console.log("[syncProgress] END - not authenticated");
    }
    return { success: false, error: "Not authenticated" };
  }

  const userId = session.user.id;

  for (const [packId, localData] of Object.entries(localProgress)) {
    const existing = await db.packProgress.findUnique({
      where: {
        userId_packId: {
          userId,
          packId,
        },
      },
    });

    if (existing) {
      // Merge and dedupe
      const correctQuestionIds = Array.from(
        new Set([...existing.correctQuestionIds, ...localData.correctQuestionIds])
      );
      const incorrectQuestionIds = Array.from(
        new Set([...existing.incorrectQuestionIds, ...localData.incorrectQuestionIds])
      );

      // If a question was marked incorrect but is now correct in local, 
      // or vice versa, we should decide which one wins. 
      // For now, let's say 'correct' wins if it's in both.
      const finalIncorrect = incorrectQuestionIds.filter(id => !correctQuestionIds.includes(id));

      await db.packProgress.update({
        where: { id: existing.id },
        data: {
          correctQuestionIds,
          incorrectQuestionIds: finalIncorrect,
        },
      });
    } else {
      await db.packProgress.create({
        data: {
          userId,
          packId,
          correctQuestionIds: localData.correctQuestionIds,
          incorrectQuestionIds: localData.incorrectQuestionIds,
        },
      });
    }
  }

  // Removed revalidatePath("/") to prevent full-page re-render loops
  if (process.env.NODE_ENV === "development") {
    console.log("[syncProgress] END - success");
  }
  return { success: true };
}

export async function saveQuestionProgress(packId: string, questionId: string, isCorrect: boolean) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Not authenticated" };

  const userId = session.user.id;

  const existing = await db.packProgress.findUnique({
    where: {
      userId_packId: {
        userId,
        packId,
      },
    },
  });

  if (existing) {
    let correctQuestionIds = [...existing.correctQuestionIds];
    let incorrectQuestionIds = [...existing.incorrectQuestionIds];

    // Remove from both first
    correctQuestionIds = correctQuestionIds.filter(id => id !== questionId);
    incorrectQuestionIds = incorrectQuestionIds.filter(id => id !== questionId);

    if (isCorrect) {
      correctQuestionIds.push(questionId);
    } else {
      incorrectQuestionIds.push(questionId);
    }

    await db.packProgress.update({
      where: { id: existing.id },
      data: {
        correctQuestionIds,
        incorrectQuestionIds,
      },
    });
  } else {
    await db.packProgress.create({
      data: {
        userId,
        packId,
        correctQuestionIds: isCorrect ? [questionId] : [],
        incorrectQuestionIds: isCorrect ? [] : [questionId],
      },
    });
  }

  return { success: true };
}


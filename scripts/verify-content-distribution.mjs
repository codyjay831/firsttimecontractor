import fs from 'fs';
import path from 'path';

const files = [
  'content/packs/law-ca-expanded.json',
  'content/packs/c10-ca-advanced.json'
];

function analyzePack(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  console.log(`\n=== Analyzing: ${content.title} (${content.packId}) ===`);

  const analyzeArray = (items, label) => {
    const total = items.length;
    const distribution = {
      easy: 0,
      medium: 0,
      hard: 0,
      unknown: 0
    };

    items.forEach(item => {
      const d = item.difficulty || 'unknown';
      if (distribution[d] !== undefined) {
        distribution[d]++;
      } else {
        distribution.unknown++;
      }
    });

    console.log(`\n  ${label} (Total: ${total})`);
    if (total === 0) {
      console.log('    No items found.');
      return;
    }

    ['easy', 'medium', 'hard', 'unknown'].forEach(d => {
      const count = distribution[d];
      if (count > 0 || d !== 'unknown') {
        const pct = ((count / total) * 100).toFixed(1);
        console.log(`    - ${d.padEnd(8)}: ${count.toString().padStart(3)} (${pct}%)`);
      }
    });

    const sum = distribution.easy + distribution.medium + distribution.hard + distribution.unknown;
    if (sum !== total) {
      console.error(`    INTERNAL ERROR: Sum (${sum}) does not match total (${total})`);
    }
  };

  analyzeArray(content.practiceQuestions || [], 'Practice Questions');
  
  // Flashcards are in decks
  const allCards = (content.flashcardDecks || []).flatMap(d => d.cards || []);
  analyzeArray(allCards, 'Flashcards (Total across all decks)');
}

files.forEach(analyzePack);

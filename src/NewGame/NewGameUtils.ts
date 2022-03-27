import { 
  doc, 
  setDoc, getDoc, 
  getFirestore, 
  serverTimestamp 
} from "firebase/firestore";

export function validateGameCodeStructure(newGameCode: string) {
  // Long enough
  if (newGameCode.length < 5) {
    return 'Game code must be at least five characters';
  }

  // Alphanumeric characters
  if (/[^A-Z0-9]/.test(newGameCode)) {
    return 'Game code may only contain uppercase letters and numbers';
  }

  return '';
}

export async function validateGameCode(newGameCode: string) {
  const fb = validateGameCodeStructure(newGameCode);
  if (fb) return fb;

  // Already in use?
  const db = getFirestore();
  const docRef = await getDoc(doc(db, 'games', newGameCode));
  if (docRef.exists()) {
    return 'Game code already in use';
  }

  return '';
}

interface GameParams {
  code: string;
  dimensions: number[];
  numRounds: number;
  generation: string;
}

export async function makeNewGame(params: GameParams, uid: string) {
  // Validate the game code
  const gcValid = await validateGameCode(params.code);
  if (gcValid) return;

  // Push the game to the database
  const db = getFirestore();
  await setDoc(
    doc(db, 'users', uid),
    { activeGame: params.code },
    { merge: true }
  )
  await setDoc(
    doc(db, 'games', params.code),
    {
      owner: uid,
      createdAt: serverTimestamp(),
      dimensions: params.dimensions,
      numRounds: params.numRounds,
      generation: params.generation,
    }
  );

  return true;
}
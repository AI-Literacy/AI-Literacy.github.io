import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../App/Form.module.css';
import { validateGameCodeStructure } from '../NewGame/NewGameUtils';

const JoinGame = () => {
  const [gameCode, setGameCode] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const navigate = useNavigate();
  const handleRedirect = useCallback(
    () => navigate(`/game/${gameCode}`, { replace: true }),
    [navigate, gameCode]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valid game code, structurally
    const fb = validateGameCodeStructure(gameCode);
    if (fb) {
      setFeedback(`Error: ${fb}`)
      return;
    }

    // Make sure game exists
    const db = getFirestore();
    const gameRef = await getDoc(doc(db, 'games', gameCode));

    if (!gameRef.exists()) {
      setFeedback('Error: Game does not exist');
    } else {
      handleRedirect();
    }
  };

  return (
    <div className="app w-4/5 mt-8 mx-auto flex flex-row">
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="text-4xl mb-8">Join a game</h1>
        {
          feedback
          ? (
            <div className="
              w-full 
              border rounded 
              border-orange-500 bg-orange-400 bg-opacity-50
              p-3 mb-3
              flex flex-row justify-between
            ">
              <p>{feedback}</p>
            </div>
          ) : null
        }
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="width">
              <span className="text-gray-200 text-xl">Game code</span>
            </label>
            <input
              type="text"
              className={`${styles["input"]} w-full`}
              name="game-code"
              value={gameCode}
              onChange={e => setGameCode(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className={styles['submit']}
            >
              Join Game
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-end">
        <img className="w-4/5 mb-6" style={{ maxHeight: '60%' }} src="/img/join-game.svg" alt="" />
      </div>
    </div>
  );
}

export default JoinGame;
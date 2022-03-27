import { FormEvent, useContext, useState } from "react";

import { debounceTime, Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { makeNewGame, validateGameCode } from "./NewGameUtils";
import styles from '../App/Form.module.css';
import { UserContext } from "../App";


const NewGame = () => {
  const gcChange$ = new Subject<string>();
  const [gameCode, setGameCode] = useState<string>("");
  const [gcFeedback, setGCFeedback] = useState<string>("");

  // Two subscriptions, to update the state and set feedback
  gcChange$.subscribe(setGameCode);
  gcChange$
    .pipe(
      debounceTime(500),
      mergeMap(async (gc: string) => await validateGameCode(gc))
    )
    .subscribe(setGCFeedback)

  // Other state components
  const [dimensions, setDimensions] = useState<number[]>([30, 30]);
  const [rounds, setRounds] = useState<number>(3);
  const [generation, setGeneration] = useState<string>('10% spawn probability');
  const user = useContext(UserContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    makeNewGame(
      { code: gameCode, dimensions, numRounds: rounds, generation },
      user!.uid
    )
  }

  return (
    <div className="app w-4/5 mt-8 mx-auto flex flex-row">
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="text-4xl mb-8">Create a new game</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="game-code">
              <span className="text-gray-200 text-xl">Game code</span>
            </label>
            {
              gcFeedback
              ? <div><span className="text-red-400 text-lg">{gcFeedback}</span></div>
              : null
            }
            <input 
              type="text" 
              className={`
                ${styles["input"]} 
                w-full 
                ${gcFeedback ? styles['error'] : ''}
              `} 
              name="game-code" 
              value={gameCode}
              onChange={(e) => gcChange$.next(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="width">
              <span className="text-gray-200 text-xl">Grid width</span>
            </label>
            <input 
              type="number" 
              className={`${styles["input"]} w-full`} 
              name="width" 
              value={dimensions[0]}
              onChange={e => setDimensions([parseInt(e.target.value), dimensions[1]])}
              min={10}
              max={60}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="height">
              <span className="text-gray-200 text-xl">Grid height</span>
            </label>
            <input 
              type="number" 
              className={`${styles["input"]} w-full`} 
              name="height" 
              value={dimensions[1]}
              onChange={e => setDimensions([dimensions[0], parseInt(e.target.value)])}
              min={10}
              max={60}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="rounds">
              <span className="text-gray-200 text-xl">Number of rounds</span>
            </label>
            <input 
              type="number" 
              className={`${styles["input"]} w-full`} 
              name="rounds" 
              value={rounds}
              onChange={e => setRounds(parseInt(e.target.value))}
              min={3}
              max={10}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="generation">
              <span className="text-gray-200 text-xl">Generation pattern</span>
            </label>
            <select 
              className={`${styles["input"]} w-full`} 
              name="generation"
              value={generation}
              onChange={e => setGeneration(e.target.value)}
            >
              <option>10% spawn probability</option>
              <option>30% spawn probability</option>
              <option>50% spawn probability</option>
              <option>Gaussian</option>
              <option>Checkerboard</option>
            </select>
          </div>
          <div className="mt-10">
            <button 
              onClick={handleSubmit} 
              className={styles['submit']}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-end">
        <img className="w-4/5 mb-6" style={{ maxHeight: '60%' }} src="/img/new-game.svg" alt="" />
      </div>
    </div>
  );
}

export default NewGame;
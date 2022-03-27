import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from './PlayGame.module.css';

const InvalidGame = () => {
  const { gid } = useParams();

  return (
    <div className="app w-4/5 mt-8 mx-auto flex flex-row h-4/5 md:h-auto">
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="text-3xl">Game not found</h1>
        <span className="text-red-400 mt-3 text-lg">Game code "<code>{gid}</code>" was not found in the system.</span>
        <Link to="/" className="h-1/5 mt-3">
          <div 
            className={`${styles['btn']}`}
            tabIndex={1}
            aria-label="Go home"
            role="button"
          >
            <h1 className="text-xl text-center md:text-2xl">Go home</h1>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-end">
        <img className="w-4/5 mb-6" style={{ maxHeight: '60%' }} src="/img/404.svg" alt="" />
      </div>
    </div>
  );
}

export default InvalidGame;
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../App/UserContext";
import styles from './MainPage.module.css';

const MainPage = () => {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <div className="app flex flex-col justify-center h-5/6 align-middle mt-8 md:flex-row">
      <Link to="/new-game" className={`${styles['btn-wrapper']} mb-8 md:mr-8`}>
        <div className={styles["btn"]}>
          <img className="w-1/2 mb-6" style={{ maxHeight: '60%' }} src="/img/new-game.svg" alt="" />
          <h1 className="text-3xl text-center md:text-4xl">Start a new game</h1>
        </div>
      </Link>
      <Link to="/join-game" className={styles["btn-wrapper"]}>
        <div className={styles["btn"]}>
          <img className="w-1/2 mb-6" style={{ maxHeight: '60%' }} src="/img/join-game.svg" alt="" />
          <h1 className="text-3xl text-center md:text-4xl">Join an existing game</h1>
        </div>
      </Link>
    </div>
  );
}

export default MainPage;
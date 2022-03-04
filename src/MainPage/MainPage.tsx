import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../App/UserContext";
import './MainPage.css';

const MainPage = () => {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <div className="app flex flex-col justify-center h-5/6 align-middle mt-8 md:flex-row">
      <Link to="/new-game" className="btn-wrapper mb-8 md:mr-8">
        <div className="btn">
          <img className="w-1/2 mb-6" src="/img/new-game.svg" alt="" />
          <h1 className="text-3xl md:text-4xl">Start a new game</h1>
        </div>
      </Link>
      <Link to="/join-game" className="btn-wrapper">
        <div className="btn">
          <img className="w-1/2 mb-6" src="/img/join-game.svg" alt="" />
          <h1 className="text-3xl md:text-4xl">Join an existing game</h1>
        </div>
      </Link>
    </div>
  );
}

export default MainPage;
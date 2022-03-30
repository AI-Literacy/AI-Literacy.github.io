import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../App/UserContext';
import { getAuth } from 'firebase/auth';


const Nav = () => {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  function signOutFn(){
      const auth = getAuth();
      auth.signOut();
  }
  
  return (
    <nav className="flex justify-between flex-wrap bg-purple-600 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/">
                <span className="font-semibold text-xl tracking-tight">Smarter Carrots</span>
            </Link>
        </div>
        <div className="w-auto flex-grow flex items-center">
            <div className="flex-grow">
                {/* Eventually, put some links here */}
            </div>
            <div className="flex flex-row items-center ml-5 mr-5 hover:cursor-pointer">
                <img
                    src={user.photoURL!}
                    alt=""
                    className="rounded-full h-8 w-8 mr-2"
                />
                {user.displayName}
            </div>
            <div className="flex flex-row items-center ml-5 mr-5 hover:cursor-pointer">
                <button onClick={signOutFn}>Logout</button>
            </div>
        </div>
    </nav>
  )
}

export default Nav;
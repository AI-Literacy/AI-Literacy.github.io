import React, { useContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { 
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import Nav from '../Nav';
import UserContext from './UserContext';
import LoadingOverlay from '../LoadingOverlay';


const Welcome = () => {
  const user = useContext(UserContext);

  return (
    <div className="app flex justify-center h-5/6 align-middle">
      {
        user ? (
          <div className="flex flex-col justify-center h-full align-middle">
            <h1 className="text-3xl font-bold italic h-fit self-center">
              Welcome, {user.displayName}!
            </h1>
            <img
              src={user.photoURL!}
              alt={user.displayName!}
              className="rounded-full h-20 w-20 self-center mt-2"
            />
          </div>
        ) : null
      }
    </div>
  );
}

const NewGame = () => {
  const user = useContext(UserContext);

  return (
    <div className="app flex justify-center h-5/6 align-middle">
      {
        user ? (
          <div className="flex flex-col justify-center h-full align-middle">
            <h1 className="text-3xl font-bold italic h-fit self-center">
              Starting a new game...
            </h1>
            <img
              src={user.photoURL!}
              alt={user.displayName!}
              className="rounded-full h-20 w-20 self-center mt-2"
            />
          </div>
        ) : null
      }
    </div>
  );
}


function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    auth.onAuthStateChanged(newUser => {
      if (newUser) {
        if (user === null) {
          setUser(newUser);
          setLoading(false);
        }
      } else {
        signInWithRedirect(auth, provider);
      }
    });
  })

  const addOn = loading ? <LoadingOverlay /> : null;

  return (
    <UserContext.Provider value={user}>
      { addOn }
      { user ? <Nav /> : null }
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/new-game' element={<NewGame />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
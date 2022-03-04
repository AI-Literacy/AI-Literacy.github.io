import { useEffect, useState } from 'react';
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
import MainPage from '../MainPage';
import NewGame from '../NewGame';

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

  return (
    <UserContext.Provider value={user}>
      { loading ? <LoadingOverlay /> : null }
      <Router>
        { user ? <Nav /> : null }
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/new-game' element={<NewGame />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
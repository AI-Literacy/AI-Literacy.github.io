import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../App";
import LoadingOverlay from "../LoadingOverlay";
import InvalidGame from "./InvalidGame";
import PlayGameOwner from "./PlayGameOwner";
import PlayGameStudent from "./PlayGameStudent";

const PlayGame = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [owner, setOwner] = useState<boolean>(false);

  const { gid } = useParams();
  const user = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!gid || !user) return;

      const db = getFirestore();
      const gameRef = await getDoc(doc(db, 'games', gid));

      if (!gameRef.exists()) {
        setInvalid(true);
      } else {
        setOwner(user.uid === gameRef.data().owner);
      }

      setLoaded(true);
    })();
  })

  if (!loaded) return <LoadingOverlay />;
  if (invalid) return <InvalidGame />;
  if (owner) return <PlayGameOwner />;
  else return <PlayGameStudent />;
}

export default PlayGame;
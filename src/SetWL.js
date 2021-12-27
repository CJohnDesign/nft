import { doc, setDoc } from "firebase/firestore"; 
// import AddAlert from "./scripts/addAlert"

async function SetWL(db, wallet, twitter, email) {
  let response = await setDoc(doc(db, "wl", wallet), {
    wallet: wallet,
    twitter: twitter,
    email: email
  });

  return(response)
}

export default SetWL;
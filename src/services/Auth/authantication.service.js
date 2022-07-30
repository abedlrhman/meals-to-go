import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const RegisterRequest = ( email, password ) =>
{
  return createUserWithEmailAndPassword(auth, email, password);
}

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./database";

export const getUserData = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

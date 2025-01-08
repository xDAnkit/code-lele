import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";

import { db } from "../../Firebase/firebase";
import { firebaseDbName } from "../../config/app.config";

// Add and Update Data
export const createOrUpdateRecord = async ({
  editorCode,
  userID,
  title,
  selectedLanguage,
}) => {
  try {
    const userDocRef = doc(collection(db, firebaseDbName), `${userID}`);
    const docsnap = await getDoc(userDocRef);
    if (!docsnap.exists()) {
      await setDoc(userDocRef, {
        title,
        id: userID,
        code: editorCode,
        createdAt: new Date().getTime(),
        language: selectedLanguage,
        updatedAt: new Date().getTime(),
      });
    } else {
      await updateDoc(userDocRef, {
        title,
        code: editorCode,
        updatedAt: String(new Date().getTime()),
        language: selectedLanguage,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Fetch Single Data
export const getSingleRecord = async ({
  userID,
  userIdFromFirebase,
  setEditorCode,
  setTitle,
}) => {
  try {
    const docRef = doc(db, firebaseDbName, userID);
    const docSnap = await getDoc(docRef);
    userIdFromFirebase = docSnap.data().userId;
    console.log("HasUser ", userIdFromFirebase);
    if (docSnap.exists()) {
      setEditorCode(docSnap.data().code);
      setTitle(docSnap.data().title);
    } else {
      console.log("No Such Document Found");
    }
  } catch (e) {
    console.log("Not able to fetch Data: ", e);
  }
};

export const getAllRecords = async () => {
  const querySnapshot = await getDocs(collection(db, firebaseDbName));
  const savedData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return savedData;
};

export const deleteRecord = async (deleteID) => {
  await deleteDoc(doc(db, firebaseDbName, deleteID));
};

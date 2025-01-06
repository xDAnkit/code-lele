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

// Add and Update Data
export const SaveOrUpdate = ({
  editorCode,
  userID,
  title,
  selectedLanguage,
}) => {
  const addUpdateData = async () => {
    try {
      const userDocRef = doc(collection(db, "Codelele"), `${userID}`);
      const docsnap = await getDoc(userDocRef);
      if (!docsnap.exists()) {
        await setDoc(userDocRef, {
          title,
          id: userID,
          code: editorCode,
          // userId: user.name,
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

  addUpdateData();
};

// Fetch Single Data
export const FetchData = ({
  userID,
  userIdFromFirebase,
  setEditorCode,
  setTitle,
}) => {
  const fetchLogic = async () => {
    try {
      const docRef = doc(db, "Codelele", userID);
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

  if (userID) {
    fetchLogic();
  }
};

export const FetchAllData = async () => {
  const querySnapshot = await getDocs(collection(db, "Codelele"));
  const savedData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("SavedData", savedData);
  return savedData;
};

export const DeleteData = async (deleteID) => {
  console.log("Inside Delete", deleteID);

  await deleteDoc(doc(db, "Codelele", deleteID));
};

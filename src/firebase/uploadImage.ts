import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./index";

export const uploadImageToFireBase = (repo: string, file: any, callback?: any) => {
  const storageRef = ref(storage, `${repo}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed", () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      callback(downloadURL);
    });
  });
};

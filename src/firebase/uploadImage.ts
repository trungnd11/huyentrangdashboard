import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Alert from "../components/alert/Alert";
import { storage } from "./index";

export const uploadImageToFireBase = (repo: string, file: any, callback?: any) => {
  const storageRef = ref(storage, `${repo}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      Alert("error", "Lỗi upload ảnh, Vui lòng thử lại!");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const deleteImageToFireBase = (url: string | undefined | null | any) => {
  const desertRef = ref(storage, url);
  deleteObject(desertRef)
    .then(() => {
      console.log("OK")
    })
    .catch((error) => {
      
    });
}

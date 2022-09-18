import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Alert, { RemoveAlert } from "../components/alert/Alert";
import { storage } from "./index";

export const uploadImageToFireBase = (repo: string, file: any, callback?: any) => {
  const storageRef = ref(storage, `${repo}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  Alert("loading", "Đang lưu ảnh, vui lòng chờ...");
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      Alert("error", "Lỗi upload ảnh, Vui lòng thử lại!");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        RemoveAlert();
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
      RemoveAlert();
      Alert("error", "Lỗi thêm ảnh, vui lòng thử lại")
    });
}

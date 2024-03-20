// FIREBASES
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { FIREBASE_STORAGE } from '../Api/db';

export async function uploadImage(uri, nameImage) { //get uri from device and return the downloadURL STORAGE
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(FIREBASE_STORAGE, "Stuff/" + nameImage);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export async function updateImage(imageName, newUri) {
  try {
    // Fetch the new image from the provided URI
    const response = await fetch(newUri);
    const blob = await response.blob();

    // Get a reference to the existing image in Firebase Storage
    const storageRef = ref(FIREBASE_STORAGE, "Stuff/" + imageName);

    // Upload the new image, overwriting the existing one
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Return a promise to handle the upload task
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        },
        async () => {
          try {
            // Get the download URL of the new image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
}
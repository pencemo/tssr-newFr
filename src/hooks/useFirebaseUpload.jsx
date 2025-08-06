// src/hooks/useFirebaseUpload.ts
import { useState, useCallback } from "react";
import { storage } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

export function useFirebaseUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(
    async ({
      file,
      path, // e.g. `user_uploads/${uid}/images`
      onTaskCreated,
    }) => {
      setError(null);
      setProgress(0);
      setUploading(true);

      const safeName = file.name.replace(/\s+/g, "_");
      const fileRef = ref(storage, `${path}/${Date.now()}-${safeName}`);
      const task = uploadBytesResumable(fileRef, file);
      if (onTaskCreated) onTaskCreated(task);

      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => {
            const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(Math.round(pct));
          },
          (err) => {
            setUploading(false);
            setError(err.message || "Upload failed");
            reject(err);
          },
          async () => {
            try {
              const url = await getDownloadURL(task.snapshot.ref);
              setUploading(false);
              resolve({ url, fullPath: task.snapshot.ref.fullPath });
            } catch (e) {
              setUploading(false);
              setError(e.message || "Could not get download URL");
              reject(e);
            }
          }
        );
      });
    },
    []
  );

  return { uploadFile, progress, uploading, error };
}


export async function deleteByUrl(downloadUrl) {
  try{
    const fileRef = ref(storage, downloadUrl);
  await deleteObject(fileRef);
  }catch{
    console.log('error');
  }
}
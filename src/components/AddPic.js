import React, { useState } from "react";
import "../styles/AddPic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, storage } from "../PasswordsAndKeys";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import load from "../images/loading.gif";
import { useAppData } from "../ApplicationData";

export default function AddPic() {
    let [img, setImg] = useState(null);
    let [fileName, setFileName] = useState("");
    let [loading, setLoading] = useState(false);
    let { picsObj, setPicsObj } = useAppData();

    function notify(message = "All is well", type = "success") {
        toast(message, {
            theme: "dark",
            type: type,
            position: "top-center",
            style: {
                background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(1, 0, 73))",
                fontSize: "16px",
            },
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setFileName(file.name);
        } else {
            setImg(null);
            setFileName("");
        }
    };

    async function addImage() {
        if (img === null) {
            notify("Please choose an image", "warning");
            return;
        }
        try {
            setLoading(true);
            const storageRef = ref(storage, `portfolioImages/${img.name}`);
            const snapshot = await uploadBytes(storageRef, img);
            const url = await getDownloadURL(snapshot.ref);
            let docId = await addDoc(collection(db, "iMageniusImages"), {
                imageUrl: url,
                name: img.name,
            });
            let obj = {
                id: docId.id,
                imageUrl: url,
                name: img.name,
            };
            let pics = picsObj;
            pics.push(obj);
            setPicsObj(pics);
            setLoading(false);
            setFileName("");
            setImg(null);
            notify("Image Uploaded Successfully", "success");
        } catch (e) {
            setLoading(false);
            notify("Can't upload image right now!", "warning");
        }
    }

    return (
        <div className="amain">
            <FontAwesomeIcon icon={faImage} className="ricon" />
            <h1>Add Image to Profile</h1>
            {loading ? (
                <img src={load} alt="Loading..." className="loadingI"></img>
            ) : (
                ""
            )}
            <div className="aFile">
                <label className="fileInputLabel">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="fileInput"
                    />
                    Choose Image
                </label>
                {fileName && (
                    <p className="fileName">Selected Image: {fileName}</p>
                )}
            </div>
            <div className="abtn" onClick={() => addImage()}>
                Upload Image
            </div>
        </div>
    );
}

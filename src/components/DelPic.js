import React, { useState } from "react";
import "../styles/DelPic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppData } from "../ApplicationData";
import { db, storage } from "../PasswordsAndKeys";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import load from "../images/loading.gif";

export default function DelPic() {
    let { picsObj, setPicsObj } = useAppData();
    let [picId, setPicId] = useState("");
    let [loading, setLoading] = useState(false);

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

    async function removeImg() {
        if (picId === "") {
            notify("Please select an image!", "warning");
            return;
        }
        try {
            setLoading(true);
            let x = picsObj.filter((v) => {
                return v.id === picId;
            });
            let delIimgUrl = x[0].imageUrl;
            const fileRef = ref(storage, delIimgUrl);
            await deleteObject(fileRef);
            const docRef = doc(db, "iMageniusImages", picId);
            await deleteDoc(docRef);
            setLoading(false);
            let d = picsObj.filter((v) => {
                return v.id !== picId;
            });
            setPicId("");
            setPicsObj(d);
            notify("Image deleted successfully", "success");
        } catch (e) {
            setLoading(false);
            notify("Can't remove right now!", "warning");
        }
    }

    return (
        <div className="dmain">
            <FontAwesomeIcon icon={faTrash} className="ricon" />
            <h1>Remove Image from Profile</h1>
            {loading ? (
                <img src={load} alt="Loading..." className="dload"></img>
            ) : (
                ""
            )}
            <div className="dSkill">
                <select
                    onChange={(e) => setPicId(e.target.value)}
                    value={picId}
                >
                    <option value="" disabled>
                        Select an image
                    </option>{" "}
                    {picsObj.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="dbtn" onClick={() => removeImg()}>
                Remove Image
            </div>
        </div>
    );
}

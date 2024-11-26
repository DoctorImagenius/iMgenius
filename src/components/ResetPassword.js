import React, { useState } from "react";
import "../styles/ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../PasswordsAndKeys";
import load from "../images/loading.gif";
import { useAppData } from "../ApplicationData";
import md5 from 'md5';


export default function ResetPassword() {
    let [newpassword, setnewpassword] = useState("");
    let [loading, setLoading] = useState(false);
    let { setPassword } = useAppData();

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

    async function resetPassword() {
        if (newpassword.length <= 7) {
            notify("Password must be at least 8 characters.", "warning");
        } else {
            try {
                setLoading(true);
                const docRef = doc(
                    db,
                    "iMageniusPassword",
                    "portfolioPassword"
                );
                await updateDoc(docRef, {
                    password: newpassword,
                });
                const hashedPassword = md5(newpassword);
                setPassword(hashedPassword);
                notify("Password has been reset successfully", "success");
                setnewpassword("");
                setLoading(false);
            } catch (e) {
                notify("Password can't be reset right now!", "error");
                setnewpassword("");
                setLoading(false);
            }
        }
    }

    return (
        <div className="rmain">
            <FontAwesomeIcon icon={faUnlock} className="ricon" />
            <h1>Reset Password</h1>
            {loading ? (
                <img src={load} alt="Loading..." className="loading"></img>
            ) : (
                ""
            )}
            <div className="rinp">
                <input
                    type="text"
                    placeholder="Enter New Password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                />
            </div>
            <div className="rbtn" onClick={() => resetPassword()}>
                Reset Now
            </div>
        </div>
    );
}

import React from "react";
import "../styles/LogOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppData } from "../ApplicationData";

export default function LogOut() {
    let { setIsLogin } = useAppData();

    return (
        <div className="omain">
            <FontAwesomeIcon icon={faRightFromBracket} className="oicon" />
            <h1>Log Out</h1>
            <div className="obtn" onClick={() => setIsLogin(false)}>
                Logout
            </div>
        </div>
    );
}

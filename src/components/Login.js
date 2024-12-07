import React, { useState } from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import load from "../images/loading.gif";
import { useAppData } from "../ApplicationData";
import md5 from "md5";

export default function Login() {
    let {
        emailServiceId,
        emailTemplateId,
        emailPublicKey,
        newPassword,
        setNewPassword,
        password,
        passwordAttempts,
        setPasswordAttempts,
        forgetAttempts,
        setForgetAttempts,
        passRedBorder,
        setPassRedBorder,
        setIsLogin,
    } = useAppData();
    let [toggle, setToggle] = useState(false);
    let [inputValue, setInputValue] = useState("");
    let [loading, setLoading] = useState(false);

    function notify(message = "All is well", type = "success") {
        toast(message, {
            theme: "dark",
            type: type,
            position: "top-center",
            style: {
                background:
                    "linear-gradient(to right, rgb(0, 0, 0), rgb(1, 0, 73))",
            },
        });
    }

    async function login() {
        setInputValue("");
        if (passwordAttempts >= 3) {
            notify("You are Blocked!", "error");
            return;
        }
        const hashedPassword = md5(inputValue);

        const isMatch = hashedPassword === password;
        const isMatchForget = hashedPassword === newPassword;

        if (isMatch || (isMatchForget && newPassword !== "")) {
            setForgetAttempts(0);
            setPasswordAttempts(0);
            setIsLogin(true);
            setPassRedBorder(false);
            notify("Login Successfully", "success");
        } else {
            setPasswordAttempts(passwordAttempts + 1);
            setPassRedBorder(true);
            if (passwordAttempts === 2) {
                notify("You are Blocked!", "error");
                return;
            }
            notify("Incorrect Password!", "warning");
        }
    }

    async function ForgetPassword() {
        setForgetAttempts(forgetAttempts + 1);
        if (forgetAttempts >= 3) {
            notify("Can't Forget Password right now!", "error");
            return;
        }
        setLoading(true);
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let code = "";
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }

        const hashedPassword = md5(code);
        setNewPassword(hashedPassword);

        emailjs
            .send(
                emailServiceId,
                emailTemplateId,
                {
                    from_name: "iMagenius",
                    message: `Hello, This is the new Code of Imagenius Portfolio. Don't shere this to anyone...(Code : ${code})`,
                },
                emailPublicKey
            )
            .then(
                () => {
                    notify("Code sent successfully.", "success");
                    setLoading(false);
                },
                () => {
                    notify("Can't send code right now!", "info");
                    setLoading(false);
                }
            );
    }

    return (
        <div
            className="lmain"
        >
            <FontAwesomeIcon icon={faLock} className="licon"></FontAwesomeIcon>
            <h1>Enter Password to Edit Portfolio</h1>
            <div
                className="inp"
                style={
                    passRedBorder
                        ? { border: "1px solid red", borderRadius: "10px" }
                        : {}
                }
            >
                <input
                    type={toggle ? "text" : "password"}
                    placeholder="Enter Password"
                    style={toggle ? { color: "red" } : { color: "blue" }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></input>
                {toggle ? (
                    <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => setToggle(!toggle)}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faEyeSlash}
                        onClick={() => setToggle(!toggle)}
                    />
                )}
            </div>
            <div className="btn" onClick={login}>
                Login
            </div>
            <div className="reset" onClick={ForgetPassword}>
                Forget Password?
                {loading ? (
                    <img src={load} width={400} alt="Loading..."></img>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

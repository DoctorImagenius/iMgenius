import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../styles/ContactCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { useAppData } from "../ApplicationData";
import load from "../images/loading.gif";

export default function ContactCard() {
    let { emailServiceId, emailTemplateId, emailPublicKey } = useAppData();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState("");
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

    function senEmailToImagenius() {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === "") {
            notify("Please Enter your name", "warning");
        } else if (!emailRegex.test(email)) {
            notify("Please Enter valid email", "warning");
        } else if (message === "") {
            notify("Please Enter your message", "warning");
        } else {
            setLoading(true);
            emailjs
                .send(
                    emailServiceId,
                    emailTemplateId,
                    {
                        from_name: email,
                        to_name: "My name is " + name,
                        message: message,
                    },
                    emailPublicKey
                )
                .then(
                    () => {
                        notify("Email Sent Successfully.", "success");
                        setLoading(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                    },
                    () => {
                        notify("Can't Send Email right now!", "info");
                        setLoading(false);
                    }
                );
        }
    }

    return (
        <div className="ccmain">
            <FontAwesomeIcon
                icon={faEnvelope}
                className="icon"
            ></FontAwesomeIcon>
            <h1>Mail to Imagenius</h1>
            <div className="cinp">
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div className="cinp">
                <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div className="cinp">
                <textarea
                    placeholder="Write message here..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            <div className="cbtn" onClick={senEmailToImagenius}>
                Send
            </div>
            {loading ? (
                <img src={load} width={400} height={40} alt="Loading..."></img>
            ) : (
                ""
            )}
        </div>
    );
}

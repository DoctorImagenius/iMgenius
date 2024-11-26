import React from "react";
import "../styles/LinkCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LinkCard() {
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

    return (
        <div className="lcmain">
            <a
                href="https://wa.me/923096995350"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="icicon" />
            </a>
            <a
                href="https://github.com/DoctorImagenius/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faGithub} className="icicon" />
            </a>
            <a
                href="https://www.facebook.com/profile.php?id=100082678262037"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faFacebook} className="icicon" />
            </a>

            <FontAwesomeIcon
                icon={faEnvelope}
                className="icicon"
                onClick={() => notify("You are already in this page!", "info")}
            />

            <a
                href="https://www.linkedin.com/in/haroon-malik-7a1a152b8/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faLinkedin} className="icicon" />
            </a>
            <a
                href="https://www.instagram.com/dr.imagenius/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faInstagram} className="icicon" />
            </a>
        </div>
    );
}

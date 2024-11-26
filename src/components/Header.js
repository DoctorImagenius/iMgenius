import React, { useState } from "react";
import "../styles/Header.css";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faHouse,
    faMedal,
    faPen,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppData } from "../ApplicationData";

export default function Header() {
    let { headerColor, setIBeautyFilter } = useAppData();
    let [isMenu, setIsMenu] = useState(false);

    return (
        <div className="main">
            <div className="mainLeft">
                <img src={logo} alt="logo" />
                <div >iMagenius</div>
            </div>
            <div className="mainRight">
                <Link
                    className="mainRightLink"
                    to={"/"}
                    style={headerColor[0] ? { color: "#ffee00"  } : {}}
                >
                    <FontAwesomeIcon icon={faHouse} />
                    <div>iHome</div>
                </Link>
                <Link
                    className="mainRightLink"
                    to={"/iGraphy"}
                    style={headerColor[1] ? { color: "#ffee00" } : {}}
                >
                    <FontAwesomeIcon icon={faPen} />
                    <div>iGraphy</div>
                </Link>
                <div
                    onClick={() => setIsMenu(!isMenu)}
                    className="mainRightLink"
                    style={headerColor[2] ? { color: "#ffee00" } : {}}
                >
                    <FontAwesomeIcon icon={faMedal} />
                    <div>iBeauty</div>
                    {isMenu ? (
                        <div className="options">
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    My Voice
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Paintings
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Writings
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Martial Arts
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Sports
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Software Skills
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Hardwate Skills
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Mechatronics Skills
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Achievements
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Projects
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Inventions
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Ideas
                                </div>
                            </Link>
                            <Link className="linkOption" to={"/iBeauty"}>
                                <div
                                    onClick={(e) =>
                                        setIBeautyFilter(e.target.textContent)
                                    }
                                >
                                    Others
                                </div>
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Link
                    className="mainRightLink"
                    to={"/iContact"}
                    style={headerColor[3] ? { color: "#ffee00" } : {}}
                >
                    <FontAwesomeIcon icon={faPhone} />
                    <div>iContact</div>
                </Link>
                <Link
                    className="mainRightLink"
                    to={"/iSettings"}
                    style={headerColor[4] ? { color: "#ffee00" } : {}}
                >
                    <FontAwesomeIcon icon={faGear} />
                    <div>iSettings</div>
                </Link>
            </div>
        </div>
    );
}

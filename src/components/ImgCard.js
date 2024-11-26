import React, { useEffect, useState } from "react";
import "../styles/ImgCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRecycle,
    faThumbsUp,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppData } from "../ApplicationData";
import load from "../images/loading.gif";
import { db, storage } from "../PasswordsAndKeys";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export default function ImgCard({
    id = "",
    title = "",
    date = "",
    img = "",
    details = "",
    like = 0,
    links = [],
    skill = "",
}) {
    let [isLike, setIsLike] = useState(false);
    let [likes, setLikes] = useState(like);
    let [showDetails, setShowDetails] = useState(false);
    let [showdel, setShowDel] = useState(false);
    let [loading, setLoading] = useState(false);
    let { data, setData, isLogin } = useAppData();
    let [showUp, setShowUp] = useState(false);
    let [newTitle, setNewTitle] = useState(title);
    let [newDetails, setNewDetails] = useState(details);
    let [newLink1, setNewLink1] = useState("");
    let [newLink2, setNewLink2] = useState("");
    let [newLink3, setNewLink3] = useState("");
    let [newLinks, setNewLinks] = useState(links);

    useEffect(() => {
        if (links[0] === undefined || links[0] === null || links[0] === "") {
            setNewLink1("");
        } else {
            setNewLink1(links[0]);
        }
        if (links[1] === undefined || links[1] === null || links[1] === "") {
            setNewLink2("");
        } else {
            setNewLink2(links[1]);
        }
        if (links[2] === undefined || links[2] === null || links[2] === "") {
            setNewLink3("");
        } else {
            setNewLink3(links[2]);
        }
        setNewTitle(title);
        setNewDetails(details);
        setLikes(like);
        setNewLinks(links);
    }, [id, title, details, like, links]);


    async function updateLike(l) {
        try {
            const docRef = doc(db, "iMageniusData", id);
            await updateDoc(docRef, {
                likes: l,
            });
        } catch (e) {
            notify("Can't Like right now!", "warning");
        }
    }

    function likeBtn() {
        if (isLike === false) {
            setLikes(likes + 1);
            updateLike(likes + 1);
        } else {
            setLikes(likes - 1);
            updateLike(likes - 1);
        }
        setIsLike(!isLike);
    }

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

    function deleteComp() {
        if (isLogin) {
            setShowDel(true);
        } else {
            notify("Only Imagenius can Delete", "info");
        }
    }

    async function deletePost() {
        setLoading(true);
        try {
            const docRef = doc(db, "iMageniusData", id);
            await deleteDoc(docRef);
            let filteredData = data.filter((item) => item.id !== id);
            const fileRef = ref(storage, img);
            await deleteObject(fileRef);
            notify("Post Deleted Successfully", "success");
            setData(filteredData);
            setLoading(false);
            setShowDel(false);
        } catch (e) {
            notify("Can't Delete right now!", "warning");
        }
    }

    function updateComp() {
        if (isLogin) {
            setShowUp(true);
        } else {
            notify("Only Imagenius can Update", "info");
        }
    }

    function updatePost() {
        if (newTitle === "") {
            notify("Please write your title", "warning");
            return;
        }

        updateDataBase();
    }

    async function updateDataBase() {
        try {
            setLoading(true);
            let array = [];
            if (newLink1 !== "") {
                array.push(newLink1);
            }
            if (newLink2 !== "") {
                array.push(newLink2);
            }
            if (newLink3 !== "") {
                array.push(newLink3);
            }
            setNewLinks(array);
            let obj1 = {
                date: date,
                details: newDetails,
                title: newTitle,
                id: id,
                img: img,
                likes: likes,
                skill: skill,
                links: array,
            };
            let d = data.filter((v, i) => {
                return v.id !== id;
            });
            d.push(obj1);
            setData(d);
            const docRef = doc(db, "iMageniusData", id);
            await updateDoc(docRef, {
                title: newTitle,
                details: newDetails,
                links: array,
            });
            notify("Post Updated Successfully", "success");
            setShowUp(false);
            setLoading(false);
        } catch (e) {
            setShowUp(false);
            notify("Can't Update right now!", "warning");
        }
    }

    return (
        <div className="cmain">
            {showdel ? (
                <div className="modal">
                    <div className="imain">
                        {loading ? (
                            <>
                                <h3 className="wait">Wait please!</h3>
                                <img
                                    src={load}
                                    alt="Loading..."
                                    className="load"
                                ></img>
                            </>
                        ) : (
                            <div>
                                <h3>Are you sure to delete this?</h3>
                                <div
                                    className="cancel"
                                    onClick={() => setShowDel(false)}
                                >
                                    Cancel
                                </div>
                                <div
                                    className="delete"
                                    onClick={() => deletePost()}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
            {showUp ? (
                <div className="modal">
                    <div className="imain">
                        {loading ? (
                            <div>
                                <h3 className="wait">Wait Please!</h3>
                                <img
                                    src={load}
                                    alt="Loading..."
                                    className="load"
                                ></img>
                            </div>
                        ) : (
                            <>
                                <h3 className="titleUp">Update your Post</h3>
                                <div className="heading">Title</div>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="box"
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                />
                                <div className="heading">Details</div>
                                <textarea
                                    className="detailUp"
                                    rows={4}
                                    value={newDetails}
                                    onChange={(e) =>
                                        setNewDetails(e.target.value)
                                    }
                                ></textarea>
                                <div className="heading">Links</div>
                                <input
                                    type="text"
                                    className="box"
                                    value={newLink1}
                                    onChange={(e) =>
                                        setNewLink1(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="box"
                                    value={newLink2}
                                    onChange={(e) =>
                                        setNewLink2(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="box"
                                    value={newLink3}
                                    onChange={(e) =>
                                        setNewLink3(e.target.value)
                                    }
                                />
                                <div className="updateBtn">
                                    <div
                                        className="canelPost"
                                        onClick={() => setShowUp(!showUp)}
                                    >
                                        Cancel
                                    </div>
                                    <div
                                        className="updatePost"
                                        onClick={() => updatePost()}
                                    >
                                        Update
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="top">
                <div className="topLeft">
                    <img
                        src={img}
                        alt="No Wallpaper!"
                        className="responsiveImg"
                    />
                </div>
                <div className="topRight">
                    <div className="crossBar">
                        <h3 className="DateBar">{date}</h3>
                            <div title="Update" onClick={updateComp} className="up">
                                <FontAwesomeIcon
                                    icon={faRecycle}
                                    color="#48ff00"
                                />
                            </div>
                            <div title="Delete" onClick={deleteComp} className="de">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#ff0000"
                                />
                            </div>
                    </div>
                    <h1 className="titleBar">{newTitle}</h1>
                    <div className="clike">
                        <div
                            className="details"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Hide Details" : "Show Details"}
                        </div>
                        <div className="like" title="Like" onClick={likeBtn}>
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                color={isLike ? "#48ff00" : "#0091ff"}
                                className="likeIcon"
                            />
                        </div>
                        <h5>{likes}</h5>
                    </div>
                </div>
            </div>
            {showDetails ? (
                <>
                    <div className="bottom">
                        {newDetails}
                        <div className="links">
                            {newLinks.map((link, index) => (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={index}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
}

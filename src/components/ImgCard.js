import React, { useEffect, useState } from "react";
import "../styles/ImgCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleRight,
    faCommenting,
    faRecycle,
    faThumbsUp,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppData } from "../ApplicationData";
import load from "../images/loading.gif";
import { db, storage } from "../PasswordsAndKeys";
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { ref, deleteObject  } from "firebase/storage";


export default function ImgCard({
    id = "",
    title = "",
    date = "",
    img = "",
    details = "",
    like = 0,
    links = [],
    skill = "",
    comments = [],
    video = "",
}) {
    let [isLike, setIsLike] = useState(false);
    let [likes, setLikes] = useState(like);
    let [showDetails, setShowDetails] = useState(false);
    let [showdel, setShowDel] = useState(false);
    let [loading, setLoading] = useState(false);
    let { setData, isLogin } = useAppData();
    let [showUp, setShowUp] = useState(false);
    let [newTitle, setNewTitle] = useState(title);
    let [newDetails, setNewDetails] = useState(details);
    let [newLink1, setNewLink1] = useState("");
    let [newLink2, setNewLink2] = useState("");
    let [newLink3, setNewLink3] = useState("");
    let [newLinks, setNewLinks] = useState(links);
    let [showComments, setShowComments] = useState(false);
    let [newComments, setNewComments] = useState(comments);
    let [newName, setNewName] = useState("");
    let [newComment, setNewComment] = useState("");

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
        setNewComments(comments);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function updateLike(l) {
        try {
            const docRef = doc(db, "iMageniusData", id);
            await updateDoc(docRef, {
                likes: l,
            });
            let obj1 = {
                date: date,
                details: newDetails,
                title: newTitle,
                id: id,
                img: img,
                likes: l,
                skill: skill,
                links: newLinks,
                video: video,
                comments:comments
            };
            setData(prevData => prevData.map(item => item.id === id ? obj1 : item));
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
            if (video === "") {
                const fileRef = ref(storage, img);
                await deleteObject(fileRef);
            }
            notify("Post Deleted Successfully", "success");
            setData(prevData => prevData.filter(item => item.id !== id));
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
                video: video,
            };
            setData(prevData => prevData.map(item => item.id === id ? obj1 : item));
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

    function capitalizeFirstLetter(word) {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    async function writeComment() {
        if (!newName) {
            notify("Please write your name", "warning");
            return;
        }
        if (!newComment) {
            notify("Please write your comment", "warning");
            return;
        }
        try {
            let obj = {
                name: newName,
                comment: newComment,
            };
            let jsonString = JSON.stringify(obj);
            let d = newComments;
            d.push(jsonString);
            setNewComments(d);
            setNewName("");
            setNewComment("");
            notify("Comment added successfully", "success");
            const docRef = doc(db, "iMageniusData", id);
            await updateDoc(docRef, {
                comments: d,
            });
        } catch (e) {
            notify("Can't comment right now!", "warning");
        }
    }

    async function deleteComment(key) {
        try {
            let afterDelComment = newComments.filter((v, i) => {
                return key !== i;
            });
            setNewComments(afterDelComment);
            notify("Comment deleted successfully", "success");
            const docRef = doc(db, "iMageniusData", id);
            await updateDoc(docRef, {
                comments: afterDelComment,
            });
        } catch (e) {
            notify("Can't comment right now!", "warning");
        }
    }

    const getVideoId = (url) => {
        const urlObj = new URL(url);
        
        if (urlObj.searchParams.has("list")) {
            let playlistId = urlObj.searchParams.get("list");
            return `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&autoplay=1&controls=1`;
        }
        if (urlObj.hostname === "youtu.be") {
            let videoId = urlObj.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=1`;
        } else if (
            urlObj.hostname === "www.youtube.com" ||
            urlObj.hostname === "youtube.com"
        ) {
            let videoId =
                urlObj.searchParams.get("v") || urlObj.pathname.split("/")[2];
            return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1`;
        }
        return null;
    };
    

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
                {video !== "" ? (
                    <div className="topLeftv">
                        <iframe
                            className="responsiveVid"
                            src={getVideoId(video)}
                            frameBorder="0"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Video"
                        ></iframe>
                    </div>
                ) : (
                    <div className="topLeft">
                        <img
                            src={img}
                            alt="This post have no wallpaper right now!"
                            className="responsiveImg"
                        />
                    </div>
                )}
                <div className="topRight">
                    <div className="crossBar">
                        <h3 className="DateBar">{date}</h3>
                        <div title="Update" onClick={updateComp} className="up">
                            <FontAwesomeIcon icon={faRecycle} color="#48ff00" />
                        </div>
                        <div title="Delete" onClick={deleteComp} className="de">
                            <FontAwesomeIcon icon={faTrash} color="#ff0000" />
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
                        <div
                            className="comment"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <FontAwesomeIcon
                                icon={faCommenting}
                                className="commentIcon"
                                title="Comments"
                            />
                        </div>
                        <div className="like" title="Like" onClick={likeBtn}>
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                color={isLike ? "#48ff00" : "#00d9ff"}
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

            {showComments ? (
                <div className="mainCom">
                    <div className="label">Comments</div>
                    {newComments.map((v, i) => {
                        return (
                            <div key={i} className="commSec">
                                <div className="comComm">
                                    <span className="comName">
                                        {capitalizeFirstLetter(
                                            JSON.parse(v).name
                                        )}
                                        {" : "}
                                    </span>
                                    {JSON.parse(v).comment}
                                </div>
                                {isLogin ? (
                                    <div
                                        className="delCom"
                                        onClick={() => deleteComment(i)}
                                    >
                                        Delete
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    })}
                    <div className="postComment">
                        <input
                            placeholder="Name"
                            className="namecom"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        ></input>
                        <input
                            placeholder="Write a comment..."
                            className="wcom"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></input>
                        <div
                            className="postCommentNew"
                            onClick={() => writeComment()}
                        >
                            <FontAwesomeIcon
                                icon={faCircleRight}
                                className="commIcon"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

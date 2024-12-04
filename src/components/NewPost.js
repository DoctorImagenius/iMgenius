import React, { useState } from "react";
import "../styles/NewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import load from "../images/loading.gif";
import { db, storage } from "../PasswordsAndKeys";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAppData } from "../ApplicationData";

export default function NewPost() {
    let [img, setImg] = useState(null);
    let [fileName, setFileName] = useState("");
    let [title, setTitle] = useState("");
    let [details, setDetails] = useState("");
    let [link1, setLink1] = useState("");
    let [link2, setLink2] = useState("");
    let [link3, setLink3] = useState("");
    let [skill, setSkill] = useState("My Voice");
    let [loading, setLoading] = useState(false);
    let { setData } = useAppData();

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
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
        setFileName(file.name);
    };

    async function post() {
        if (title === "") {
            notify("Please write your title", "warning");
            return;
        }
        if (img === null) {
            notify("Please choose an image", "warning");
            return;
        }
        let linkArray = [];
        if (link1 !== "") {
            linkArray.push(link1);
        }
        if (link2 !== "") {
            linkArray.push(link2);
        }
        if (link3 !== "") {
            linkArray.push(link3);
        }
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        setLoading(true);
        let d = details;
        if (!d || d === "") {
            d = "There is no details about this post!";
        }
        try {
            const storageRef = ref(storage, `images/${img.name}`);
            const snapshot = await uploadBytes(storageRef, img);
            const url = await getDownloadURL(snapshot.ref);
            let obj = {
                date: formattedDate,
                details: d,
                img: url,
                likes: 0,
                skill: skill,
                title: title,
                links: linkArray,
                comments: [],
            };
            await addDoc(collection(db, "iMageniusData"), obj);
            let newObjs = [];
            const querySnapshot = await getDocs(
                collection(db, "iMageniusData")
            );
            querySnapshot.forEach((doc) => {
                newObjs.push({ id: doc.id, ...doc.data() });
            });
            setData(newObjs);
            setTitle("");
            setDetails("");
            setImg(null);
            setFileName("");
            setLink1("");
            setLink2("");
            setLink3("");
            setSkill("");
            notify("Post uploaded successfully...", "success");
            setLoading(false);
        } catch (error) {
            notify("Server is down now!", "warning");
            setLoading(false);
        }
    }

    return (
        <div className="pmain">
            <FontAwesomeIcon icon={faFileCirclePlus} className="picon" />
            <h1>Add New Post</h1>
            {loading ? <img src={load} alt="Loading..."></img> : ""}
            <div className="pinp">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="pinp">
                <textarea
                    placeholder="Write Details Here...(Optional)"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                ></textarea>
            </div>
            <div className="pLinks">
                <h2>Add Some Links</h2>
                <input
                    type="text"
                    placeholder="Link 1 (optional)"
                    value={link1}
                    onChange={(e) => setLink1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link 2 (optional)"
                    value={link2}
                    onChange={(e) => setLink2(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link 3 (optional)"
                    value={link3}
                    onChange={(e) => setLink3(e.target.value)}
                />
            </div>
            <div className="pFile">
                <h2>Select an Image</h2>
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
            <div className="pSkill">
                <h2>Select your skill</h2>
                <select
                    onChange={(e) => setSkill(e.target.value)}
                    value={skill}
                >
                    <option>My Voice</option>
                    <option>Paintings</option>
                    <option>Writings</option>
                    <option>Martial Arts</option>
                    <option>Sports</option>
                    <option>Software Skills</option>
                    <option>Hardware Skills</option>
                    <option>Mechatronics Skills</option>
                    <option>Achievements</option>
                    <option>Projects</option>
                    <option>Inventions</option>
                    <option>Ideas</option>
                    <option>Others</option>
                </select>
            </div>
            <div className="pbtn" onClick={post}>
                Post
            </div>
        </div>
    );
}

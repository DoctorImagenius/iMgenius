import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/Home.css";
import ImgCard from "../components/ImgCard";
import { useAppData } from "../ApplicationData";
import load from "../images/loading.gif";
import { db } from "../PasswordsAndKeys";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fuse from "fuse.js"; // Import Fuse.js

export default function Home() {
    let { setHeaderColor, data, setData, homeLoading } = useAppData();
    let [searchData, setSearchData] = useState("");
    let [filteredData, setFilteredData] = useState([]);

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

    const readDataFromDataBase = useCallback(async () => {
        try {
            let objs = [];
            const querySnapshot = await getDocs(
                collection(db, "iMageniusData")
            );
            querySnapshot.forEach((doc) => {
                objs.push({ id: doc.id, ...doc.data() });
            });
            objs.sort((a, b) => {
                const dateA = new Date(b.date);
                const dateB = new Date(a.date);
                return dateA - dateB;
            });
            setData(objs);
            setFilteredData(objs);
        } catch (e) {
            notify("Server is down! please try after some time...", "info");
        }
    }, [setData]);

    useEffect(() => {
        readDataFromDataBase();
    }, [readDataFromDataBase]);

    useEffect(() => {
        setHeaderColor([true, false, false, false, false]);
    }, [setHeaderColor]);

    function searchFilter() {
        if (!searchData.trim()) {
            setFilteredData(data);
            notify("Showing all posts", "info");
            return;
        }
        const fuse = new Fuse(data, {
            keys: ["title"],
            threshold: 0.3,
        });
        const result = fuse.search(searchData).map((res) => res.item);
        if (result.length > 0) {
            setFilteredData(result);
            setSearchData("");
        } else {
            setFilteredData([]);
            setSearchData("");
            notify("No post found!", "warning");
        }
    }

    return (
        <div className="hmain">
            <Header></Header>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    title="search"
                    className="searchIcon"
                    onClick={searchFilter}
                />
            </div>
            {homeLoading ? (
                <>
                    <h3 className="waiting">Wait please!</h3>
                    <img src={load} alt="Loading..." className="loadd"></img>
                </>
            ) : filteredData.length > 0 ? (
                filteredData.map((obj, i) => {
                    return (
                        <ImgCard
                            key={i}
                            id={obj.id}
                            title={obj.title}
                            details={obj.details}
                            date={obj.date}
                            links={obj.links}
                            like={obj.likes}
                            img={obj.img}
                            skill={obj.skill}
                            comments={obj.comments}
                        ></ImgCard>
                    );
                })
            ) : (
                <div className="hmmain">Please wait for posts!</div>
            )}
        </div>
    );
}

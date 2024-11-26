import React, { useEffect } from "react";
import "../styles/Settings.css";
import "../styles/Graphy.css";
import Header from "../components/Header";
import GraphyPic from "../components/GraphyPic";
import { useAppData } from "../ApplicationData";

export default function Graphy() {
    let { setHeaderColor } = useAppData();

    useEffect(() => {
        setHeaderColor([false, true, false, false, false]);
    }, [setHeaderColor]);
    return (
        <div className="textColor">
            <Header></Header>
            <GraphyPic></GraphyPic>
        </div>
    );
}

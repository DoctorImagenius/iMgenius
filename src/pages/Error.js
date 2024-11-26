import React, { useEffect } from "react";
import "../styles/Error.css";
import Header from "../components/Header";
import { useAppData } from "../ApplicationData";

export default function Graphy() {
    let { setHeaderColor } = useAppData();

    useEffect(() => {
        setHeaderColor([false, false, false, false, false]);
    }, [setHeaderColor]);

    return (
        <div className="textColor">
            <Header></Header>
            <div className="error">Page is not found!</div>
        </div>
    );
}

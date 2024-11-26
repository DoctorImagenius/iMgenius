import React, { useEffect } from "react";
import Header from "../components/Header";
import "../styles/Settings.css";
import Login from "../components/Login";
import NewPost from "../components/NewPost";
import ResetPassword from "../components/ResetPassword";
import LogOut from "../components/LogOut";
import AddPic from "../components/AddPic";
import DelPic from "../components/DelPic";
import { useAppData } from "../ApplicationData";

export default function Settings() {
    let { setHeaderColor, isLogin } = useAppData();

    useEffect(() => {
        setHeaderColor([false, false, false, false, true]);
    }, [setHeaderColor]);
    return (
        <div className="textColor">
            <Header></Header>
            {isLogin ? (
                <>
                    <NewPost></NewPost>
                    <AddPic></AddPic>
                    <DelPic></DelPic>
                    <ResetPassword></ResetPassword>
                    <LogOut></LogOut>
                </>
            ) : (
                <Login></Login>
            )}
        </div>
    );
}

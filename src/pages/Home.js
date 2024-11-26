import React, { useCallback, useEffect } from "react";
import Header from "../components/Header";
import "../styles/Home.css";
import ImgCard from "../components/ImgCard";
import { useAppData } from "../ApplicationData";
import load from "../images/loading.gif";
import { db } from "../PasswordsAndKeys";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
    let { setHeaderColor, data, setData, homeLoading } =
        useAppData();

    const readDataFromDataBase = useCallback(async () => {
        try {
            let objs = [];
            const querySnapshot = await getDocs(
                collection(db, "iMageniusData")
            );
            querySnapshot.forEach((doc) => {
                objs.push({ id: doc.id, ...doc.data() });
            });
            setData(objs);
        } catch (e) {
            alert("Database is not working!");
        }
    }, [setData]);

    useEffect(() => {
        readDataFromDataBase();
    }, [readDataFromDataBase]);


    useEffect(() => {
        setHeaderColor([true, false, false, false, false]);
    }, [setHeaderColor]);
    
    return (
        <div className="hmain">
            <Header></Header>
            {homeLoading ? (
                <>
                    <h3 className="waiting">Wait please!</h3>
                    <img src={load} alt="Loading..." className="loadd"></img>
                </>
            ) : data[0] ? (
                data.map((obj, i) => {
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
                        ></ImgCard>
                        
                    );
                })
            
            ) : (
                <div className="hmmain">There is no posts right now!</div>
            )}
        </div>
    );
}

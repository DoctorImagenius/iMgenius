import React, { useEffect, useState } from "react";
import "../styles/Beauty.css";
import Header from "../components/Header";
import { useAppData } from "../ApplicationData";
import ImgCard from "../components/ImgCard";

export default function Beauty() {
    const { setHeaderColor, iBeautyFilter, data } = useAppData();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setHeaderColor([false, false, true, false, false]);
    }, [setHeaderColor]);

    useEffect(() => {
        setFilteredData(data.filter((item) => item.skill === iBeautyFilter));
    }, [iBeautyFilter, data]);

    return (
        <div className="textColor">
            <Header></Header>
            {filteredData[0] ? (
                filteredData.map((obj, i) => (
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
                ))
            ) : (
                <div className="bmain">
                    There is no post related to {iBeautyFilter}!
                </div>
            )}
        </div>
    );
}

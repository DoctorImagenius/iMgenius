import React, { useEffect } from "react";
import "../styles/Contact.css";
import Header from "../components/Header";
import { useAppData } from "../ApplicationData";
import ContactCard from "../components/ContactCard";
import LinkCard from "../components/LinkCard";

export default function Contact() {
    let { setHeaderColor } = useAppData();

    useEffect(() => {
        setHeaderColor([false, false, false, true, false]);
    }, [setHeaderColor]);
    return (
        <div className="textColor">
            <Header></Header>
            <ContactCard></ContactCard>
            <LinkCard></LinkCard>
            
        </div>
    );
}

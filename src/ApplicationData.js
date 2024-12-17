import React, { createContext, useContext, useEffect, useState } from "react";
import { serviceId, templateId, publicKey } from "./PasswordsAndKeys";
import { db } from "./PasswordsAndKeys";
//import { collection, getDocs, onSnapshot} from "firebase/firestore";
import { collection, getDocs} from "firebase/firestore";
import md5 from "md5";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
    let [newPassword, setNewPassword] = useState("");
    let [password, setPassword] = useState("43549bn984tr4");
    let [passwordAttempts, setPasswordAttempts] = useState(0);
    let [forgetAttempts, setForgetAttempts] = useState(0);
    let [passRedBorder, setPassRedBorder] = useState(false);
    let [emailServiceId, seteMailServiceId] = useState(serviceId);
    let [emailTemplateId, eteMailTemplateId] = useState(templateId);
    let [emailPublicKey, seteMailPublicKey] = useState(publicKey);
    let [isLogin, setIsLogin] = useState(false);
    let [iBeautyFilter, setIBeautyFilter] = useState("");
    let [data, setData] = useState([]);
    let [homeLoading, setHomeLoading] = useState(false);
    let [picsObj, setPicsObj] = useState([]);
    let [headerColor, setHeaderColor] = useState([
        true,
        false,
        false,
        false,
        false,
    ]);

    const readDataFromDataBase = async () => {
        try {
            setHomeLoading(true);
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
            let querySnapshot2 = await getDocs(
                collection(db, "iMageniusPassword")
            );
            let d;
            querySnapshot2.forEach((doc) => {
                d = doc.data();
            });
            const hashedPassword = md5(d.password);
            setPassword(hashedPassword);
            setData(objs);
            let localPicsObj = [];
            const querySnapshot3 = await getDocs(
                collection(db, "iMageniusImages")
            );
            querySnapshot3.forEach((doc) => {
                localPicsObj.push({ id: doc.id, ...doc.data() });
            });
            setPicsObj(localPicsObj);
            setHomeLoading(false);
        } catch (e) {
            setHomeLoading(false);
            alert("Database is not working!");
        }
    };

    useEffect(() => {
        readDataFromDataBase();
    }, []);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //       collection(db, 'iMageniusData'),
    //       (snapshot) => {
    //         console.log("Fetching real-time data");
    //       },
    //       (error) => {
    //         console.log("Error fetching real-time data");
    //       }
    //     );
    //     return () => unsubscribe();
    //   }, []);

    return (
        <AppContext.Provider
            value={{
                emailServiceId,
                seteMailServiceId,
                emailTemplateId,
                eteMailTemplateId,
                emailPublicKey,
                seteMailPublicKey,
                newPassword,
                setNewPassword,
                password,
                setPassword,
                passwordAttempts,
                setPasswordAttempts,
                forgetAttempts,
                setForgetAttempts,
                passRedBorder,
                setPassRedBorder,
                headerColor,
                setHeaderColor,
                isLogin,
                setIsLogin,
                iBeautyFilter,
                setIBeautyFilter,
                data,
                setData,
                homeLoading,
                setHomeLoading,
                picsObj,
                setPicsObj,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = () => useContext(AppContext);

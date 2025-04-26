import React, { useRef } from "react";
import "../styles/GraphyPic.css";
import TypedText from "./Typed";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAppData } from "../ApplicationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function GraphyPic() {
    let { picsObj } = useAppData();
    const strings = [
        "Thanks for exploring iMagenius! 😊",
        "Your visit means so much to me!",
        "Grateful for your time and support!",
        "Thanks for diving into my journey!",
        "You inspire me to keep creating!",
        "Thank you for checking out my portfolio!",
        "Your curiosity is truly appreciated!",
        "So glad you explored iMagenius!",
        "Always welcome to visit again! 😊",
        "Thanks for being part of my story!",
    ];

    const introductionRef = useRef(null);
    const educationRef = useRef(null);
    const experienceRef = useRef(null);
    const visionRef = useRef(null);
    const skillsProjectsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <div className="gmain1">
            <div className="cruMain">
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                    stopOnHover={true}
                    transitionTime={1000}
                    showStatus={false}
                >
                    {picsObj.map((v, index) => (
                        <img
                            key={index}
                            src={v.imageUrl}
                            alt={"Wallpaper"}
                            className="image"
                        ></img>
                    ))}
                </Carousel>
            </div>

            <div className="btns">
                <div onClick={() => scrollToSection(introductionRef)}>
                    Intoduction
                </div>
                <div onClick={() => scrollToSection(educationRef)}>
                    Education
                </div>
                <div onClick={() => scrollToSection(experienceRef)}>
                    Experience
                </div>
                <div onClick={() => scrollToSection(visionRef)}>Vision</div>
                <div onClick={() => scrollToSection(skillsProjectsRef)}>
                    Skills&Projects
                </div>
                <div onClick={() => scrollToSection(contactRef)}>Contact</div>
            </div>

            <div className="section">
                <div ref={introductionRef} className="article">
                    <div className="mainHeading">
                        <span style={{ color: "blue" }}>Int</span>roduction
                    </div>
                    <div className="text">
                        My name is <div className="span">Haroon Babar</div>, and{" "}
                        <div className="span">Imagenius</div> is my tech
                        name(combination of imagenation and genius) and I am a
                        22-year-old from Nankana Sahib, And now I am in Park
                        View City. With a passion for technology and a diverse
                        skill set, I have continuously pursued knowledge and
                        personal growth. I have completed my education in
                        various fields, from government schools to higher
                        education, where I am currently pursuing a degree in{" "}
                        <div className="span">Robotics</div> at the University
                        of Central Punjab. Alongside my academic journey, I have
                        dedicated significant time to personal learning, diving
                        into subjects like the universe, religion, life, and
                        technology. I enjoy working on innovative ideas and
                        exploring new horizons. My interests include both
                        hardware and software, as well as physical activities
                        such as football and martial arts etc...
                    </div>
                </div>

                <div ref={educationRef} className="article">
                    <div className="mainHeading">
                        <span style={{ color: "blue" }}>Edu</span>cation
                    </div>
                    <div className="text">
                        I began my formal education in government schools, where
                        I completed my studies until the 10th grade with an 85%
                        mark. I then proceeded to Superior College for my FSc,
                        achieving 87.2%. Additionally, I pursued religious
                        studies in a madrassa for Hifz-e-Quran, further
                        expanding my learning beyond conventional education.
                        Currently, I am enrolled at the University of Central
                        Punjab, studying Computer Science in a full 100%
                        scholarship program. I have completed 4 semesters with a
                        4.0 CGPA. Initially, I studied{" "}
                        <div className="span">Computer Science</div>, but due to
                        my interest in both hardware and software, I transferred
                        to the <div className="span">Robotics program</div>,
                        which aligns more closely with my career goals. In
                        addition to my formal education, I am passionate about
                        self-learning and have explored numerous topics and
                        technologies, including electronics, mechatronics,
                        electrical engineering, and software development. I have
                        gained proficiency in various programming languages(C,
                        C++, Python, Java, HTML, CSS, JavaScript, PHP, Node.js,
                        Arduino C, MicroPython, Assembly language),
                        frameworks(ReactJS(Web App Development), React Native
                        (Mobile App Development), Express.js, Electron(Desktop
                        App Development), Tkinter, Kivy, MongoDB, SQL,
                        Firebase), and tools that allow me to work across
                        hardware and software domains.
                    </div>
                </div>

                <div ref={experienceRef} className="article">
                    <div className="mainHeading">
                        <span style={{ color: "blue" }}>Ex</span>prerience
                    </div>
                    <div className="text">
                        I have gained substantial hands-on experience in the
                        tech industry, contributing to both hardware and
                        software projects.
                        <ul>
                            <li>
                                <div className="span">
                                    Web Development (MERN Stack):
                                </div>{" "}
                                6 months of experience building web applications
                                using ReactJS, Firebase, Node.js, Express.js,
                                and MongoDB.
                            </li>
                            <li>
                                <div className="span">
                                    Python Software Development:
                                </div>{" "}
                                1-year experience in Python, using Tkinter and
                                Kivy for developing both mobile and desktop
                                applications and core software development.
                            </li>
                            <li>
                                <div className="span">
                                    Mobile App Development (React Native):
                                </div>{" "}
                                I also have 3 months of experience with React
                                Native for mobile app development.
                            </li>
                            <li>
                                <div className="span">
                                    Desktop Application Development(Electron
                                    React js):
                                </div>{" "}
                                6 months of experience in desktop software
                                development using Electron combined with
                                ReactJS.
                            </li>
                            <li>
                                <div className="span">Hardware Projects:</div>{" "}
                                Extensive work with Arduino, Raspberry Pi, and
                                various electronic projects, integrating
                                hardware with software solutions.
                            </li>
                        </ul>
                        In addition to my technical skills, I have participated
                        in various competitions and activities, You can explore
                        more about me from <div className="blue">iBeauty</div>{" "}
                        page...
                    </div>
                </div>

                <div ref={visionRef} className="article">
                    <div className="mainHeading">
                        <span style={{ color: "blue" }}>Vi</span>sion
                    </div>
                    <div className="text">
                        As a lifelong learner and visionary, my aim is to excel
                        in multiple dimensions of life:
                        <ul>
                            <li>
                                <div className="span">
                                    Academic & Professional Goal:
                                </div>{" "}
                                My ultimate ambition is to become a tech
                                scientist, contributing to advancements in both
                                hardware and software technologies. I aspire to
                                innovate and create impactful solutions that
                                bridge the gap between the two fields, pushing
                                the boundaries of what’s possible.
                            </li>
                            <li>
                                <div className="span">
                                    Entrepreneurial Goal:
                                </div>{" "}
                                As a human and a proud Pakistani, I aim to
                                establish myself as a successful businessman in
                                the technology sector. My dream is to create
                                opportunities, uplift my family, and contribute
                                to the progress and prosperity of Pakistan’s
                                tech industry.
                            </li>
                            <li>
                                <div className="span">
                                    Spiritual Goal (First Priority):
                                </div>{" "}
                                Above all, my foremost aim is to prepare myself
                                as a good Muslim, striving to live a righteous
                                life aligned with Islamic teachings. My ultimate
                                focus is on succeeding in the life hereafter, as
                                this is the true purpose of existence.
                            </li>
                        </ul>
                        With determination, faith, and continuous effort, I am
                        committed to pursuing these goals wholeheartedly,
                        Insha’Allah.
                    </div>
                </div>

                <div ref={skillsProjectsRef} className="article">
                    <div className="mainHeading">
                        Skills<span style={{ color: "blue" }}>&</span>Projects
                    </div>
                    <div className="text">
                        Welcome to a journey through my skills, exciting
                        projects, remarkable achievements, and innovative ideas.
                        From groundbreaking inventions to unique insights,
                        there's so much to explore! Dive into my{" "}
                        <div className="blue">iBeauty</div> page to uncover the
                        stories behind my work, celebrate accomplishments, and
                        get inspired by my vision. Whether you're here to learn,
                        collaborate, or simply enjoy, there's something for
                        everyone.😊
                    </div>
                </div>

                <div ref={contactRef} className="article">
                    <div className="mainHeading">
                        <span style={{ color: "blue" }}>Let's </span> Connect!
                    </div>
                    <div className="text">
                        I'm available on various platforms where you can learn
                        more about my work or reach out to me directly. Feel
                        free to connect with me on:
                        <div className="glinks">
                            <a
                                href="https://wa.me/923096995350"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faWhatsapp}
                                    className="gicon"
                                />
                            </a>
                            <a
                                href="https://github.com/DoctorImagenius/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className="gicon"
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100082678262037"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className="gicon"
                                />
                            </a>
                            <Link to={"/iContact"}>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="gicon"
                                />
                            </Link>

                            <a
                                
				href="https://www.linkedin.com/in/haroon-babar-imagenius1001/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="gicon"
                                />
                            </a>
                            <a
				href="https://www.instagram.com/imagenius1001"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="gicon"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="writing">
                <TypedText stringsArray={strings} />
            </div>
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import {murder1, murder2, robbery} from "../Resources/Images/Crimes";
import {loadinglogo, tutorial} from "../Resources/Images/Others";
import {motion} from "framer-motion";
import {detective} from "../Resources/Images/People";
import {DetailsofCases} from "../Constants/Texts";
import {TbPoint, TbPointFilled} from "react-icons/tb";
import {GoInfo} from "react-icons/go";
import {IoClose} from "react-icons/io5";
import {bgm, clicksound} from "../Resources/Sounds";
import {email, email_session, isLoggedIn, isLoggedIn_session, username} from "../Constants/Texts/constants";
import Login_Signup from "../Constants/Texts/Login_Signup";
import {IoIosStar} from "react-icons/io";
import axios from "axios";

const Sidebar = ({isOpen, onClose, selectedType}) => {
    // Filter the case details based on the selected type
    const filteredCases = DetailsofCases.filter(dash => dash.type === selectedType);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };


    return (
        <div
            className={`fixed inset-y-0 right-0 w-96 z-50 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-black">Information on {selectedType}</h1>
                <button className="text-black text-2xl" onClick={handleClick}>
                    <IoClose/>
                </button>
            </div>
            <div className="p-[3px]">
                {filteredCases.length > 0 ? (
                    filteredCases.map(dash => (
                        <div key={dash.id} className="text-black text-start bg-white p-3 rounded-lg shadow-md my-2">
                            <p className={'font-semibold'}><TbPointFilled className="text-black mr-2 inline-block"/>Module
                                1: {dash.module1}</p>
                            <p><TbPoint className="text-black mx-2 inline-block"/> {dash.module1Detail}</p>
                            <p className={'font-semibold'}><TbPointFilled
                                className="text-black font-bold mr-2 inline-block"/>Module 2: {dash.module2}</p>
                            <p><TbPoint className="text-black mx-2 inline-block"/> {dash.module2Detail}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-black">No details available.</p>
                )}
            </div>
        </div>
    );
};

const ProgressStars = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Get email from localStorage or sessionStorage
        const email = localStorage.getItem("loggedinuseremail") || sessionStorage.getItem("loggedinuseremail");

        if (email) {
            axios.get(`http://${username}/progress/${email}`)
                .then(response => {
                    setProgress(response.data); // Store progress directly
                })
                .catch(error => {
                    console.error("Error fetching progress:", error);
                });
        }
    }, []);

    const fullStars = Math.floor(progress); // Number of fully filled stars
    const decimalPart = progress - fullStars; // Decimal part for partial filling
    const stars = Array(7).fill(0); // 7-star array

    return (
        <div className="mx-4 flex gap-1">
            {stars.map((_, index) => (
                <div key={index} className="relative w-8 h-8">
                    {/* Empty Star */}
                    <IoIosStar className="absolute text-gray-400 w-full h-full" />

                    {/* Fully Filled Star */}
                    {index < fullStars && (
                        <IoIosStar className="absolute text-yellow-400 w-full h-full" />
                    )}

                    {/* Partially Filled Star */}
                    {index === fullStars && decimalPart > 0 && (
                        <div className="absolute w-full h-full overflow-hidden">
                            <div
                                className="absolute bg-yellow-400 h-full left-0"
                                style={{ width: `${decimalPart * 100}%` }}
                            />
                            <IoIosStar className="absolute text-yellow-400 w-full h-full" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const LandingPage = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [basicsTutorial, setBasicsTutorial] = useState("Tutorial");
    const [basicsMurder, setBasicsMurder] = useState("");
    const [basicsFeud, setBasicsFeud] = useState("");

    const [lastSavedPage, setLastSavedPage] = useState("");

    useEffect(() => {
        fetchLastSaved();
    }, []);

    const fetchLastSaved = async () => {
        try {
            const response = await axios.get(`http://${username}/getLastSaved`, {
                params: { email }
            });

            const lastSavedPage = response.data?.lastsaved || "No Page Saved";
            setLastSavedPage(lastSavedPage);

            if (lastSavedPage ===  "TutorialFDPractice" || lastSavedPage ===  "TutorialKeysPractice" || lastSavedPage === "KeysTutorial"
                || lastSavedPage ===  "TutorialNFPractice" || lastSavedPage === "NormalisationTutorial" ||
            lastSavedPage === "Tutorial" || lastSavedPage ===  "TutorialModule2") {
                setBasicsTutorial(lastSavedPage);
            }
        } catch (error) {
            console.error("Error fetching last saved progress:", error);
        }
    };


    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleLinkClick = () => {
        playClickSound(); // Play the click sound
    };

    const handleClick = () => {
        playClickSound(); // Play the click sound
        openSidebar('Basics, Normalisation And Query Language'); // Call the original function
    };

    // Function to open sidebar with correct type
    const openSidebar = (type) => {
        setSelectedType(type);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2000);

        return () => clearTimeout(timer);

        if (!isLoggedIn && !isLoggedIn_session) {
            setTimeout(() =>setShowLoginModal(true), 500);
        }
    }, []);


    const [audio] = useState(new Audio(bgm));

    useEffect(() => {
        const fadeInDuration = 3000; // 3 seconds for fade-in
        const steps = 30; // Number of steps for smooth transition
        const intervalTime = fadeInDuration / steps; // Time per step

        const playBGM = () => {
            audio.loop = true;
            audio.playbackRate = 1.2;
            audio.volume = 0; // Start at volume 0
            audio.play().catch(error => console.error("Autoplay failed:", error));

            let currentStep = 0;
            const fadeInterval = setInterval(() => {
                if (currentStep < steps) {
                    audio.volume = (currentStep / steps) * 0.5; // Gradually increase volume to 0.5
                    currentStep++;
                } else {
                    clearInterval(fadeInterval);
                }
            }, intervalTime);
        };

        // Play music only when the user interacts (e.g., clicks anywhere)
        const handleUserInteraction = () => {
            playBGM();
            document.removeEventListener("click", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            audio.pause();
            audio.volume = 0; // Reset volume when unmounting
            document.removeEventListener("click", handleUserInteraction);
        };
    }, [audio]);



    return (
        <div>
            {showDiv1 ? (
                <div className="flex flex-col justify-center items-center bg-[#2f2c2f] h-screen">
                    <motion.img
                        src={loadinglogo}
                        alt="Detective"
                        className="h-screen rounded-full"
                        initial={{scale: 0.1}}
                        animate={{scale: 0.8}}
                        transition={{duration: 1.5, ease: "easeInOut"}}
                    />
                    {showButton && (
                        <motion.button
                            onClick={() => setShowDiv1(false)}
                            className="px-5 py-3 absolute right-16 bottom-16 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            Launch Game
                        </motion.button>
                    )}
                </div>
            ) : (
                <>
                    <div className={`relative ${showLoginModal ? 'overflow-hidden' : ''}`}>
                        {showLoginModal && (
                            <Login_Signup closeModal={() => setShowLoginModal(false)}/>
                        )}
                        <div>
                            <NavBar/>
                            <div className={'m-3'}>
                                <div>
                                    {isLoggedIn || isLoggedIn_session ? (
                                        <div className={'flex'}>
                                            <h1 className={'text-start justify-start text-3xl font-semibold'}>Department
                                                of Basics,
                                                Normalisation
                                                and Querying</h1>
                                            <ProgressStars />
                                                <button
                                                    onClick={handleClick}
                                                    className="absolute z-10 right-0 px-4">
                                                    <GoInfo className="text-3xl"/>
                                                </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className={'text-start justify-start text-3xl font-semibold'}>Department
                                                of Basics,
                                                Normalisation
                                                and Querying
                                                <button
                                                    onClick={handleClick}
                                                    className="absolute z-10 right-0 px-4">
                                                    <GoInfo className="text-3xl"/>
                                                </button></h1>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                <Link to={`/${basicsTutorial}`}>
                                                    <div
                                                        className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                        <img src={tutorial} className="-mt-1" alt="Image"/>
                                                    </div>
                                                    <h1 className="text-lg text-black text-start">Robbery</h1>
                                                </Link>
                                            ) : (
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                        <img src={tutorial} className="-mt-1" alt="Image"/>
                                                    </div>
                                                    <h1 className="text-lg text-black text-start">Robbery</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${murder1})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Murder</h1>
                                            </Link>
                                            ) : (
                                                <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${murder1})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Murder</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                        <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${murder2})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Feud</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${murder2})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Feud</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className={'my-4 h-[1px] w-5/6 mx-auto rounded-lg bg-[#38586d]'}/>
                                <h1 className={'text-start justify-start text-3xl font-semibold'}>Department of File
                                    Organisation and Indexing</h1>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className={'my-4 h-[1px] w-5/6 mx-auto rounded-lg bg-[#38586d]'}/>
                                <h1 className={'text-start justify-start text-3xl font-semibold'}>Department of
                                    Relational Algebra</h1>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'text-lg text-black text-start'}>Robbery</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} selectedType={selectedType}/>
        </div>
    );
};

export default LandingPage;
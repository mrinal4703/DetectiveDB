import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import {carvandalism, kidnap, murder1, murder2, robbery} from "../Resources/Images/Crimes";
import {loadinglogo, star2, star3, tutorial} from "../Resources/Images/Others";
import {motion} from "framer-motion";
import {DetailsofCases, ProgressStars, updateBasicGame} from "../Constants/Texts";
import {TbPoint, TbPointFilled} from "react-icons/tb";
import {GoInfo} from "react-icons/go";
import {IoClose} from "react-icons/io5";
import {bgm, clicksound} from "../Resources/Sounds";
import {email, email_session, isLoggedIn, isLoggedIn_session, username} from "../Constants/Texts/constants";
import Login_Signup from "../Constants/Texts/Login_Signup";
import axios from "axios";

const Sidebar = ({isOpen, onClose, selectedType}) => {
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

const LandingPage = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [basicsTutorial, setBasicsTutorial] = useState("Tutorial");
    const [basicsKidnap, setBasicsKidnap] = useState("KidnapNormalisation");
    const [basicsVandalism, setBasicsVandalism] = useState("VandalismNormalisation");
    const [basicsMurder, setBasicsMurder] = useState("MurderNormalisation");

    const [basicTutorial, setBasicTutorial] = useState(null);
    const [basicKidnap, setBasicKidnap] = useState(null);
    const [basicVandalism, setBasicVandalism] = useState(null);
    const [basicMurder, setBasicMurder] = useState(null);

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
            lastSavedPage === "Tutorial" || lastSavedPage ===  "TutorialModule2" || lastSavedPage === "TutorialSQLPractice" || lastSavedPage === "JoinsTutorial"
            || lastSavedPage === "TutorialJoinsPractice" || lastSavedPage === "TutorialFinalSQLPractice") {
                setBasicsTutorial(lastSavedPage);
            }

            else if (lastSavedPage === "KidnapNormalisation" || lastSavedPage === "KidnapSQL"){
                setBasicsKidnap(lastSavedPage);
            }

            else if (lastSavedPage === "VandalismNormalisation" || lastSavedPage === "VandalismSQL"){
                setBasicsVandalism(lastSavedPage);
            }

            else if (lastSavedPage === "MurderNormalisation" || lastSavedPage === "MurderSQL"){
                setBasicsMurder(lastSavedPage);
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

        if (!isLoggedIn && !isLoggedIn_session && !showDiv1) {
            setTimeout(() =>setShowLoginModal(true), 800);
        }

        return () => clearTimeout(timer);

    }, [showDiv1]);


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

    useEffect(() => {
        // Fetch the basic_tutorial value when the component mounts
        const fetchBasicTutorial = async () => {
            if (!email) {
                // alert("User not logged in!");
                return;
            }

            try {
                const response = await axios.get(`http://${username}/getBasicTutorial`, {
                    params: { email: email } // Pass email as a query parameter
                });

                const response1 = await axios.get(`http://${username}/getBasicGame1`, {
                    params: { email: email } // Pass email as a query parameter
                });

                const response2 = await axios.get(`http://${username}/getBasicGame2`, {
                    params: { email: email } // Pass email as a query parameter
                });

                const response3 = await axios.get(`http://${username}/getBasicGame3`, {
                    params: { email: email } // Pass email as a query parameter
                });

                if (response.status === 200 && response1.status === 200 && response2.status === 200 && response3.status === 200) {
                    const basicTutorialValue = response.data.basicTutorial;
                    const basicMurderValue = response1.data.basicGame1;
                    const basicVandalismValue = response2.data.basicGame2;
                    const basicKidnapValue = response3.data.basicGame3;
                    console.log("Fetched basic_tutorial:", basicTutorialValue);
                    console.log("Fetched basic_game1:", basicMurderValue);
                    console.log("Fetched basic_game2:", basicVandalismValue);
                    console.log("Fetched basic_game3:", basicKidnapValue);
                    console.log(response1.data);
                    setBasicTutorial(basicTutorialValue);
                    setBasicMurder(basicMurderValue);
                    setBasicVandalism(basicVandalismValue);
                    setBasicKidnap(basicKidnapValue);
                }
            } catch (error) {
                console.error("Error fetching basic tutorial status:", error);
                alert("Failed to fetch basic tutorial status");
            }
        };

        fetchBasicTutorial();
    }, [email]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
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

    const handleSaveProgress = async () => {
        playClickSound();

        // Get the logged-in user's email
        const loggedInUserEmail = email || email_session;

        if (!loggedInUserEmail) {
            // alert("No user logged in.");
            return;
        }

        try {
            const response = await axios.put(`http://${username}/updateLastSaved`, {
                email: loggedInUserEmail, // Sending the stored email
                lastsaved: null // Updating `lastsaved` with the current page
            });

            // alert(response.data); // Show success message
        } catch (error) {
            console.error("Error updating last saved progress:", error);
            alert("Failed to save progress. Try again.");
        }
    };

    const handleRedoTutorial = () => {
        handleSaveProgress();
        updateBasicGame(null);
        setBasicTutorial(null);
    };

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
                            onClick={() => {
                                playClickSound();
                                setShowDiv1(false);
                            }}
                            className="lg15.6:px-8 lg15.6:py-5 px-5 py-3 absolute right-16 bottom-16 bg-[#495f67] text-white lg15.6:text-xl text-base font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
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
                                            <h1 className={'text-start justify-start lg15.6:text-4xl text-3xl font-semibold'}>Department
                                                of Basics,
                                                Normalisation
                                                and Querying</h1>
                                            <ProgressStars />
                                                <button
                                                    onClick={handleClick}
                                                    className="absolute z-10 right-0 px-4">
                                                    <GoInfo className="lg15.6:text-4xl text-3xl"/>
                                                </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className={'text-start justify-start lg15.6:text-4xl text-3xl font-semibold'}>Department
                                                of Basics,
                                                Normalisation
                                                and Querying
                                                <button
                                                    onClick={handleClick}
                                                    className="absolute z-10 right-0 px-4">
                                                    <GoInfo className="lg15.6:text-4xl text-3xl"/>
                                                </button></h1>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>

                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                basicTutorial === null ? (
                                                    <Link to={`/${basicsTutorial}`}>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative"
                                                            style={{backgroundImage: `url(${robbery})`}}
                                                        >
                                                            <div className="absolute top-0 transform">
                                                                <img src={tutorial} alt="Tutorial"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star3} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <h1 className="lg15.6:text-2xl text-lg text-black text-start">Robbery</h1>
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative opacity-50 cursor-not-allowed"
                                                            style={{backgroundImage: `url(${robbery})`}}
                                                        >
                                                            <div className="absolute top-0 transform">
                                                                <img src={tutorial} alt="Tutorial"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star3} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <div className={'-ml-2.5 mt-0.5 flex justify-evenly w-5/6'}>
                                                            <h1 className="lg15.6:text-2xl text-lg text-black text-start">Robbery</h1>
                                                            <button
                                                                onClick={handleRedoTutorial}
                                                                className="lg15.6:p-1.5 p-1 lg15.6:text-lg text-base bg-[#495f67] text-white rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                                            >
                                                                Redo Tutorial
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                // If user is not logged in, show the login modal trigger
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                        <img src={tutorial} className="-mt-1" alt="Image"/>
                                                    </div>
                                                    <h1 className="lg15.6:text-2xl text-lg text-black text-start">Robbery</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                progress >= 3 && basicMurder === null ? (
                                                    <Link to={`/${basicsMurder}`}>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative"
                                                            style={{backgroundImage: `url(${murder1})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <h1 className="lg15.6:text-2xl text-lg text-black text-start">Murder</h1>
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative opacity-50 cursor-not-allowed"
                                                            style={{backgroundImage: `url(${murder1})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <div className={'-ml-2.5 mt-0.5 flex justify-evenly w-5/6'}>
                                                            <h1 className="lg15.6:text-2xl text-lg text-black text-start">Murder</h1>
                                                            <h1
                                                                className="lg15.6:p-1 p-0.5 lg15.6:text-md text-sm bg-[#495f67] text-center my-auto text-white rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                                            >
                                                                {progress < 5 ? "Complete Previous Game" : "Game Completed"}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                // If user is not logged in, show the login modal trigger
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${murder1})`}}
                                                    >
                                                    {/*<img src={tutorial} className="-mt-1" alt="Image"/>*/}
                                                    </div>
                                                    <h1 className="lg15.6:text-2xl text-lg text-black text-start">Murder</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                progress >= 5 && basicVandalism === null ? (
                                                    <Link to={`/${basicsVandalism}`}>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative"
                                                            style={{backgroundImage: `url(${carvandalism})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <h1 className="lg15.6:text-2xl text-lg text-black text-start">Car
                                                            Vandalism</h1>
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative opacity-50 cursor-not-allowed"
                                                            style={{backgroundImage: `url(${carvandalism})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <div className={'-ml-2.5 mt-0.5 flex justify-evenly w-5/6'}>
                                                            <h1 className="lg15.6:text-2xl text-lg text-black text-start">Car
                                                                Vandalism</h1>
                                                            <h1
                                                                className="lg15.6:p-1 p-0.5 lg15.6:text-md text-sm bg-[#495f67] text-center my-auto text-white rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                                            >
                                                                {progress < 7 ? "Complete Previous Game" : "Game Completed"}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                // If user is not logged in, show the login modal trigger
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${carvandalism})`}}
                                                    >
                                                        {/*<img src={tutorial} className="-mt-1" alt="Image"/>*/}
                                                    </div>
                                                    <h1 className="lg15.6:text-2xl text-lg text-black text-start">Car
                                                        Vandalism</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                progress >= 7 && basicKidnap === null ? (
                                                    <Link to={`/${basicsKidnap}`}>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative"
                                                            style={{backgroundImage: `url(${kidnap})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <h1 className="lg15.6:text-2xl text-lg text-black text-start">Kidnap</h1>
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <div
                                                            className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center relative opacity-50 cursor-not-allowed"
                                                            style={{backgroundImage: `url(${kidnap})`}}
                                                        >
                                                            {/*<div className="absolute top-0 transform">*/}
                                                            {/*    <img src={tutorial} alt="Tutorial"*/}
                                                            {/*         className="max-w-full max-h-full"/>*/}
                                                            {/*</div>*/}
                                                            <div className="absolute -bottom-1 transform">
                                                                <img src={star2} alt="Star"
                                                                     className="max-w-full max-h-full"/>
                                                            </div>
                                                        </div>
                                                        <div className={'-ml-2.5 mt-0.5 flex justify-evenly w-5/6'}>
                                                            <h1 className="lg15.6:text-2xl text-lg text-black text-start">Kidnap</h1>
                                                            <h1
                                                                className="lg15.6:p-1 p-0.5 lg15.6:text-md text-sm bg-[#495f67] text-center my-auto text-white rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                                            >
                                                                {progress < 9 ? "Complete Previous Game" : "Game Completed"}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                // If user is not logged in, show the login modal trigger
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${kidnap})`}}
                                                    >
                                                        {/*<img src={tutorial} className="-mt-1" alt="Image"/>*/}
                                                    </div>
                                                    <h1 className="lg15.6:text-2xl text-lg text-black text-start">Kidnap</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/*<div className={'m-6'}>*/}
                                    {/*    <div onClick={handleLinkClick}>*/}
                                    {/*        {isLoggedIn || isLoggedIn_session ? (*/}
                                    {/*            <Link to={''}>*/}
                                    {/*                <div*/}
                                    {/*                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"*/}
                                    {/*                    style={{backgroundImage: `url(${murder1})`}}*/}
                                    {/*                >*/}
                                    {/*                </div>*/}
                                    {/*                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Murder</h1>*/}
                                    {/*            </Link>*/}
                                    {/*        ) : (*/}
                                    {/*            <button onClick={() => setShowLoginModal(true)}>*/}
                                    {/*                <div*/}
                                    {/*                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"*/}
                                    {/*                    style={{backgroundImage: `url(${murder1})`}}*/}
                                    {/*                >*/}
                                    {/*                </div>*/}
                                    {/*                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Murder</h1>*/}
                                    {/*            </button>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className={'m-6'}>*/}
                                    {/*    <div onClick={handleLinkClick}>*/}
                                    {/*        {isLoggedIn || isLoggedIn_session ? (*/}
                                    {/*            <Link to={''}>*/}
                                    {/*                <div*/}
                                    {/*                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"*/}
                                    {/*                    style={{backgroundImage: `url(${murder2})`}}*/}
                                    {/*                >*/}
                                    {/*                </div>*/}
                                    {/*                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Feud</h1>*/}
                                    {/*            </Link>*/}
                                    {/*        ) : (*/}
                                    {/*            <button onClick={() => setShowLoginModal(true)}>*/}
                                    {/*                <div*/}
                                    {/*                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"*/}
                                    {/*                    style={{backgroundImage: `url(${murder2})`}}*/}
                                    {/*                >*/}
                                    {/*                </div>*/}
                                    {/*                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Feud</h1>*/}
                                    {/*            </button>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <hr className={'my-4 h-[1px] w-5/6 mx-auto rounded-lg bg-[#38586d]'}/>
                                <h1 className={'text-start justify-start lg15.6:text-4xl text-3xl font-semibold'}>Department
                                    of File
                                    Organisation and Indexing</h1>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                <Link to={''}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                        <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                    </div>
                                                    <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                                </Link>
                                            ) : (
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                        <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                    </div>
                                                    <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                <Link to={''}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                    </div>
                                                    <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                                </Link>
                                            ) : (
                                                <button onClick={() => setShowLoginModal(true)}>
                                                    <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                        style={{backgroundImage: `url(${robbery})`}}
                                                    >
                                                    </div>
                                                    <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className={'my-4 h-[1px] w-5/6 mx-auto rounded-lg bg-[#38586d]'}/>
                                <h1 className={'text-start justify-start lg15.6:text-4xl text-3xl font-semibold'}>Department
                                    of
                                    Relational Algebra</h1>
                                <div
                                    className={'grid grid-cols-4 grid-flow-col items-center justify-center align-middle gap-2'}>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                                <Link to={''}>
                                                <div
                                                        className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                    <img src={tutorial} className={'-mt-1'} alt={'Image'}/>
                                                </div>
                                                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'m-6'}>
                                        <div onClick={handleLinkClick}>
                                            {isLoggedIn || isLoggedIn_session ? (
                                            <Link to={''}>
                                                <div
                                                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
                                            </Link>
                                            ) : (
                                            <button onClick={() => setShowLoginModal(true)}>
                                                <div
                                                    className="lg15.6:h-64 lg15.6:w-64 h-48 w-48 bg-cover hover:opacity-50 bg-center bg-no-repeat rounded-lg shadow-md text-center flex items-center justify-center"
                                                    style={{backgroundImage: `url(${robbery})`}}
                                                >
                                                </div>
                                                <h1 className={'lg15.6:text-2xl text-lg text-black text-start'}>Robbery</h1>
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
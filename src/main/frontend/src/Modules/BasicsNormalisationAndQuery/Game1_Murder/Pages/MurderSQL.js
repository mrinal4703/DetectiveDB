import React, {useEffect, useState} from 'react';
import {assisstantconclude, successsalute} from "../../../../Resources/Images/People";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import axios from "axios";
import {email, email_session, username} from "../../../../Constants/Texts/constants";
import {
    AppText,
    CrimeSceneTable, EvidenceTable,
    SuspectAlibiTable, SuspectTable,
    updateBasicGame1,
    updateProgress, WeaponAnalysisTable,
} from "../../../../Constants/Texts";
import {Link, useNavigate} from "react-router-dom";
import {finalsqltestpic, hintlens, progresspic, yay} from "../../../../Resources/Images/Others";
import NavBarInGame from "../../TutorialGame_Robbery/NavBarInGame";
import {IoClose} from "react-icons/io5";

const HelperAtFirst = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantconclude;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setVoicesLoaded(true);
            } else {
                setTimeout(loadVoices, 100); // Retry after a short delay
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Speak the text and update display text word by word
    useEffect(() => {
        if (!show || !texts || !voicesLoaded) return;

        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(texts);
        let selectedVoice = voices.find((voice) => voice.name.includes(voiceMain)) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = texts.split(" ");
        let wordIndex = -1;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length - 1) {
                wordIndex++;
                setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
            }
        };

        utterance.onend = () => {
            setShowButton(true); // Show the button when speech ends
        };

        // Speak the utterance
        window.speechSynthesis.speak(utterance);

        return () => {
            // Cancel the speech synthesis if the component unmounts
            window.speechSynthesis.cancel();
        };
    }, [show, voicesLoaded, voices]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <div className={`absolute bottom-0 ${position}-0`}>
                    <motion.img
                        src={img}
                        className="lg15.6:h-[24rem] lg15.6:w-[24rem] h-80 w-80 object-contain rounded-xl"
                        alt="Assistant"
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    />
                </div>

                <div
                    className={`absolute bottom-28 ${position}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto`}>
                    <div>
                        {displayText}
                    </div>
                    <button
                        className={`mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${showButton ? "block" : "hidden"}`}
                        onClick={handleClick}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const Sidebar = ({isOpen, onClose}) => {
    if (!isOpen) return null;

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
            className={`fixed p-2 top-16 h-max inset-y-0 right-0 lg15.6:w-[480px] w-96 z-50 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between text-black items-center mb-4">
                <h3 className="lg15.6:text-2xl text-xl font-semibold">Evidence Clues</h3>
                <button className="text-black lg15.6:text-3xl text-2xl" onClick={handleClick}>
                    <IoClose/>
                </button>
            </div>

            <ul className="space-y-3 lg15.6:text-xl text-base text-black">
                <li>
                    <strong>1. Suspicious Activity Timing:</strong> Find the <strong>Time
                    </strong> when this happened.
                </li>
                <li>
                    <strong>2. Witness Statement About Suspicious Activity:</strong> Find a witness statement for
                    the word <strong>Knife</strong> and the <strong>location</strong>.
                </li>
                <li>
                    <strong>3. Camera Footage Confirming Suspicious Activity:</strong> Find camera footage from
                    the <strong>Location</strong> that shows <strong>suspicious
                    activity</strong>.
                </li>
            </ul>
        </div>
    );
};

const Sidebar2 = ({isOpen, onClose, evidence}) => {
    if (!isOpen) return null;

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
            className={`fixed p-2 top-16 h-max inset-y-0 right-0 lg15.6:w-[480px] w-96 z-50 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between text-black items-center mb-4">
                <h3 className="lg15.6:text-2xl text-xl font-semibold mb-4">Evidence Collected</h3>
                <button className="text-black lg15.6:text-3xl text-2xl" onClick={handleClick}>
                    <IoClose/>
                </button>
            </div>

            {/* Evidence Status */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
                <ul className="space-y-2 lg15.6:text-xl text-base">
                    <li>
                        Commit Timing:{" "}
                        {evidence.suspiciousActivity ? "✅" : "❌"}
                    </li>
                    <li>
                        Witness Statement About Suspicious Activity:{" "}
                        {evidence.witnessStatement ? "✅" : "❌"}
                    </li>
                    <li>
                        Camera Footage Confirming Suspicious Activity:{" "}
                        {evidence.cameraFootage ? "✅" : "❌"}
                    </li>
                </ul>
            </div>
        </div>
    );
};

const CongratsandSalute = ({ show }) => {
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/");
        window.scrollTo(0, 0);
    };

    return (
        show && (
            <>
                {/* Background overlay */}
                <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex justify-center items-center">
                    <img src={yay} className="h-screen m-0 z-50" alt="Yay" />
                </div>

                {/* Main content */}
                <motion.div
                    className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="absolute bottom-0 right-0">
                        <motion.img
                            src={successsalute}
                            className="lg15.6:h-[480px] lg15.6:w-[480px] h-96 w-96 object-contain rounded-xl"
                            alt="Assistant"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                    </div>

                    <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 text-lg text-black">
                        <button
                            className={`mt-4 px-3 py-1 bg-[#495f67] lg15.6:text-2xl text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in `}
                            onClick={handleClick}
                        >
                            Go Home
                        </button>
                    </div>
                </motion.div>
            </>
        )
    );
};

const MurderSql = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [isSidebarOpen1, setIsSidebarOpen1] = useState(false);
    const [isSidebarOpen2, setIsSidebarOpen2] = useState(false);
    const [error, setError] = useState(null);
    const [guess, setGuess] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [culpritFound, setCulpritFound] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [nestedQuerySuccess, setNestedQuerySuccess] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [evidence, setEvidence] = useState({
        suspiciousActivity: false,
        witnessStatement: false,
        cameraFootage: false,
    });

    const [showFinaleTest, setShowFinaleTest] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowFinaleTest(true), 1500);
    };

    const allEvidenceCollected =
        evidence.suspiciousActivity && evidence.witnessStatement && evidence.cameraFootage;

    const executeQuery = async () => {

        playClickSound();

        if (!query.trim()) {
            setError("Please enter a valid SQL query.");
            return;
        }

        try {
            const response = await axios.get(`http://${username}/api/sql/execute`, {
                params: {query},
            });

            if (response.data.error) {
                setError(response.data.error);
                setResult(null);
                setShowTable(false); // Hide the table on error
            } else if (response.data.message) {
                setError(null);
                setResult("No data found.");
                setShowTable(false); // Hide the table if no data is found
            } else {
                setError(null);
                setResult(response.data.data);
                setShowTable(true); // Show the ta

                if (Array.isArray(response.data.data)) {
                    const data = response.data.data;

                    // Fix evidence tracking logic
                    if (
                        // query.toLowerCase().includes("location = 'living room'") &&
                        query.toLowerCase().includes("time = '2025-03-17 22:30'") &&
                        // query.toLowerCase().includes("action = 'watching tv'") &&
                        data.some(
                            (row) =>
                                row.time?.toLowerCase().trim() === "2025-03-17 22:30"
                                // row.location?.toLowerCase().trim() === "living room" &&
                                // row.action?.toLowerCase().trim() === "watching tv"
                        )
                    ) {
                        setEvidence((prev) => ({...prev, suspiciousActivity: true}));
                    }

                    if (
                        // query.toLowerCase().includes("room_type = 'lounge'") &&
                        // query.toLowerCase().includes("statement like '%suspicious%'") &&
                        query.toLowerCase().includes("location = 'warehouse'") &&
                        query.toLowerCase().includes("witness_statement like '%knife%'") &&
                        data.some(
                            (row) =>
                                row.location?.toLowerCase().trim() === "warehouse" &&
                                row.witness_statement?.toLowerCase().trim().includes("knife")
                                // row.room_type?.toLowerCase().trim() === "lounge" &&
                                // row.statement?.toLowerCase().trim().includes("suspicious")
                        )
                    ) {
                        setEvidence((prev) => ({...prev, witnessStatement: true}));
                    }

                    if (
                        // query.toLowerCase().includes("camera_id = 1") &&
                        // query.toLowerCase().includes("footage = 'footage of suspicious activity'") &&
                        query.toLowerCase().includes("location = 'warehouse'") &&
                        query.toLowerCase().includes("camera_footage = 'footage of suspicious activity'") &&
                        data.some(
                            (row) =>
                                row.location?.toLowerCase().trim() === "warehouse" &&
                                row.camera_footage?.toLowerCase().trim() === "footage of suspicious activity"
                        )
                    ) {
                        setEvidence((prev) => ({...prev, cameraFootage: true}));
                    }
                    // SELECT * FROM persons WHERE location = 'Living Room' AND action = 'watching tv'
                    // SELECT * FROM witnessstatements WHERE room_type = 'Lounge' AND statement LIKE '%suspicious%';
                    // SELECT * FROM camera WHERE camera_id = 1 and footage = 'footage of suspicious activity'
                    // SELECT p.person_name FROM persons p JOIN witnessstatements w ON p.location = 'Living Room' AND p.action = 'Watching TV' JOIN camera c ON c.camera_id = '1' AND c.footage = 'Footage of suspicious activity' WHERE w.room_type = 'Lounge' AND w.statement LIKE '%suspicious%';
                    // Ensure culprit logic works
                    if (allEvidenceCollected && query.toLowerCase().includes("select")) {
                        const culpritName = data.find(
                            (row) => row.suspect_name?.toLowerCase().trim() === "michael"
                        );

                        if (culpritName) {
                            setNestedQuerySuccess(true);
                        } else {
                            setError("Incorrect nested query or incomplete evidence. Try again cautiously!");
                        }
                    }
                }
            }
        } catch (err) {
            setError("Server Error: " + err.message);
        }
    };

    const handleSaveProgress = async () => {
        playClickSound();

        // Get the logged-in user's email
        const loggedInUserEmail = email || email_session;

        if (!loggedInUserEmail) {
            alert("No user logged in.");
            return;
        }

        try {
            const response = await axios.put(`http://${username}/updateLastSaved`, {
                email: loggedInUserEmail, // Sending the stored email
                lastsaved: 'MurderSQL' // Updating `lastsaved` with the current page
            });

            alert(response.data); // Show success message
        } catch (error) {
            console.error("Error updating last saved progress:", error);
            alert("Failed to save progress. Try again.");
        }
    };

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

    const handleGuess = () => {
        if (guess.trim().toLowerCase() === "michael") {
            if (progress < 4) {
                updateProgress(5.0);
            }
            updateBasicGame1(true);
            handleSaveProgress();
            setCulpritFound(true);
            setGameOver(true);
            setShowCongrats(true);
        } else {
            setAttemptsLeft((prev) => prev - 1);
            if (attemptsLeft <= 1) {
                setGameOver(true);
            }
            setError(
                `Incorrect guess. ${attemptsLeft - 1} attempts left. Re-examine the evidence and refine your nested query.`
            );
        }
    };

    const handleCloseTable = () => {
        setShowTable(false);
        setResult(null); // Clear result to prevent rendering issues
    };

    const handleClickHint = () => {
        playClickSound(); // Play the click sound
        openSidebar(); // Call the original function
    };

    const handleClickProgress = () => {
        playClickSound(); // Play the click sound
        openSidebarp(); // Call the original function
    };

    const openSidebar = () => {
        setIsSidebarOpen1(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen1(false);
    };

    const openSidebarp = () => {
        setIsSidebarOpen2(true);
    };

    const closeSidebarp = () => {
        setIsSidebarOpen2(false);
    };

    const handleClose1 = () => {
        setShowFinaleTest(false);
    };


    return (
        <div>
            {showDiv1 ? (
                // <div className="flex flex-col justify-center items-center bg-[#445c63] h-screen">
                //     <motion.img
                //         src={detective}
                //         alt="Detective"
                //         className="h-screen rounded-full"
                //         initial={{scale: 0.1}}
                //         animate={{scale: 0.8}}
                //         transition={{duration: 1.5, ease: "easeInOut"}}
                //     />
                // </div>
                <>
                    <div className={'w-screen h-screen bg-[#343237] grid grid-cols-3'}>
                        <div className={'flex p-2 py-64 items-end justify-center align-middle '}>
                            <Link to={'/MurderNormalisation'}>
                                <button
                                    onClick={() => {
                                        playClickSound();
                                    }}
                                    className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                >
                                    Redo Normalisation
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={finalsqltestpic}
                                alt="Detective"
                                className="flex h-[600px] w-[600px]  my-auto rounded-3xl shadow-2xl"
                            />
                            <h1 className={'absolute opacity-90 top-8 w-[426.5px] h-[80px] text-4xl text-center items-center align-middle justify-center flex bg-white text-[#343237]'}>Final Case Solving
                                Using SQL</h1>
                        </div>
                        <div className={'flex p-2 py-64 items-end justify-center align-middle '}>
                            <button
                                onClick={handleClickDiv1}
                                className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                            >
                                Continue to the Next Part
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                        <NavBarInGame pageName={"MurderSQL"}/>
                        <div className="w-screen bg-[#2f3749] py-0.5">
                            <h1 className="text-left ml-1 text-white font-semibold lg15.6:text-5xl text-4xl mb-3">
                                Find the Murderer!
                            </h1>
                        </div>
                        <p className="text-center lg15.6:text-2xl text-xl text-black">
                            Find the murderers among the 4 culprits.
                        </p>

                        {/* Database Schema */}
                        <div className={'p-3'}>
                            <div className="bg-white w-full p-1.5 rounded-lg shadow-md">
                                <h1 className={'text-black font-semibold mx-8 lg15.6:text-3xl text-2xl '}>Database</h1>
                                <div className={'grid grid-cols-5 gap-3'}>
                                    <div>
                                        <h1 className={'text-black font-semibold lg15.6:text-xl text-lg '}>Relation(crime_scene)</h1>
                                        <div className={'mx-auto justify-between'}>
                                            <CrimeSceneTable/>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className={'text-black font-semibold lg15.6:text-xl text-lg '}>Relation(weapon_analysis)</h1>
                                        <div className={'mx-auto justify-between'}>
                                            <WeaponAnalysisTable/>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className={'text-black font-semibold lg15.6:text-xl text-lg '}>Relation(suspects_murder)</h1>
                                        <div className={'mx-auto justify-between'}>
                                            <SuspectTable/>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className={'text-black font-semibold lg15.6:text-xl text-lg '}>Relation(suspect_alibi)</h1>
                                        <div className={'mx-auto justify-between'}>
                                            <SuspectAlibiTable/>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className={'text-black font-semibold lg15.6:text-xl text-lg '}>Relation(evidence)</h1>
                                        <div className={'mx-auto justify-between'}>
                                            <EvidenceTable/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Query Section */}
                        <div className="mb-8 p-3">
                            <div className={'grid grid-cols-6'}>
                                <div className={'col-span-4'}>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="lg15.6:text-2xl text-xl font-semibold">Find Clues</h2>
                                        <input
                                            className="w-full p-2 lg15.6:text-xl text-base border rounded-lg focus:outline-none focus:ring focus:border-blue-900"
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Enter your SQL query"
                                        />
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={executeQuery}
                                                className="bg-blue-500 lg15.6:text-xl text-base text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                            >
                                                Run Query
                                            </button>
                                        </div>

                                        {showTable && result && Array.isArray(result) ? (
                                            <>
                                                <div className="grid mb-2.5 justify-end">
                                                    <div className="group">
                                                        <button
                                                            className="relative mt-4 text-black lg15.6:text-3xl text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
                                                            onClick={() => {
                                                                playClickSound();
                                                                handleCloseTable();
                                                            }}
                                                        >
                                                            <IoClose/>
                                                            <span
                                                                className="absolute z-40 invisible group-hover:visible lg15.6:text-sm text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                                            >
                                        Close
                                    </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="relative overflow-x-auto">
                                                    <table className="w-full border-collapse border border-gray-300">
                                                        <thead className="bg-gray-100">
                                                        <tr>
                                                            {Object.keys(result[0]).map((key) => (
                                                                <th key={key}
                                                                    className="border border-gray-300 px-4 py-2">
                                                                    {key}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {result.map((row, index) => (
                                                            <tr key={index} className="hover:bg-gray-50">
                                                                {Object.values(row).map((value, i) => (
                                                                    <td
                                                                        key={i}
                                                                        className={`border lg15.6:text-xl text-base border-gray-300 px-4 py-2 ${
                                                                            value === 'Correct!' ? 'text-green-500' :
                                                                                value === 'Incorrect' ? 'text-red-500' :
                                                                                    'text-black'
                                                                        }`}
                                                                    >
                                                                        {typeof value === 'object' ? JSON.stringify(value) : value}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        ) : (
                                            !showTable && result && typeof result === 'string' && (
                                                <p className={`mt-4 lg15.6:text-xl text-lg font-semibold ${
                                                    result === 'Correct!' ? 'text-green-500' :
                                                        result === 'Incorrect' ? 'text-red-500' :
                                                            'text-black'
                                                }`}>
                                                    {result}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className={'col-span-2 flex-col p-5 justify-evenly'}>
                                    <div className={'flex justify-evenly'}>
                                        <button
                                            onClick={handleClickHint}>
                                            <img src={hintlens}
                                                 className={'lg15.6:h-40 h-32 p-2 hover:border-[2.5px] hover:border-black rounded-full'}
                                                 alt={'Hint Lens'}/>
                                            <h1 className={'lg15.6:text-xl text-base'}>Evidence Hint</h1>
                                        </button>
                                        <div className={'flex flex-col'}>
                                            <button
                                                onClick={handleClickProgress}
                                                className="relative overflow-hidden rounded-full p-2 border-[2.5px] border-black"
                                            >
                                                {/* Background divided into three sections */}
                                                <div
                                                    className="absolute inset-0 z-0 rounded-full"
                                                    style={{
                                                        background: `conic-gradient(
                                                    ${evidence.suspiciousActivity ? '#4CAF50' : '#a2e1e1'} 1deg 119deg,
                                                    #000000 119deg 121deg,
                                                    ${evidence.witnessStatement ? '#4CAF50' : '#a2e1e1'} 121deg 239deg,
                                                    #000000 239deg 241deg,
                                                    ${evidence.cameraFootage ? '#4CAF50' : '#a2e1e1'} 241deg 359deg,
                                                    #000000 359deg 1deg
                                                )`,
                                                    }}
                                                ></div>
                                                {/* Image and text */}
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <img
                                                        src={progresspic}
                                                        className="lg15.6:h-[144px] h-28 rounded-full bg-white"
                                                        alt="Hint Lens"
                                                    />
                                                    {/*<h1 className="mt-2">Evidence Collected</h1>*/}
                                                </div>
                                            </button>
                                            <h1 className="mt-2 lg15.6:text-xl text-base">Evidence Collected</h1>
                                        </div>
                                    </div>
                                    <div>
                                        {/* Prompt for Nested Query */}
                                        {allEvidenceCollected && !nestedQuerySuccess && (
                                            <div className="my-2 bg-white p-2 rounded-lg shadow-md">
                                                <h2 className="lg15.6:text-2xl text-xl font-semibold mb-4">Solve the Mystery</h2>
                                                <p className="lg15.6:text-xl text-base">
                                                    You have collected all the evidence! Write a nested SQL query,
                                                    including all
                                                    the evidences to reveal the culprit's name.
                                                </p>
                                            </div>
                                        )}

                                        {/* Guess Section */}
                                        {nestedQuerySuccess && !culpritFound && !gameOver && (
                                            <div className=" my-2 p-2 bg-white rounded-lg shadow-md">
                                                <h2 className="lg15.6:text-2xl text-xl font-semibold mb-4">Guess the Culprit</h2>
                                                <div className={'flex gap-2'}>
                                                    <input
                                                        type="text"
                                                        value={guess}
                                                        onChange={(e) => setGuess(e.target.value)}
                                                        placeholder="Enter the culprit's name"
                                                        className="p-2 border border-gray-300 rounded-lg"
                                                    />
                                                    <button onClick={handleGuess}
                                                            className="px-5 py-3 bg-[#495f67] lg15.6:text-xl text-base text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in">
                                                        Submit Guess
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {error && (
                                            <div className="mt-4 lg15.6:text-xl text-base bg-red-100 p-4 rounded-lg shadow-md">
                                                <p className="text-red-700">{error}</p>
                                            </div>
                                        )}

                                        {/* Game Over Messages */}
                                        {culpritFound && (
                                            <div className="my-6 bg-green-100 p-6 rounded-lg shadow-md">
                                                <h2 className="lg15.6:text-3xl text-2xl font-bold text-green-700 mb-4">Case Solved!</h2>
                                                <p className="text-green-700 lg15.6:text-xl text-base">You have
                                                    identified <strong>Michael</strong> as the
                                                    culprit.</p>
                                            </div>
                                        )}

                                        {gameOver && !culpritFound && (
                                            <div className="my-6 bg-red-100 p-6 rounded-lg shadow-md">
                                                <h2 className="lg15.6:text-3xl text-2xl font-bold text-red-700 mb-4">Game Over!</h2>
                                                <p className="lg15.6:text-xl text-base text-red-700">You have exhausted all attempts. The culprit
                                                    was <strong>Michael</strong>.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}
            <HelperAtFirst show={showFinaleTest} onClose={handleClose1} value={AppText.SQLMurder} />
            <Sidebar isOpen={isSidebarOpen1} onClose={closeSidebar}/>
            <Sidebar2 isOpen={isSidebarOpen2} onClose={closeSidebarp} evidence={evidence}/>
            <CongratsandSalute show={showCongrats} />
        </div>
    );
}


export default MurderSql;
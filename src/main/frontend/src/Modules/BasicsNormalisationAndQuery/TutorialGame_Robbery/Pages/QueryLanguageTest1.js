import React, {useEffect, useState} from 'react';
import {AppText, EmployeesTables, SQLTest1, updateProgress} from "../../../../Constants/Texts";
import {chief, helperright} from "../../../../Resources/Images/People";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {sqltest1pic} from "../../../../Resources/Images/Others";
import {username} from "../../../../Constants/Texts/constants";
import axios from "axios";
import NavBarInGame from "../NavBarInGame";
import {IoClose} from "react-icons/io5";

const HelperAtFirst = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
    const voiceMain = "Microsoft Mark";
    const position = "left";
    const img = helperright;

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
                        className="h-80 w-80 object-contain rounded-xl"
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

const JoinsDiscussions = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.MovetoJoins;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const navigate = useNavigate();

    const handleClick = () => {
        playClickSound();
        navigate("/JoinsTutorial");
        window.scrollTo(0, 0);
    };

    // Check for SpeechSynthesis support
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
                        className="h-80 w-80 object-contain rounded-xl"
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const QueryLanguageTest1 = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showSqltest1, setShowSqltest1] = useState(false);
    const [showJoinsDiscussions, setShowJoinsDiscussions] = useState(false);

    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [error, setError] = useState({});
    const [showTable, setShowTable] = useState({}); // Track visibility of tables for each question

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

    const handleInputChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const validateQuery = (id, validation) => {
        const userQuery = answers[id]?.toLowerCase() || '';
        const isValid = validation.every((term) => userQuery.includes(term));

        // Update the results state with the validation result for the current question
        setResults((prev) => {
            const updatedResults = { ...prev, [id]: isValid ? 'Correct!' : 'Incorrect' };
            console.log("Updated Results:", updatedResults); // Debugging

            // Check if all answers are correct
            const allCorrect = SQLTest1.Questions.every((q) => updatedResults[q.id] === 'Correct!');
            console.log("All Correct:", allCorrect); // Debugging

            if (allCorrect) {
                console.log("All answers are correct. Proceeding to JoinsDiscussions..."); // Debugging
                if (progress < 3) {
                    updateProgress(2.0);
                }
                setTimeout(() => setShowJoinsDiscussions(true), 300);
            }

            return updatedResults;
        });
    };

    const executeQuery = async (id, query) => {
        try {
            const response = await axios.get(`http://${username}/api/sql/execute`, {
                params: { query },
            });
            if (response.data.error) {
                setError((prev) => ({ ...prev, [id]: response.data.error }));
                setResults((prev) => ({ ...prev, [id]: null }));
            } else {
                setError((prev) => ({ ...prev, [id]: null }));
                setResults((prev) => ({ ...prev, [id]: response.data.data || response.data.message }));
                setShowTable((prev) => ({ ...prev, [id]: true })); // Show the table for this question
            }
        } catch (err) {
            setError((prev) => ({ ...prev, [id]: 'Server Error: ' + err.message }));
        }
    };

    const handleCloseTable = (id) => {
        setShowTable((prev) => ({ ...prev, [id]: false })); // Hide the table for this question
    };

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowSqltest1(true), 1500);
    };

    const handleClose1 = () => {
        setShowSqltest1(false);
    };

    return (
        <div>
            {showDiv1 ? (
                <>
                    <div className={'w-screen h-screen bg-[#343237] grid grid-cols-3'}>
                        <div className={'flex p-2 py-64 items-end justify-center align-middle '}>
                            <Link to={'/TutorialNFPractice'}>
                                <button
                                    onClick={() => {
                                        playClickSound();
                                    }}
                                    className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                >
                                    Replay Query Language Basics
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={sqltest1pic}
                                alt="Detective"
                                className="flex h-[600px] w-[600px]  my-auto rounded-3xl shadow-2xl"
                            />
                            <h1 className={'absolute opacity-90 top-8 w-[426.5px] h-[80px] text-4xl text-center items-center align-middle justify-center flex bg-white text-[#343237]'}>Introduction
                                to Query Language in DBMS</h1>
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
                    {showJoinsDiscussions && <JoinsDiscussions onClose={() => setShowJoinsDiscussions(false)} />}
                    <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                        <NavBarInGame pageName={"TutorialSQLPractice"}/>
                        <div className="w-screen bg-[#2f3749] py-0.5">
                            <h1 className="text-left text-white font-semibold text-4xl mb-3">
                                Basic SQL Query Quiz
                            </h1>
                        </div>

                        <div className={'grid grid-cols-6 gap-1'}>
                            <div className={'col-span-4 p-3'}>
                                <div className="space-y-6">
                                    {SQLTest1.Questions.map((q) => (
                                        <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
                                            <h2 className="text-xl font-semibold">{q.concept} Question</h2>
                                            <p className="text-gray-700 mb-4">{q.question}</p>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-900"
                                                placeholder="Write your SQL query here..."
                                                value={answers[q.id] || ''}
                                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            />
                                            <div className="flex space-x-4 mt-4">
                                                <button
                                                    className="px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition ease-in"
                                                    onClick={() => {
                                                        playClickSound();
                                                        validateQuery(q.id, q.validation);
                                                    }}
                                                >
                                                    Validate Query
                                                </button>
                                                <button
                                                    className="px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                                    onClick={() => {
                                                        playClickSound();
                                                        executeQuery(q.id, answers[q.id]);
                                                    }}
                                                >
                                                    Run Query
                                                </button>
                                            </div>
                                            {results[q.id] && Array.isArray(results[q.id]) ? (
                                                showTable[q.id] ? (<>
                                                        <div
                                                            className="grid my-2.5 justify-end"> {/* Grid container to align the button to the right */}
                                                            <div className={'group'}>
                                                                <button
                                                                    className="relative mt-4 text-black text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
                                                                    onClick={() => {
                                                                        playClickSound();
                                                                        handleCloseTable(q.id);
                                                                    }}
                                                                >
                                                                    <IoClose/>
                                                                    <h1
                                                                        className={
                                                                            'absolute z-40 invisible group-hover:visible text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'
                                                                        }
                                                                    >
                                                                        Close
                                                                    </h1>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <table
                                                                className="w-full border-collapse border border-gray-300">
                                                                <thead>
                                                                <tr>
                                                                    {Object.keys(results[q.id][0]).map((key) => (
                                                                        <th key={key}
                                                                            className="border border-gray-300 px-4 py-2">
                                                                            {key}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {results[q.id].map((row, index) => (
                                                                    <tr key={index}>
                                                                        {Object.values(row).map((value, i) => (
                                                                            <td
                                                                                key={i}
                                                                                className={`border border-gray-300 px-4 py-2 ${
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
                                                    // <p className="mt-4 text-lg text-gray-700">Query executed successfully. Click "Run Query" again to view results.</p>
                                                    <p className="text-lg text-gray-700"></p>
                                                )
                                            ) : (
                                                results[q.id] && (
                                                    <p className={`mt-4 text-lg font-semibold ${
                                                        results[q.id] === 'Correct!' ? 'text-green-500' :
                                                            results[q.id] === 'Incorrect' ? 'text-red-500' :
                                                                'text-black'
                                                    }`}>
                                                        {results[q.id]}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={'col-span-2 fixed translate-x-[220%] items-center align-middle justify-between p-3'}>
                                <div className={'bg-white mx-auto p-2 px-10 rounded-lg shadow-md flex flex-col'}>
                                    <h1 className={'text-black font-semibold mx-8 text-2xl '}>Relation(employees)</h1>
                                    <div className={'mx-auto'}>
                                        <EmployeesTables/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <HelperAtFirst show={showSqltest1} onClose={handleClose1} value={AppText.SQL1Help1}/>
            <JoinsDiscussions show={showJoinsDiscussions} />
        </div>
    );
};

export default QueryLanguageTest1;


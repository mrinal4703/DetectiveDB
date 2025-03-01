import React, {useEffect, useState} from 'react';
import {AppText, SQLTest1} from "../../../../Constants/Texts";
import {chief, helperright} from "../../../../Resources/Images/People";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {sqlpracticepic, sqltest1pic} from "../../../../Resources/Images/Others";
import {username} from "../../../../Constants/Texts/constants";
import {CheckCircle, XCircle} from "lucide-react";
import axios from "axios";

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

const SuperKeyDiscussions = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.NiceWorkFD;
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
        navigate("/KeysTutorial");
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
    const [showSqltest2, setShowSqltest2] = useState(false);
    const [showSuperKeyDiscussions, setShowSuperKeyDiscussions] = useState(false);

    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [error, setError] = useState({});

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
            return updatedResults;
        });
    };

    // Use useEffect to monitor changes in the results state
    useEffect(() => {
        console.log("Results State Changed:", results); // Debugging

        // Check if all answers are correct
        const allCorrect = SQLTest1.Questions.every((q) => results[q.id] === 'Correct!');
        console.log("All Correct:", allCorrect); // Debugging

        if (allCorrect) {
            console.log("All answers are correct. Proceeding to SuperKeyDiscussions..."); // Debugging
            setTimeout(() => setShowSuperKeyDiscussions(true), 300);
        }
    }, [results]); // Trigger this effect whenever the results state changes

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
            }
        } catch (err) {
            setError((prev) => ({ ...prev, [id]: 'Server Error: ' + err.message }));
        }
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
        setShowSqltest2(true);
    };

    const handleClose2 = () => {
        setShowSqltest2(false);
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
                    {showSuperKeyDiscussions && <SuperKeyDiscussions onClose={() => setShowSuperKeyDiscussions(false)} />}
                    <div className="min-h-screen bg-gray-100 p-6">
                        <h1 className="text-3xl font-bold text-center mb-6">SQL Practice Test</h1>
                        <div className="space-y-6">
                            {SQLTest1.Questions.map((q) => (
                                <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold">{q.concept} Question</h2>
                                    <p className="text-gray-700 mb-4">{q.question}</p>
                                    <textarea
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                        placeholder="Write your SQL query here..."
                                        rows="3"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                                    />
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            onClick={() => validateQuery(q.id, q.validation)}
                                        >
                                            Validate Query
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                            onClick={() => executeQuery(q.id, answers[q.id])}
                                        >
                                            Run Query
                                        </button>
                                    </div>
                                    {results[q.id] && Array.isArray(results[q.id]) ? (
                                        <table className="mt-4 w-full border-collapse border border-gray-300">
                                            <thead>
                                            <tr>
                                                {Object.keys(results[q.id][0]).map((key) => (
                                                    <th key={key} className="border border-gray-300 px-4 py-2">
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
                                                            {value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        results[q.id] && (
                                            <p className={`mt-4 text-lg ${
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
                </div>
            )}
            <HelperAtFirst show={showSqltest1} onClose={handleClose1} value={AppText.SQL1Help1}/>
            <HelperAtFirst show={showSqltest2} onClose={handleClose2} value={AppText.SQL1Help2}/>
        </div>
    );
};

export default QueryLanguageTest1;

const QueryLanguageTest2 = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showSqltest1, setShowSqltest1] = useState(false);
    const [showSqltest2, setShowSqltest2] = useState(false);
    const [showSuperKeyDiscussions, setShowSuperKeyDiscussions] = useState(false);

    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [error, setError] = useState({});

    const handleInputChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const validateQuery = (id, validation) => {
        const userQuery = answers[id]?.toLowerCase() || '';
        const isValid = validation.every((term) => userQuery.includes(term));

        setResults((prev) => ({ ...prev, [id]: isValid ? 'Correct!' : 'Incorrect' }));

        // Check if all answers are correct
        const allCorrect = SQLTest1.Questions.every(q => results[q.id] === 'Correct!' || (q.id === id && isValid));
        if (allCorrect) {
            setTimeout(() => setShowSuperKeyDiscussions(true), 300);
        }
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
            }
        } catch (err) {
            setError((prev) => ({ ...prev, [id]: 'Server Error: ' + err.message }));
        }
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
        setShowSqltest2(true);
    };

    const handleClose2 = () => {
        setShowSqltest2(false);
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
                    {showSuperKeyDiscussions && <SuperKeyDiscussions onClose={() => setShowSuperKeyDiscussions(false)} />}
                    <div className="min-h-screen bg-gray-100 p-6">
                        <h1 className="text-3xl font-bold text-center mb-6">SQL Practice Test</h1>
                        <div className="space-y-6">
                            {SQLTest1.Questions.map((q) => (
                                <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold">{q.concept} Question</h2>
                                    <p className="text-gray-700 mb-4">{q.question}</p>
                                    <textarea
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                        placeholder="Write your SQL query here..."
                                        rows="3"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                                    />
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            onClick={() => validateQuery(q.id, q.validation)}
                                        >
                                            Validate Query
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                            onClick={() => executeQuery(q.id, answers[q.id])}
                                        >
                                            Run Query
                                        </button>
                                    </div>
                                    {results[q.id] && Array.isArray(results[q.id]) ? (
                                        <table className="mt-4 w-full border-collapse border border-gray-300">
                                            <thead>
                                            <tr>
                                                {Object.keys(results[q.id][0]).map((key) => (
                                                    <th key={key} className="border border-gray-300 px-4 py-2">
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
                                                            {value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        results[q.id] && (
                                            <p className={`mt-4 text-lg ${
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
                </div>
            )}
            <HelperAtFirst show={showSqltest1} onClose={handleClose1} value={AppText.SQL1Help1}/>
            <HelperAtFirst show={showSqltest2} onClose={handleClose2} value={AppText.SQL1Help2}/>
        </div>
    );
};

// export default QueryLanguageTest2;

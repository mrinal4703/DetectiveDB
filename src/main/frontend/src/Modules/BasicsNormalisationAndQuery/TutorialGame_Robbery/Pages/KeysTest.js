import React, {useEffect, useState} from "react";
import {AppText, practiceKeys, useBackgroundMusic, useVoiceSynthesis} from "../../../../Constants/Texts";
import {SlMagnifier} from "react-icons/sl";
import {motion} from "framer-motion";
import {chief, helperleft, helperright} from "../../../../Resources/Images/People";
import Typewriter from "typewriter-effect";
import {useNavigate} from "react-router-dom";
import {clicksound, ingame} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const HelperAtFirst = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.KeysHelp;
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

    // Check for SpeechSynthesis support
    const isSpeechSynthesisSupported = !!window.speechSynthesis;

    // Load voices and set the state when available
    useEffect(() => {
        if (!isSpeechSynthesisSupported) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setVoicesLoaded(true);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial call to load voices

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSpeechSynthesisSupported]);

    // Speak the text and update display text word by word
    useEffect(() => {
        if (!isSpeechSynthesisSupported || !show || !text || !voicesLoaded) return;

        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        let selectedVoice = voices.find((voice) => voice.name.includes(voiceMain)) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = text.split(" ");
        let wordIndex = -1;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                wordIndex++;
                const currentWord = words[wordIndex];
                if (currentWord) {
                    setDisplayText((prev) => (prev ? `${prev} ${currentWord}` : currentWord));
                }
            }
        };

        utterance.onend = () => {
            setShowButton(true); // Show the button when speech ends
        };

        // Speak the utterance
        window.speechSynthesis.speak(utterance);

        return () => {
            // Cancel the speech synthesis if the component unmounts or the effect is rerun
            window.speechSynthesis.cancel();
        };
    }, [show, voicesLoaded, isSpeechSynthesisSupported, voices]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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

const HelpEasy = ({ show, onClose }) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.Hmm, show);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 2);
            return () => clearTimeout(timer); // Clean up timer
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.img
                    src={helperleft}
                    className="h-80 w-80 absolute bottom-0 right-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />

                <div
                    className="absolute w-[400px] h-[155px] bottom-32 right-36 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
                    <table className="table-fixed text-start mx-auto border-separate border-spacing-1">
                        <tbody>
                        <tr>
                            <td>-{practiceKeys[0].help[0].explanation1}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button
                        className={`mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${
                            showButton ? "block" : "hidden"
                        }`}
                        onClick={handleClick}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const HelpDifficult = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.Hmm, show);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 2);
            return () => clearTimeout(timer); // Clean up timer
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <motion.img
                    src={helperright}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute w-[400px] h-[300px] bottom-32 left-36 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
                    <table className="table-fixed text-start mx-auto border-separate border-spacing-1">
                        <tbody>
                        <tr>
                            <td>-{practiceKeys[1].help[0].explanation1}</td>
                        </tr>
                        <tr>
                            <td>-{practiceKeys[1].help[0].explanation2}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button
                        className={`mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${
                            showButton ? "block" : "hidden"
                        }`}
                        onClick={handleClick}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CorrectModal = ({ show }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const text = AppText.CorrectAnsKeys;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/NormalisationTutorial");
        window.scrollTo(0, 0);
    };

    // Check for SpeechSynthesis support
    const isSpeechSynthesisSupported = !!window.speechSynthesis;

    // Load voices and set the state when available
    useEffect(() => {
        if (!isSpeechSynthesisSupported) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setVoicesLoaded(true);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial call to load voices

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSpeechSynthesisSupported]);

    // Speak the text and update display text word by word
    useEffect(() => {
        if (!isSpeechSynthesisSupported || !show || !text || !voicesLoaded) return;

        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        let selectedVoice = voices.find((voice) => voice.name.includes(voiceMain)) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = text.split(" ");
        let wordIndex = -1;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                wordIndex++;
                const currentWord = words[wordIndex];
                if (currentWord) {
                    setDisplayText((prev) => (prev ? `${prev} ${currentWord}` : currentWord));
                }
            }
        };

        utterance.onend = () => {
            setShowButton(true); // Show the button when speech ends
        };

        // Speak the utterance
        window.speechSynthesis.speak(utterance);

        return () => {
            // Cancel the speech synthesis if the component unmounts or the effect is rerun
            window.speechSynthesis.cancel();
        };
    }, [show, voicesLoaded, isSpeechSynthesisSupported, voices]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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

const WrongModal = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.WrongAnsKeys;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    // Check for SpeechSynthesis support
    const isSpeechSynthesisSupported = !!window.speechSynthesis;

    // Load voices and set the state when available
    useEffect(() => {
        if (!isSpeechSynthesisSupported) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setVoicesLoaded(true);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial call to load voices

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSpeechSynthesisSupported]);

    // Speak the text and update display text word by word
    useEffect(() => {
        if (!isSpeechSynthesisSupported || !show || !text || !voicesLoaded) return;

        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        let selectedVoice = voices.find((voice) => voice.name.includes(voiceMain)) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = text.split(" ");
        let wordIndex = -1;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                wordIndex++;
                const currentWord = words[wordIndex];
                if (currentWord) {
                    setDisplayText((prev) => (prev ? `${prev} ${currentWord}` : currentWord));
                }
            }
        };

        utterance.onend = () => {
            setShowButton(true); // Show the button when speech ends
        };

        // Speak the utterance
        window.speechSynthesis.speak(utterance);

        return () => {
            // Cancel the speech synthesis if the component unmounts or the effect is rerun
            window.speechSynthesis.cancel();
        };
    }, [show, voicesLoaded, isSpeechSynthesisSupported, voices]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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

export default function KeysTest() {
    const [showKeystest, setShowKeystest] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showCorrectModal, setShowCorrectModal] = useState(false);
    const [showWrongModal, setShowWrongModal] = useState(false);

    const [showEasyHelp, setShowEasyHelp] = useState(false);
    const [showDifficultHelp, setShowDifficultHelp] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    // useBackgroundMusic(ingame);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowKeystest(true);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    useEffect(() => {
        const blinkButton = () => {
            let blinkCount = 0;
            const interval = setInterval(() => {
                setIsBlinking((prev) => !prev);
                blinkCount += 1;
                if (blinkCount >= 4) {
                    clearInterval(interval);
                    setIsBlinking(false);
                }
            }, 200);

            return interval;
        };

        const timeout = setTimeout(() => {
            blinkButton(); // Start blinking after 6 seconds
        }, 6000);

        return () => {
            clearTimeout(timeout); // Clean up the timeout if component unmounts
        };
    }, []);

    const handleOptionChange = (id, value) => {
        setSelectedAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        const allCorrect = practiceKeys.every(q => selectedAnswers[q.id] === q.correctAnswer);
        playClickSound();
        if (allCorrect) {
            setShowCorrectModal(true);
        } else {
            setSelectedAnswers({});
            setShowWrongModal(true);
        }
    };

    return (
        <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
            <NavBarInGame pageName={"TutorialKeysPractice"} />
            <div className="w-screen bg-[#2f3749] py-0.5">
                <h1 className="text-left text-white font-semibold text-4xl mb-3">
                    Candidate Keys Quiz
                </h1>
            </div>
            <div className="w-[1220px] mx-5 h-auto bg-white my-2 rounded-[30px] p-7">
                <div className="grid grid-cols-2 gap-6">
                    {Array.isArray(practiceKeys) && practiceKeys?.length > 0 ? (
                        practiceKeys.map(({ id, level, question, fdset, subquestion, options, help }) => (
                            <div key={id} className="border p-5 rounded-lg shadow">
                                <p className="text-3xl text-gray-600 mb-4">
                                    Level: {level}
                                    <button
                                        onClick={() => {
                                            playClickSound();
                                            level === "Easy"
                                                ? setShowEasyHelp(true)
                                                : setShowDifficultHelp(true)
                                        }
                                        }
                                        className={`ml-8 text-black font-semibold border-blue-500 border-2 hover:scale-110 ease-in rounded-full p-2 ${isBlinking ? "opacity-0 z-50" : ""}`}
                                    >
                                        <SlMagnifier/>
                                    </button>
                                </p>
                                <h2 className="text-2xl font-bold mb-2">{question}</h2>
                                <p className="text-xl font-semibold mb-2">FD Set: {fdset}</p>
                                <p className="text-lg text-gray-700 mb-4">{subquestion}</p>
                                <div className="ml-5">
                                    {options.map(option => (
                                        <label key={option.value} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`question-${id}`}
                                                value={option.value}
                                                checked={selectedAnswers[id] === option.value}
                                                onChange={() => handleOptionChange(id, option.value)}
                                                className="w-5 h-5"
                                            />
                                            <span className="text-gray-800 text-lg">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500 text-lg">No questions available.</p>
                    )}
                </div>
                <div className="mt-3 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="w-44 mt-4 bg-[#495f67] text-white text-lg py-2 rounded-lg hover:bg-[#2e3c49]"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <HelperAtFirst show={showKeystest} onClose={() => setShowKeystest(false)} />
            <HelpEasy show={showEasyHelp} onClose={() => setShowEasyHelp(false)} />
            <HelpDifficult show={showDifficultHelp} onClose={() => setShowDifficultHelp(false)} />
            <CorrectModal show={showCorrectModal}/>
            <WrongModal show={showWrongModal} onClose={() => setShowWrongModal(false)}/>
        </div>
    );
}

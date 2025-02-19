import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import {AppText, practiceFDClosure, useVoiceSynthesis} from "../../../../Constants/Texts"; // Assuming helper functions are from this file
import { motion } from "framer-motion";
import {chief, helperleft, helperright} from "../../../../Resources/Images/People";
import {SlMagnifier} from "react-icons/sl";
import {useNavigate} from "react-router-dom";
import {clicksound} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const HelperAtFirst = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.HelpingFD;
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
                setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
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
                        Next
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
            }, 2000);
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
                    className="absolute w-[400px] h-[300px] bottom-32 right-36 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
                    <table className="table-fixed text-start mx-auto border-separate border-spacing-1">
                        <tbody>
                        <tr>
                            <td>-{AppText.EasyFDA}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.EasyFDB}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.EasyFDC}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.EasyFDD}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.EasyFDAC}</td>
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
            }, 2000);
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
                    className="absolute w-[400px] h-[430px] bottom-32 left-36 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
                    <table className="table-fixed text-start mx-auto border-separate border-spacing-1">
                        <tbody>
                        <tr>
                            <td>-{AppText.DiffFDA}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDB}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDC}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDD}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDE}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDF}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDG}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDH}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDAC}</td>
                        </tr>
                        <tr>
                            <td>-{AppText.DiffFDAF}</td>
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

const SuperKeyDiscussions = ({ show }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.NiceWorkFD;
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
                setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

export default function FDTest() {
    const [showFdtest, setShowFdtest] = useState(false);
    const [showEasyHelp, setShowEasyHelp] = useState(false);
    const [showDifficultHelp, setShowDifficultHelp] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [showSuperKeyDiscussions, setShowSuperKeyDiscussions] = useState(false);

    // useBackgroundMusic(ingame);

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowFdtest(true);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

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
        }, 7000); // 6 seconds delay before starting the blink

        return () => {
            clearTimeout(timeout); // Clean up the timeout if component unmounts
        };
    }, []);

    // Initialize user inputs from practiceFDClosure
    const [userInputs, setUserInputs] = useState(
        practiceFDClosure.map(fd => ({
            id: fd.id,
            inputs: Object.fromEntries(
                Object.keys(fd).filter(key => key.startsWith("fd")).map(key => [key, ""])
            ),
            errors: {},
        }))
    );

    // Handle input changes
    const handleChange = (id, key, value) => {
        setUserInputs(prevInputs =>
            prevInputs.map(item =>
                item.id === id
                    ? {
                        ...item,
                        inputs: { ...item.inputs, [key]: value.trim() },
                        errors: { ...item.errors, [key]: null }, // Reset errors when typing
                    }
                    : item
            )
        );
    };

    const normalize = (str) => [...new Set(str.replace(/\s+/g, "").split(""))].sort().join("");

    const [lastChecked, setLastChecked] = useState(null); // Track last clicked check button

    const [isProcessing, setIsProcessing] = useState(false); // Tracks if we're in the middle of a check
    const [allChecked, setAllChecked] = useState(false); // Ensures all inputs have been checked before opening modal

    const handleSubmit = (id, key) => {
        setLastChecked({ id, key }); // Store last clicked button
        setIsProcessing(true); // Mark as processing

        setUserInputs(prevInputs => {
            return prevInputs.map(item => {
                if (item.id !== id) return item;

                const correctFDs = practiceFDClosure.find(fd => fd.id === id);
                if (!correctFDs || !correctFDs[key] || !item.inputs[key]) return item;

                const userAnswer = normalize(item.inputs[key]);
                const correctAnswer = normalize(correctFDs[key]);

                return {
                    ...item,
                    errors: {
                        ...item.errors,
                        [key]: userAnswer !== correctAnswer,
                    },
                };
            });
        });


        setTimeout(() => {
            setIsProcessing(false);
            setAllChecked(true);
        }, 300);
    };

    useEffect(() => {
        if (!lastChecked || isProcessing || !allChecked) return; // Ensure last button was clicked, processed, and checks are done

        // Check if all inputs are correct
        const allCorrect = userInputs.every(item => {
            const correctFDs = practiceFDClosure.find(fd => fd.id === item.id);
            if (!correctFDs) return false;

            return Object.entries(item.inputs).every(([key, value]) => {
                if (!correctFDs[key] || key === "fdset") return true;
                return normalize(value) === normalize(correctFDs[key]);
            });
        });

        if (allCorrect) {
            console.log(`🎉 All correct! Modal opens after last check button click: ${lastChecked.key}`);
            setTimeout(() => setShowSuperKeyDiscussions(true), 300);
        }

        setAllChecked(false); // Reset after modal check
    }, [userInputs, lastChecked, isProcessing, allChecked]);

    return (
        <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
            <NavBarInGame pageName={"TutorialFDPractice"} />
            <div className={'w-screen bg-[#2f3749] py-0.5'}>
                <h1 className="text-left text-white font-semibold text-4xl mb-3">Practice FD Closure</h1>
            </div>
            <div className="w-[1220px] mx-5 h-auto bg-white my-2 rounded-[30px] p-10">
                <div className="grid grid-cols-2 gap-6">
                    {userInputs.map(({ id, inputs, errors }) => {
                        const fdData = practiceFDClosure.find(fd => fd.id === id);
                        return (
                            <div key={id} className="border p-5 rounded-lg shadow">
                                <p className="text-3xl text-gray-600 mb-4">
                                    Level: {fdData.level}
                                    <button
                                        onClick={() => {
                                            playClickSound();
                                            fdData.level === "Easy"
                                                ? setShowEasyHelp(true)
                                                : setShowDifficultHelp(true)
                                        }
                                        }
                                        className={`ml-8 text-black font-semibold border-blue-500 border-2 hover:scale-110 ease-in rounded-full p-2 ${isBlinking ? "opacity-0 z-50" : ""}`}
                                    >
                                        <SlMagnifier />
                                    </button>
                                </p>
                                <h2 className="text-2xl font-bold mb-2">{fdData.relations}</h2>
                                <p className="text-xl font-semibold mb-6">FD Set: {fdData.fdset}</p>
                                {Object.keys(fdData)
                                    .filter(key => key.startsWith("fd") && key !== "fdset")
                                    .map(key => (
                                        <div key={key} className="my-3 w-full flex justify-center items-center">
                                            <label className="block text-gray-700 mr-10">closure[{key.replace(/^fd/, "")}]</label>
                                            <input
                                                type="text"
                                                value={inputs[key]}
                                                onChange={e => handleChange(id, key, e.target.value)}
                                                className={`w-96 mx-8 text-center p-2 border rounded-lg ${
                                                    errors[key] ? "border-red-500 text-red-500" : "border-gray-300"
                                                }`}
                                            />
                                            <button
                                                onClick={() => {
                                                    playClickSound();
                                                    handleSubmit(id, key);
                                                }}
                                                className={`ml-2 px-2 py-1 rounded-lg text-white ${
                                                    errors[key] ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"
                                                }`}
                                            >
                                                Check
                                            </button>
                                            {errors[key] === false && <CheckCircle className="ml-1 text-green-500" />}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modals */}
            <HelperAtFirst show={showFdtest} onClose={() => setShowFdtest(false)} />
            <HelpEasy show={showEasyHelp} onClose={() => setShowEasyHelp(false)} />
            <HelpDifficult show={showDifficultHelp} onClose={() => setShowDifficultHelp(false)} />
            <SuperKeyDiscussions show={showSuperKeyDiscussions} />
        </div>
    );
}

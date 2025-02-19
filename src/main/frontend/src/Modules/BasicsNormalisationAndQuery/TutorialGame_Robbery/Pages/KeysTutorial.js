import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {
    assisstantconclude,
    assisstantthinking,
    chief,
    helperleft,
    helperpeekright,
    helperright
} from "../../../../Resources/Images/People";
import Typewriter from "typewriter-effect";
import {
    AppText,
    goodCandidateKeysExample,
    SuperKeysExample1Json,
    SuperKeysExample2Json, useVoiceSynthesis,
} from "../../../../Constants/Texts";
import {useNavigate} from "react-router-dom";
import {clicksound} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const WhatAreKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.WhatAreKeys;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const SomeSpecialKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.SomeSpecialKeys;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const SuperKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.SuperKeys;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const ReadSuperKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.ReadOutSuperKeys;
    const voiceMain = "Microsoft Mark";
    const position = "right";
    const img = helperleft;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const SuperKeysExample = ({show, onClose}) => {
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
            // }, 10);
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
                    src={helperleft}
                    className="h-80 w-80 absolute bottom-0 right-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute w-[460px] h-auto -bottom-5 right-36 text-lg text-black p-2 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
                    <table className="table-fixed text-start mx-auto border-separate border-spacing-1">
                        <tbody>
                        <tr>
                            <td className={'font-semibold'}>Example 1 Explanation</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey1Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey2Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey3Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey4Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey5Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample1Json[0].superKey6Explanation}</td>
                        </tr>
                        <tr>
                            <td className={'font-semibold'}>Example 2 Explanation</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample2Json[0].superKey1Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample2Json[0].superKey2Explanation}</td>
                        </tr>
                        <tr>
                            <td>-{SuperKeysExample2Json[0].superKey3Explanation}</td>
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

const CandidateKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.CandidateKeys;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const WhatAreCandidateKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.CandidateKeysDef;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeysEasy = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.CandidateKeyEasy1;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantthinking;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeysEasy2 = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.CandidateKeyEasy2;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeyExplanation1 = ({ show, onClose, value }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = value;
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeyExplanation2 = ({ show, onClose, value }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = value;
    const voiceMain = "Microsoft Mark";
    const position = "left";
    const img = helperpeekright;

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
                <div className={`absolute top-10 ${position}-0`}>
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
                    className={`absolute top-48 ${position}-40 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto`}>
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

const WhatArePrimaryKeys = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.PrimaryKeyDef;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const DirectWay = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.DirectWay;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantthinking;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const GoldenMantra = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.GoldenMantra;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantthinking;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeyUnderstand = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.CandidateKeyUnderstand;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantthinking;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const PrimeKeyAttribute = ({ show, onClose }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = AppText.PrimeKeyAttributes;
    const voiceMain = "Microsoft Mark";
    const position = "right";
    const img = helperleft;

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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const DirectMethodExplanation1 = ({ show, onClose, value }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = value;
    const voiceMain = "Microsoft Mark";
    const position = "right";
    const img = helperleft;

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
                    className={`absolute -bottom-1 ${position}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto`}>
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

const DirectMethodExplanation2 = ({ show, onClose, value }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = value;
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
                    className={`absolute -bottom-1 ${position}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto`}>
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

const PracticeCandidateKeys = ({ show }) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const text = AppText.PracticeKeys;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/TutorialKeysPractice");
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const KeysTutorial = () => {
    const [showWhatKeys, setShowWhatKeys] = useState(false);
    const [showSpecialKeys, setShowSpecialKeys] = useState(false);
    const [showSuperKeys, setShowSuperKeys] = useState(false);
    const [showReadOutSuperKeys, setShowReadOutSuperKeys] = useState(false);
    const [showSuperKeysExample, setShowSuperKeysExample] = useState(false);
    const [showCandidateKeys, setShowCandidateKeys] = useState(false);
    const [showWhatareCandidateKeys, setShowWhatareCandidateKeys] = useState(false);
    const [showCandidateKeysEasy1, setShowCandidateKeysEasy1] = useState(false);
    const [showCandidateKeysEasy2, setShowCandidateKeysEasy2] = useState(false);
    const [showCandidateKeysExample1Explanation1, setShowCandidateKeysExample1Explanation1] = useState(false);
    const [showCandidateKeysExample1Explanation2, setShowCandidateKeysExample1Explanation2] = useState(false);
    const [showCandidateKeysExample1Explanation3, setShowCandidateKeysExample1Explanation3] = useState(false);
    const [showCandidateKeysExample1Explanation4, setShowCandidateKeysExample1Explanation4] = useState(false);
    const [showCandidateKeysExample1Explanation5, setShowCandidateKeysExample1Explanation5] = useState(false);
    const [showCandidateKeysExample1Explanation6, setShowCandidateKeysExample1Explanation6] = useState(false);
    const [showCandidateKeysExample2Explanation1, setShowCandidateKeysExample2Explanation1] = useState(false);
    const [showCandidateKeysExample2Explanation2, setShowCandidateKeysExample2Explanation2] = useState(false);
    const [showCandidateKeysExample2Explanation3, setShowCandidateKeysExample2Explanation3] = useState(false);
    const [showWhatarePrimaryKeys, setShowWhatarePrimaryKeys] = useState(false);
    const [showDirectWay, setShowDirectWay] = useState(false);
    const [showGoldenMantra, setShowGoldenMantra] = useState(false);
    const [showCandidateKeyUnderstand, setShowCandidateKeyUnderstand] = useState(false);
    const [showPrimeKeyAttribute, setShowPrimeKeyAttribute] = useState(false);

    const [showDirectMethodExplanation1Example1, setShowDirectMethodExplanation1Example1] = useState(false);
    const [showDirectMethodExplanation2Example1, setShowDirectMethodExplanation2Example1] = useState(false);
    const [showDirectMethodExplanation3Example1, setShowDirectMethodExplanation3Example1] = useState(false);
    const [showDirectMethodExplanation4Example1, setShowDirectMethodExplanation4Example1] = useState(false);

    const [showDirectMethodExplanation0Example2, setShowDirectMethodExplanation0Example2] = useState(false);
    const [showDirectMethodExplanation1Example2, setShowDirectMethodExplanation1Example2] = useState(false);
    const [showDirectMethodExplanation2Example2, setShowDirectMethodExplanation2Example2] = useState(false);
    const [showDirectMethodExplanation3Example2, setShowDirectMethodExplanation3Example2] = useState(false);
    const [showDirectMethodExplanation4Example2, setShowDirectMethodExplanation4Example2] = useState(false);
    const [showDirectMethodExplanation5Example2, setShowDirectMethodExplanation5Example2] = useState(false);
    const [showDirectMethodExplanation6Example2, setShowDirectMethodExplanation6Example2] = useState(false);
    const [showDirectMethodExplanation7Example2, setShowDirectMethodExplanation7Example2] = useState(false);

    const [showLetsPracticeKeys, setShowLetsPracticeKeys] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowWhatKeys(true);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    const handleClose1 = () => {
        setShowWhatKeys(false);
        setShowSpecialKeys(true);
    };

    const handleClose2 = () => {
        setShowSpecialKeys(false);
        setShowSuperKeys(true);
    };

    const handleClose3 = () => {
        setShowSuperKeys(false);
        setShowReadOutSuperKeys(true);
    };

    const handleClose0 = () => {
        setShowReadOutSuperKeys(false);
        setTimeout(() => setShowSuperKeysExample(true), 40000);
    }

    const handleClose4 = () => {
        setShowSuperKeysExample(false);
        setTimeout(() => setShowCandidateKeys(true), 2000);
    }

    const handleClose5 = () => {
        setShowCandidateKeys(false);
        setShowWhatareCandidateKeys(true);
    };

    const handleClose6 = () => {
        setShowWhatareCandidateKeys(false);
        setTimeout(() => setShowCandidateKeysEasy1(true), 1000);
    };

    const handleClose7 = () => {
        setShowCandidateKeysEasy1(false);
        setShowCandidateKeysEasy2(true);
    };

    const handleClose9 = () => {
        setShowCandidateKeysEasy2(false);
        setShowCandidateKeysExample1Explanation1(true);
    };

    const handleClose10 = () => {
        setShowCandidateKeysExample1Explanation1(false);
        setShowCandidateKeysExample1Explanation2(true);
    };

    const handleClose11 = () => {
        setShowCandidateKeysExample1Explanation2(false);
        setShowCandidateKeysExample1Explanation3(true);
    };

    const handleClose12 = () => {
        setShowCandidateKeysExample1Explanation3(false);
        setShowCandidateKeysExample1Explanation4(true);
    };

    const handleClose13 = () => {
        setShowCandidateKeysExample1Explanation4(false);
        setShowCandidateKeysExample1Explanation5(true);
    };

    const handleClose14 = () => {
        setShowCandidateKeysExample1Explanation5(false);
        setShowCandidateKeysExample1Explanation6(true);
    };

    const handleClose15 = () => {
        setShowCandidateKeysExample1Explanation6(false);
        setTimeout(() => setShowCandidateKeysExample2Explanation1(true), 1500);
    };

    const handleClose16 = () => {
        setShowCandidateKeysExample2Explanation1(false);
        setShowCandidateKeysExample2Explanation2(true);
    };

    const handleClose17 = () => {
        setShowCandidateKeysExample2Explanation2(false);
        setShowCandidateKeysExample2Explanation3(true);
    };

    const handleClose18 = () => {
        setShowCandidateKeysExample2Explanation3(false);
        setTimeout(() => setShowWhatarePrimaryKeys(true), 3000);
    };

    const handleClose19 = () => {
        setShowWhatarePrimaryKeys(false);
        setTimeout(() => setShowDirectWay(true), 3000);
    };

    const handleClose20 = () => {
        setShowDirectWay(false);
        setShowGoldenMantra(true);
    };

    const handleClose21 = () => {
        setShowGoldenMantra(false);
        setShowCandidateKeyUnderstand(true);
    };

    const handleClose22 = () => {
        setShowCandidateKeyUnderstand(false);
        setShowPrimeKeyAttribute(true);
    };

    const handleClose23 = () => {
        setShowPrimeKeyAttribute(false);
        setTimeout(() => setShowDirectMethodExplanation1Example1(true), 2000);
    };

    const handleClose24 = () => {
        setShowDirectMethodExplanation1Example1(false);
        setShowDirectMethodExplanation2Example1(true);
    };

    const handleClose25 = () => {
        setShowDirectMethodExplanation2Example1(false);
        setShowDirectMethodExplanation3Example1(true);
    };

    const handleClose26 = () => {
        setShowDirectMethodExplanation3Example1(false);
        setShowDirectMethodExplanation4Example1(true);
    };

    const handleClose27 = () => {
        setShowDirectMethodExplanation4Example1(false);
        setTimeout(() => setShowDirectMethodExplanation0Example2(true), 2000);
    };

    const handleClose28 = () => {
        setShowDirectMethodExplanation0Example2(false);
        setShowDirectMethodExplanation1Example2(true);
    };

    const handleClose29 = () => {
        setShowDirectMethodExplanation1Example2(false);
        setShowDirectMethodExplanation2Example2(true);
    };

    const handleClose30 = () => {
        setShowDirectMethodExplanation2Example2(false);
        setShowDirectMethodExplanation3Example2(true);
    };

    const handleClose31 = () => {
        setShowDirectMethodExplanation3Example2(false);
        setShowDirectMethodExplanation4Example2(true);
    };

    const handleClose32 = () => {
        setShowDirectMethodExplanation4Example2(false);
        setShowDirectMethodExplanation5Example2(true);
    };

    const handleClose33 = () => {
        setShowDirectMethodExplanation5Example2(false);
        setShowDirectMethodExplanation6Example2(true);
    };

    const handleClose34 = () => {
        setShowDirectMethodExplanation6Example2(false);
        setShowDirectMethodExplanation7Example2(true);
    };

    const handleClose35 = () => {
        setShowDirectMethodExplanation7Example2(false);
        setTimeout(() => setShowLetsPracticeKeys(true), 1000);
    };

    return (
        <div>
            <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                <NavBarInGame pageName={"KeysTutorial"} />
                <div className={'w-screen bg-[#2f3749] py-0.5'}>
                    <h1 className="text-left text-white font-semibold text-4xl mb-3">Different and Necessary Keys</h1>
                </div>
                <div className={'grid grid-cols-2 gap-2 mr-10'}>

                    <div
                        className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                        <h1 className={'text-black text-center text-3xl font-semibold'}>Super Keys</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Example 1</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Relation: {SuperKeysExample1Json[0].relation}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>FD
                            Set: {SuperKeysExample1Json[0].fdSet}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl font-semibold my-1'}>Few of the Super Keys
                            for the given Relations:</h1>
                        <h1
                            className={'text-black text-end mx-8 text-xl  my-1'}>{SuperKeysExample1Json[0].superKey1}, {SuperKeysExample1Json[0].superKey2}, {SuperKeysExample1Json[0].superKey3}, {SuperKeysExample1Json[0].superKey4}, {SuperKeysExample1Json[0].superKey5}, {SuperKeysExample1Json[0].superKey6}</h1>
                        <hr className={'mt-10 h-0.5 rounded-lg bg-black'}/>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Example 2</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Relation: {SuperKeysExample2Json[0].relation}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>FD
                            Set: {SuperKeysExample2Json[0].fdSet}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl font-semibold my-1'}>Few of the Super Keys
                            for the given Relations:</h1>
                        <h1
                            className={'text-black text-end mx-8 text-xl  my-1'}>{SuperKeysExample2Json[0].superKey1}, {SuperKeysExample2Json[0].superKey2}, {SuperKeysExample2Json[0].superKey3}</h1>
                    </div>

                    <div
                        className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                        <h1 className={'text-black text-center text-3xl font-semibold'}>Candidate Keys</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>For the Example
                            1</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Relation: {SuperKeysExample1Json[0].relation}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>FD
                            Set: {SuperKeysExample1Json[0].fdSet}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl font-semibold my-1'}>The Candidate Keys for
                            the given Relations:</h1>
                        <h1
                            className={'text-black text-end mx-8 text-xl  my-1'}>{SuperKeysExample1Json[0].candidateKey1}</h1>
                        <hr className={'mt-10 h-0.5 rounded-lg bg-black'}/>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>For the Example
                            2</h1>
                        <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-6 mb-3'}>Relation: {SuperKeysExample2Json[0].relation}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>FD
                            Set: {SuperKeysExample2Json[0].fdSet}</h1>
                        <h1 className={'text-black text-start mx-8 text-xl font-semibold my-1'}>The Candidate Keys for
                            the given Relations:</h1>
                        <h1
                            className={'text-black text-end mx-8 text-xl  my-1'}>{SuperKeysExample2Json[0].candidateKey1}, {SuperKeysExample2Json[0].candidateKey2}, {SuperKeysExample2Json[0].candidateKey3}</h1>
                    </div>

                </div>

                <div className={'mb-5'}>
                    <h1 className={'w-screen bg-[#2f3749] py-1 text-left text-white font-semibold text-4xl'}>More Examples for Candidate Keys, using Direct Method</h1>
                    <div className={'grid grid-cols-2 gap-2 mr-10'}>

                        <div
                            className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-5">
                            <h1 className={'text-black text-center text-3xl font-semibold'}>Example 1</h1>
                            <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-12 mb-3'}>Relation: {goodCandidateKeysExample[0].relation}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>FD
                                Set: {goodCandidateKeysExample[0].fdset}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl font-semibold my-6'}>The Candidate
                                Keys
                                for the given Relations:</h1>
                            <h1
                                className={'text-black text-end mx-8 text-xl  my-6'}>{goodCandidateKeysExample[0].candidateKeys}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>The Prime/Key
                                Attributes: {goodCandidateKeysExample[0].primeattributes}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>The Non Key
                                Attributes: {goodCandidateKeysExample[0].nonkeyattributes}</h1>
                        </div>

                        <div
                            className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-5">
                            <h1 className={'text-black text-center text-3xl font-semibold'}>Example 2</h1>
                            <h1 className={'text-black text-start mx-8 text-2xl font-semibold mt-12 mb-3'}>Relation: {goodCandidateKeysExample[1].relation}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>FD
                                Set: {goodCandidateKeysExample[1].fdset}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl font-semibold my-6'}>The Candidate
                                Keys
                                for the given Relations:</h1>
                            <h1
                                className={'text-black text-end mx-8 text-xl  my-6'}>{goodCandidateKeysExample[1].candidateKeys}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>The Prime/Key
                                Attributes: {goodCandidateKeysExample[1].primeattributes}</h1>
                            <h1 className={'text-black text-start mx-8 text-xl my-6'}>The Non Key
                                Attributes: {goodCandidateKeysExample[1].nonkeyattributes}</h1>
                        </div>

                    </div>
                </div>

            </div>

            <WhatAreKeys show={showWhatKeys} onClose={handleClose1}/>
            <SomeSpecialKeys show={showSpecialKeys} onClose={handleClose2}/>
            <SuperKeys show={showSuperKeys} onClose={handleClose3}/>
            <ReadSuperKeys show={showReadOutSuperKeys} onClose={handleClose0}/>
            <SuperKeysExample show={showSuperKeysExample} onClose={handleClose4}/>
            <CandidateKeys show={showCandidateKeys} onClose={handleClose5}/>
            <WhatAreCandidateKeys show={showWhatareCandidateKeys} onClose={handleClose6}/>
            <CandidateKeysEasy show={showCandidateKeysEasy1} onClose={handleClose7}/>
            <CandidateKeysEasy2 show={showCandidateKeysEasy2} onClose={handleClose9}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation1} onClose={handleClose10}
                                      value={SuperKeysExample1Json[0].candidateKey1Explanation} />
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation2} onClose={handleClose11}
                                      value={SuperKeysExample1Json[0].candidateKey2Explanation} />
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation3} onClose={handleClose12}
                                      value={SuperKeysExample1Json[0].candidateKey3Explanation} />
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation4} onClose={handleClose13}
                                      value={SuperKeysExample1Json[0].candidateKey4Explanation} />
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation5} onClose={handleClose14}
                                      value={SuperKeysExample1Json[0].candidateKey5Explanation} />
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation6} onClose={handleClose15}
                                      value={SuperKeysExample1Json[0].candidateKey6Explanation} />
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation1} onClose={handleClose16}
                                      value={SuperKeysExample2Json[0].candidateKey1Explanation} />
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation2} onClose={handleClose17}
                                      value={SuperKeysExample2Json[0].candidateKey2Explanation} />
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation3} onClose={handleClose18}
                                      value={SuperKeysExample2Json[0].candidateKey3Explanation} />
            <WhatArePrimaryKeys show={showWhatarePrimaryKeys} onClose={handleClose19}/>
            <DirectWay show={showDirectWay} onClose={handleClose20}/>
            <GoldenMantra show={showGoldenMantra} onClose={handleClose21}/>
            <CandidateKeyUnderstand show={showCandidateKeyUnderstand} onClose={handleClose22}/>
            <PrimeKeyAttribute show={showPrimeKeyAttribute} onClose={handleClose23}/>

            <DirectMethodExplanation1 show={showDirectMethodExplanation1Example1} onClose={handleClose24} value={goodCandidateKeysExample[0].explanation1} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation2Example1} onClose={handleClose25} value={goodCandidateKeysExample[0].explanation2} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation3Example1} onClose={handleClose26} value={goodCandidateKeysExample[0].explanation3} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation4Example1} onClose={handleClose27} value={goodCandidateKeysExample[0].explanation4} />

            <DirectMethodExplanation2 show={showDirectMethodExplanation0Example2} onClose={handleClose28} value={goodCandidateKeysExample[1].explanation0} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation1Example2} onClose={handleClose29} value={goodCandidateKeysExample[1].explanation1} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation2Example2} onClose={handleClose30} value={goodCandidateKeysExample[1].explanation2} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation3Example2} onClose={handleClose31} value={goodCandidateKeysExample[1].explanation3} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation4Example2} onClose={handleClose32} value={goodCandidateKeysExample[1].explanation4} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation5Example2} onClose={handleClose33} value={goodCandidateKeysExample[1].explanation5} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation6Example2} onClose={handleClose34} value={goodCandidateKeysExample[1].explanation6} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation7Example2} onClose={handleClose35} value={goodCandidateKeysExample[1].explanation7} />
            <PracticeCandidateKeys show={showLetsPracticeKeys}/>

        </div>
    );
};

export default KeysTutorial;

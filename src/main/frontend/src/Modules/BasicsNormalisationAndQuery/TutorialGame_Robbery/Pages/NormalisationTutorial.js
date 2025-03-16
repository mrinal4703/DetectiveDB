import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {
    assisstantconclude,
    assisstantthinking,
    chief, detective, helperleft,
    helperpeekleft, helperpeekright,
    helperright
} from "../../../../Resources/Images/People";
import Typewriter from "typewriter-effect";
import {
    AppText,
    NormalisationExample1,
    NormalisationExample2,
    SuperKeysExample1Json, useBackgroundMusic, useVoiceSynthesis,
    WhatNormalisationData
} from "../../../../Constants/Texts";
import {useNavigate, Link} from "react-router-dom";
import {clicksound, ingame} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";
import {normalisationpracticepic} from "../../../../Resources/Images/Others";

const FinaleModule1 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.FinaleModule1;
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

const WhatisNormalisation = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhatisNormalisation;
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

const WhyNormalisation = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhyNormalisation;
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

const NormalForm1 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.NormalForm1;
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

const NormalForm2 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.NormalForm2;
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

const NormalForm3 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.NormalForm3;
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

const LetsDiscussNormalForm = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.Discuss;
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

const IndentifyingNormalForm = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
    const voiceMain = "Microsoft Mark";
    const position = "right";
    const img = helperpeekleft;

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
                <div className={`absolute top-0 ${position}-0`}>
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
                    className={`absolute h-auto w-[450px] top-44 ${position}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black`}>
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

const IndentifyingNormalFormExample = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
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
                <div className={`absolute top-0 ${position}-0`}>
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
                    className={`absolute h-auto w-[450px] top-44 ${position}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black`}>
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

const MovetoDecomposition = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.MoveToDecomposition;
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
            top: window.innerHeight, // Scroll down by the full height of the viewport
            behavior: "smooth" // Smooth scrolling effect
        });
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

const NFDecomposition1 = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
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
                    className={`absolute min-h-[120px] w-[400px] bottom-28 ${position}-28 text-lg mr-28 text-black p-3 bg-white my-6 rounded-2xl shadow-inner border-2 border-black`}>
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

const NFDecomposition2 = ({show, onClose, value}) => {
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
                        className="lg15.6:h-[24rem] lg15.6:w-[24rem] h-80 w-80 object-contain rounded-xl"
                        alt="Assistant"
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    />
                </div>
                <div
                    className={`absolute min-h-[120px] w-[400px] bottom-28 ${position}-28 ml-28 text-lg text-black p-3 bg-white my-6 rounded-2xl shadow-inner border-2 border-black`}>
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

const PracticeNormalisation = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const texts = AppText.FinalTest;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/TutorialNFPractice");
        window.scrollTo(0, 0);
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
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const NormalisationTutorial = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showWhatNormalisation, setShowWhatNormalisation] = useState(false);
    const [showWhatisNormalisation, setWhatisNormalisation] = useState(false);
    const [showWhyNormalisation, setWhyNormalisation] = useState(false);

    const [showNormalForm1, setShowNormalForm1] = useState(false);
    const [showNormalForm2, setShowNormalForm2] = useState(false);
    const [showNormalForm3, setShowNormalForm3] = useState(false);
    const [showDiscussNormalForm, setShowDiscussNormalForm] = useState(false);

    const [showIdentify1NormalForm, setShowIdentify1NormalForm] = useState(false);
    const [showIdentify2NormalFormHow, setShowIdentify2NormalFormHow] = useState(false);
    const [showIdentify2NormalFormExplanation, setShowIdentify2NormalFormExplanation] = useState(false);

    const [showIdentify3NormalFormHow, setShowIdentify3NormalFormHow] = useState(false);
    const [showIdentify3NormalFormExplanation1, setShowIdentify3NormalFormExplanation1] = useState(false);
    const [showIdentify3NormalFormExplanation2, setShowIdentify3NormalFormExplanation2] = useState(false);

    const [showIdentifyBCNormalFormHow, setShowIdentifyBCNormalFormHow] = useState(false);
    const [showIdentifyBCNormalFormExplanation1, setShowIdentifyBCNormalFormExplanation1] = useState(false);
    const [showIdentifyBCNormalFormExplanation2, setShowIdentifyBCNormalFormExplanation2] = useState(false);

    const [showNormalForm2Identify, setShowNormalForm2Identify] = useState(false);
    const [showNormalForm3Identify, setShowNormalForm3Identify] = useState(false);
    const [showNormalFormBCIdentify, setShowNormalFormBCIdentify] = useState(false);

    const [showMoveTODecomp, setShowMoveTODecomp] = useState(false);

    const [showDecompose2NormalForm, setShowDecompose2NormalForm] = useState(false);
    const [showDecompose3NormalForm1, setShowDecompose3NormalForm1] = useState(false);
    const [showDecompose3NormalForm2, setShowDecompose3NormalForm2] = useState(false);
    const [showDecomposeBCNormalForm1, setShowDecomposeBCNormalForm1] = useState(false);

    const [showDecomposeBCNormalForm2, setShowDecomposeBCNormalForm2] = useState(false);
    const [showDecomposeBCNormalForm3, setShowDecomposeBCNormalForm3] = useState(false);

    const [showFinalTest, setShowFinalTest] = useState(false)

    // useBackgroundMusic(ingame);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowWhatNormalisation(true), 1500);
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // window.location.reload();
    //         setShowDiv1(false);
    //         setTimeout(() => setShowWhatNormalisation(true), 500);
    //     }, 1500);
    //
    //     return () => clearTimeout(timer); // Cleanup timeout on unmount
    // }, []);

    const handleClose1 = () => {
        setShowWhatNormalisation(false);
        setWhatisNormalisation(true);
    };

    const handleClose2 = () => {
        setWhatisNormalisation(false);
        setWhyNormalisation(true);
    };

    const handleClose3 = () => {
        setWhyNormalisation(false);
        setShowNormalForm1(true);
    };

    const handleClose4 = () => {
        setShowNormalForm1(false);
        setShowNormalForm2(true);
    };

    const handleClose5 = () => {
        setShowNormalForm2(false);
        setShowNormalForm3(true);
    };

    const handleClose6 = () => {
        setShowNormalForm3(false);
        setShowDiscussNormalForm(true);
    };

    const handleClose7 = () => {
        setShowDiscussNormalForm(false);
        setTimeout(() => setShowIdentify1NormalForm(true), 1500);
    };

    const handleClose8 = () => {
        setShowIdentify1NormalForm(false);
        setShowIdentify2NormalFormHow(true);
    };

    const handleClose9 = () => {
        setShowIdentify2NormalFormHow(false);
        setShowIdentify2NormalFormExplanation(true);
    };

    const handleClose10 = () => {
        setShowIdentify2NormalFormExplanation(false);
        setShowIdentify3NormalFormHow(true);
    };

    const handleClose11 = () => {
        setShowIdentify3NormalFormHow(false);
        setShowIdentify3NormalFormExplanation1(true);
    };

    const handleClose12 = () => {
        setShowIdentify3NormalFormExplanation1(false);
        setShowIdentify3NormalFormExplanation2(true);
    };

    const handleClose13 = () => {
        setShowIdentify3NormalFormExplanation2(false);
        setShowIdentifyBCNormalFormHow(true);
    };

    const handleClose14 = () => {
        setShowIdentifyBCNormalFormHow(false);
        setShowIdentifyBCNormalFormExplanation1(true);
    };

    const handleClose15 = () => {
        setShowIdentifyBCNormalFormExplanation1(false);
        setShowIdentifyBCNormalFormExplanation2(true);
    };

    const handleClose16 = () => {
        setShowIdentifyBCNormalFormExplanation2(false);
        setTimeout(() => setShowNormalForm2Identify(true), 1500);
    };

    const handleClose17 = () => {
        setShowNormalForm2Identify(false);
        setShowNormalForm3Identify(true);
    };

    const handleClose18 = () => {
        setShowNormalForm3Identify(false);
        setShowNormalFormBCIdentify(true);
    };

    const handleClose19 = () => {
        setShowNormalFormBCIdentify(false);
        setTimeout(() => setShowMoveTODecomp(true), 2000);
    };

    const handleClose20 = () => {
        setShowMoveTODecomp(false);
        setTimeout(() => setShowDecompose2NormalForm(true), 2000);
    }

    const handleClose21 = () => {
        setShowDecompose2NormalForm(false);
        setShowDecompose3NormalForm1(true);
    }

    const handleClose22 = () => {
        setShowDecompose3NormalForm1(false);
        setShowDecompose3NormalForm2(true);
    }

    const handleClose23 = () => {
        setShowDecompose3NormalForm2(false);
        setShowDecomposeBCNormalForm1(true);
    }

    const handleClose24 = () => {
        setShowDecomposeBCNormalForm1(false);
        setShowDecomposeBCNormalForm2(true);
    }

    const handleClose25 = () => {
        setShowDecomposeBCNormalForm2(false);
        setShowDecomposeBCNormalForm3(true);
    }

    const handleClose26 = () => {
        setShowDecomposeBCNormalForm3(false);
        setShowFinalTest(true);
    }

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
                            <Link to={'/TutorialKeysPractice'}>
                                <button
                                    onClick={() => {
                                        playClickSound();
                                    }}
                                    className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                >
                                    Redo Keys Practice
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={normalisationpracticepic}
                                alt="Detective"
                                className="flex h-[600px] w-[600px]  my-auto rounded-3xl shadow-2xl"
                            />
                            <h1 className={'absolute opacity-90 top-8 w-[426.5px] h-[80px] text-4xl text-center items-center align-middle justify-center flex bg-white text-[#343237]'}>Introduction
                                to Normalisation in DBMS</h1>
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
                        <NavBarInGame pageName={"NormalisationTutorial"}/>
                        <div className={'w-screen bg-[#2f3749] py-0.5'}>
                            <h1 className="text-left text-white font-semibold lg15.6:py-2 py-0 lg15.6:text-5xl text-4xl mb-3">Normalisation,
                                Identification
                                &
                                Decomposition</h1>
                        </div>
                        <div className={'flex'}>
                            <div
                                className="lg15.6:w-[725px] w-[600px] justify-center mx-5 lg15.6:h-[680px] h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                                <h1 className={'text-black text-start mx-8 lg15.6:text-2xl text-xl font-semibold my-2'}>Possible Non
                                    Trivial
                                    FD
                                    which
                                    create Redundancy</h1>
                                <div className="grid grid-rows-3 grid-cols-1 gap-2 mt-3">
                                    {WhatNormalisationData.filter(({id}) => id >= 2).map(({id, image, form}) => (
                                        <div key={id} className="flex flex-col items-center">
                                            <img src={image} className="lg15.6:h-40 h-32 object-contain" alt={form}/>
                                            <p className="lg15.6:text-xl text-lg font-semibold text-gray-700">{form}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="lg15.6:w-[725px] w-[600px] justify-center mx-5 lg15.6:h-[680px] h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                                <h1 className={'text-black text-start mx-8 lg15.6:text-4xl text-3xl font-semibold my-6'}>Example for
                                    Normal Form Identification</h1>
                                <h1 className={'text-black text-start mx-8 lg15.6:text-4xl text-3xl mt-6 mb-3'}>Relation: {NormalisationExample1.Relation}</h1>
                                <h1 className={'text-black text-end mx-8 lg15.6:text-2xl text-xl my-1'}>FD
                                    Set: {NormalisationExample1.fdSet}</h1>
                                <h1 className={'text-gray-400 text-start mx-8 mt-4 lg15.6:text-3xl text-2xl my-1'}>1NF</h1>
                                <h1 className={'text-black text-start mx-8 lg15.6:text-2xl text-xl my-1'}>Bigger Relation, always in
                                    1NF.</h1>
                                <h1 className={'text-gray-400 text-start mx-8 mt-4 lg15.6:text-3xl text-2xl my-1'}>2NF Violating
                                    FDs</h1>
                                <h1 className={'text-black text-start mx-8 lg15.6:text-2xl text-xl my-1'}>{NormalisationExample1.Nf2Violationg}</h1>
                                <h1 className={'text-gray-400 text-start mx-8 mt-4 lg15.6:text-3xl text-2xl my-1'}>3NF Violating
                                    FDs</h1>
                                <h1 className={'text-black text-start mx-8 lg15.6:text-2xl text-xl my-1'}>{NormalisationExample1.Nf3Violationg}</h1>
                                <h1 className={'text-gray-400 text-start mx-8 mt-4 lg15.6:text-3xl text-2xl my-1'}>BCNF</h1>
                                <h1 className={'text-black text-start mx-8 lg15.6:text-2xl text-xl my-1'}>{NormalisationExample1.BCNFDecomposition}</h1>
                            </div>
                        </div>

                        <div className={'w-screen bg-[#2f3749] py-2 mb-3'}>
                            <h1 className="text-left text-white font-semibold text-3xl">Decomposition of Relations into
                                Normal
                                Forms</h1>
                        </div>
                        <div className={'flex'}>
                            <div
                                className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-1">
                                <h1 className={'text-black text-start mx-8 text-3xl font-semibold my-3'}>Example for
                                    Decomposition into Normal Forms</h1>
                                <h1 className={'text-black text-start mx-8 text-3xl mt-2 mb-3'}>Relation: {NormalisationExample1.Relation}</h1>
                                <div className={'flex justify-between'}>
                                    <h1 className={'text-black text-start mx-2 text-xl my-1'}>Candidate
                                        Key: {NormalisationExample1.CandidateKey}</h1>
                                    <h1 className={'text-black text-end mx-2 text-xl my-1'}>FD
                                        Set: {NormalisationExample1.fdSet}</h1>
                                </div>
                                <div className={'grid grid-cols-2 grid-rows-2'}>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 text-2xl my-1'}>2NF Violating
                                            FDs</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf2Violationg}</h1>
                                    </div>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 text-2xl my-1'}>3NF Violating
                                            FDs</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf3Violationg}</h1>
                                    </div>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 -mt-1 text-2xl my-1'}>2NF
                                            Violating
                                            FD Closures</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.ClosureA}, {NormalisationExample1.ClosureB}</h1>
                                    </div>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 -mt-1 text-2xl my-1'}>3NF
                                            Violating
                                            FD Closures</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.ClosureD}, {NormalisationExample1.ClosureF}</h1>
                                    </div>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 mt-5 text-2xl my-1'}>2NF
                                            Decomposed
                                            Relations</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf2Decomposition}</h1>
                                    </div>
                                    <div>
                                        <h1 className={'text-gray-400 text-start mx-8 mt-5 text-2xl my-1'}>3NF
                                            Decomposed
                                            Relations</h1>
                                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf3Decomposition}</h1>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                                <h1 className={'text-gray-400 text-start mx-8 mt-4 text-2xl my-1'}>BCNF</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.BCNFDecomposition}</h1>
                                <hr className={'my-7  mx-auto w-5/6 h-0.5 rounded-lg bg-black'}/>
                                <h1 className={'text-black text-start mx-8 text-3xl font-semibold my-4'}>Example for
                                    BCNF
                                    Decomposition</h1>
                                <h1 className={'text-black text-start mx-8 text-3xl mt-4 mb-3'}>Relation: {NormalisationExample2.Relation}</h1>
                                <div className={'flex justify-between'}>
                                    <h1 className={'text-black text-start mx-2 text-xl my-1'}>Candidate
                                        Key: {NormalisationExample2.CandidateKey}</h1>
                                    <h1 className={'text-black text-end mx-2 text-xl my-1'}>FD
                                        Set: {NormalisationExample2.fdSet}</h1>
                                </div>
                                <h1 className={'text-gray-400 text-start mx-8 mt-2 text-2xl my-1'}>BCNF Violating
                                    FDs</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample2.BcnfViolation}</h1>
                                <h1 className={'text-gray-400 text-start mt-5 mx-8 text-2xl my-1'}>BCNF Violating
                                    FD Closures</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample2.ClosureD}</h1>
                                <h1 className={'text-gray-400 text-start mx-8 mt-5 text-2xl my-1'}>BCNF Decomposed
                                    Relations</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample2.BcnfDecomposition}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FinaleModule1 show={showWhatNormalisation} onClose={handleClose1}/>
            <WhatisNormalisation show={showWhatisNormalisation} onClose={handleClose2}/>
            <WhyNormalisation show={showWhyNormalisation} onClose={handleClose3}/>
            <NormalForm1 show={showNormalForm1} onClose={handleClose4}/>
            <NormalForm2 show={showNormalForm2} onClose={handleClose5}/>
            <NormalForm3 show={showNormalForm3} onClose={handleClose6}/>
            <LetsDiscussNormalForm show={showDiscussNormalForm} onClose={handleClose7}/>
            <IndentifyingNormalForm show={showIdentify1NormalForm} onClose={handleClose8}
                                    value={WhatNormalisationData[0].explanation}/>
            <IndentifyingNormalForm show={showIdentify2NormalFormHow} onClose={handleClose9}
                                    value={WhatNormalisationData[1].how}/>
            <IndentifyingNormalForm show={showIdentify2NormalFormExplanation} onClose={handleClose10}
                                    value={WhatNormalisationData[1].explanation}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormHow} onClose={handleClose11}
                                    value={WhatNormalisationData[2].how}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormExplanation1} onClose={handleClose12}
                                    value={WhatNormalisationData[2].explanation1}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormExplanation2} onClose={handleClose13}
                                    value={WhatNormalisationData[2].explanation2}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormHow} onClose={handleClose14}
                                    value={WhatNormalisationData[3].how}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormExplanation1} onClose={handleClose15}
                                    value={WhatNormalisationData[3].explanation1}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormExplanation2} onClose={handleClose16}
                                    value={WhatNormalisationData[3].explanation2}/>
            <IndentifyingNormalFormExample show={showNormalForm2Identify} onClose={handleClose17}
                                           value={NormalisationExample1.Nf2Identification}/>
            <IndentifyingNormalFormExample show={showNormalForm3Identify} onClose={handleClose18}
                                           value={NormalisationExample1.Nf3Identification}/>
            <IndentifyingNormalFormExample show={showNormalFormBCIdentify} onClose={handleClose19}
                                           value={NormalisationExample1.BCNFDecomposition}/>
            <MovetoDecomposition show={showMoveTODecomp} onClose={handleClose20}/>
            <NFDecomposition1 show={showDecompose2NormalForm} onClose={handleClose21}
                              value={NormalisationExample1.Nf2DecompositionExplanation}/>
            <NFDecomposition1 show={showDecompose3NormalForm1} onClose={handleClose22}
                              value={NormalisationExample1.Nf3DecompositionExplanation1}/>
            <NFDecomposition1 show={showDecompose3NormalForm2} onClose={handleClose23}
                              value={NormalisationExample1.Nf3DecompositionExplanation2}/>
            <NFDecomposition1 show={showDecomposeBCNormalForm1} onClose={handleClose24}
                              value={NormalisationExample1.BCNFDecompositionExplanation}/>
            <NFDecomposition2 show={showDecomposeBCNormalForm2} onClose={handleClose25}
                              value={NormalisationExample2.BcnfDecompositionExplanation1}/>
            <NFDecomposition2 show={showDecomposeBCNormalForm3} onClose={handleClose26}
                              value={NormalisationExample2.BcnfDecompositionExplanation2}/>
            <PracticeNormalisation show={showFinalTest}/>
        </div>
    );
};

export default NormalisationTutorial;
import React, {useEffect, useRef, useState} from "react";
import {assisstantconclude, assisstantthinking, chief, detective} from "../../../../Resources/Images/People";
import {motion} from "framer-motion";
import {AppText, FirstTables, FirstTables1} from "../../../../Constants/Texts";
import {useNavigate} from "react-router-dom";
import {clicksound} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const Welcome = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const [showButton, setShowButton] = useState(false);

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
                // Retry after a small delay
                setTimeout(loadVoices, 100);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const steps = [
        {
            text: AppText.IntroText1,
            voiceType: "female",
            image: assisstantconclude,
            align: "left",
        },
        {
            text: AppText.IntroText2,
            voiceType: "boss",
            image: chief,
            align: "right",
        },
    ];

    useEffect(() => {
        if (!show || !voicesLoaded || currentStep >= steps.length) return;

        const {text, voiceType} = steps[currentStep];
        setDisplayText(""); // Reset text before new speech starts

        let selectedVoice = voices.find(v => v.name.includes("Microsoft Zira")) || voices[0];
        if (voiceType === "boss") {
            selectedVoice = voices.find(v => v.name.includes("Microsoft David")) || voices[0];
        }
        if (!selectedVoice) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;

        const words = text.split(" ");
        let wordIndex = -1; // Fixed index issue

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                wordIndex++;
                setDisplayText(prev => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
            }
        };

        utterance.onend = () => {
            if (currentStep === steps.length - 1) {
                setShowButton(true);
            } else {
                setTimeout(() => setCurrentStep(prev => prev + 1), 1000);
            }
        };

        window.speechSynthesis.speak(utterance);
    }, [show, currentStep, voicesLoaded]);

    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    return (
        show && (
            <motion.div
                className="fixed w-screen inset-0 z-50 bg-black/50 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <div className={`absolute bottom-0 ${steps[currentStep].align}-0`}>
                    <motion.img
                        src={steps[currentStep].image}
                        className="h-80 w-80 object-contain rounded-xl"
                        alt="Character"
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    />
                    <div
                        className={`absolute bottom-28 ${steps[currentStep].align}-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-[540px]`}>
                        <div>
                            {displayText}
                        </div>
                        <div>
                            {showButton && (
                                <button
                                    className="mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                    onClick={handleClick}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    );
};

const Welcome12 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

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
        if (!isSpeechSynthesisSupported || !show || !AppText.WelcomeText || !voicesLoaded) return;

        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(AppText.WelcomeText);
        let selectedVoice = voices.find((voice) => voice.name.includes("Microsoft Zira")) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = AppText.WelcomeText.split(" ");
        let wordIndex = -1; // Start at -1 to handle the first word correctly

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length - 1) {
                wordIndex++; // Increment wordIndex before updating the display text
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
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <motion.img
                    src={assisstantconclude}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
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

const Welcome1 = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    // Load voices properly with retries
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
        if (!show || !AppText.WelcomeText || !voicesLoaded) return;

        // Cancel any ongoing speech before starting a new one
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(AppText.WelcomeText);
        let selectedVoice = voices.find((voice) => voice.name.includes("Microsoft Zira")) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = AppText.WelcomeText.split(" ");
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
                <motion.img
                    src={assisstantconclude}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
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

const KnowMore = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.SecondText;
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
                <motion.img
                    src={img}
                    className={`h-80 w-80 absolute bottom-0 ${position}-0 object-contain rounded-xl`}
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

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

const TableContents = ({show, onClose}) => {
    const [highlightRHouse, setHighlightRHouse] = useState(false);
    const [highlightTable, setHighlightTable] = useState(false);
    const [highlightHeader, setHighlightHeader] = useState(false);
    const [tableVisible, setTableVisible] = useState(false);
    const [theadVisible, setTheadVisible] = useState(false);
    const [fdHighlightVisible, setHighlightFdVisible] = useState(false);
    const [fdVisible, setFdVisible] = useState(false);
    const [voices, setVoices] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [displayText, setDisplayText] = useState('');

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Find the female voice
    const femaleVoice = voices.find(voice => voice.name.includes('Microsoft Zira')) || voices[0]; // Fallback to the first available voice

    // Steps for speech and transitions
    const steps = [
        {
            text: AppText.RelationName,
            action: () => {
                setHighlightRHouse(true);
                setHighlightTable(false);
                setHighlightHeader(false);
                setHighlightFdVisible(false);
                setTableVisible(false);
                setTheadVisible(false);
                setFdVisible(false);
            },
        },
        {
            text: AppText.Relation,
            action: () => {
                setHighlightRHouse(false);
                setHighlightTable(true);
                setTableVisible(true);
                setHighlightHeader(false);
                setHighlightFdVisible(false);
                setTheadVisible(false);
                setFdVisible(false);
            },
        },
        {
            text: AppText.Attributes,
            action: () => {
                setHighlightRHouse(false);
                setHighlightTable(false);
                setTableVisible(false);
                setHighlightHeader(true);
                setTheadVisible(true);
                setHighlightFdVisible(false);
                setFdVisible(false);
            },
        },
        {
            text: AppText.FDs,
            action: () => {
                setHighlightRHouse(false);
                setHighlightTable(false);
                setTableVisible(false);
                setHighlightHeader(false);
                setTheadVisible(false);
                setHighlightFdVisible(true);
                setFdVisible(true);
            },
        },
    ];

    // Handle speech and transitions
    useEffect(() => {
        if (show && femaleVoice && currentStep < steps.length) {
            const {text, action} = steps[currentStep];
            setDisplayText(''); // Reset display text
            action(); // Perform the action for the current step

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = femaleVoice;

            const words = text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                if (event.name === 'word' && wordIndex < words.length) {
                    setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                    wordIndex++;
                }
            };

            utterance.onend = () => {
                setCurrentStep((prev) => prev + 1); // Move to the next step
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose(); // Close the component when all steps are done
        }
    }, [show, currentStep, femaleVoice]);

    // Cleanup speech synthesis on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, ease: 'easeOut'}}
        >
            <div className="absolute flex flex-col justify-center items-center w-full">
                {/* Step 1: R(House) */}
                {highlightRHouse && (
                    <div className="relative flex flex-col -top-[118px] justify-center items-center min-h-screen">
                        <h1
                            className={`font-bold bg-[#a2e1e1] w-max text-center text-black text-3xl border-[6px] border-blue-500`}
                        >
                            R(House)
                        </h1>
                        <div
                            className="text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                        >
                            {displayText}
                        </div>
                    </div>
                )}

                {/* Step 2: Table */}
                {tableVisible && (
                    <div className="relative flex flex-col top-5 justify-center items-center min-h-screen">
                        <div
                            className="text-lg text-black p-3 mx-20 bg-white rounded-2xl shadow-inner border-2 border-black"
                        >
                            {displayText}
                        </div>
                        <div
                            className={`mx-[34px] my-3 border-[6px] border-blue-500`}
                        >
                            <FirstTables1/>
                        </div>
                    </div>
                )}

                {/* Step 3: Table Header */}
                {theadVisible && (
                    <div className="relative flex flex-col -top-[140px] justify-center items-center min-h-screen">
                        <div
                            className="text-lg text-black p-3 mx-20 bg-white rounded-2xl shadow-inner border-2 border-black"
                        >
                            {displayText}
                        </div>
                        <table
                            className={`table-auto mx-9 my-3 items-center text-center justify-center border-collapse rounded-3xl border-2 border-black border-[6px] border-blue-500`}
                        >
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-black px-4 py-2 text-left">Person ID</th>
                                <th className="border border-black px-4 py-2 text-left">Location</th>
                                <th className="border border-black px-4 py-2 text-left">Action</th>
                                <th className="border border-black px-4 py-2 text-left">Room Type</th>
                                <th className="border border-black px-4 py-2 text-left">Room Contents</th>
                                <th className="border border-black px-4 py-2 text-left">Camera ID</th>
                                <th className="border border-black px-4 py-2 text-left">Camera Status</th>
                                <th className="border border-black px-4 py-2 text-left">Camera Footage</th>
                                <th className="border border-black px-4 py-2 text-left">Time</th>
                                <th className="border border-black px-4 py-2 text-left">Witness Statement</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                )}

                {/* Step 4: Functional Dependencies */}
                {fdVisible && (
                    <div className="relative flex flex-col top-[226px] justify-center items-center min-h-screen">
                        <div
                            className="text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                        >
                            {displayText}
                        </div>
                        <h1
                            className={`text-left bg-[#a2e1e1] mx-[22px] text-black font-semibold text-lg border-[6px] border-blue-500`}
                        >
                            {AppText.GivenFD}
                        </h1>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const FDs = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhatFDs;
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

const FDClosure = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.HowToFD;
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

const WhatFDclosures = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhatFDClosures;
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

const HowFDclosures = ({show, onClose, value, scrollornot}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = value;
    const voiceMain = "Microsoft Zira";
    const position = "left";
    const img = assisstantthinking;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const navigate = useNavigate();

    const handleClick = () => {
        playClickSound();
        if (scrollornot === 0) {
            onClose();
        } else if (scrollornot === 1) {
            navigate("/TutorialFDPractice"); // Correct way to navigate
            window.scrollTo(0, 0);
        }
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
                    className="absolute w-[380px] min-h-[200px] -bottom-2 -right-16 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
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

const TutorialGame = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showKnowMore, setShowKnowMore] = useState(false);
    const [showTableContents, setShowTableContents] = useState(false);
    const [showFD, setShowFD] = useState(false);
    const [showLearnFD, setShowLearnFD] = useState(false);
    const [showWhatFDC, setShowWhatFDC] = useState(false);
    const [showHowFDC1, setShowHowFDC1] = useState(false);
    const [showHowFDC2, setShowHowFDC2] = useState(false);
    const [showHowFDC3, setShowHowFDC3] = useState(false);
    const [showHowFDC4, setShowHowFDC4] = useState(false);
    const [showHowFDC5, setShowHowFDC5] = useState(false);
    const triggerRef = useRef(null);


    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowDiv1(false);
            setTimeout(() => setShowIntro(true), 500);
        }, 1500);

        return () => clearTimeout(timer1);
    }, []);

    const handleClose0 = () => {
        setShowIntro(false);
        setShowWelcome(true);
    };

    const handleClose = () => {
        setShowWelcome(false);
        setShowKnowMore(true);
    };

    const handleClose1 = () => {
        setShowKnowMore(false);
        setTimeout(() => setShowTableContents(true), 1000);
    };

    const handleClose2 = () => {
        setShowTableContents(false);
        setShowFD(true);
    };

    const handleClose3 = () => {
        setShowFD(false);
        setTimeout(() => setShowLearnFD(true), 2000);
    }

    const handleClose4 = () => {
        setShowLearnFD(false);
        setShowWhatFDC(true);
    }

    const handleClose5 = () => {
        setShowWhatFDC(false);
        setTimeout(() => setShowHowFDC1(true), 2000);
    }

    const handleClose6 = () => {
        setShowHowFDC1(false);
        setShowHowFDC2(true);
    }

    const handleClose7 = () => {
        setShowHowFDC2(false);
        setShowHowFDC3(true);
    }

    const handleClose8 = () => {
        setShowHowFDC3(false);
        setShowHowFDC4(true);
    }

    const handleClose9 = () => {
        setShowHowFDC4(false);
        setShowHowFDC5(true);
    }

    const handleClose10 = () => {
        setShowHowFDC5(false);
    }


    return (
        <div>
            {showDiv1 ? (
                <div className="flex flex-col justify-center items-center bg-[#445c63] h-screen">
                    <motion.img
                        src={detective}
                        alt="Detective"
                        className="h-screen rounded-full"
                        initial={{scale: 0.1}}
                        animate={{scale: 0.8}}
                        transition={{duration: 1.5, ease: "easeInOut"}}
                    />
                </div>
            ) : (
                <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                    <NavBarInGame pageName={"TutorialGame"}/>
                    <h1 className="w-screen bg-[#2f3749] text-left text-white font-bold lg15.6:text-7xl text-5xl">Case 1: ROBBERY</h1>
                    <br/>
                    <h1 className="text-left lg15.6:py-2.5 py-0 text-black font-semibold lg15.6:text-3xl text-2xl">
                        Module 1: Basics and Normalisation
                    </h1>
                    <br/>
                    <h1 className={'text-center text-black font-bold lg15.6:text-4xl text-3xl'}>R(House)</h1>
                    <div className={'flex mx-auto'}>
                        <FirstTables/>
                    </div>
                    <div className={'text-left mx-7 text-black font-semibold lg15.6:text-2xl text-lg'}>{AppText.GivenFD}</div>

                    <div className={'mt-1 mb-2'}>
                        <h1 className={'w-screen bg-[#2f3749] py-1.5 text-left text-white font-semibold lg15.6:text-6xl text-4xl mb-4'}>FD
                            Closure (Functional
                            Dependency Closure)</h1>
                        <h1 className={'text-black lg15.6:py-1.5 py-0 lg15.6:text-3xl text-2xl'}>Example: {AppText.ExampleRelation}</h1>
                        <h1 className={'text-black lg15.6:py-1.5 py-0 lg15.6:text-3xl text-2xl'}>The Given FDs are {AppText.ExampleFDs}</h1>
                        {/*h-[416px]*/}
                        <div
                            className="p-4 items-end text-3xl text-right border-black border-4 my-4 mx-auto w-[832px] h-auto bg-[#badcdc] rounded-lg flex flex-col justify-center">
                            <table className="table-fixed mx-auto border-separate border-spacing-10">
                                <tbody>
                                <tr>
                                    <td>{AppText.ABFDc}</td>
                                </tr>
                                <tr>
                                    <td>{AppText.BFDc}</td>
                                </tr>
                                <tr>
                                    <td>{AppText.DFDc}</td>
                                </tr>
                                <tr>
                                    <td>{AppText.CFDc}</td>
                                </tr>
                                <tr>
                                    <td>{AppText.AFDc}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <Welcome show={showIntro} onClose={handleClose0}/>
            <Welcome1 show={showWelcome} onClose={handleClose}/>
            <KnowMore show={showKnowMore} onClose={handleClose1}/>
            {showTableContents && <TableContents show={showTableContents} onClose={handleClose2}/>}
            <FDs show={showFD} onClose={handleClose3}/>
            <FDClosure show={showLearnFD} onClose={handleClose4}/>
            <WhatFDclosures show={showWhatFDC} onClose={handleClose5}/>
            <HowFDclosures show={showHowFDC1} onClose={handleClose6} value={AppText.ABFDcExplanation} scrollornot={0}/>
            <HowFDclosures show={showHowFDC2} onClose={handleClose7} value={AppText.BFDcExplanation} scrollornot={0}/>
            <HowFDclosures show={showHowFDC3} onClose={handleClose8} value={AppText.AFDcExplanation} scrollornot={0}/>
            <HowFDclosures show={showHowFDC4} onClose={handleClose9} value={AppText.CFdcExplanation} scrollornot={0}/>
            <HowFDclosures show={showHowFDC5} onClose={handleClose10} value={AppText.DFDcExplanation} scrollornot={1}/>
        </div>
    );
};

export default TutorialGame;

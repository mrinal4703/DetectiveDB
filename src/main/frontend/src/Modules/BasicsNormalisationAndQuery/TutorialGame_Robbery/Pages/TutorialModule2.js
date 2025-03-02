import React, {useEffect, useState} from 'react';
import axios from "axios";
import {username} from "../../../../Constants/Texts/constants";
import {AppText} from "../../../../Constants/Texts";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {assisstantconclude, assisstantthinking, chief, helperleft} from "../../../../Resources/Images/People";
import {
    andsql, avgsql, countsql,
    distinctsql,
    groupbysql, havingsql, maxminsql,
    notsql,
    orderbysql,
    orsql,
    selectsql, sqlpracticepic, sumsql,
    wheresql
} from "../../../../Resources/Images/Others";
import NavBarInGame from "../NavBarInGame";
import {Link, useNavigate} from "react-router-dom";

const IntroductiontoQueryLang = ({show, onClose, value}) => {
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

const ImportantToRemember = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.ImportantToRemember;
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

const SQLContents1 = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [isPreSpeaking, setIsPreSpeaking] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: selectsql,
            text: AppText.SelectSQL,
            position: 'left',
            initialScale: 0.616,
            initialX: 0,
            initialY: 100,
            finalX: 0,
            finalY: 0
        },
        {
            image: wheresql,
            text: AppText.WhereSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: orderbysql,
            text: AppText.OrderBySQL,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: andsql,
            text: AppText.AndSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: orsql,
            text: AppText.OrSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
    ];

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

    const juniorVoice = voices.find(voice => voice.name.includes('Microsoft Mark')) || voices[0];

    useEffect(() => {
        if (show && juniorVoice && isPreSpeaking) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(AppText.SQLImportantCommandsExplanation);
            utterance.voice = juniorVoice;
            utterance.onend = () => {
                setIsPreSpeaking(false);
                setCurrentStep(0);
            };

            window.speechSynthesis.speak(utterance);
        }
    }, [show, juniorVoice, isPreSpeaking]);

    useEffect(() => {
        if (show && juniorVoice && !isPreSpeaking && currentStep < steps.length) {
            const { text } = steps[currentStep];
            setDisplayText('');
            setIsTyping(true);

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = juniorVoice;

            const words = text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                if (event.name === 'word' && wordIndex < words.length - 1) {
                    wordIndex++;
                    setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                }
            };

            utterance.onend = () => {
                setIsTyping(false);
                setCurrentStep((prev) => prev + 1); // Move to the next step
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            window.scrollBy({
                top: window.innerHeight, // Scroll down by the full height of the viewport
                behavior: "smooth" // Smooth scrolling effect
            });
            onClose();
        }
    }, [show, currentStep, juniorVoice, isPreSpeaking]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    if (!show || isPreSpeaking) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'easeOut'}}>
            <div className="absolute flex flex-col justify-center items-center w-full">

                {/* First Image (Bigger Initial Size) */}
                {currentStep === 0 && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            {/* Image (Larger) */}
                            <div>
                                <motion.img src={selectsql} alt="Detective"
                                            className="h-screen border-[4px] border-black"
                                            initial={{scale: 0.616, y: 100}}
                                            animate={{scale: 0.8, y: 0}}
                                            transition={{duration: 1, ease: "easeInOut"}}/>
                            </div>
                            {/* Typewriter Text */}
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Other Images (Now Moving Properly) */}
                {currentStep > 0 && currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">

                            {/* Typewriter Text */}
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>

                            {/* Image (Fixed Movement Transition) */}
                            <motion.img src={steps[currentStep].image} alt="Detective"
                                        className="h-screen border-[4px] border-black"
                                        initial={{
                                            scale: steps[currentStep].initialScale,
                                            x: steps[currentStep].initialX,
                                            y: steps[currentStep].initialY,
                                        }}
                                        animate={{
                                            scale: 0.8,
                                            x: steps[currentStep].finalX,
                                            y: steps[currentStep].finalY,
                                        }}
                                        transition={{duration: 1, ease: "easeInOut"}}/>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const SQLContents2 = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: distinctsql,
            text: AppText.DistinctSQL,
            position: 'left',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: notsql,
            text: AppText.NotSQL,
            position: 'left',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: groupbysql,
            text: AppText.GroupBySQL,
            position: 'left',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: havingsql,
            text: AppText.HavingSQL,
            position: 'left',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
    ];

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

    const juniorVoice = voices.find(voice => voice.name.includes('Microsoft Mark')) || voices[0];

    useEffect(() => {
        if (show && juniorVoice && currentStep < steps.length) {
            const { text } = steps[currentStep];
            setDisplayText('');

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = juniorVoice;

            const words = text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                if (event.name === 'word' && wordIndex < words.length - 1) {
                    wordIndex++;
                    setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                }
            };

            utterance.onend = () => {
                setCurrentStep((prev) => prev + 1); // Move to the next step
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose(); // Close the component when all steps are done
        }
    }, [show, currentStep, juniorVoice]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel(); // Cleanup speech synthesis on unmount
        };
    }, []);

    if (!show) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className="absolute flex flex-col justify-center items-center w-full">
                {currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.img src={steps[currentStep].image} alt="SQL Image"
                                        className="h-screen border-[4px] border-black"
                                        initial={{
                                            scale: steps[currentStep].initialScale,
                                            x: steps[currentStep].initialX,
                                            y: steps[currentStep].initialY,
                                        }}
                                        animate={{
                                            scale: 0.8,
                                            x: steps[currentStep].finalX,
                                            y: steps[currentStep].finalY
                                        }}
                                        transition={{duration: 1, ease: "easeInOut"}}
                            />
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const WhatisAggregateFnct = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhatisAggregateFunctions;
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
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const AggregateFnctDef = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.AggregateFunctionsDef;
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
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const SQLContents3 = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: maxminsql,
            text: AppText.MaxMinSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: countsql,
            text: AppText.CountSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: sumsql,
            text: AppText.SumSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: avgsql,
            text: AppText.AvgSQL,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
    ];

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

    const juniorVoice = voices.find(voice => voice.name.includes('Microsoft Mark')) || voices[0];

    useEffect(() => {
        if (show && juniorVoice && currentStep < steps.length) {
            const { text } = steps[currentStep];
            setDisplayText('');

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = juniorVoice;

            const words = text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                if (event.name === 'word' && wordIndex < words.length - 1) {
                    wordIndex++;
                    setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                }
            };

            utterance.onend = () => {
                setCurrentStep((prev) => prev + 1); // Move to the next step
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose(); // Close the component when all steps are done
        }
    }, [show, currentStep, juniorVoice]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel(); // Cleanup speech synthesis on unmount
        };
    }, []);

    if (!show) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className="absolute flex flex-col justify-center items-center w-full">
                {currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 1 }}>
                                {displayText}
                            </motion.div>

                            <motion.img src={steps[currentStep].image} alt="SQL Image"
                                        className="h-screen border-[4px] border-black"
                                        initial={{
                                            scale: steps[currentStep].initialScale,
                                            x: steps[currentStep].initialX,
                                            y: steps[currentStep].initialY,
                                        }}
                                        animate={{ scale: 0.8, x: steps[currentStep].finalX, y: steps[currentStep].finalY }}
                                        transition={{ duration: 1, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const PracticeTheQuery = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const texts = AppText.PracticeQuery1;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/TutorialSQLPractice");
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

const TutorialModule2 = () => {

    const [showDiv1, setShowDiv1] = useState(true);
    const [showIntroto1Module2, setShowIntroto1Module2] = useState(false);
    const [showIntroto2Module2, setShowIntroto2Module2] = useState(false);
    const [showStepbyStepModule2, setShowStepbyStepModule2] = useState(false);
    const [showStructureStatement, setShowStructureStatement] = useState(false);
    const [showExampleSQL, setShowExampleSQL] = useState(false);
    const [showImportant, setShowImportant] = useState(false);

    const [showSQLThings1, setShowSQLThings1] = useState(false);
    const [showSQLThings2, setShowSQLThings2] = useState(false);
    const [showSQLWhatisAggFunctions, setShowSQLWhatisAggFunctions] = useState(false);
    const [showSQLAggFunctions, setShowSQLAggFunctions] = useState(false);
    const [showSQLThings3, setShowSQLThings3] = useState(false);

    const [showSQLPractice, setShowSQLPractice] = useState(false);

    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowIntroto1Module2(true), 1500);
    };

    const handleClose1 = () => {
        setShowIntroto1Module2(false);
        setShowIntroto2Module2(true);
    };

    const handleClose2 = () => {
        setShowIntroto2Module2(false);
        setShowStepbyStepModule2(true);
    };

    const handleClose3 = () => {
        setShowStepbyStepModule2(false);
        setShowStructureStatement(true);
    };

    const handleClose4 = () => {
        setShowStructureStatement(false);
        setShowExampleSQL(true);
    };

    const handleClose5 = () => {
        setShowExampleSQL(false);
        setShowImportant(true);
    };

    const handleClose6 = () => {
        setShowImportant(false);
        setShowSQLThings1(true);
    }

    const handleClose7 = () => {
        setShowSQLThings1(false);
        setTimeout(() => setShowSQLThings2(true), 1500);
    }

    const handleClose8 = () => {
        setShowSQLThings2(false);
        setTimeout(() => setShowSQLWhatisAggFunctions(true), 1500);
    }

    const handleClose9 = () => {
        setShowSQLWhatisAggFunctions(false);
        setShowSQLAggFunctions(true);
    }

    const handleClose10 = () => {
        setShowSQLAggFunctions(false);
        setShowSQLThings3(true);
    }

    const handleClose11 = () => {
        setShowSQLThings3(false);
        setTimeout(() => setShowSQLPractice(true), 3000);
    }

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
                                    Redo Normalisation Practice
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={sqlpracticepic}
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
                    <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                        <NavBarInGame pageName={"TutorialModule2"}/>
                        <div className={'w-screen bg-[#2f3749] py-0.5'}>
                            <h1 className="text-left text-white font-semibold text-4xl mb-3">Module 2: Query
                                Language</h1>
                        </div>
                        <div className={'flex'}>
                            <div
                                className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                                <h1 className={'text-black text-center mx-1 my-4 text-3xl font-semibold'}>Introduction
                                    to
                                    Query
                                    Language</h1>
                                <h1 className={'text-gray-600 text-start mx-1 my-2 text-xl font-semibold'}>Major
                                    commands in
                                    SQL: </h1>
                                <h1 className={'mx-1 my-2 text-xl text-end'}>
                                    {AppText.SQLImportantCommands}
                                </h1>
                                <img className={'h-96 mx-auto my-4 border-2 border-black'} src={selectsql}
                                     alt={'Example of Select'}/>
                                <div className={'flex justify-between my-2'}>

                                </div>
                            </div>
                            <div className={'grid grid-cols-2 w-[600px] p-3 gap-1'}>
                                <div>
                                    <h1 className={'text-xl'}>WHERE clause</h1>
                                    <img className={'h-[238px] mx-auto my-1 border-2 border-black'} src={wheresql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>ORDER BY clause</h1>
                                    <img className={'h-[238px] mx-auto my-1 border-2 border-black'} src={orderbysql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>AND clause</h1>
                                    <img className={'h-[238px] mx-auto my-1 border-2 border-black'} src={andsql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>OR clause</h1>
                                    <img className={'h-[238px] mx-auto my-1 border-2 border-black'} src={orsql}
                                         alt={'Example of SQLs'}/>
                                </div>
                            </div>
                        </div>
                        <div className={'w-screen h-[633px]'}>
                            <div className={'w-screen bg-[#2f3749] py-0.5'}>
                                <h1 className="text-left text-white font-semibold text-4xl mb-3">Other Important
                                    Operations
                                    and
                                    Clauses</h1>
                            </div>
                            <div className={'grid grid-cols-2 gap-1 p-1'}>
                                <div>
                                    <h1 className={'text-center text-black font-semibold text-2xl'}>Some other
                                        Functions</h1>
                                    <div className={'grid grid-cols-2 gap-1'}>
                                        <div>
                                            <h1 className={'text-xl'}>DISTINCT clause</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={distinctsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>NOT clause</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={notsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>GROUP BY clause</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={groupbysql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>HAVING clause</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={havingsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className={'text-center text-black font-semibold text-2xl'}>Aggregate
                                        Functions</h1>
                                    <div className={'grid grid-cols-2 gap-1'}>
                                        <div>
                                            <h1 className={'text-xl'}>MAX() & MIN()</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={maxminsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>COUNT()</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={countsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>SUM()</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={sumsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'text-xl'}>AVG()</h1>
                                            <img className={'h-[238px] mx-auto border-2 border-black'} src={avgsql}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            <IntroductiontoQueryLang show={showIntroto1Module2} onClose={handleClose1}
                                     value={AppText.Intro1Module2}/>
            <IntroductiontoQueryLang show={showIntroto2Module2} onClose={handleClose2}
                                     value={AppText.Intro2Module2}/>
            <IntroductiontoQueryLang show={showStepbyStepModule2} onClose={handleClose3}
                                     value={AppText.StepbyStep}/>
            <IntroductiontoQueryLang show={showStructureStatement} onClose={handleClose4}
                                     value={AppText.StructureStatement}/>
            <IntroductiontoQueryLang show={showExampleSQL} onClose={handleClose5} value={AppText.ExampleSQL}/>
            <ImportantToRemember show={showImportant} onClose={handleClose6}/>

            <SQLContents1 show={showSQLThings1} onClose={handleClose7}/>
            <SQLContents2 show={showSQLThings2} onClose={handleClose8}/>
            <WhatisAggregateFnct show={showSQLWhatisAggFunctions} onClose={handleClose9}/>
            <AggregateFnctDef show={showSQLAggFunctions} onClose={handleClose10} />
            <SQLContents3 show={showSQLThings3} onClose={handleClose11}/>
            <PracticeTheQuery show={showSQLPractice}/>
        </div>
    );
};

export default TutorialModule2;
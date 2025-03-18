import React, {useEffect, useState} from 'react';
import {clicksound} from "../../../../Resources/Sounds";
import {Link, useNavigate} from "react-router-dom";
import {
    allexample,
    anyexample,
    dependentnestedexample,
    existsexample,
    fullouterexample,
    independentnestedexample,
    inexample,
    innerjoinexample,
    joinsgif,
    joinsqlpractice,
    leftjoinexample,
    notexistsexample,
    notinexample,
    rightjoinexample
} from "../../../../Resources/Images/Others";
import NavBarInGame from "../NavBarInGame";
import {AppText} from "../../../../Constants/Texts";
import {motion} from "framer-motion";
import {assisstantconclude, chief} from "../../../../Resources/Images/People";

const IntroductiontoJoinsLang = ({show, onClose, value}) => {
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

const JoinsDef = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WhatisJoins;
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

const JoinsContents1 = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: innerjoinexample,
            text: AppText.InnerJoinExample,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: leftjoinexample,
            text: AppText.LeftExample,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: rightjoinexample,
            text: AppText.RightExample,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: fullouterexample,
            text: AppText.FullJoinExample,
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
            const {text} = steps[currentStep];
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
                setTimeout(() => setCurrentStep((prev) => prev + 1), 1000);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            window.scrollBy({
                top: window.innerHeight, // Scroll down by the full height of the viewport
                behavior: "smooth" // Smooth scrolling effect
            });
            onClose();
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
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'easeOut'}}>
            <div className="absolute flex flex-col justify-center items-center w-full">
                {currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>

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
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const JoinsContents2 = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: independentnestedexample,
            text: AppText.IndependentNestedExample,
            position: 'left',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: dependentnestedexample,
            text: AppText.DependentNestedExample,
            position: 'left',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: allexample,
            text: AppText.AllExample,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: anyexample,
            text: AppText.AnyExample,
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
            const {text} = steps[currentStep];
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
                setTimeout(() => setCurrentStep((prev) => prev + 1), 1000);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            window.scrollBy({
                top: window.innerHeight, // Scroll down by the full height of the viewport
                behavior: "smooth" // Smooth scrolling effect
            });
            onClose();
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
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'easeOut'}}>
            <div className="absolute flex flex-col justify-center items-center w-full">
                {currentStep < steps.length && steps[currentStep].position === "left" && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
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
                                initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {currentStep < steps.length && steps[currentStep].position === "right" && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>

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
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const JoinsContents3 = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const steps = [
        {
            image: notinexample,
            text: AppText.NotinExample,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: inexample,
            text: AppText.InExample,
            position: 'right',
            initialScale: 0.375,
            initialX: 164.9,
            initialY: -97,
            finalX: 0,
            finalY: 0
        },
        {
            image: existsexample,
            text: AppText.ExistsExample,
            position: 'right',
            initialScale: 0.375,
            initialX: -164.9,
            initialY: 97,
            finalX: 0,
            finalY: 0
        },
        {
            image: notexistsexample,
            text: AppText.ExistsExample,
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
            const {text} = steps[currentStep];
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
                setTimeout(() => setCurrentStep((prev) => prev + 1), 1000);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            window.scrollBy({
                top: window.innerHeight, // Scroll down by the full height of the viewport
                behavior: "smooth" // Smooth scrolling effect
            });
            onClose();
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
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'easeOut'}}>
            <div className="absolute flex flex-col justify-center items-center w-full">
                {currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}>
                                {displayText}
                            </motion.div>

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
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const ProceedtoTest = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const texts = AppText.ProceedToTest;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/TutorialJoinsPractice");
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
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const JoinsNestedTutorial = () => {

    const [showDiv1, setShowDiv1] = useState(true);
    const [showIntroto1Joins, setShowIntroto1Joins] = useState(false);
    const [showIntroto2Joins, setShowIntroto2Joins] = useState(false);
    const [showDefinitionJoins, setShowDefinitionJoins] = useState(false);
    const [showIntroto3Joins, setShowIntroto3Joins] = useState(false);

    const [showJoins1, setShowJoins1] = useState(false);
    const [showFinalmsg1, setShowFinalmsg1] = useState(false);
    const [showFinalmsg2, setShowFinalmsg2] = useState(false);
    const [showJoins2, setShowJoins2] = useState(false);
    const [showJoins3, setShowJoins3] = useState(false);
    const [showProceedtoTest, setShowProceedtoTest] = useState(false);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowIntroto1Joins(true), 1500);
    };

    const handleClose1 = () => {
        setShowIntroto1Joins(false);
        setShowIntroto2Joins(true);
    };

    const handleClose2 = () => {
        setShowIntroto2Joins(false);
        setShowDefinitionJoins(true);
    };

    const handleClose3 = () => {
        setShowDefinitionJoins(false);
        setShowIntroto3Joins(true);
    };

    const handleClose4 = () => {
        setShowIntroto3Joins(false);
        setTimeout(() => setShowJoins1(true), 1500);
    };

    const handleClose5 = () => {
        setShowJoins1(false);
        setTimeout(() => setShowFinalmsg1(true), 1500);
    }

    const handleClose6 = () => {
        setShowFinalmsg1(false);
        setShowFinalmsg2(true);
    }

    const handleClose7 = () => {
        setShowFinalmsg2(false);
        setTimeout(() => setShowJoins2(true), 1000);
    }

    const handleClose8 = () => {
        setShowJoins2(false);
        setShowJoins3(true);
    }

    const handleClose9 = () => {
        setShowJoins3(false);
        setShowProceedtoTest(true);
    }

    return (
        <div>
            {showDiv1 ? (
                <>
                    <div className={'w-screen h-screen bg-[#343237] grid grid-cols-3'}>
                        <div className={'flex p-2 py-64 items-end justify-center align-middle '}>
                            <Link to={'/TutorialSQLPractice'}>
                                <button
                                    onClick={() => {
                                        playClickSound();
                                    }}
                                    className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                >
                                    Redo Query Practice
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={joinsqlpractice}
                                alt="Detective"
                                className="flex h-[600px] w-[600px]  my-auto rounded-3xl shadow-2xl"
                            />
                            <h1 className={'absolute opacity-90 top-8 w-[426.5px] h-[80px] text-4xl text-center items-center align-middle justify-center flex bg-white text-[#343237]'}>Introduction
                                to Joins and Nested Query in DBMS</h1>
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
                        <NavBarInGame pageName={"JoinsTutorial"}/>
                        <div className={'w-screen bg-[#2f3749] py-0.5'}>
                            <h1 className="text-left text-white font-semibold lg15.6:text-5xl text-4xl mb-3">Joins and Nested Query</h1>
                        </div>
                        <div className={'flex lg15.6:my-2 my-0'}>
                            <div
                                className="lg15.6:w-[725px] w-[600px] justify-center mx-5 lg15.6:h-[680px] h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                                <h1 className={'text-black text-center mx-1 my-4 lg15.6:text-4xl text-3xl font-semibold'}>Joins in
                                    Query
                                    Language</h1>
                                <h1 className={'text-gray-600 text-start mx-1 my-2 lg15.6:text-2xl text-xl font-semibold'}>Types of Join
                                    Clauses</h1>
                                <h1 className={'mx-1 my-2 lg15.6:text-2xl text-xl text-end'}>
                                    {AppText.AllJoins}
                                </h1>
                                <img className={'lg15.6:h-[480px] h-96 mx-auto my-4'} src={joinsgif}
                                     alt={'Example of Select'}/>
                                <div className={'flex justify-between my-2'}>

                                </div>
                            </div>
                            <div className={'grid grid-cols-2 lg15.6:w-[725px] w-[600px] p-3 gap-1'}>
                                <div>
                                    <h1 className={'lg15.6:text-2xl text-xl'}>Inner Join</h1>
                                    <img className={'lg15.6:h-[290px] h-[238px] mx-auto my-1 border-2 border-black'}
                                         src={innerjoinexample}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'lg15.6:text-2xl text-xl'}>Left Join</h1>
                                    <img className={'lg15.6:h-[290px] h-[238px] mx-auto my-1 border-2 border-black'}
                                         src={leftjoinexample}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'lg15.6:text-2xl text-xl'}>Right Join</h1>
                                    <img className={'lg15.6:h-[290px] h-[238px] mx-auto my-1 border-2 border-black'}
                                         src={rightjoinexample}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'lg15.6:text-2xl text-xl'}>Full Outer Join</h1>
                                    <img className={'lg15.6:h-[290px] h-[238px] mx-auto my-1 border-2 border-black'}
                                         src={fullouterexample}
                                         alt={'Example of SQLs'}/>
                                </div>
                            </div>
                        </div>
                        <div className={'w-screen lg:h-[776px] h-[633px]'}>
                            <div className={'w-screen bg-[#2f3749] py-0.5'}>
                                <h1 className="text-left text-white font-semibold lg15.6:text-5xl text-4xl mb-3">Nested Queries and some other clauses</h1>
                            </div>
                            <div className={'grid grid-cols-2 gap-1 p-1'}>
                                <div>
                                    <h1 className={'text-left ml-16 text-black font-semibold lg15.6:text-3xl text-2xl'}>Nested Queries</h1>
                                    <div className={'grid grid-cols-2 gap-1'}>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>Independent Nested Query</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'}
                                                 src={independentnestedexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>All Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={allexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>Dependent Nested Query</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'}
                                                 src={dependentnestedexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>Any Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={anyexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className={'text-left ml-10 text-black font-semibold text-2xl'}>Some other
                                        Clauses</h1>
                                    <div className={'grid grid-cols-2 gap-1'}>
                                        <div>
                                        <h1 className={'lg15.6:text-2xl text-xl'}>Not In Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={notinexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>In Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={inexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>Exists Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={existsexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                        <div>
                                            <h1 className={'lg15.6:text-2xl text-xl'}>Not Exists Clause</h1>
                                            <img className={'lg15.6:h-[290px] h-[238px] mx-auto border-2 border-black'} src={notexistsexample}
                                                 alt={'Example of SQLs'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <IntroductiontoJoinsLang show={showIntroto1Joins} onClose={handleClose1} value={AppText.IntrotoJoins}/>
            <IntroductiontoJoinsLang show={showIntroto2Joins} onClose={handleClose2} value={AppText.LearnJoins}/>
            <JoinsDef show={showDefinitionJoins} onClose={handleClose3}/>
            <IntroductiontoJoinsLang show={showIntroto3Joins} onClose={handleClose4} value={AppText.UnderstandJoins}/>
            <JoinsContents1 show={showJoins1} onClose={handleClose5}/>
            <IntroductiontoJoinsLang show={showFinalmsg1} onClose={handleClose6} value={AppText.SomeOtherClauses} />
            <IntroductiontoJoinsLang show={showFinalmsg2} onClose={handleClose7} value={AppText.ListedBelow} />
            <JoinsContents2 show={showJoins2} onClose={handleClose8} />
            <JoinsContents3 show={showJoins3} onClose={handleClose9} />
            <ProceedtoTest show={showProceedtoTest} />
        </div>
    );
};

export default JoinsNestedTutorial;
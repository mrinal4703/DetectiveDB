import React, {useEffect, useState} from 'react';
import axios from "axios";
import {username} from "../../../../Constants/Texts/constants";
import {
    AppText,
    FirstTables1,
    NormalisationExample1,
    useVoiceSynthesis,
    WhatNormalisationData
} from "../../../../Constants/Texts";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {assisstantconclude, detective, helperleft, helperright} from "../../../../Resources/Images/People";
import Typewriter from "typewriter-effect";
import NavBarInGame from "../NavBarInGame";
import {andsql, orderbysql, orsql, selectsql, wheresql} from "../../../../Resources/Images/Others";

const IntroductiontoQueryLang = ({show, onClose, value, time}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", value, show);

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
            }, time);
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
                    src={assisstantconclude}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter
                        options={{
                            strings: [value],
                            autoStart: true,
                            loop: false, // Stops after typing once
                            delay: 60,
                            cursor: "|",
                            deleteSpeed: Infinity,
                        }}
                    />
                    <button
                        className={`mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${
                            showButton ? "block" : "hidden"
                        }`}
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const ImportantToRemember = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.ImportantToRemember, show);

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
            }, 80);
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
                    className="absolute bottom-28 right-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter
                        options={{
                            strings: [AppText.ImportantToRemember],
                            autoStart: true,
                            loop: false, // Stops after typing once
                            delay: 60,
                            cursor: "|",
                            deleteSpeed: Infinity,
                        }}
                    />
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

const SQLCOntents = ({show, onClose}) => {
    const [highlightRHouse, setHighlightRHouse] = useState(false);
    const [highlightTable, setHighlightTable] = useState(false);
    const [highlightHeader, setHighlightHeader] = useState(false);
    const [tableVisible, setTableVisible] = useState(false);
    const [theadVisible, setTheadVisible] = useState(false);
    const [fdHighlightVisible, setHighlightFdVisible] = useState(false);
    const [fdVisible, setFdVisible] = useState(false);
    const [voices, setVoices] = useState([]);


    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            console.log('Available Voices:', availableVoices); // Log voices for debugging
            setVoices(availableVoices);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Find the female voice
    const juniorVoice = voices.find(voice => voice.name.includes('Microsoft Mark')) || voices[0]; // Fallback to the first available voice

    // Speak the text for each segment when it becomes visible
    useEffect(() => {
        if (show && juniorVoice) {
            if (highlightRHouse) {
                const utterance = new SpeechSynthesisUtterance(AppText.RelationName);
                utterance.voice = juniorVoice;
                window.speechSynthesis.speak(utterance);
            }
            if (highlightTable) {
                const utterance = new SpeechSynthesisUtterance(AppText.Relation);
                utterance.voice = juniorVoice;
                window.speechSynthesis.speak(utterance);
            }
            if (highlightHeader) {
                const utterance = new SpeechSynthesisUtterance(AppText.Attributes);
                utterance.voice = juniorVoice;
                window.speechSynthesis.speak(utterance);
            }
            if (fdHighlightVisible) {
                const utterance = new SpeechSynthesisUtterance(AppText.FDs);
                utterance.voice = juniorVoice;
                window.speechSynthesis.speak(utterance);
            }

            // Cleanup: Stop speaking when the component unmounts
            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, [highlightRHouse, highlightTable, highlightHeader, fdHighlightVisible, show, juniorVoice]);

    // Handle timers for showing each segment
    useEffect(() => {
        if (show) {
            const timer1 = setTimeout(() => setHighlightRHouse(true), 0);
            const timer2 = setTimeout(() => {
                setHighlightRHouse(false);
                setHighlightTable(true);
                setTableVisible(true);
                // }, 900000);
            }, 90);
            const timer3 = setTimeout(() => {
                setHighlightTable(false);
                setTableVisible(false);
                setTheadVisible(true);
                setHighlightHeader(true);
            }, 900000);
            const timer4 = setTimeout(() => {
                setTheadVisible(false);
                setHighlightHeader(false);
                setFdVisible(true);
                setHighlightFdVisible(true);
            }, 900000);
            const timer5 = setTimeout(() => {
                setFdVisible(false);
                setHighlightFdVisible(false);
                onClose();
            }, 900000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
                clearTimeout(timer5);
            };
        }
    }, [show, onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, ease: 'easeOut'}}
        >
            <div className="absolute flex flex-col justify-center items-center w-full">
                <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                    <div className={''}>
                        <motion.img
                            src={selectsql}
                            alt="Detective"
                            className="h-screen border-[4px] border-black"
                            initial={{scale: 0.616, y: 100}}
                            animate={{scale: 0.8, y: 0}}
                            transition={{duration: 1, ease: "easeInOut"}}
                        />
                    </div>
                    <div
                        className={`text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black ${highlightRHouse ? '' : 'hidden'}`}
                    >
                        <Typewriter
                            options={{
                                strings: [AppText.SelectSQL],
                                autoStart: true,
                                loop: false,
                                delay: 60,
                                cursor: '|',
                                deleteSpeed: Infinity,
                            }}
                        />
                    </div>
                </div>

                {tableVisible && (
                    <div>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <div
                                className={`text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black ${highlightRHouse ? '' : 'hidden'}`}
                            >
                                <Typewriter
                                    options={{
                                        strings: [AppText.SelectSQL],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </div>
                            <div className={''}>
                                <motion.img
                                    src={wheresql}
                                    alt="Detective"
                                    className="h-screen border-[4px] border-black"
                                    initial={{scale: 0.616, y: 100}}
                                    animate={{scale: 0.8, y: 0}}
                                    transition={{duration: 1, ease: "easeInOut"}}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {theadVisible && (
                    <div>
                        <div
                            className={`relative flex flex-col -top-[450px] justify-center items-center min-h-screen `}>
                            <div
                                className="text-lg text-black p-3 mx-20 bg-white rounded-2xl shadow-inner border-2 border-black">
                                <Typewriter
                                    options={{
                                        strings: [AppText.Attributes],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </div>
                            <div className="">
                                <table
                                    className={`table-auto mx-9 my-3 items-center text-center justify-center border-collapse rounded-3xl border-2 border-black ${highlightHeader ? 'border-[6px] border-blue-500' : 'hidden'} `}>
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
                        </div>
                    </div>
                )}

                {fdVisible && (
                    <div>
                        <div className="relative flex flex-col -top-[94px] justify-center items-center min-h-screen">
                            <div
                                className={`text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black ${fdHighlightVisible ? '' : 'hidden'}`}
                            >
                                <Typewriter
                                    options={{
                                        strings: [AppText.FDs],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </div>
                            <h1
                                className={`text-left bg-[#a2e1e1] mx-[22px] text-black font-semibold text-lg ${fdHighlightVisible ? 'border-[6px] border-blue-500' : 'hidden'}`}
                            >
                                {AppText.GivenFD}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const SQLContents1 = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [juniorVoice, setJuniorVoice] = useState(null);
    const [isPreSpeaking, setIsPreSpeaking] = useState(true); // New state to handle pre-speech

    const steps = [
        { image: selectsql, text: AppText.SelectSQL, position: 'left' },
        { image: wheresql, text: AppText.WhereSQL, position: 'right', initialx: -164.9, initialy: -97, finalx: 0, finaly: 0},
        { image: orderbysql, text: AppText.OrderBySQL, position: 'right', initialx: 164.9, initialy: -97, finalx: 0, finaly: 0 },
        { image: andsql, text: AppText.AndSQL, position: 'right', initialx: -164.9, initialy: 97, finalx: 0, finaly: 0 },
        { image: orsql, text: AppText.OrSQL, position: 'right', initialx: 164.9, initialy: 97, finalx: 0, finaly: 0 },
    ];

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            const voice = availableVoices.find(v => v.name.includes('Microsoft Mark')) || availableVoices[0];
            setJuniorVoice(voice);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    useEffect(() => {
        if (show && juniorVoice && isPreSpeaking) {
            // Stop any ongoing speech before starting
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(AppText.SQLImportantCommandsExplanation);
            utterance.voice = juniorVoice;

            // When the pre-speech finishes, transition to the UI
            utterance.onend = () => {
                setIsPreSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
        }
    }, [show, juniorVoice, isPreSpeaking]);

    useEffect(() => {
        if (show && juniorVoice && !isPreSpeaking) {
        // if (show && juniorVoice) {
            if (currentStep >= steps.length) {
                onClose();
                return;
            }

            const step = steps[currentStep];
            if (step) {
                const utterance = new SpeechSynthesisUtterance(step.text);
                utterance.voice = juniorVoice;
                window.speechSynthesis.speak(utterance);

                const timer = setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                }, step.position === 'left' ? 25000 : 15000);

                return () => clearTimeout(timer);
            }
        }
    }, [show, currentStep, juniorVoice, steps, onClose, isPreSpeaking]);
    // }, [show, currentStep, juniorVoice, steps, onClose]);

    useEffect(() => {
        if (currentStep >= steps.length) {
            onClose();
        }
    }, [currentStep, steps.length, onClose]);

    // If still in pre-speaking phase, don't render UI yet
    if (!show || isPreSpeaking) return null;
    // if (!show) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, ease: 'easeOut'}}
        >
            <div className="absolute flex flex-col justify-center items-center w-full">
                {/* Main container for the large image and text */}
                {currentStep === 0 && (
                    <motion.div
                        className="flex justify-center items-center w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                    >
                        {/* Large image on the left */}
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <div className={''}>
                                <motion.img
                                    src={selectsql}
                                    alt="Detective"
                                    className="h-screen border-[4px] border-black"
                                    initial={{scale: 0.616, y: 100}}
                                    animate={{scale: 0.8, y: 0}}
                                    transition={{duration: 1, ease: "easeInOut"}}
                                />
                            </div>

                            {/* Text on the right */}
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: 100}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}
                            >
                                <Typewriter
                                    options={{
                                        strings: [steps[0].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Container for the smaller images and text (one by one) */}
                {currentStep > 0 && currentStep < steps.length && (
                    <motion.div
                        className="flex justify-center items-center w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                    >
                        {/* Text on the left */}
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            <motion.div
                                className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                initial={{opacity: 0, x: -100}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 1}}
                            >
                                <Typewriter
                                    options={{
                                        strings: [steps[currentStep].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }}
                                />
                            </motion.div>

                            {/* Small image on the right (one at a time) */}
                            <div>
                                <motion.img
                                    src={steps[currentStep].image}
                                    alt="Detective"
                                    className="h-screen border-[4px] border-black"
                                    initial={{
                                        scale: 0.375,
                                        x: steps[currentStep].initialx ?? 0,  // Defaults to 0 if undefined
                                        y: steps[currentStep].initialy ?? 0,  // Defaults to 0 if undefined
                                    }}
                                    animate={{
                                        scale: 0.8,
                                        x: steps[currentStep].finalx ?? 0,
                                        y: steps[currentStep].finaly ?? 0,
                                    }}
                                    transition={{duration: 1, ease: "easeInOut"}}
                                />
                            </div>
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
    const [juniorVoice, setJuniorVoice] = useState(null);
    const [isPreSpeaking, setIsPreSpeaking] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

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
            setVoices(availableVoices);
            const voice = availableVoices.find(v => v.name.includes('Microsoft Mark')) || availableVoices[0];
            setJuniorVoice(voice);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

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
            setIsTyping(true);

            const utterance = new SpeechSynthesisUtterance(steps[currentStep].text);
            utterance.voice = juniorVoice;

            utterance.onend = () => {
                setIsTyping(false);
                setCurrentStep(prev => prev + 1);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose();
        }
    }, [show, currentStep, juniorVoice, isPreSpeaking]);

    if (!show || isPreSpeaking) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className="absolute flex flex-col justify-center items-center w-full">

                {/* First Image (Bigger Initial Size) */}
                {currentStep === 0 && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            {/* Image (Larger) */}
                            <div>
                                <motion.img src={selectsql} alt="Detective"
                                            className="h-screen border-[4px] border-black"
                                            initial={{ scale: 0.616, y: 100 }}
                                            animate={{ scale: 0.8, y: 0 }}
                                            transition={{ duration: 1, ease: "easeInOut" }} />
                            </div>
                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
                                {isTyping && (
                                    <Typewriter options={{
                                        strings: [steps[0].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }} />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Other Images (Now Moving Properly) */}
                {currentStep > 0 && currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">

                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
                                {isTyping && (
                                    <Typewriter options={{
                                        strings: [steps[currentStep].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }} />
                                )}
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
                                        transition={{ duration: 1, ease: "easeInOut" }} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const SQLContents3 = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [juniorVoice, setJuniorVoice] = useState(null);
    const [isPreSpeaking, setIsPreSpeaking] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

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
            setVoices(availableVoices);
            const voice = availableVoices.find(v => v.name.includes('Microsoft Mark')) || availableVoices[0];
            setJuniorVoice(voice);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

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
            setIsTyping(true);

            const utterance = new SpeechSynthesisUtterance(steps[currentStep].text);
            utterance.voice = juniorVoice;

            utterance.onend = () => {
                setIsTyping(false);
                setCurrentStep(prev => prev + 1);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose();
        }
    }, [show, currentStep, juniorVoice, isPreSpeaking]);

    if (!show || isPreSpeaking) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className="absolute flex flex-col justify-center items-center w-full">

                {/* First Image (Bigger Initial Size) */}
                {currentStep === 0 && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            {/* Image (Larger) */}
                            <div>
                                <motion.img src={selectsql} alt="Detective"
                                            className="h-screen border-[4px] border-black"
                                            initial={{ scale: 0.616, y: 100 }}
                                            animate={{ scale: 0.8, y: 0 }}
                                            transition={{ duration: 1, ease: "easeInOut" }} />
                            </div>
                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
                                {isTyping && (
                                    <Typewriter options={{
                                        strings: [steps[0].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }} />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Other Images (Now Moving Properly) */}
                {currentStep > 0 && currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">

                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
                                {isTyping && (
                                    <Typewriter options={{
                                        strings: [steps[currentStep].text],
                                        autoStart: true,
                                        loop: false,
                                        delay: 60,
                                        cursor: '|',
                                        deleteSpeed: Infinity,
                                    }} />
                                )}
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
                                        transition={{ duration: 1, ease: "easeInOut" }} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const SQLContents = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
    const [juniorVoice, setJuniorVoice] = useState(null);
    const [isPreSpeaking, setIsPreSpeaking] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [displayText, setDisplayText] = useState('');

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
            setVoices(availableVoices);
            const voice = availableVoices.find(v => v.name.includes('Microsoft Mark')) || availableVoices[0];
            setJuniorVoice(voice);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

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
            setIsTyping(true);
            setDisplayText(''); // Reset display text

            const utterance = new SpeechSynthesisUtterance(steps[currentStep].text);
            utterance.voice = juniorVoice;

            const words = steps[currentStep].text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                // Ensure the boundary is a word boundary
                if (event.name === 'word') {
                    // Check if wordIndex is within bounds
                    if (wordIndex < words.length) {
                        // Add the word to displayText
                        setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                        wordIndex++;
                    }
                }
            };

            utterance.onend = () => {
                setIsTyping(false);
                setCurrentStep((prev) => prev + 1);
            };

            window.speechSynthesis.speak(utterance);
        } else if (currentStep >= steps.length) {
            onClose();
        }
    }, [show, currentStep, juniorVoice, isPreSpeaking]);

    if (!show || isPreSpeaking) return null;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className="absolute flex flex-col justify-center items-center w-full">

                {/* First Image (Bigger Initial Size) */}
                {currentStep === 0 && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">
                            {/* Image (Larger) */}
                            <div>
                                <motion.img src={selectsql} alt="Detective"
                                            className="h-screen border-[4px] border-black"
                                            initial={{ scale: 0.616, y: 100 }}
                                            animate={{ scale: 0.8, y: 0 }}
                                            transition={{ duration: 1, ease: "easeInOut" }} />
                            </div>
                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
                                {displayText}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Other Images (Now Moving Properly) */}
                {currentStep > 0 && currentStep < steps.length && (
                    <motion.div className="flex justify-center items-center w-full"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="grid grid-cols-2 justify-center items-center w-screen min-h-screen">

                            {/* Typewriter Text */}
                            <motion.div className="text-lg text-black p-3 mx-6 bg-white my-6 rounded-2xl shadow-inner border-2 border-black"
                                        initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}>
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
                                        transition={{ duration: 1, ease: "easeInOut" }} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const TutorialModule2 = () => {
    const [showIntroto1Module2, setShowIntroto1Module2] = useState(false);
    const [showIntroto2Module2, setShowIntroto2Module2] = useState(false);
    const [showStepbyStepModule2, setShowStepbyStepModule2] = useState(false);
    const [showStructureStatement, setShowStructureStatement] = useState(false);
    const [showExampleSQL, setShowExampleSQL] = useState(false);
    const [showImportant, setShowImportant] = useState(false);

    const [showSQLThings1, setShowSQLThings1] = useState(false);

    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowIntroto1Module2(true);

            // setShowSQLThings1(true);

        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    const executeQuery = async () => {
        try {
            const response = await axios.get(`http://${username}/api/sql/execute`, {
                params: {query},
            });

            if (response.data.error) {
                setError(response.data.error);
                setResult(null);
            } else if (response.data.message) {
                setError(null);
                setResult("No data found.");
            } else {
                setError(null);
                setResult(response.data.data);
            }
        } catch (err) {
            setError("Server Error: " + err.message);
        }
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
    }

    return (
        <div>
            <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                {/*<NavBarInGame pageName={"TutorialModule2"} />*/}
                <div className={'w-screen bg-[#2f3749] py-0.5'}>
                    <h1 className="text-left text-white font-semibold text-4xl mb-3">Module 2: Query Language</h1>
                </div>
                <div className={'flex'}>
                    <div
                        className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                        <h1 className={'text-black text-center mx-1 my-4 text-3xl font-semibold'}>Introduction to Query
                            Language</h1>
                        <h1 className={'text-gray-600 text-start mx-1 my-2 text-xl font-semibold'}>Major commands in
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
                    {/*<div*/}
                    {/*    className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">*/}

                    {/*</div>*/}
                </div>
            </div>

            <IntroductiontoQueryLang show={showIntroto1Module2} onClose={handleClose1} value={AppText.Intro1Module2}
                                     time={30}/>
            <IntroductiontoQueryLang show={showIntroto2Module2} onClose={handleClose2} value={AppText.Intro2Module2}
                                     time={50}/>
            <IntroductiontoQueryLang show={showStepbyStepModule2} onClose={handleClose3} value={AppText.StepbyStep}
                                     time={50}/>
            <IntroductiontoQueryLang show={showStructureStatement} onClose={handleClose4}
                                     value={AppText.StructureStatement} time={50}/>
            <IntroductiontoQueryLang show={showExampleSQL} onClose={handleClose5} value={AppText.ExampleSQL}
                                     time={50}/>
            <ImportantToRemember show={showImportant} onClose={handleClose6}/>

            <SQLContents show={showSQLThings1} onClose={handleClose7}/>

            {/*<div>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={query}*/}
            {/*        onChange={(e) => setQuery(e.target.value)}*/}
            {/*        placeholder="Enter your SQL query"*/}
            {/*    />*/}
            {/*    <button onClick={executeQuery}>Run Query</button>*/}

            {/*    {error && <p style={{color: "red"}}>{error}</p>}*/}

            {/*    {result && Array.isArray(result) ? (*/}
            {/*        <table border="1">*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                {Object.keys(result[0]).map((key) => (*/}
            {/*                    <th key={key}>{key}</th>*/}
            {/*                ))}*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {result.map((row, index) => (*/}
            {/*                <tr key={index}>*/}
            {/*                    {Object.values(row).map((value, i) => (*/}
            {/*                        <td key={i}>{value}</td>*/}
            {/*                    ))}*/}
            {/*                </tr>*/}
            {/*            ))}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    ) : (*/}
            {/*        result && <p>{result}</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default TutorialModule2;
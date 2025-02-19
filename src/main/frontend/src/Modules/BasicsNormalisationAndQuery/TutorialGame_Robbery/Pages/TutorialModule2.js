import React, {useEffect, useState} from 'react';
import axios from "axios";
import {username} from "../../../../Constants/Texts/constants";
import {AppText} from "../../../../Constants/Texts";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {assisstantconclude, helperleft} from "../../../../Resources/Images/People";
import {
    andsql,
    distinctsql,
    groupbysql, havingsql,
    notsql,
    orderbysql,
    orsql,
    selectsql,
    wheresql
} from "../../../../Resources/Images/Others";
import NavBarInGame from "../NavBarInGame";

const IntroductiontoQueryLang = ({show, onClose, value}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const text = value;
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

    const text = AppText.ImportantToRemember;
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

const SQLContents = ({show, onClose}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [voices, setVoices] = useState([]);
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
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Find the female voice
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
            const {text} = steps[currentStep];
            setDisplayText(' ');
            setIsTyping(true);

            const utterance = new SpeechSynthesisUtterance(steps[currentStep].text);
            utterance.voice = juniorVoice;

            const words = text.split(' ');
            let wordIndex = -1;

            utterance.onboundary = (event) => {
                if (event.name === 'word' && wordIndex < words.length) {
                    wordIndex++;
                    const currentWord = words[wordIndex];
                    if (currentWord) {
                        setDisplayText((prev) => (prev ? `${prev} ${currentWord}` : currentWord));
                    }
                }
            };

            utterance.onend = () => {
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
            setShowIntroto1Module2(true);

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
                <NavBarInGame pageName={"TutorialModule2"}/>
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
                </div>
                <div className={'w-screen h-[633px]'}>
                    <div className={'w-screen bg-[#2f3749] py-0.5'}>
                        <h1 className="text-left text-white font-semibold text-4xl mb-3">Other Important Operations and
                            Clauses</h1>
                    </div>
                    <div className={'grid grid-cols-2 gap-1 p-1'}>
                        <div>
                            <h1 className={'text-center text-black font-semibold text-2xl'}>Some other Functions</h1>
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
                            <h1 className={'text-center text-black font-semibold text-2xl'}>Aggregate Functions</h1>
                            <div className={'grid grid-cols-2 gap-1'}>
                                <div>
                                    <h1 className={'text-xl'}>WHERE clause</h1>
                                    <img className={'h-[238px] mx-auto border-2 border-black'} src={wheresql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>ORDER BY clause</h1>
                                    <img className={'h-[238px] mx-auto border-2 border-black'} src={orderbysql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>AND clause</h1>
                                    <img className={'h-[238px] mx-auto border-2 border-black'} src={andsql}
                                         alt={'Example of SQLs'}/>
                                </div>
                                <div>
                                    <h1 className={'text-xl'}>OR clause</h1>
                                    <img className={'h-[238px] mx-auto border-2 border-black'} src={orsql}
                                         alt={'Example of SQLs'}/>
                                </div>
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 mb-3.5 rounded-lg p-2">*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <IntroductiontoQueryLang show={showIntroto1Module2} onClose={handleClose1} value={AppText.Intro1Module2}/>
            <IntroductiontoQueryLang show={showIntroto2Module2} onClose={handleClose2} value={AppText.Intro2Module2}/>
            <IntroductiontoQueryLang show={showStepbyStepModule2} onClose={handleClose3} value={AppText.StepbyStep}/>
            <IntroductiontoQueryLang show={showStructureStatement} onClose={handleClose4}
                                     value={AppText.StructureStatement}/>
            <IntroductiontoQueryLang show={showExampleSQL} onClose={handleClose5} value={AppText.ExampleSQL}/>
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
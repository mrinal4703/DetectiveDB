import React, {useEffect, useState} from 'react';
import {assisstantconclude, chief, helperleftnobg} from "../../../../Resources/Images/People";
import {clicksound} from "../../../../Resources/Sounds";
import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {AppText, NormalFormTestCarVandalism, updateProgress} from "../../../../Constants/Texts";
import axios from "axios";
import {username} from "../../../../Constants/Texts/constants";
import {normalisationtestpic} from "../../../../Resources/Images/Others";
import NavBarInGame from "../../TutorialGame_Robbery/NavBarInGame";

const HelperAtFirstFinally = ({show, onClose, value}) => {
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

const CorrectModal = ({show}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const navigate = useNavigate();

    const texts = AppText.CorrectVandalismNorm;
    const voiceMain = "Microsoft David";
    const position = "right";
    const img = chief;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        navigate("/VandalismSQL");
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

const WrongModal = ({show, onClose}) => {
    const [displayText, setDisplayText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const texts = AppText.WrongAnsKeys;
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

const VandalismNormalisation = () => {
    const [showDiv1, setShowDiv1] = useState(true);
    const [nf2Inputs, setNf2Inputs] = useState(["", "", ""]);
    const [nf3Inputs, setNf3Inputs] = useState(["", "", "", "", ""]);
    const [nf2Correct, setNf2Correct] = useState(false);
    const [showCorrectModal, setShowCorrectModal] = useState(false);
    const [showWrongModal, setShowWrongModal] = useState(false);

    const [showNFtest, setShowNFtest] = useState(false);
    // useBackgroundMusic(ingame);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // window.location.reload();
    //         setShowNFtest(true);
    //     }, 1000);
    //
    //     return () => clearTimeout(timer); // Cleanup timeout on unmount
    // }, []);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        setTimeout(() => setShowNFtest(true), 1000);
    };

    const validateInputs = (userInputs, correctAnswers) => {
        const sortedUserInputs = userInputs.map(input => input.replace(/\s+/g, '').split(',').sort().join(','));
        const sortedCorrectAnswers = correctAnswers.map(ans => ans.replace(/\s+/g, '').split(',').sort().join(','));
        return sortedUserInputs.sort().join('|') === sortedCorrectAnswers.sort().join('|');
    };

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const email = localStorage.getItem("loggedinuseremail") || sessionStorage.getItem("loggedinuseremail");

        if (email) {
            axios.get(`http://${username}/progress/${email}`)
                .then(response => {
                    setProgress(response.data); // Store progress directly
                })
                .catch(error => {
                    console.error("Error fetching progress:", error);
                });
        }
    }, []);

    const handleNf2Submit = () => {
        playClickSound();
        if (validateInputs(nf2Inputs, NormalFormTestCarVandalism.Nf2Rel)) {
            setNf2Correct(true);
        } else {
            setShowWrongModal(true);
        }
    };

    const handleNf3Submit = () => {
        playClickSound();
        if (validateInputs(nf3Inputs, NormalFormTestCarVandalism.Nf3Rel)) {
            updateProgress(6);
            setShowCorrectModal(true);
        } else {
            setShowWrongModal(true);
        }
    };

    const handleClose1 = () => {
        setShowNFtest(false);
    };

    return (
        <div>
            {showDiv1 ? (
                <>
                    <div className={'w-screen h-screen bg-[#343237] grid grid-cols-3'}>
                        <div className={'flex p-2 py-64 items-end justify-center align-middle '}>
                            <Link to={'/'}>
                                <button
                                    onClick={() => {
                                        playClickSound();
                                    }}
                                    className="z-50 px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in"
                                >
                                    Go Back
                                </button>
                            </Link>
                        </div>
                        <div className={'flex my-auto items-end justify-center align-middle'}>
                            <img
                                src={normalisationtestpic}
                                alt="Detective"
                                className="flex h-[600px] w-[600px]  my-auto rounded-3xl shadow-2xl"
                            />
                            <h1 className={'absolute opacity-90 top-8 w-[426.5px] h-[80px] text-4xl text-center items-center align-middle justify-center flex bg-white text-[#343237]'}>Normalisation
                                Test/Practice</h1>
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
                        <NavBarInGame pageName={"VandalismNormalisation"}/>
                        <div className="w-screen bg-[#2f3749] py-0.5">
                            <h1 className="text-left text-white font-semibold lg15.6:text-5xl text-4xl mb-2">
                                Car Vandalism Case Normalisation
                            </h1>
                        </div>

                        {/*<div className="w-[1260px] mx-2.5 h-[562px] bg-white my-2 rounded-2xl p-1">*/}
                        {/*    <div className={'grid grid-cols-2 gap-3 p-1 h-full'}>*/}
                        {/*        <div className={'rounded-xl border-2 border-black'}>*/}

                        {/*        </div>*/}
                        {/*        <div className={'rounded-xl border-2 border-black'}>*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="lg15.6:w-[1510px] w-[1260px] mx-2.5 lg15.6:h-[690px] h-[562px] bg-white my-2 rounded-2xl p-1">
                            <div className="grid grid-cols-2 gap-3 p-1 h-full">
                                <div className='rounded-xl border-2 border-black p-2.5'>
                                    <h1 className={'text-black text-start mx-4 lg15.6:text-4xl text-3xl font-semibold my-2'}>Car Vandalism Case
                                        Relation</h1>
                                    <h1 className={'text-black text-start mx-4 lg15.6:text-3xl text-2xl mt-4 mb-3'}>Relation Name
                                        is {NormalFormTestCarVandalism.RelationName}</h1>
                                    <h1 className={'text-gray-400 text-start mx-8 lg15.6:text-lg text-md my-2'}>Relation: {NormalFormTestCarVandalism.Relation}</h1>
                                    <h1 className={'text-black text-start mx-2 lg15.6:text-xl text-lg my-1'}>FD
                                        Set: {NormalFormTestCarVandalism.fdSet}</h1>
                                    <h2 className="lg15.6:text-2xl text-xl font-bold my-4">Enter 2NF Relations:</h2>
                                    {nf2Inputs.map((input, index) => (
                                        <input key={index} type="text" value={input}
                                               onChange={(e) => {
                                                   let newInputs = [...nf2Inputs];
                                                   newInputs[index] = e.target.value;
                                                   setNf2Inputs(newInputs);
                                               }}
                                               className="w-[600px] lg15.6:text-xl text-base text-center p-2 border-2 rounded-lg mb-2"
                                        />
                                    ))}
                                    <button onClick={handleNf2Submit}
                                            className="w-44 mt-4 bg-[#495f67] text-white lg15.6:text-2xl text-lg py-2 rounded-lg hover:bg-[#2e3c49]">
                                        Submit
                                    </button>
                                </div>
                                <div className='rounded-xl border-2 border-black p-2.5'>
                                    <h2 className="lg15.6:text-2xl text-xl font-bold mb-2">Enter 3NF Relations:</h2>
                                    {nf2Correct ? (
                                        nf3Inputs.map((input, index) => (
                                            <input key={index} type="text" value={input}
                                                   onChange={(e) => {
                                                       let newInputs = [...nf3Inputs];
                                                       newInputs[index] = e.target.value;
                                                       setNf3Inputs(newInputs);
                                                   }}
                                                   className="w-[600px] lg15.6:text-xl text-base text-center p-2 border-2 rounded-lg mb-2"
                                            />
                                        ))
                                    ) : (
                                        <>
                                            <div
                                                className={'flex flex-col items-center justify-center align-middle text-center'}>
                                                <div
                                                    className={'absolute mr-72 lg15.6:text-xl text-lg text-black p-3 mx-20 bg-white rounded-2xl shadow-inner border-2 border-black'}>
                                                    <p className="text-lg ">Complete 2NF first!</p>
                                                </div>
                                                <img src={helperleftnobg} className={'ml-28 lg15.6:h-[450px] h-96 mt-[72px]'}
                                                     alt={'HelperLeft'}/>
                                            </div>
                                        </>
                                    )}
                                    {nf2Correct && (
                                        <button onClick={handleNf3Submit}
                                                className="w-44 mt-4 bg-[#495f67] text-white text-lg py-2 rounded-lg hover:bg-[#2e3c49]">
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            <HelperAtFirstFinally show={showNFtest} onClose={handleClose1} time={12500}
                                  value={AppText.VandaliseCommited}/>
            <CorrectModal show={showCorrectModal} onClose={() => setShowCorrectModal(false)}/>
            <WrongModal show={showWrongModal} onClose={() => setShowWrongModal(false)}/>
        </div>
    );
};

export default VandalismNormalisation;
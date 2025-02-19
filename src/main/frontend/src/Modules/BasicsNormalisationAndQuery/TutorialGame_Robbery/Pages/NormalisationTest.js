import React, {useEffect, useState} from 'react';
import {
    AppText,
    NormalFormTest,
    NormalisationExample2,
    useBackgroundMusic,
    useVoiceSynthesis
} from "../../../../Constants/Texts";
import {assisstantconclude, chief, helperleft, helperleftnobg, helperright} from "../../../../Resources/Images/People";
import {motion} from "framer-motion";
import Typewriter from "typewriter-effect";
import {useNavigate} from "react-router-dom";
import {clicksound, ingame} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const HelperAtFirstFinally = ({ show, onClose, value, time }) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", value, show);

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.img
                    src={assisstantconclude}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />

                <div className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
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
                        onClick={onClose}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CorrectModal = ({ show }) => {
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useVoiceSynthesis("boss", AppText.CorrectAnsKeys, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 6500);
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
                    src={chief}
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
                            strings: [AppText.CorrectAnsKeys],
                            autoStart: true,
                            loop: false, // Stops after typing once
                            delay: 60,
                            cursor: "|",
                            deleteSpeed: Infinity,
                        }}
                    />
                    <button onClick={() => {
                        navigate("/TutorialModule2");
                        window.scrollTo(0, 0);
                    }}
                            className={`mt-4 px-3 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${
                                showButton ? "block" : "hidden"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const WrongModal = ({ show, onClose }) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.WrongAnsKeys, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 4500);
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
                    src={chief}
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
                            strings: [AppText.WrongAnsKeys],
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
                        onClick={onClose}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
};

const NormalisationTest = () => {

    const [nf2Inputs, setNf2Inputs] = useState(["", "", ""]);
    const [nf3Inputs, setNf3Inputs] = useState(["", "", "", "", ""]);
    const [nf2Correct, setNf2Correct] = useState(false);
    const [showCorrectModal, setShowCorrectModal] = useState(false);
    const [showWrongModal, setShowWrongModal] = useState(false);

    const [showNFtest, setShowNFtest] = useState(false);
    const [showNFtest1, setShowNFtest1] = useState(false);
    const [showNFtest2, setShowNFtest2] = useState(false);

    // useBackgroundMusic(ingame);

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowNFtest(true);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    const validateInputs = (userInputs, correctAnswers) => {
        const sortedUserInputs = userInputs.map(input => input.replace(/\s+/g, '').split(',').sort().join(','));
        const sortedCorrectAnswers = correctAnswers.map(ans => ans.replace(/\s+/g, '').split(',').sort().join(','));
        return sortedUserInputs.sort().join('|') === sortedCorrectAnswers.sort().join('|');
    };

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleNf2Submit = () => {
        playClickSound();
        if (validateInputs(nf2Inputs, NormalFormTest.Nf2Rel)) {
            setNf2Correct(true);
        } else {
            setShowWrongModal(true);
        }
    };

    const handleNf3Submit = () => {
        playClickSound();
        if (validateInputs(nf3Inputs, NormalFormTest.Nf3Rel)) {
            setShowCorrectModal(true);
        } else {
            setShowWrongModal(true);
        }
    };

    const handleClose1 = () => {
        setShowNFtest(false);
        setShowNFtest1(true);
    };

    const handleClose2 = () => {
        setShowNFtest1(false);
        setShowNFtest2(true);
    };

    const handleClose3 = () => {
        setShowNFtest2(false);
    };

    return (
        <div>
            <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                <NavBarInGame pageName={"TutorialNFPractice"} />
                <div className="w-screen bg-[#2f3749] py-0.5">
                    <h1 className="text-left text-white font-semibold text-4xl mb-2">
                        Normalisation Test
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

                <div className="w-[1260px] mx-2.5 h-[562px] bg-white my-2 rounded-2xl p-1">
                    <div className="grid grid-cols-2 gap-3 p-1 h-full">
                        <div className='rounded-xl border-2 border-black p-2.5'>
                            <h1 className={'text-black text-start mx-4 text-3xl font-semibold my-2'}>Robbery Case
                                Relation</h1>
                            <h1 className={'text-black text-start mx-4 text-2xl mt-4 mb-3'}>Relation Name
                                is {NormalFormTest.RelationName}</h1>
                            <h1 className={'text-gray-400 text-start mx-8 text-md my-2'}>Relation: {NormalFormTest.Relation}</h1>
                            <h1 className={'text-black text-start mx-2 text-lg my-1'}>FD
                                Set: {NormalFormTest.fdSet}</h1>
                            <h2 className="text-xl font-bold my-4">Enter 2NF Relations:</h2>
                            {nf2Inputs.map((input, index) => (
                                <input key={index} type="text" value={input}
                                       onChange={(e) => {
                                           let newInputs = [...nf2Inputs];
                                           newInputs[index] = e.target.value;
                                           setNf2Inputs(newInputs);
                                       }}
                                       className="w-[500px] text-center p-2 border-2 rounded-lg mb-2"
                                />
                            ))}
                            <button onClick={handleNf2Submit}
                                    className="w-44 mt-4 bg-[#495f67] text-white text-lg py-2 rounded-lg hover:bg-[#2e3c49]">
                                Submit
                            </button>
                        </div>
                        <div className='rounded-xl border-2 border-black p-2.5'>
                            <h2 className="text-xl font-bold mb-2">Enter 3NF Relations:</h2>
                            {nf2Correct ? (
                                nf3Inputs.map((input, index) => (
                                    <input key={index} type="text" value={input}
                                           onChange={(e) => {
                                               let newInputs = [...nf3Inputs];
                                               newInputs[index] = e.target.value;
                                               setNf3Inputs(newInputs);
                                           }}
                                           className="w-[500px] text-center p-2 border-2 rounded-lg mb-2"
                                    />
                                ))
                            ) : (
                                <>
                                    <div
                                        className={'flex flex-col items-center justify-center align-middle text-center'}>
                                        <div className={'absolute mr-72 text-lg text-black p-3 mx-20 bg-white rounded-2xl shadow-inner border-2 border-black'}>
                                            <p className="text-lg ">Complete 2NF first!</p>
                                        </div>
                                        <img src={helperleftnobg} className={'ml-28 h-96 mt-[72px]'} alt={'HelperLeft'}/>
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
            <HelperAtFirstFinally show={showNFtest} onClose={handleClose1} time={12500} value={AppText.IntrotoTest} />
            <HelperAtFirstFinally show={showNFtest1} onClose={handleClose2} time={8000} value={AppText.EveryGameDecompose} />
            <HelperAtFirstFinally show={showNFtest2} onClose={handleClose3} time={4200} value={AppText.LetsDecompose} />
            <CorrectModal show={showCorrectModal} onClose={() => setShowCorrectModal(false)} />
            <WrongModal show={showWrongModal} onClose={() => setShowWrongModal(false)} />
        </div>
    );
};

export default NormalisationTest;
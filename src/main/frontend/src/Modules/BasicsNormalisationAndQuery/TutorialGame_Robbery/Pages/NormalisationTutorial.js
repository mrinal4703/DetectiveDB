import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {
    assisstantconclude,
    assisstantthinking,
    chief, helperleft,
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
import {useNavigate} from "react-router-dom";
import {ingame} from "../../../../Resources/Sounds";
import NavBarInGame from "../NavBarInGame";

const FinaleModule1 = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.FinaleModule1, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 13000);
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
                            strings: [AppText.FinaleModule1],
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

const WhatisNormalisation = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.WhatisNormalisation, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 13000);
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
                            strings: [AppText.WhatisNormalisation],
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

const WhyNormalisation = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.WhyNormalisation, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 13000);
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
                            strings: [AppText.WhyNormalisation],
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

const NormalForm1 = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.NormalForm1, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 13000);
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
                            strings: [AppText.NormalForm1],
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

const NormalForm2 = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.NormalForm2, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 8000);
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
                            strings: [AppText.NormalForm2],
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

const NormalForm3 = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.NormalForm3, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 12500);
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
                    src={assisstantthinking}
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
                            strings: [AppText.NormalForm3],
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

const LetsDiscussNormalForm = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.Discuss, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 6000);
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
                    className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter
                        options={{
                            strings: [AppText.Discuss],
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

const IndentifyingNormalForm = ({show, onClose, value, time}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
                    src={helperpeekleft}
                    className="h-80 w-80 absolute top-0 right-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute h-auto w-[450px] top-44 right-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
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

const IndentifyingNormalFormExample = ({show, onClose, value, time}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
                    src={helperpeekright}
                    className="h-80 w-80 absolute top-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute h-auto w-[450px] top-44 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
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

const MovetoDecomposition = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.MoveToDecomposition, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 10000);
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
                            strings: [AppText.MoveToDecomposition],
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
                        onClick={() => {
                            window.scrollBy({
                                top: window.innerHeight, // Scroll down by the full height of the viewport
                                behavior: "smooth" // Smooth scrolling effect
                            });
                            onClose(); // Call your existing function
                        }}
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        )
    );
}

const NFDecomposition1 = ({show, onClose, value, time}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
                    src={helperleft}
                    className="h-80 w-80 absolute bottom-0 right-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute min-h-[120px] w-[450px] bottom-28 right-32 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
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

const NFDecomposition2 = ({show, onClose, value, time}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
                    src={helperright}
                    className="h-80 w-80 absolute bottom-0 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute min-h-[120px] w-[450px] bottom-28 left-32 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black">
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

const PracticeNormalisation = ({show}) => {
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useVoiceSynthesis("boss", AppText.FinalTest, show);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 5000);
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
                            strings: [AppText.FinalTest],
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
                        onClick={() => {
                            navigate("/TutorialNFPractice");
                            window.scrollTo(0, 0);
                        }}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const NormalisationTutorial = () => {
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

    useEffect(() => {
        const timer = setTimeout(() => {
            // window.location.reload();
            setShowWhatNormalisation(true);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

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
        setShowMoveTODecomp(true);
    };

    const handleClose20 = () => {
        setShowMoveTODecomp(false);
        setShowDecompose2NormalForm(true);
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
            <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
                <NavBarInGame pageName={"NormalisationTutorial"} />
                <div className={'w-screen bg-[#2f3749] py-0.5'}>
                    <h1 className="text-left text-white font-semibold text-4xl mb-3">Normalisation, Identification and
                        Decomposition</h1>
                </div>
                <div className={'flex'}>
                    <div
                        className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                        <h1 className={'text-black text-start mx-8 text-xl font-semibold my-2'}>Possible Non Trivial FD
                            which
                            create Redundancy</h1>
                        <div className="grid grid-rows-3 grid-cols-1 gap-2 mt-3">
                            {WhatNormalisationData.filter(({id}) => id >= 2).map(({id, image, form}) => (
                                <div key={id} className="flex flex-col items-center">
                                    <img src={image} className="h-32 object-contain" alt={form}/>
                                    <p className="text-lg font-semibold text-gray-700">{form}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="w-[600px] justify-center mx-5 h-[555px] border-2 border-black bg-white my-2 rounded-lg p-2">
                        <h1 className={'text-black text-start mx-8 text-3xl font-semibold my-6'}>Example for
                            Normal Form Identification</h1>
                        <h1 className={'text-black text-start mx-8 text-3xl mt-6 mb-3'}>Relation: {NormalisationExample1.Relation}</h1>
                        <h1 className={'text-black text-end mx-8 text-xl my-1'}>FD
                            Set: {NormalisationExample1.fdSet}</h1>
                        <h1 className={'text-gray-400 text-start mx-8 mt-4 text-2xl my-1'}>1NF</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>Bigger Relation, always in 1NF.</h1>
                        <h1 className={'text-gray-400 text-start mx-8 mt-4 text-2xl my-1'}>2NF Violating FDs</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf2Violationg}</h1>
                        <h1 className={'text-gray-400 text-start mx-8 mt-4 text-2xl my-1'}>3NF Violating FDs</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf3Violationg}</h1>
                        <h1 className={'text-gray-400 text-start mx-8 mt-4 text-2xl my-1'}>BCNF</h1>
                        <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.BCNFDecomposition}</h1>
                    </div>
                </div>

                <div className={'w-screen bg-[#2f3749] py-2 mb-3'}>
                    <h1 className="text-left text-white font-semibold text-3xl">Decomposition of Relations into Normal
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
                                <h1 className={'text-gray-400 text-start mx-8 -mt-1 text-2xl my-1'}>2NF Violating
                                    FD Closures</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.ClosureA}, {NormalisationExample1.ClosureB}</h1>
                            </div>
                            <div>
                                <h1 className={'text-gray-400 text-start mx-8 -mt-1 text-2xl my-1'}>3NF Violating
                                    FD Closures</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.ClosureD}, {NormalisationExample1.ClosureF}</h1>
                            </div>
                            <div>
                                <h1 className={'text-gray-400 text-start mx-8 mt-5 text-2xl my-1'}>2NF Decomposed
                                    Relations</h1>
                                <h1 className={'text-black text-start mx-8 text-xl my-1'}>{NormalisationExample1.Nf2Decomposition}</h1>
                            </div>
                            <div>
                                <h1 className={'text-gray-400 text-start mx-8 mt-5 text-2xl my-1'}>3NF Decomposed
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
                        <h1 className={'text-black text-start mx-8 text-3xl font-semibold my-4'}>Example for BCNF
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
            <FinaleModule1 show={showWhatNormalisation} onClose={handleClose1}/>
            <WhatisNormalisation show={showWhatisNormalisation} onClose={handleClose2}/>
            <WhyNormalisation show={showWhyNormalisation} onClose={handleClose3}/>
            <NormalForm1 show={showNormalForm1} onClose={handleClose4}/>
            <NormalForm2 show={showNormalForm2} onClose={handleClose5}/>
            <NormalForm3 show={showNormalForm3} onClose={handleClose6}/>
            <LetsDiscussNormalForm show={showDiscussNormalForm} onClose={handleClose7}/>
            <IndentifyingNormalForm show={showIdentify1NormalForm} onClose={handleClose8}
                                    value={WhatNormalisationData[0].explanation} time={13000}/>
            <IndentifyingNormalForm show={showIdentify2NormalFormHow} onClose={handleClose9}
                                    value={WhatNormalisationData[1].how} time={7500}/>
            <IndentifyingNormalForm show={showIdentify2NormalFormExplanation} onClose={handleClose10}
                                    value={WhatNormalisationData[1].explanation} time={18000}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormHow} onClose={handleClose11}
                                    value={WhatNormalisationData[2].how} time={7500}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormExplanation1} onClose={handleClose12}
                                    value={WhatNormalisationData[2].explanation1} time={18000}/>
            <IndentifyingNormalForm show={showIdentify3NormalFormExplanation2} onClose={handleClose13}
                                    value={WhatNormalisationData[2].explanation2} time={7500}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormHow} onClose={handleClose14}
                                    value={WhatNormalisationData[3].how} time={7500}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormExplanation1} onClose={handleClose15}
                                    value={WhatNormalisationData[3].explanation1} time={16000}/>
            <IndentifyingNormalForm show={showIdentifyBCNormalFormExplanation2} onClose={handleClose16}
                                    value={WhatNormalisationData[3].explanation2} time={6000}/>
            <IndentifyingNormalFormExample show={showNormalForm2Identify} onClose={handleClose17}
                                           value={NormalisationExample1.Nf2Identification} time={14600}/>
            <IndentifyingNormalFormExample show={showNormalForm3Identify} onClose={handleClose18}
                                           value={NormalisationExample1.Nf3Identification} time={10000}/>
            <IndentifyingNormalFormExample show={showNormalFormBCIdentify} onClose={handleClose19}
                                           value={NormalisationExample1.BCNFDecomposition} time={5000}/>
            <MovetoDecomposition show={showMoveTODecomp} onClose={handleClose20} />
            <NFDecomposition1 show={showDecompose2NormalForm} onClose={handleClose21} time={20000} value={NormalisationExample1.Nf2DecompositionExplanation}/>
            <NFDecomposition1 show={showDecompose3NormalForm1} onClose={handleClose22} time={25500} value={NormalisationExample1.Nf3DecompositionExplanation1}/>
            <NFDecomposition1 show={showDecompose3NormalForm2} onClose={handleClose23} time={24500} value={NormalisationExample1.Nf3DecompositionExplanation2}/>
            <NFDecomposition1 show={showDecomposeBCNormalForm1} onClose={handleClose24} time={11000} value={NormalisationExample1.BCNFDecompositionExplanation}/>
            <NFDecomposition2 show={showDecomposeBCNormalForm2} onClose={handleClose25} time={22500} value={NormalisationExample2.BcnfDecompositionExplanation1}/>
            <NFDecomposition2 show={showDecomposeBCNormalForm3} onClose={handleClose26} time={17000} value={NormalisationExample2.BcnfDecompositionExplanation2}/>
            <PracticeNormalisation show={showFinalTest} />
        </div>
    );
};

export default NormalisationTutorial;
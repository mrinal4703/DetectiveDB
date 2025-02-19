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

const WhatAreKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.WhatAreKeys, show);

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
            }, 8000);
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
                            strings: [AppText.WhatAreKeys],
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

const SomeSpecialKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.SomeSpecialKeys, show);

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
                            strings: [AppText.SomeSpecialKeys],
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

const SuperKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.SuperKeys, show);

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
            }, 16000);
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
                            strings: [AppText.SuperKeys],
                            autoStart: true,
                            loop: false, // Stops after typing once
                            delay: 50,
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

const ReadSuperKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.ReadOutSuperKeys, show);

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
                    src={helperleft}
                    className="h-80 w-80 absolute bottom-0 right-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                />

                <div
                    className="absolute bottom-28 right-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black h-auto w-96">
                    <Typewriter
                        options={{
                            strings: [AppText.ReadOutSuperKeys],
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
                        onClick={handleClick()}
                    >
                        Okay
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

const CandidateKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.CandidateKeys, show);

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
            }, 8000);
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
                            strings: [AppText.CandidateKeys],
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

const WhatAreCandidateKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.CandidateKeysDef, show);

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
            }, 11000);
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
                            strings: [AppText.CandidateKeysDef],
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

const CandidateKeysEasy = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.CandidateKeyEasy1, show);

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
            }, 14000);
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
                            strings: [AppText.CandidateKeyEasy1],
                            autoStart: true,
                            loop: false, // Stops after typing once
                            delay: 50,
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

const CandidateKeysEasy2 = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.CandidateKeyEasy2, show);

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
                            strings: [AppText.CandidateKeyEasy2],
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

const CandidateKeyExplanation1 = ({show, onClose, value, time}) => {

    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
            // }, 10);
            // }, 1000);

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-40 bg-black/50 flex justify-center items-center"
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
                    transition={{duration: 0.3, ease: "easeOut" }}
                />

                <div
                    className="absolute bottom-28 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter className={'flex'}
                                options={{
                                    strings: [value], // Different text
                                    autoStart: true,
                                    loop: false,
                                    delay: 60,
                                    cursor: "|",
                                    deleteSpeed: Infinity,
                                }}
                    />
                    <button
                        className={`mt-4 px-3 z-50 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${showButton ? "block" : "hidden"}`}
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const CandidateKeyExplanation2 = ({show, onClose, value, time}) => {

    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
            // }, 10);
            // }, 1000);

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-40 bg-black/50 flex justify-center items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <motion.img
                    src={helperpeekright}
                    className="h-80 w-80 absolute top-10 left-0 object-contain rounded-xl"
                    alt="Assistant"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3, ease: "easeOut" }}
                />

                <div
                    className="absolute top-48 left-40 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter className={'flex'}
                                options={{
                                    strings: [value], // Different text
                                    autoStart: true,
                                    loop: false,
                                    delay: 60,
                                    cursor: "|",
                                    deleteSpeed: Infinity,
                                }}
                    />
                    <button
                        className={`mt-4 px-3 z-50 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${showButton ? "block" : "hidden"}`}
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const WhatArePrimaryKeys = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("boss", AppText.PrimaryKeyDef, show);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    // const handleClick = () => {
    //     playClickSound();
    //     onClose();
    // };

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 18000);
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
                            strings: [AppText.PrimaryKeyDef],
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
                            playClickSound();
                            window.scrollBy({
                                top: window.innerHeight, // Scroll down by the full height of the viewport
                                behavior: "smooth" // Smooth scrolling effect
                            });
                            onClose(); // Call your existing function
                        }}
                        // onClick={() => {
                        //     navigate("/TutorialKeysPractice");
                        //     window.location.reload();
                        // }}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const DirectWay = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.DirectWay, show);

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
                }, 9500);
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
                            strings: [AppText.DirectWay],
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

const GoldenMantra = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.GoldenMantra, show);

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
                }, 13000);
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
                            strings: [AppText.GoldenMantra],
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

const CandidateKeyUnderstand = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("female", AppText.CandidateKeyUnderstand, show);

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
                }, 5500);
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
                            strings: [AppText.CandidateKeyUnderstand],
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

const PrimeKeyAttribute = ({show, onClose}) => {
    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", AppText.PrimeKeyAttributes, show);

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
                }, 26500);
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
                    className="absolute bottom-28 right-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter
                        options={{
                            strings: [AppText.PrimeKeyAttributes],
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

const DirectMethodExplanation1 = ({show, onClose, value, time}) => {

    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
            // }, 10);
            // }, 1000);

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-40 bg-black/50 flex justify-center items-center"
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
                    transition={{duration: 0.3, ease: "easeOut" }}
                />

                <div
                    className="absolute -bottom-1 right-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter className={'flex'}
                                options={{
                                    strings: [value], // Different text
                                    autoStart: true,
                                    loop: false,
                                    delay: 60,
                                    cursor: "|",
                                    deleteSpeed: Infinity,
                                }}
                    />
                    <button
                        className={`mt-4 px-3 z-50 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${showButton ? "block" : "hidden"}`}
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const DirectMethodExplanation2 = ({show, onClose, value, time}) => {

    const [showButton, setShowButton] = useState(false);

    useVoiceSynthesis("junior", value, show);

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
            // }, 10);
            // }, 1000);

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [show]);

    return (
        show && (
            <motion.div
                className="fixed inset-0 z-40 bg-black/50 flex justify-center items-center"
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
                    transition={{duration: 0.3, ease: "easeOut" }}
                />

                <div
                    className="absolute -bottom-1 left-28 text-lg text-black p-3 mx-20 bg-white my-6 rounded-2xl shadow-inner border-2 border-black w-auto">
                    <Typewriter className={'flex'}
                                options={{
                                    strings: [value], // Different text
                                    autoStart: true,
                                    loop: false,
                                    delay: 60,
                                    cursor: "|",
                                    deleteSpeed: Infinity,
                                }}
                    />
                    <button
                        className={`mt-4 px-3 z-50 py-1 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in ${showButton ? "block" : "hidden"}`}
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        )
    );
};

const PracticeCandidateKeys = ({show}) => {
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useVoiceSynthesis("boss", AppText.PracticeKeys, show);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    // const handleClick = () => {
    //     playClickSound();
    //     onClose();
    // };

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
                            strings: [AppText.PracticeKeys],
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
                            playClickSound();
                            navigate("/TutorialKeysPractice");
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

    // useBackgroundMusic(ingame);

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
    //
    // const handleClose36 = () => {
    //     setShowLetsPracticeKeys(false);
    // }

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

                <div className={''}>
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
                                      value={SuperKeysExample1Json[0].candidateKey1Explanation} time={18000}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation2} onClose={handleClose11}
                                      value={SuperKeysExample1Json[0].candidateKey2Explanation} time={22000}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation3} onClose={handleClose12}
                                      value={SuperKeysExample1Json[0].candidateKey3Explanation} time={22000}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation4} onClose={handleClose13}
                                      value={SuperKeysExample1Json[0].candidateKey4Explanation} time={22000}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation5} onClose={handleClose14}
                                      value={SuperKeysExample1Json[0].candidateKey5Explanation} time={18500}/>
            <CandidateKeyExplanation1 show={showCandidateKeysExample1Explanation6} onClose={handleClose15}
                                      value={SuperKeysExample1Json[0].candidateKey6Explanation} time={15000}/>
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation1} onClose={handleClose16}
                                      value={SuperKeysExample2Json[0].candidateKey1Explanation} time={18000}/>
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation2} onClose={handleClose17}
                                      value={SuperKeysExample2Json[0].candidateKey2Explanation} time={15000}/>
            <CandidateKeyExplanation2 show={showCandidateKeysExample2Explanation3} onClose={handleClose18}
                                      value={SuperKeysExample2Json[0].candidateKey3Explanation} time={15000}/>
            <WhatArePrimaryKeys show={showWhatarePrimaryKeys} onClose={handleClose19}/>
            <DirectWay show={showDirectWay} onClose={handleClose20}/>
            <GoldenMantra show={showGoldenMantra} onClose={handleClose21}/>
            <CandidateKeyUnderstand show={showCandidateKeyUnderstand} onClose={handleClose22}/>
            <PrimeKeyAttribute show={showPrimeKeyAttribute} onClose={handleClose23}/>

            <DirectMethodExplanation1 show={showDirectMethodExplanation1Example1} onClose={handleClose24} time={11000} value={goodCandidateKeysExample[0].explanation1} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation2Example1} onClose={handleClose25} time={18000} value={goodCandidateKeysExample[0].explanation2} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation3Example1} onClose={handleClose26} time={13000} value={goodCandidateKeysExample[0].explanation3} />
            <DirectMethodExplanation1 show={showDirectMethodExplanation4Example1} onClose={handleClose27} time={6000} value={goodCandidateKeysExample[0].explanation4} />

            <DirectMethodExplanation2 show={showDirectMethodExplanation0Example2} onClose={handleClose28} time={19500} value={goodCandidateKeysExample[1].explanation0} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation1Example2} onClose={handleClose29} time={18500} value={goodCandidateKeysExample[1].explanation1} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation2Example2} onClose={handleClose30} time={10400} value={goodCandidateKeysExample[1].explanation2} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation3Example2} onClose={handleClose31} time={9300} value={goodCandidateKeysExample[1].explanation3} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation4Example2} onClose={handleClose32} time={9300} value={goodCandidateKeysExample[1].explanation4} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation5Example2} onClose={handleClose33} time={7200} value={goodCandidateKeysExample[1].explanation5} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation6Example2} onClose={handleClose34} time={9000} value={goodCandidateKeysExample[1].explanation6} />
            <DirectMethodExplanation2 show={showDirectMethodExplanation7Example2} onClose={handleClose35} time={11500} value={goodCandidateKeysExample[1].explanation7} />
            <PracticeCandidateKeys show={showLetsPracticeKeys}/>

        </div>
    );
};

export default KeysTutorial;

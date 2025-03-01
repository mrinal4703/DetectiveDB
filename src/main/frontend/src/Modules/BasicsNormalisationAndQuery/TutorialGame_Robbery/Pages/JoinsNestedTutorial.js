import React, {useState} from 'react';
import {clicksound} from "../../../../Resources/Sounds";
import {Link} from "react-router-dom";
import {joinsqlpractice, sqlpracticepic} from "../../../../Resources/Images/Others";
import NavBarInGame from "../NavBarInGame";

const JoinsNestedTutorial = () => {

    const [showDiv1, setShowDiv1] = useState(true);

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClickDiv1 = () => {
        playClickSound();
        setShowDiv1(false);
        // setTimeout(() => setShowIntroto1Module2(true), 1500);
    };

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
                            <h1 className="text-left text-white font-semibold text-4xl mb-3">Joins and Nested Query</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinsNestedTutorial;
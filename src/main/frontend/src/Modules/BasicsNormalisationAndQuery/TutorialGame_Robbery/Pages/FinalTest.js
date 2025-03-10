import React, {useState} from "react";
import axios from "axios";
import {username} from "../../../../Constants/Texts/constants";
import {
    CamerasTables,
    LocationsTables,
    PersonsRoomsTables,
    PersonsTables,
    updateProgress,
    WitnessSatementsTables
} from "../../../../Constants/Texts";
import NavBarInGame from "../NavBarInGame";
import {IoClose} from "react-icons/io5";
import {clicksound} from "../../../../Resources/Sounds";
import {hintlens, progress} from "../../../../Resources/Images/Others";

const Sidebar = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    return (
        <div
            className={`fixed p-2 top-16 h-max inset-y-0 right-0 w-96 z-50 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between text-black items-center mb-4">
                <h3 className="text-xl font-semibold">Evidence Clues</h3>
                <button className="text-black text-2xl" onClick={handleClick}>
                    <IoClose/>
                </button>
            </div>

            <ul className="space-y-3 text-black">
                <li>
                    <strong>1. Suspicious Activity in Living Room:</strong> Find a person in the <strong>Living
                    Room</strong> who was <strong>watching TV</strong>.
                </li>
                <li>
                    <strong>2. Witness Statement About Suspicious Activity:</strong> Find a witness statement for
                    the <strong>Lounge</strong> that mentions <strong>suspicious activity</strong>.
                </li>
                <li>
                    <strong>3. Camera Footage Confirming Suspicious Activity:</strong> Find camera footage from
                    the <strong>Living Room</strong> (<code>camera_id = 1</code>) that shows <strong>suspicious
                    activity</strong>.
                </li>
            </ul>
        </div>
    );
};

const Sidebar2 = ({isOpen, onClose, evidence}) => {
    if (!isOpen) return null;

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const handleClick = () => {
        playClickSound();
        onClose();
    };

    return (
        <div
            className={`fixed p-2 top-16 h-max inset-y-0 right-0 w-96 z-50 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between text-black items-center mb-4">
                <h3 className="text-xl font-semibold mb-4">Evidence Collected</h3>
                <button className="text-black text-2xl" onClick={handleClick}>
                    <IoClose/>
                </button>
            </div>

            {/* Evidence Status */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
                <ul className="space-y-2">
                    <li>
                        Suspicious Activity in Living Room:{" "}
                        {evidence.suspiciousActivity ? "✅" : "❌"}
                    </li>
                    <li>
                        Witness Statement About Suspicious Activity:{" "}
                        {evidence.witnessStatement ? "✅" : "❌"}
                    </li>
                    <li>
                        Camera Footage Confirming Suspicious Activity:{" "}
                        {evidence.cameraFootage ? "✅" : "❌"}
                    </li>
                </ul>
            </div>
        </div>
    );
};

function FinalTest() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [isSidebarOpen1, setIsSidebarOpen1] = useState(false);
    const [isSidebarOpen2, setIsSidebarOpen2] = useState(false);
    const [error, setError] = useState(null);
    const [guess, setGuess] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [culpritFound, setCulpritFound] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [nestedQuerySuccess, setNestedQuerySuccess] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [evidence, setEvidence] = useState({
        suspiciousActivity: false,
        witnessStatement: false,
        cameraFootage: false,
    });

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const allEvidenceCollected =
        evidence.suspiciousActivity && evidence.witnessStatement && evidence.cameraFootage;

    const executeQuery = async () => {

        playClickSound();

        if (!query.trim()) {
            setError("Please enter a valid SQL query.");
            return;
        }

        try {
            const response = await axios.get(`http://${username}/api/sql/execute`, {
                params: {query},
            });

            if (response.data.error) {
                setError(response.data.error);
                setResult(null);
                setShowTable(false); // Hide the table on error
            } else if (response.data.message) {
                setError(null);
                setResult("No data found.");
                setShowTable(false); // Hide the table if no data is found
            } else {
                setError(null);
                setResult(response.data.data);
                setShowTable(true); // Show the ta

                if (Array.isArray(response.data.data)) {
                    const data = response.data.data;

                    // Fix evidence tracking logic
                    if (
                        query.toLowerCase().includes("location = 'living room'") &&
                        query.toLowerCase().includes("action = 'watching tv'") &&
                        data.some(
                            (row) =>
                                row.location?.toLowerCase().trim() === "living room" &&
                                row.action?.toLowerCase().trim() === "watching tv"
                        )
                    ) {
                        setEvidence((prev) => ({...prev, suspiciousActivity: true}));
                    }

                    if (
                        query.toLowerCase().includes("room_type = 'lounge'") &&
                        query.toLowerCase().includes("statement like '%suspicious%'") &&
                        data.some(
                            (row) =>
                                row.room_type?.toLowerCase().trim() === "lounge" &&
                                row.statement?.toLowerCase().trim().includes("suspicious")
                        )
                    ) {
                        setEvidence((prev) => ({...prev, witnessStatement: true}));
                    }

                    if (
                        query.toLowerCase().includes("camera_id = 1") &&
                        query.toLowerCase().includes("footage = 'footage of suspicious activity'") &&
                        data.some(
                            (row) =>
                                row.camera_id === "1" &&
                                row.footage?.toLowerCase().trim() === "footage of suspicious activity"
                        )
                    ) {
                        setEvidence((prev) => ({...prev, cameraFootage: true}));
                    }
                    // SELECT * FROM persons WHERE location = 'Living Room' AND action = 'watching tv'
                    // SELECT * FROM witnessstatements WHERE room_type = 'Lounge' AND statement LIKE '%suspicious%';
                    // SELECT * FROM camera WHERE camera_id = 1 and footage = 'footage of suspicious activity'
                    // Ensure culprit logic works
                    if (allEvidenceCollected && query.toLowerCase().includes("select")) {
                        const culpritName = data.find(
                            (row) => row.person_name?.toLowerCase().trim() === "alice"
                        );

                        if (culpritName) {
                            setNestedQuerySuccess(true);
                        } else {
                            setError("Incorrect nested query or incomplete evidence. Try again cautiously!");
                        }
                    }
                }
            }
        } catch (err) {
            setError("Server Error: " + err.message);
        }
    };

    const handleGuess = () => {
        if (guess.trim().toLowerCase() === "alice") {
            updateProgress(3.0);
            setCulpritFound(true);
            setGameOver(true);
        } else {
            setAttemptsLeft((prev) => prev - 1);
            if (attemptsLeft <= 1) {
                setGameOver(true);
            }
            setError(
                `Incorrect guess. ${attemptsLeft - 1} attempts left. Re-examine the evidence and refine your nested query.`
            );
        }
    };

    const handleCloseTable = () => {
        setShowTable(false);
        setResult(null); // Clear result to prevent rendering issues
    };

    const handleClickHint = () => {
        playClickSound(); // Play the click sound
        openSidebar(); // Call the original function
    };

    const handleClickProgress = () => {
        playClickSound(); // Play the click sound
        openSidebarp(); // Call the original function
    };

    const openSidebar = () => {
        setIsSidebarOpen1(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen1(false);
    };

    const openSidebarp = () => {
        setIsSidebarOpen2(true);
    };

    const closeSidebarp = () => {
        setIsSidebarOpen2(false);
    };

    return (
        <div className="w-screen overflow-x-hidden overflow-y-auto min-h-screen bg-[#a2e1e1] relative">
            <NavBarInGame pageName={"TutorialFinalSQLPractice"}/>
            <div className="w-screen bg-[#2f3749] py-0.5">
                <h1 className="text-left ml-1 text-white font-semibold text-4xl mb-3">
                    Find the Robber!
                </h1>
            </div>
            <p className="text-center text-xl text-black">
                A robbery has occurred in the house! Use SQL queries to find clues and identify the robber among the 15
                suspects.
            </p>

            {/* Database Schema */}
            <div className={'p-3'}>
                <div className="bg-white w-full p-1.5 rounded-lg shadow-md">
                    <h1 className={'text-black font-semibold mx-8 text-2xl '}>Database</h1>
                    <div className={'grid grid-cols-5 gap-3'}>
                        <div>
                            <h1 className={'text-black font-semibold text-lg '}>Relation(persons)</h1>
                            <div className={'mx-auto justify-between'}>
                                <PersonsTables/>
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-black font-semibold text-lg '}>Relation(personrooms)</h1>
                            <div className={'mx-auto justify-between'}>
                                <PersonsRoomsTables/>
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-black font-semibold text-lg '}>Relation(witnesssatements)</h1>
                            <div className={'mx-auto justify-between'}>
                                <WitnessSatementsTables/>
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-black font-semibold text-lg '}>Relation(locations)</h1>
                            <div className={'mx-auto justify-between'}>
                                <LocationsTables/>
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-black font-semibold text-lg '}>Relation(camera)</h1>
                            <div className={'mx-auto justify-between'}>
                                <CamerasTables/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Query Section */}
            <div className="mb-8 p-3">
                <div className={'grid grid-cols-6'}>
                    <div className={'col-span-4'}>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Find Clues</h2>
                            <input
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-900"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter your SQL query"
                            />
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={executeQuery}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Run Query
                                </button>
                            </div>

                            {showTable && result && Array.isArray(result) ? (
                                <>
                                    <div className="grid mb-2.5 justify-end">
                                        <div className="group">
                                            <button
                                                className="relative mt-4 text-black text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
                                                onClick={() => {
                                                    playClickSound();
                                                    handleCloseTable();
                                                }}
                                            >
                                                <IoClose/>
                                                <span
                                                    className="absolute z-40 invisible group-hover:visible text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                                >
                                        Close
                                    </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                {Object.keys(result[0]).map((key) => (
                                                    <th key={key} className="border border-gray-300 px-4 py-2">
                                                        {key}
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {result.map((row, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    {Object.values(row).map((value, i) => (
                                                        <td
                                                            key={i}
                                                            className={`border border-gray-300 px-4 py-2 ${
                                                                value === 'Correct!' ? 'text-green-500' :
                                                                    value === 'Incorrect' ? 'text-red-500' :
                                                                        'text-black'
                                                            }`}
                                                        >
                                                            {typeof value === 'object' ? JSON.stringify(value) : value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                !showTable && result && typeof result === 'string' && (
                                    <p className={`mt-4 text-lg font-semibold ${
                                        result === 'Correct!' ? 'text-green-500' :
                                            result === 'Incorrect' ? 'text-red-500' :
                                                'text-black'
                                    }`}>
                                        {result}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    <div className={'col-span-2 flex-col p-5 justify-evenly'}>
                        <div className={'flex justify-evenly'}>
                            <button
                                onClick={handleClickHint}>
                                <img src={hintlens}
                                     className={'h-32 p-2 hover:border-[2.5px] hover:border-black rounded-full'}
                                     alt={'Hint Lens'}/>
                                <h1>Evidence Hint</h1>
                            </button>
                            <div className={'flex flex-col'}>
                                <button
                                    onClick={handleClickProgress}
                                    className="relative overflow-hidden rounded-full p-2 hover:border-[2.5px] hover:border-black"
                                >
                                    {/* Background divided into three sections */}
                                    <div
                                        className="absolute inset-0 z-0 rounded-full"
                                        style={{
                                                background: `conic-gradient(
                                                    ${evidence.suspiciousActivity ? '#4CAF50' : '#a2e1e1'} 1deg 119deg,
                                                    #000000 119deg 121deg,
                                                    ${evidence.witnessStatement ? '#4CAF50' : '#a2e1e1'} 121deg 239deg,
                                                    #000000 239deg 243deg,
                                                    ${evidence.cameraFootage ? '#4CAF50' : '#a2e1e1'} 243deg 359deg,
                                                    #000000 359deg 1deg
                                                )`,
                                            }}
                                    ></div>
                                    {/* Image and text */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <img
                                            src={progress}
                                            className="h-28 rounded-full bg-white"
                                            alt="Hint Lens"
                                        />
                                        {/*<h1 className="mt-2">Evidence Collected</h1>*/}
                                    </div>
                                </button>
                                <h1 className="mt-2">Evidence Collected</h1>
                            </div>
                        </div>
                        <div>
                            {/* Prompt for Nested Query */}
                            {allEvidenceCollected && !nestedQuerySuccess && (
                                <div className="my-4 bg-white p-4 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">Solve the Mystery</h2>
                                    <p className="mb-4">
                                        You have collected all the evidence! Write a nested SQL query to reveal the
                                        culprit's name.
                                    </p>
                                </div>
                            )}

                            {/* Guess Section */}
                            {nestedQuerySuccess && !culpritFound && !gameOver && (
                                <div className=" my-2 p-2 bg-white rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">Guess the Culprit</h2>
                                    <div className={'flex gap-2'}>
                                        <input
                                            type="text"
                                            value={guess}
                                            onChange={(e) => setGuess(e.target.value)}
                                            placeholder="Enter the culprit's name"
                                            className="p-2 border border-gray-300 rounded-lg"
                                        />
                                        <button onClick={handleGuess}
                                                className="px-5 py-3 bg-[#495f67] text-white font-semibold rounded-lg shadow-md hover:bg-[#2e3c49] transition ease-in">
                                            Submit Guess
                                        </button>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 bg-red-100 p-4 rounded-lg shadow-md">
                                    <p className="text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Game Over Messages */}
                            {culpritFound && (
                                <div className="my-6 bg-green-100 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-green-700 mb-4">Case Solved!</h2>
                                    <p className="text-green-700">You have identified <strong>Alice</strong> as the
                                        culprit.</p>
                                </div>
                            )}

                            {gameOver && !culpritFound && (
                                <div className="my-6 bg-red-100 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-red-700 mb-4">Game Over!</h2>
                                    <p className="text-red-700">You have exhausted all attempts. The culprit
                                        was <strong>Alice</strong>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*/!* Evidence Status *!/*/}
            {/*<div className="mb-8 bg-white p-6 rounded-lg shadow-md">*/}
            {/*    <h3 className="text-xl font-semibold mb-4">Evidence Collected</h3>*/}
            {/*    <ul className="space-y-2">*/}
            {/*        <li>*/}
            {/*            Suspicious Activity in Living Room:{" "}*/}
            {/*            {evidence.suspiciousActivity ? "✅" : "❌"}*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            Witness Statement About Suspicious Activity:{" "}*/}
            {/*            {evidence.witnessStatement ? "✅" : "❌"}*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            Camera Footage Confirming Suspicious Activity:{" "}*/}
            {/*            {evidence.cameraFootage ? "✅" : "❌"}*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/* Result Display */}
            {/*{result && Array.isArray(result) ? (*/}
            {/*    <div className="overflow-x-auto">*/}
            {/*        <table className="min-w-full bg-white border border-gray-300">*/}
            {/*            <thead className="bg-gray-100">*/}
            {/*            <tr>*/}
            {/*                {Object.keys(result[0]).map((key) => (*/}
            {/*                    <th key={key} className="px-4 py-2 border border-gray-300">*/}
            {/*                        {key}*/}
            {/*                    </th>*/}
            {/*                ))}*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {result.map((row, index) => (*/}
            {/*                <tr key={index} className="hover:bg-gray-50">*/}
            {/*                    {Object.values(row).map((value, i) => (*/}
            {/*                        <td key={i} className="px-4 py-2 border border-gray-300">*/}
            {/*                            {value}*/}
            {/*                        </td>*/}
            {/*                    ))}*/}
            {/*                </tr>*/}
            {/*            ))}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    result && <p>{result}</p>*/}
            {/*)}*/}

            {/*/!* Guess Section *!/*/}
            {/*{nestedQuerySuccess && !culpritFound && !gameOver && (*/}
            {/*    <div className="my-6">*/}
            {/*        <h2 className="text-xl font-semibold mb-4">Guess the Culprit</h2>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={guess}*/}
            {/*            onChange={(e) => setGuess(e.target.value)}*/}
            {/*            placeholder="Enter the culprit's name"*/}
            {/*            className="p-2 border border-gray-300 rounded-lg"*/}
            {/*        />*/}
            {/*        <button onClick={handleGuess} className="bg-green-500 text-white px-6 py-2 rounded-lg">*/}
            {/*            Submit Guess*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{error && (*/}
            {/*    <div className="mt-4 bg-red-100 p-4 rounded-lg shadow-md">*/}
            {/*        <p className="text-red-700">{error}</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*/!* Game Over Messages *!/*/}
            {/*{culpritFound && (*/}
            {/*    <div className="my-6 bg-green-100 p-6 rounded-lg shadow-md">*/}
            {/*        <h2 className="text-2xl font-bold text-green-700 mb-4">Case Solved!</h2>*/}
            {/*        <p className="text-green-700">You have identified <strong>Alice</strong> as the culprit.</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{gameOver && !culpritFound && (*/}
            {/*    <div className="my-6 bg-red-100 p-6 rounded-lg shadow-md">*/}
            {/*        <h2 className="text-2xl font-bold text-red-700 mb-4">Game Over!</h2>*/}
            {/*        <p className="text-red-700">You have exhausted all attempts. The culprit was <strong>Alice</strong>.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*)}*/}
            <Sidebar isOpen={isSidebarOpen1} onClose={closeSidebar}/>
            <Sidebar2 isOpen={isSidebarOpen2} onClose={closeSidebarp} evidence={evidence}/>
        </div>
    );
}

export default FinalTest;
import React, { useState } from "react";
import axios from "axios";
import { username } from "../../../../Constants/Texts/constants";
import {updateProgress} from "../../../../Constants/Texts";

function FinalTest() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [guess, setGuess] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [culpritFound, setCulpritFound] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [nestedQuerySuccess, setNestedQuerySuccess] = useState(false);
    const [evidence, setEvidence] = useState({
        suspiciousActivity: false,
        witnessStatement: false,
        cameraFootage: false,
    });

    const allEvidenceCollected =
        evidence.suspiciousActivity && evidence.witnessStatement && evidence.cameraFootage;

    const executeQuery = async () => {
        if (!query.trim()) {
            setError("Please enter a valid SQL query.");
            return;
        }

        try {
            const response = await axios.get(`http://${username}/api/sql/execute`, {
                params: { query },
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
                        setEvidence((prev) => ({ ...prev, suspiciousActivity: true }));
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
                        setEvidence((prev) => ({ ...prev, witnessStatement: true }));
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
                        setEvidence((prev) => ({ ...prev, cameraFootage: true }));
                    }

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

    return (
        <div className="App p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Detective Game - Find the Robber!</h1>
            <p className="text-center text-gray-700 mb-8">
                A robbery has occurred in the house! Use SQL queries to find clues and identify the robber among the 15 suspects.
            </p>

            {/* Database Schema */}
            <div className="my-10 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Database Schema</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li><strong>persons</strong> (person_name, location, action)</li>
                    <li><strong>personrooms</strong> (person_name, room_type, room_contents)</li>
                    <li><strong>witnessstatements</strong> (room_type, time, statement)</li>
                    <li><strong>locations</strong> (location, camera_id)</li>
                    <li><strong>cameras</strong> (camera_id, status, footage)</li>
                </ul>
            </div>

            {/* Evidence Clues */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Evidence Clues</h3>
                <ul className="space-y-2">
                    <li>
                        <strong>Suspicious Activity in Living Room</strong>: Find a person in the <strong>Living Room</strong> who was <strong>watching TV</strong>.
                    </li>
                    <li>
                        <strong>Witness Statement About Suspicious Activity</strong>: Find a witness statement for the <strong>Lounge</strong> that mentions <strong>suspicious activity</strong>.
                    </li>
                    <li>
                        <strong>Camera Footage Confirming Suspicious Activity</strong>: Find camera footage from the <strong>Living Room</strong> (camera_id = 1) that shows <strong>suspicious activity</strong>.
                    </li>
                </ul>
            </div>

            {/* Query Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Find Clues</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your SQL query"
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={executeQuery}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Run Query
                    </button>
                </div>
            </div>

            {/* Prompt for Nested Query */}
            {allEvidenceCollected && !nestedQuerySuccess && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Solve the Mystery</h2>
                    <p className="mb-4">
                        You have collected all the evidence! Write a nested SQL query to reveal the culprit's name.
                    </p>
                </div>
            )}

            {/* Evidence Status */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Evidence Collected</h3>
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

            {/* Result Display */}
            {result && Array.isArray(result) ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            {Object.keys(result[0]).map((key) => (
                                <th key={key} className="px-4 py-2 border border-gray-300">
                                    {key}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {result.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {Object.values(row).map((value, i) => (
                                    <td key={i} className="px-4 py-2 border border-gray-300">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                result && <p>{result}</p>
            )}

            {/* Guess Section */}
            {nestedQuerySuccess && !culpritFound && !gameOver && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Guess the Culprit</h2>
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="Enter the culprit's name"
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <button onClick={handleGuess} className="bg-green-500 text-white px-6 py-2 rounded-lg">
                        Submit Guess
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 bg-red-100 p-4 rounded-lg shadow-md">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Game Over Messages */}
            {culpritFound && (
                <div className="mt-8 bg-green-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-green-700 mb-4">Case Solved!</h2>
                    <p className="text-green-700">You have identified <strong>Alice</strong> as the culprit.</p>
                </div>
            )}

            {gameOver && !culpritFound && (
                <div className="mt-8 bg-red-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">Game Over!</h2>
                    <p className="text-red-700">You have exhausted all attempts. The culprit was <strong>Alice</strong>.</p>
                </div>
            )}
        </div>
    );
}

export default FinalTest;
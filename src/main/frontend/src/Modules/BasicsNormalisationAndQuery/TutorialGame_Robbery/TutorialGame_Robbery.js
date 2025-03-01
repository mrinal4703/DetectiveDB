import React from 'react';
import TutorialGame from "./Pages/TutorialGame";
import FDTest from "./Pages/FDTest";
import KeysTutorial from "./Pages/KeysTutorial";
import KeysTest from "./Pages/KeysTest";
import NormalisationTutorial from "./Pages/NormalisationTutorial";
import NormalisationTest from "./Pages/NormalisationTest";
import TutorialModule2 from "./Pages/TutorialModule2";
import FinalTest from "./Pages/FinalTest";
import QueryLanguageTest1 from "./Pages/QueryLanguageTest1";

const TutorialGameRobbery = () => {
    return (
        <div>
            <TutorialGame/>
            <FDTest/>
            <KeysTutorial/>
            <KeysTest/>
            <NormalisationTutorial/>
            <NormalisationTest/>
            <TutorialModule2/>
            <QueryLanguageTest1/>
            <FinalTest/>
        </div>
    );
};

export default TutorialGameRobbery;
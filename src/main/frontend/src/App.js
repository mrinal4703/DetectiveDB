import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./Modules/LandingPage";
import TutorialGame from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/TutorialGame";
import FDTest from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/FDTest";
import KeysTutorial from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/KeysTutorial";
import KeysTest from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/KeysTest";
import NormalisationTutorial from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/NormalisationTutorial";
import NormalisationTest from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/NormalisationTest";
import TutorialModule2 from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/TutorialModule2";
import {useEffect} from "react";
import FinalTest from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/FinalTest";
import QueryLanguageTest1 from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/QueryLanguageTest1";
import JoinsNestedTutorial from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/JoinsNestedTutorial";
import QueryLanguageTest2 from "./Modules/BasicsNormalisationAndQuery/TutorialGame_Robbery/Pages/QueryLanguageTest2";
import VandalismNormalisation
    from "./Modules/BasicsNormalisationAndQuery/Game2_CarVandalism/Pages/VandalismNormalisation";
import VandalismSQL from "./Modules/BasicsNormalisationAndQuery/Game2_CarVandalism/Pages/VandalismSQL";
import KidnapNormalisation from "./Modules/BasicsNormalisationAndQuery/Game3_Kidnap/Pages/KidnapNormalisation";
import KidnapSQL from "./Modules/BasicsNormalisationAndQuery/Game3_Kidnap/Pages/KidnapSQL";
import MurderNormalisation from "./Modules/BasicsNormalisationAndQuery/Game1_Murder/Pages/MurderNormalisation";
import MurderSQL from "./Modules/BasicsNormalisationAndQuery/Game1_Murder/Pages/MurderSQL";

function App() {

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if Ctrl (or Cmd on macOS) and R are pressed
            if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
                event.preventDefault(); // Prevent the default reload behavior
                console.log('Reloading is disabled');
            }
        };

        // Add the event listener
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            {/*<div className="App ubuntu-regular overflow-y-auto scrollbar-hide no-scroll">*/}
            <div className="App ubuntu-regular overflow-y-auto scrollbar-hide overflow-x-scroll">
                <Router>
                    <Routes>
                        <Route exact path="/"
                               element={<LandingPage/>}/>
                        <Route exact path="/Tutorial"
                               element={<TutorialGame/>}/>
                        <Route exact path="/TutorialFDPractice"
                               element={<FDTest/>}/>
                        <Route exact path="/KeysTutorial"
                               element={<KeysTutorial/>}/>
                        <Route exact path="/TutorialKeysPractice"
                               element={<KeysTest/>}/>
                        <Route exact path="/NormalisationTutorial"
                               element={<NormalisationTutorial/>}/>
                        <Route exact path="/TutorialNFPractice"
                               element={<NormalisationTest/>}/>
                        <Route exact path="/TutorialModule2"
                               element={<TutorialModule2/>}/>
                            <Route exact path="/TutorialSQLPractice"
                               element={<QueryLanguageTest1/>}/>
                        <Route exact path="/JoinsTutorial"
                               element={<JoinsNestedTutorial/>}/>
                        <Route exact path="/TutorialJoinsPractice"
                               element={<QueryLanguageTest2/>}/>
                        <Route exact path="/TutorialFinalSQLPractice"
                               element={<FinalTest/>}/>
                        <Route exact path="/KidnapNormalisation"
                               element={<KidnapNormalisation/>}/>
                        <Route exact path="/KidnapSQL"
                               element={<KidnapSQL/>}/>
                        <Route exact path="/VandalismNormalisation"
                               element={<VandalismNormalisation/>}/>
                        <Route exact path="/VandalismSQL"
                               element={<VandalismSQL/>}/>
                        <Route exact path="/MurderNormalisation"
                               element={<MurderNormalisation/>}/>
                        <Route exact path="/MurderSQL"
                               element={<MurderSQL/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;

import React from 'react';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {detectivedp} from "../../../Resources/Images/People";
import {Link, useNavigate} from "react-router-dom";
import {clicksound, hoversound} from "../../../Resources/Sounds";
import {email, email_session, isLoggedIn, isLoggedIn_session, username} from "../../../Constants/Texts/constants";
import axios from "axios";
import {ProgressStars} from "../../../Constants/Texts";

const NavBarInGame = ({pageName}) => {

    const navigate = useNavigate();

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(hoversound);
        audio.play();
    };

    const handleSaveProgress = async () => {
        playClickSound();

        // Get the logged-in user's email
        const loggedInUserEmail = email || email_session;

        if (!loggedInUserEmail) {
            alert("No user logged in.");
            return;
        }

        try {
            const response = await axios.put(`http://${username}/updateLastSaved`, {
                email: loggedInUserEmail, // Sending the stored email
                lastsaved: pageName // Updating `lastsaved` with the current page
            });

            alert(response.data); // Show success message
        } catch (error) {
            console.error("Error updating last saved progress:", error);
            alert("Failed to save progress. Try again.");
        }
    };

    const handleLogout = async () => {
        playClickSound();

        const loggedInUserEmail = email || email_session;

        if (!loggedInUserEmail) {
            alert("No user logged in.");
            return;
        }

        try {
            // Save progress before logging out
            await handleSaveProgress();

            // Confirm logout
            if (window.confirm("Are you sure you want to logout?")) {
                // Clear user session data
                localStorage.removeItem("isLoggedIn");
                sessionStorage.removeItem("isLoggedIn");
                localStorage.removeItem("loggedinuseremail");
                sessionStorage.removeItem("loggedinuseremail");

                // Redirect to login page
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error saving progress before logout:", error);
            alert("Failed to save progress before logout.");
        }
    };


    return (
        <div>
            <div className={'fixed right-4 top-0.5 z-[60] h-20'}>
                <div className="flex items-end mr-10">
                    <div className="flex mx-2 text-white my-auto">
                        <div className={'mt-2'}><ProgressStars /></div>
                        <div className={'flex justify-between'}>
                            <Menu as="div" className="inline-block text-left">
                                <div>
                                    <MenuButton className={'border-[2.5px] border-white rounded-full p-0.5'}
                                                onClick={() => {
                                                    playClickSound();
                                                }}
                                                id="menu-button"
                                                aria-expanded="true" aria-haspopup="true">
                                        <img src={detectivedp} className={'lg15.6:w-16 lg15.6:h-16 w-12 h-12'} alt={'detective dp'}/>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-4 z-40 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 border-black border-2 data-leave:ease-in"
                                >
                                    <div className="">
                                        <MenuItem onMouseEnter={playHoverSound}>
                                        <Link to="/"
                                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                  onClick={handleSaveProgress}>
                                                Go Home
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onMouseEnter={playHoverSound}>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2f3749] hover:text-white hover:text-md w-full text-left"
                                                onClick={handleSaveProgress}
                                            >
                                                Save Progress
                                            </button>
                                        </MenuItem>
                                        <MenuItem onMouseEnter={playHoverSound}>
                                            <button
                                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                  onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarInGame;
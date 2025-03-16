import React, {useState} from "react";
import {logo} from "../Resources/Images/Others";
import {Link, useNavigate} from "react-router-dom";
import Login_Signup from "../Constants/Texts/Login_Signup";
import {clicksound, hoversound} from "../Resources/Sounds";
import {detectivedp} from "../Resources/Images/People";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {isLoggedIn, isLoggedIn_session} from "../Constants/Texts/constants";

const NavBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const playClickSound = () => {
        const audio = new Audio(clicksound);
        audio.play();
    };

    const playHoverSound = () => {
        const audio = new Audio(hoversound);
        audio.play();
    };

    const handleLogout = () => {
        playClickSound();
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedinuseremail");
            sessionStorage.removeItem("loggedinuseremail");
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="flex justify-between p-1 lg15.6:h-24 h-20 w-screen bg-[#2f3749] relative">
                <div className="flex">
                    <img src={logo} className="h-full rounded-lg" alt="Logo"/>
                    <span className="text-white lg15.6:text-5xl text-4xl my-3 ml-3">
                        Learn DBMS through solving cases!
                    </span>
                </div>
                <div className="flex items-end mr-10">
                    <div className="mx-2 lg15.6:text-xl text-base text-white my-auto">
                        {isLoggedIn || isLoggedIn_session ? (
                            <div className={'flex justify-between'}>
                                <Menu as="div" className="inline-block text-left">
                                    <div>
                                        <MenuButton className={'border-[2.5px] border-white rounded-full p-0.5'} onClick={() => {playClickSound();}}
                                                    id="menu-button"
                                                    aria-expanded="true" aria-haspopup="true">
                                            <img src={detectivedp} className={'lg15.6:w-16 lg15.6:h-16 w-12 h-12'}/>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-4 z-40 lg15.6:w-72 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 border-black border-2 data-leave:ease-in"
                                    >
                                        <div className="">
                                            <MenuItem onMouseEnter={playHoverSound}>
                                                <a
                                                    href="#"
                                                    className="block lg15.6:px-6 lg15.6:py-2.5 px-4 py-2 lg15.6:text-lg text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                >
                                                    Account settings
                                                </a>
                                            </MenuItem>
                                            <MenuItem onMouseEnter={playHoverSound}>
                                                <a
                                                    href="#"
                                                    className="block lg15.6:px-6 lg15.6:py-2.5 px-4 py-2 lg15.6:text-lg text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                >
                                                    Support
                                                </a>
                                            </MenuItem>
                                            <MenuItem onMouseEnter={playHoverSound}>
                                                <a
                                                    href="#"
                                                    className="block lg15.6:px-6 lg15.6:py-2.5 px-4 py-2 lg15.6:text-lg text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                >
                                                    License
                                                </a>
                                            </MenuItem>
                                            <MenuItem onMouseEnter={playHoverSound}>
                                                <Link to="/"
                                                      className="block w-full lg15.6:px-6 lg15.6:py-2.5 px-4 py-2 text-left lg15.6:text-lg text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#2f3749] hover:text-white hover:text-md"
                                                      onClick={handleLogout}>
                                                    Logout
                                                </Link>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                        ) : (
                            <button onClick={() => {
                                playClickSound();
                                setShowLoginModal(true);
                            }}>
                                Login/Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {
                showLoginModal && <Login_Signup closeModal={() => setShowLoginModal(false)}/>
            }
        </div>
    )
        ;
};

export default NavBar;

import React, { useState } from 'react'
import userImg from '../assets/user.jpg';
import './curentproject.css';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
const CurentProject =() =>{
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    };

    return (
        <div className="page">
            
            
            
            <div className="Curent-projects">
                <div className="Project-1 ">
                    <div className="lid one"></div>
                    <div className="lid two"></div>
                    <div class="envelope"></div>
                        <div class="letter">
                            <a href="/projectpage">Project 1</a>
                        </div>
                </div>
                <div className="Project-2">
                <div className="lid2 three"></div>
                    <div className="lid2 four"></div>
                    <div class="envelope2"></div>
                        <div class="letter2">
                            <a href="/projectpage">Project 2</a>
                        </div>
                </div>
                <div className="Project-3">
                <div className="lid3 five"></div>
                    <div className="lid3 six"></div>
                    <div class="envelope3"></div>
                        <div class="letter3">
                            <a href="/projectpage">Project 3</a>
                        </div>
                </div>
                <div className="Project-4">
                <div className="lid4 seven"></div>
                    <div className="lid4 eight"></div>
                    <div class="envelope4"></div>
                        <div class="letter4">
                            <a href="projectpage">Project 4</a>
                        </div>
                </div>
                <div className="Project-5">
                <div className="lid5 nine"></div>
                    <div className="lid5 ten"></div>
                    <div class="envelope5"></div>
                        <div class="letter5">
                            <a href="/projectpage">Project 5</a>
                        </div>
                </div>
            </div>

            <div className="search" onClick={toggleSearchBar}>
                <span><MdSearch className="search-icon" /></span>
            </div>
            <form action="" className={`search-bar-container ${isSearchBarVisible ? 'active' : ''}`}>
                <input type="search" id="search-bar" placeholder="search here" />
                <label htmlFor="search-bar"><MdSearch /></label>
            </form>
            
        </div>
    )
}

export default CurentProject;
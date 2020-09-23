import React from "react"

export default function Home() {

    return (
        <div className="home">
            <div className="firstPanel">
                <div className="pic">
                </div>
                <div>
                    <div>
                        <h1>Hi, I'm Kathleen Wang!</h1>
                        <p>Software Engineer</p>
                    </div>
                    <div className="desc">
                        <p>I enjoy working with multiple problems. I love design and want to study the interesection between art and coding! </p>
                    </div>
                    <div>
                        <button>Get in touch</button>
                        <div className="links">
                            <p>Twitter</p>
                            <p>Github</p>
                            <p>Linkedin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="projects">
                <div>
                    <h1> Projects: </h1>
                    <div className="projDesc">
                        <h3>180 React Projects in 180 Days!</h3>
                        <p><i> Inspired by Jennifer Dewalt's <a href="https://jenniferdewalt.com/" target="_blank"> 180 Projects in 180 Days</a></i></p>
                      
                    </div>
                </div>
                <div className="projectList">
                    <ul>
                        <li> Day 1: </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}
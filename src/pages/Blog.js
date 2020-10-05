import React from "react"
import Card from "./Card"
export default function Blog() {
    const entries = [
        {
            p: "Today is the first day of this coding challenge. I feel pretty good about this project. I am actually excited and can't wait to keep this up. I am surprised I didn't do something like this earlier.. I always thought I would have to do really big projects instead of small things everyday.", 
            date: "9/23/20"
        }, 
        {
            p: "Even though it's already been 6 months since the pandemic started, I do feel it is a good respite in this chaotic world. I realized I do so many things and so much of my identity is based on my \"outside persona\". But now we have to all live with ourselves and I'm starting to learn how to live for myself! I know I am incredible privileged to say but this time for me includes more time for self-learning and programming and less time for distractions and societal obligations.", 
            date: "9/24/20"
        }, 
        {
            p: "So I actually spent like 3 days on the Day 7 project.. Wow writing 2 days makes it seem very insignificant, and here I was stressing that I 'missed 2 days of projects'. Overall I am proud of the functionality, but I think the UI could use some work and it just feels a little wonky. I would LOVE to redesign it somehow. I feel sad that it seems like no matter how much functionality you put, if its hard for the users to use then it will be pretty much useless to everyone except you :( ", 
            date: "9/29/20"
        }, 
        {
            p: "Write an entry!", 
            date: ""
        }, 
        {
            p: "Write an entry!", 
            date: ""
        },
        {
            p: "Write an entry!", 
            date: ""
        }, 
    ]
    function getEntries() {
       return entries.map((entry,i) => {
            return <Card i = {i} p = {entry.p} date = {entry.date} key = {i} />
        })
        
    }
    return (
        <div className ="blog">
 
            {getEntries()}
        </div>
    )
}
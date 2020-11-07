import React from "react"
import Card from "./Card"
export default function Blog() {
    let entries = [
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
            p: "One of my close friends' relative came out recently, and I became inspired to dedicate a LGBQT+ project. I am always fascinated by the different types of sexual identities, as well as the flags and colors that represent them. I honestly never heard about aromantic or agender until recently. I think quarantine is a good time to explore ourselves more closely, since we are spending more time with ourselves and less outside distractions. Of course, this is also an upsetting time for those with toxic households.", 
            date: "10/5/2020"
        }, 
        {
            p: "I really like BlackPink's new album. For my next project, I'll make a music playlist.", 
            date: "10/10/2020"
        },
        {
            p: "I now realize what a difference changing the font can make. I have so much respect for people who can create their own fonts. I'm glad there are font parsers online to find the name of the right one :)", 
            date: "10/21/20"
        }, 
        {
            p: "UPDATE: I am taking a break from my React projects to learn more and focus on backend, specifically Node and MongoDB.", 
            date: "11/6/20"
        }
    ]
    function getEntries() {
        entries = entries.reverse()
       return entries.map((entry,i) => {
           if (entry.date === "") {
               return
           }
            return <Card i = {i} p = {entry.p} date = {entry.date} key = {i} />
        })
        
    }
    return (
        <div className ="blog">
            {getEntries()}
        </div>
    )
}
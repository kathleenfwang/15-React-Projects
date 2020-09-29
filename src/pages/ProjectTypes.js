import React from "react"
import Day2 from "./Day2"
import Day3 from "./Day3"
import Day4 from "./Day4"
import Day5 from "./Day5"
import Day6 from "./Day6"
import Day7 from "./Day7"
import Footer from "../headers/Footer"
function day2() {
    return <Day2 />
}

function day3() {
    return <Day3 />
}

function day4() {
    return <Day4 />
}
function day5() {
    return <Day5 />
}
function day6() {
    return <Day6/>
}
function day7() {
    return (
        <>
    <Day7/>
    <Footer/>
    </>
    )
}
export {day2,day3,day4, day5,day6,day7}
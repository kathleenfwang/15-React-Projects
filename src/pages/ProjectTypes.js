import React from "react"
import Day2 from "./Day2"
import Day3 from "./Day3"
import Day4 from "./Day4"
import Day5 from "./Day5"
import Day6 from "./Day6"
import Day7 from "./Day7"
import Day8 from "./Day8"
import Day9 from "./Day9"
import Day10 from "./Day10"
import Day11 from "./Day11"
import Day12 from "./Day12"
import Day13 from "./Day13"
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
    return (<>
    <Day7/>
    <Footer/> </>)
}
function day8() {
    return <Day8/>
}
function day9() {
    return <Day9/>
}
function day10() {
    return <Day10/>
}
function day11() {
    return <Day11/>
}
function day12() {
    return <Day12/>
}
function day13() {
    return <Day13/>
}
const dayList = [day2,day3,day4,day5,day6,day7,day8,day9,day10,day11,day12,day13]
export {dayList}
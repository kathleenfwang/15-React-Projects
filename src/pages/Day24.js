import React from "react"

export default class Day24 extends React.Component {
    constructor(){
        super()
        this.state = {
            countries: [], 
            filtered: [] 
        } 
    }
    componentDidMount() {
        let countries = "Afghanistan Albania Algeria Andorra Angola Antigua Barbuda Argentina Armenia Australia Austria Azerbaijan" 
        countries = countries.split(" ") 
        this.setState({countries:countries})
    }
    getCountries = (countries) => {
        return countries.map((country) => <p> {country} </p>)
    }
    checkCountry(country,value) {
        // value = "an" 
        // country = "Antigua" 
        let i = 0 
        let j = 0 
        while (i < value.length && j < country.length) {
            if (value[i] !== country[j]) return false 
            i+=1
            j+=1 
        } 
        return true
    }
    handleInput =(e) => {
        let value = e.target.value 
        const {countries} = this.state 
        // filtered = ["Andorra, Angola, Antigua"] 
        let filtered = countries.filter((country) => {
            // only want the beginning letters to match 
            return this.checkCountry(country.toLowerCase(),value)
            // country = country.toLowerCase()
            // return country.slice(0,value.length) == value 
        })
        console.log(filtered)
        this.setState({filtered:filtered})
    }
    render() {
        const {countries,filtered} = this.state
        return(
            <div>
                <input onChange = {this.handleInput} placeholder ="Search"></input>
                { countries && filtered.length > 0 ? this.getCountries(filtered) : this.getCountries(countries)}
            </div>
        )
    }
}
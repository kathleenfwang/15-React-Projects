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
    handleInput =(e) => {
        let value = e.target.value 
        const {countries} = this.state 
        let filtered = countries.filter((country) => {
            country = country.toLowerCase()
            return country.includes(value)
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
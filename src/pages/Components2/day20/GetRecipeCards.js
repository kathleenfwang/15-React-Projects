import React from "react"

export default function GetRecipeCards(props) {
    const {loaded,params} = props
    const getRecipeCards = props.function
    const pass = "2px solid rgb(74, 193, 138)"
    const nopass = "2px solid  rgb(249, 150, 150)"
    return (<div className="lemon flex baseLine">
                <div className="mr" >
                    <h2 className="no miniTitle mr" style={{ border: nopass }}>In progress:</h2>
                    <div className="flex biggrid">
                        {loaded ? getRecipeCards(...params.first) : "Loading..."}
                    </div>
                </div>
                <div>
                    <h2 className="miniTitle pass" style={{ border: pass }}>Finished:</h2>
                    <div className="flex biggrid">
                        {loaded ? getRecipeCards(...params.second) : "Loading..."}
                    </div>
                </div>
            </div>)
}
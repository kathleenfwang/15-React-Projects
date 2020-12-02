import React from "react"
export default function RecipeCard({recipe}) {
    const recipeCardStyle = (recipe) => {
        return {
            backgroundImage: `url(${recipe.image})`,
            backgroundSize: "cover",
        }
    }
    const dateToString = recipe.createdAt.slice(0, 10)
    return (
        <div style={recipeCardStyle(recipe)} className="plantCard">
            <div className="innerPlantCard">
                <h3>{recipe.name}</h3>
                <p  className ="up"><span className="smallTxt">{dateToString}</span></p>
                <h4 className ="up">Ingredients:</h4>
                <p className ="up">{recipe.description}</p>
                <img className="medImg" src={recipe.image} />
                <p>Done? {recipe.done ? "Done" : "Not yet"}</p>
            </div>
        </div>
    )
}

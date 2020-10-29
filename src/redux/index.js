import redux, {createStore} from "redux"
 
// 1. Create action creators "theme"
// can have export and default export in same file
export function handleThemeToggle() {
    return {
        type: "CHANGE_THEME"
    }
}
const initialState = {
    theme: getTime()
}

function getTime() {
 let d = new Date(); // for now
let hour = d.getHours(); // => 9
// have dark mode starting at 6 PM, or 18 Hour 
return hour < 18 
}
// 2. Create a reducer to handle actions
function reducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_THEME": 
            return {...state,theme:!state.theme}
        // if you don't have default, IT WILL DEFAULT STATE TO UNDEFINED
        default: 
        return state
    }
}

// 3. Create a new Redux store

const store = createStore(reducer)

// 4. Set up the subscribe function so we can more easily see the changes to the Redux state as they happen
store.subscribe(() => console.log(store.getState()))

// 5. Export the store as a default export
export default store

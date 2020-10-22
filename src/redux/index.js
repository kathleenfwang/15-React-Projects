import redux, {createStore} from "redux"
 
// 1. Create action creators for having the count "increment" and "decrement"
// can have export and default export in same file
export function increment() {
    return {
        type: "INCREMENT"
    }
}
export function decrement() {
    return { 
        type: "DECREMENT"
    }
}

export function handleThemeToggle() {
    return {
        type: "CHANGE_THEME"
    }
}
// 2. Create a reducer to handle your increment and decrement actions
function reducer(theme = true, action) {
    switch (action.type) {
        case "CHANGE_THEME": 
        theme = !theme
        return theme
        // if you don't have this default, IT WILL DEFAULT COUNT TO UNDEFINED
        default: 
        return theme
    }
}

// 3. Create a new Redux store

const store = createStore(reducer)

// 4. Set up the subscribe function so we can more easily see the changes to the Redux state as they happen
store.subscribe(() => console.log(store.getState()))

// 5. Export the store as a default export
export default store

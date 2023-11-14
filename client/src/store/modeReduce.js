const darkMode = {darkMode: true};

export const setdarkMode = (state = darkMode, action) =>{
    switch(action.type){
        case "SETDARKMODE" :
            return {darkMode: action.payload};
        default :
            return state
    }
}
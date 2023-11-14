const count = { count: 0};


export const counterReduce = (state = count, action) =>{
    switch(action.type){
        case "INCREMENT":
            return {count: state.count + action.payload}
        case "DECREMENT":
            return {count: state.count - action.payload}
        default:
            return state;
    }
}
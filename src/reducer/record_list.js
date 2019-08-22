const INITIAL_RECORD_LIST = []

function record_list_reducer(state, action){
    console.log(action)
    switch (action.type){
        case 'update':
            return state;
        default:
            return state;
    }
}

export{
    INITIAL_RECORD_LIST,
    record_list_reducer
}
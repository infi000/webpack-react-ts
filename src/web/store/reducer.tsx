import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DEL_TODO_ITEM } from "@/store/actionTypes";


const defaultState={
    inputValue:"",
    list: ['Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',]
};

export default (state=defaultState,action) => {
    // console.log(state,action)
    if (action.type == CHANGE_INPUT_VALUE){
        const newState=Object.assign({},state);
        newState.inputValue=action.value;
        return newState
    }
    if (action.type == ADD_TODO_ITEM){
        const newState=Object.assign({},state);
        newState.list.push(newState.inputValue);
        newState.inputValue="";
        return newState
    }
    if (action.type == DEL_TODO_ITEM) {
        const newState = Object.assign({}, state);
        newState.list.splice(action.value,1);
        return newState
    }
    return state;
}
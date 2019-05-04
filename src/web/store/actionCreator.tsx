import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DEL_TODO_ITEM } from "@/store/actionTypes";

const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})
const getAddToItemAction = () => ({
        type: ADD_TODO_ITEM,
})
const getDelTodoItemAction = (value) => ({
        type: DEL_TODO_ITEM,
        value
})

export{
    getInputChangeAction,
    getAddToItemAction,
    getDelTodoItemAction
}
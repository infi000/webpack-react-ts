import * as  React from "react";
import { Input, Button, List } from 'antd';
import { store } from "@/store/index";
import { getInputChangeAction, getAddToItemAction, getDelTodoItemAction} from "@/store/actionCreator";
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DEL_TODO_ITEM } from "@/store/actionTypes";


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleItemDel = this.handleItemDel.bind(this);
        store.subscribe(this.handleStoreChange);//订阅，state改变后触发
    }
    render() {
        return (
            <div>
                <Input placeholder="Basic usage" style={{ "width": "300px", "marginRight": "10px" }} value={this.state.inputValue} onChange={this.handleChangeInput} />
                <Button type="primary" onClick={this.handleClick}>Primary</Button>
                <List
                    style={{ "marginTop": "20px" }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                    <List.Item onClick={() => { this.handleItemDel(index)} }>{item}</List.Item>
                    )}
                />

            </div>
        )
    }

    handleChangeInput(e) {
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action)
    }

    handleStoreChange() {
        this.setState(store.getState());
    }
    handleClick() {
        const action = getAddToItemAction()
        if (this.state.inputValue) {
            store.dispatch(action);
        }
    }

    handleItemDel(value) {

        const action = getDelTodoItemAction(value)
        store.dispatch(action);
    }
}

export {
    Todo
}
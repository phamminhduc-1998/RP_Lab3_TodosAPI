import input from "antd/lib/input";
import React, { useState } from "react";
import { TypeTodo } from "../../App";
import { v4 as uuidv4 } from "uuid";

interface Props {
    onAdd: (item: any) => void;
    onEditTodo: (item: any) => void;
    currentTodo: any;
}

export const AddTodoForm: React.FC<Props> = ({ onAdd, onEditTodo, currentTodo }) => {

    const [inputValue, setInputValue] = useState(currentTodo?.name || "");
    const [inputContent, setInputContent] = useState(currentTodo?.content || "")
    const onHandleSubmit = (e: any) => {
        if(currentTodo && onEditTodo) {
            onEditTodo({id: currentTodo.id, name: inputValue, content: inputContent })
        } else if(onAdd) {
            e.preventDefault();
            onAdd({id: uuidv4(), name: inputValue, content: inputContent })
            setInputValue("");
            setInputContent("");
        }        
    }

    const onHandleChange = (e: any) => {
        setInputValue(e.target.value)
    }
    const onHandleChangeContent = (e: any) => {
        setInputContent(e.target.value)
    }

    return <div>
        <div className="field-input-group">
            <input placeholder="Name" type="text" className="ant-input" value={inputValue} onChange={(e) => onHandleChange(e)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Description" type="text" className="ant-input" value={inputContent} onChange={(e) => onHandleChangeContent(e)} />
        </div>
        <div className="modal-new-user-footer">
            <button
                onClick={(e) => onHandleSubmit(e)}
                className="ant-btn ant-btn-primary"
            >
                Save
            </button>
            {/* <button className="ant-btn" style={{marginLeft: 10}} >
                Cancel
            </button> */}
        </div>
    </div>
}

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

import { ListTodo } from './components/ListTodo'
import { AddTodoForm } from './components/AddTodoForm'
import TodosAPI from './components/api/todosAPI';

import 'antd/dist/antd.css'
import './App.css';


export interface TypeTodo {
    name: string;
    content: string;
    id: string;
}

function App() {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [todos, setTodos] = useState<TypeTodo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<TypeTodo | null>(null)


    // Get API
    useEffect(() => {
        const getTodos = async () => {
            try {
                const { data: todos } = await TodosAPI.getAll();
                setTodos(todos)
            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
    }, []);

    //   console.log(todos);

    const onHandleAdd = async (todo: TypeTodo) => {
        try {
            await TodosAPI.add(todo)
            setTodos([
                ...todos,
                todo
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleDelete = async (id: string) => {
        try {
            await TodosAPI.remove(id);
            const newTodo = todos.filter(todo => todo.id !== id);
            setTodos(newTodo);
        } catch (error) {
            console.log(error)
        }
    }


    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleEditTodo = (item: TypeTodo) => {
        setCurrentTodo(item);
        setIsModalVisible(true)
    }
    const handleUpdateTodo = async (item: TypeTodo) => {
        try {
          await TodosAPI.update(item.id, item);
          const getTodos = async () => {
            try {
                const { data: todos } = await TodosAPI.getAll();
                setTodos(todos)
            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div className="App">
            <h2>List todo</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New Todo
                </button>
            </div>
            <ListTodo todoList={todos} onDelete={onHandleDelete} editTodo={handleEditTodo} />
            <Modal title="Add Todo" visible={isModalVisible} footer={null} onCancel={handleCancel} >
                <AddTodoForm currentTodo={currentTodo} onAdd={onHandleAdd} onEditTodo={handleUpdateTodo} />
            </Modal>
        </div>
    );
}

export default App;

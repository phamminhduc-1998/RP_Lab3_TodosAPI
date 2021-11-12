import './ListTodo.css'

export interface TypeTodo {
    name: string;
    content: string;
    id: string;
}

type TodoListProps = {
    todoList: TypeTodo[];
    onDelete: any;
    editTodo: (item: TypeTodo) => void;
};

export const ListTodo: React.FC<TodoListProps> = (props) => {
    console.log(props.todoList);
    return (
        <>
            {props.todoList.map((item, index) => {
                return (
                    <div className="ant-list-items" key={index}>
                        <div className="ant-list-item">
                            <div className="ant-list-item-meta">
                                <div className="ant-list-item-meta-content">
                                    <h4 className="ant-list-item-meta-title">
                                        <a>{item.name}</a>
                                    </h4>
                                    <div className="ant-list-item-meta-description">
                                        {item.content}
                                    </div>
                                </div>
                                <ul className="ant-list-item-action">
                                    <li>
                                        <a onClick={() => props.editTodo(item)}>Edit</a>
                                    </li>
                                    <li>
                                        <a onClick={() => props.onDelete(item.id)}>Remove</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>

    )

}
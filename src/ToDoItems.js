import "./todoItems.css";

const ToDoItems = (props) => {
    // console.log("my prop - ", props);
    return (
        <div className="todo-item">
            <p>{props.item.title}</p>
            <div>
                <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                        props.handleDelete(props.id);
                    }}
                ></i>

                <i
                    className="fa-solid fa-pen"
                    onClick={() => {
                        props.handleUpdate(props.id);
                    }}
                ></i>
            </div>
        </div>
    );
};

export default ToDoItems;

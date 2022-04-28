import "../css/todoItems.css";

const ToDoItems = (props) => {
    //geting props handle delete handle update and item object
    // console.log("my prop - ", props);
    return (
        <div className="todo-item">
            <p>{props.item.title}</p>
            <div>
                {/* delete button */}
                <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                        props.handleDelete(props.id);
                    }}
                ></i>
                {/* update button */}
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

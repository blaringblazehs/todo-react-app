import { useEffect, useState } from "react";
import ToDoItems from "./ToDoItems";

function App() {
    //input list contains text of input text field
    const [inputList, setInputList] = useState("");
    //update list contains text of update text field
    const [updateList, setUpdateList] = useState("hello");
    //items array contains objects recieved from api
    const [items, setItems] = useState([]);
    // to toggle the update input field
    const [toggle, setToggle] = useState(false);
    // to save the update id to use it in other functions
    const [updateId, setUpdateId] = useState();

    //input value change when we write on input field
    const itemEvent = (e) => {
        setInputList(e.target.value);
    };
    //input value change on update input
    const updateitemEvent = (e) => {
        setUpdateList(e.target.value);
    };

    //call the api
    useEffect(() => {
        getData();
    }, []);

    //getting data from api
    const getData = async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos`
        );
        const data = await response.json();
        console.log(data);
        setItems((oldItems) => [...oldItems, ...data]);
        console.log(items);
    };

    //add items to array on click of plus button
    const addItem = () => {
        if (inputList === "") return;
        setItems((oldItem) => {
            const newItem = {
                userId: 1,
                id: oldItem.length + 1,
                title: inputList,
                completed: false,
            };
            return [...oldItem, newItem];
        });

        //to empty the input field
        setInputList("");
        //making a post call after adding item to react state
        //updating it in the server
        fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            body: JSON.stringify({
                userId: 1,
                id: items.length + 1,
                title: inputList,
                completed: false,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log("post call-", json));
    };

    //for deleting individual items
    const deleteItem = (id) => {
        console.log("item deleted");
        setItems((oldItems) => {
            return oldItems.filter((arrItem, index) => {
                return id !== arrItem.id;
            });
        });
        fetch("https://jsonplaceholder.typicode.com/todos/" + id, {
            method: "DELETE",
        });
    };
    //for updating the item
    // let newid = 1;
    const updateItem = (updateId) => {
        setToggle(true);
        //take input value and update it in this id
        // newid = updateId;
        setUpdateList();
        items.map((elem) => {
            if (elem.id === updateId) {
                setUpdateList(elem.title);
            }
            return elem;
        });
        setUpdateId(updateId);
    };
    //add item on click of update butoton
    const addUpdateItem = () => {
        console.log(updateId, updateList);
        setItems(
            items.map((elem) => {
                if (elem.id === updateId) {
                    elem.title = updateList;
                }
                return elem;
            })
        );
        setToggle(false);
        //making the PUT call to update the item in server after
        //updating it in our local state
        fetch("https://jsonplaceholder.typicode.com/todos/" + updateId, {
            method: "PUT",
            body: JSON.stringify({
                userId: 1,
                id: updateId,
                title: updateList,
                completed: false,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log("Item Updated - ", json));
    };
    //cnacel the update
    const cancelUpdate = () => {
        setToggle(false);
    };

    return (
        <div className="App">
            <div className="container">
                <br />
                <div className="head">
                    <h1>ToDo List</h1>
                </div>

                <br />
                <div className="input-div">
                    <input
                        type="text"
                        placeholder="Add an Item.."
                        value={inputList}
                        onChange={itemEvent}
                    />

                    <button onClick={addItem}>+</button>
                </div>
                {toggle && (
                    <div className="input-div" style={{ marginTop: "20px" }}>
                        <input
                            type="text"
                            placeholder="Update Item..."
                            value={updateList}
                            onChange={updateitemEvent}
                        />

                        <button onClick={addUpdateItem}>
                            <i className="fa-solid fa-pen fa-xs"></i>
                        </button>
                        <button onClick={cancelUpdate}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )}

                <div className="list">
                    {/* <li>{inputList}</li> */}
                    {items.map((item, index) => {
                        return (
                            <ToDoItems
                                item={item}
                                id={item.id}
                                key={index}
                                handleDelete={deleteItem}
                                handleUpdate={updateItem}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;

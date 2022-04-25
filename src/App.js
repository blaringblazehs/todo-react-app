import { useState } from "react";

function App() {
    const [inputList, setInputList] = useState("");
    const [items, setItems] = useState([]);

    const itemEvent = (e) => {
        setInputList(e.target.value);
    };
    const addItem = () => {
        if (inputList === "") return;
        setItems((oldItem) => {
            return [...oldItem, inputList];
        });

        //to empty the input field
        setInputList("");
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

                <ul>
                    {/* <li>{inputList}</li> */}
                    {items.map((item) => {
                        return <li>{item}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;

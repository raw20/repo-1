import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "./store/list/listSlice";
import List from "./components/List";
import { useEffect, useState } from "react";
import { addList } from "./store/list/listSlice";
function App() {
  const dispatch = useDispatch();
  const listdata = useSelector((state) => state.list);
  const [listValue, setListValue] = useState("");
  const [dataValue, setDataValue] = useState("");

  useEffect(() => {
    dispatch(getList());
  }, []);

  function onCreate(e) {
    e.preventDefault();
    if (listValue) {
      const newList = { content: listValue };
      dispatch(addList(newList));
      setListValue(" ");
    }
  }
  function onClick(e) {
    const data = e.target.dataset.value;
    setDataValue(data);
  }
  return (
    <div className="App">
      <button onClick={onClick} data-value="value1">
        value1
      </button>
      <button onClick={onClick} data-value="value2">
        value2
      </button>
      <div>{dataValue}</div>
      <form onSubmit={onCreate}>
        <h1>{listdata.message}</h1>
        <div>
          {listdata.data.map((ele) => (
            <List key={ele.id} id={ele.id} content={ele.content} />
          ))}
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setListValue(e.target.value)}
            value={listValue}
          />
          <button type="submit">목록추가</button>
        </div>
      </form>
    </div>
  );
}

export default App;

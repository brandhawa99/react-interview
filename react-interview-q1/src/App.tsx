import React, { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([""])
  const [words, setWords] = useState("");

  function createWords(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let str = "";
    for (let i = 0; i < items.length; i++) {
      str += items[i] + " "
    }
    setWords(str);

  }

  return (
    <div className='full'>

      <div className="App">
        {items.length ? items.map((item, index) => {
          return <Box key={index} val={item} index={index} items={items} setItems={setItems} />
        }) : null}
      </div>
      <button onClick={(e) => { createWords(e) }}>create</button>
      <div>{words}</div>
    </div>
  )
}

export default App
interface BoxProps {
  val: any,
  setItems: any
  index: number,
  items: String[],

}
function Box(props: BoxProps) {
  const { val, setItems, index, items } = props;
  function addBefore(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (index === 0) {
      setItems(["", ...items])
    } else {
      let arr = [...items];
      arr.splice(index, 0, "");
      setItems([...arr]);
    }
  }
  function addAfter(e: React.MouseEvent<HTMLDivElement>) {
    items.splice(index + 1, 0, "");
    setItems([...items]);
  }
  return (
    <React.Fragment>
      {
        <div className='before' onClick={(e) => { addBefore(e) }} />
      }
      <input placeholder='+' value={val} onChange={(e) => {
        e.preventDefault();
        let arr = [...items];
        arr[index] = e.target.value;
        setItems(arr);
        setItems
      }} />
      {
        <div className='before' onClick={(e) => { addAfter(e) }} />
      }
    </React.Fragment>
  )
}

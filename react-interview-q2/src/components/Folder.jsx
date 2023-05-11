import React, { useRef, useState } from 'react'

function Folder({ explorer, handleInsertNode = () => { } }) {
  const [expand, setExpand] = useState(false)
  const [expandText, setExpandText] = useState(false)
  const [folder, setFolder] = useState(true)
  const nameRef = useRef("");

  const addFolder = (e) => {
    e.preventDefault();
    e.stopPropagation()
    !folder || !expandText ? setExpandText(true) : setExpandText(false)
    setFolder(true);
  }
  const addFile = (e) => {
    e.stopPropagation()
    e.preventDefault();
    folder || !expandText ? setExpandText(true) : setExpandText(false)
    setFolder(false);
  }
  const createFolderOrFile = (e) => {
    e.preventDefault();
    const name = nameRef.current.value + ""
    handleInsertNode(explorer.id, name, folder)
    setExpandText(false)
    nameRef.current.value = ""
  }

  if (explorer.isFolder) {
    return (
      <div style={{
        marginTop: 5
      }}>
        <div className='folder' onClick={() => {
          setExpand(!expand)
        }}>
          <span>
            📁 {explorer.name}
          </span>
          <div className='butts'>
            <button onClick={(e) => { addFolder(e) }}>new Folder</button>
            <button onClick={(e) => { addFile(e) }}>new File</button>
          </div>
        </div>
        <form onSubmit={(e) => { createFolderOrFile(e) }} style={{ display: expandText ? "block" : "none", paddingLeft: 25 }}>
          <span>
            {
              folder ? <span>📁</span> : <span>📄</span>
            }
            <input ref={nameRef} id="fileName" required></input>
          </span>
          <button type='submit'>create</button>
        </form>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {
            explorer.items.length ?
              explorer.items.map((item) => {
                return (
                  <span key={item.id}>
                    <Folder explorer={item} />
                  </span>
                )
              }) : <div>no items</div>
          }
        </div>
      </div >
    )
  } else {
    return (
      <span className='file'>📄{explorer.name}</span>
    )
  }
}

export default Folder
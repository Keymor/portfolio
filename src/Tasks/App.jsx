import { useState } from "react"

function TaskApp() {
    const [list, setList] = useState(['Go to the shop', 'Do some sport', 'Make a diner'])
    const [task, setTask] = useState('')
    const [editedText, setEditedText] = useState()
    const [isVisible, setIsVisible] = useState(false)

    function updateTask(event) {
        setTask(event.target.value)
    }

    function addTask() {
        if(task.length > 0) {
            console.log('string') 
            setList(l => [...l, task])
            setTask('')
            document.getElementById("inputText").value = ''
        } 
    }

    function deleteTask(index) {
        const tempArray = list.filter((_, i) => i !== index)
        setList(tempArray)
    }

    function editInput(e){
        setEditedText(e.target.value)
    }

    function pushText(index){
        let oldArray = [...list]

        oldArray[index] = editedText
        setList(oldArray)
        document.getElementsByClassName("textEdit").value = ''
        setIsVisible(i => !i)
    }

    function apperEditor(){
        setIsVisible(i => !i)
    }

    return (
        
            <div className="conteiner1">
                <h1 className="title">Note</h1>
                <input className="mainInput" id="inputText" type="text" placeholder="Task" onChange={updateTask} /><br/>
                <button className="addButton" onClick={addTask}>ADD</button>
                <button className="editButton" onClick={apperEditor}>Edit</button>

                <ol className="textConteiner">
                    {list.map((element, index) => (
                        <div className="textContent" key={index}>
                            <span className="text" style={{display: isVisible ? 'none' : 'inline'}}>{element}</span>
                            <input className="textEdit" onChange={editInput} placeholder={list[index]} style={{display: isVisible ? 'inline' : 'none'}}/>
                            <button className="doneButton" onClick={() => pushText(index)} style={{display: isVisible ? 'inline' : 'none'}}>✔️</button>
                            <button className="removeButton" onClick={() => deleteTask(index)}> ❌ </button>
                        </div>
                    ))}
                    
                </ol>
            </div>
        
    )

}

export default TaskApp
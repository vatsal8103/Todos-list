import { useState, useEffect } from 'react'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowFinished] = useState(true)

  

  const togglefinished =(e) => {
    setShowFinished(!showfinished)
   
    
  }
  

  const handleEdit = (e, id) => {
    let t =todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)


  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
    console.log(todos)

  }
  const handleChange = (e) => {

    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
  }





  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'> Task Manager - managae your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'> Add a todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 mx-2 p-3 py-1 text-sm  disabled:bg-violet-700 font-bold text-white rounded-full '>Add</button>
          </div>
        </div>
        <h1 className='text2xl font-bold'> Your Todos </h1>
        <input type='checkbox' onChange={togglefinished} checked={showfinished}/> Show Finished
        <div className="todos">
          {todos.length ===0 && <div className='m-5 '>NO todos to display</div>}
          {todos.map(item => {



            return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className="flex gap-5">

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
              <div className={item.iscompleted ? "line-through" : ""}> {item.todo}</div>
              </div>
              <div className="buttons flex h-f">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteSweep /></button>
              </div>


            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App

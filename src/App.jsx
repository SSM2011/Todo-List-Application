import { useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit, FaTrashAlt } from 'react-icons/fa' // Import the icons

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null)

  const handleAdd = () => {
    if (todo.trim()) {
      if (isEditing) {
        const updatedTodos = todos.map((item, index) => 
          index === currentTodoIndex ? { ...item, todo } : item
        )
        setTodos(updatedTodos)
        setIsEditing(false)
        setCurrentTodoIndex(null)
      } else {
        setTodos([...todos, { todo, isCompleted: false }])
      }
      setTodo("")
    }
  }

  const handleEdit = (index) => {
    setIsEditing(true)
    setCurrentTodoIndex(index)
    setTodo(todos[index].todo)
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="container w-11/12 mx-auto my-5 rounded-xl bg-violet-200 p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">{isEditing ? "Edit Todo" : "Add a Todo"}</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-80" />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-6">
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos flex flex-col">
          {todos.map((item, index) => (
            <div key={index} className="todo my-2">
              <div className="flex justify-between items-center">
                <div className={item.isCompleted ? "line-through" : ""}>
                  <span className="font-bold mr-2">{index + 1}.</span>
                  {item.todo}
                </div>
                <div className="buttons flex">
                  <button onClick={() => handleEdit(index)} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-2">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App

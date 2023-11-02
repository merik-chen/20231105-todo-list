const {useState, useEffect} = require('react')
const {ToDoDetail} = require('./TodoDetail')

const ToDo = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([
    {
      text: 'finished task',
      finished: true,
    },
    {
      text: 'incomplete task',
      finished: false,
    }
  ]);

  useEffect(() => {
    console.log(`ToDo things: ${todos.length}`)
  }, [todos]);
  
  useEffect(() => {
    console.log(todo)
  }, [todo]);

  const addTodo = (thing) => {
    (thing.length > 0) && setTodos([
      ...todos,
      {
        text: thing,
        finished: false,
      }
    ])
  }

  const delTodo = (index) => {
    if (typeof todos[index] === 'undefined') {
      return;
    }
    todos.splice(index, 1)
    setTodos([...todos])
  }

  const markAs = (index, finished) => {
    todos[index].finished = finished
    setTodos([...todos])
  }

  const buyAnAppliance = async () => {
    const rsp = await fetch('https://random-data-api.com/api/v2/appliances')
    if (rsp.ok) {
      const data = await rsp.json()
      addTodo(`buy me a ${data.equipment} by ${data.brand}`)
    }
  }

  return (
  <>
    <h1 className="text-lg md:text-2xl lg:text-4xl my-4">ToDo List</h1>

    <form className="flex space-x-6" onSubmit={(e) => e.preventDefault()}>
      <input
        value={todo}
        onChange={e => setTodo(e.target.value)}
        type='text'
        placeholder='write down any thing you want'
        className='flex-1 border-b hover:outline-none focus:outline-none'
      />
      <button className='rounded border p-2' onClick={() => {
        addTodo(todo);
        setTodo('')
      }}>Add ToDo</button>
      <button className='rounded border p-2' onClick={async () => buyAnAppliance()}>Buy me an appliance</button>
    </form>

    <ul className='my-4'>
      {todos.map((todo, index) => <ToDoDetail key={index} index={index} todo={todo} markAs={markAs} delTodo={delTodo} />)}
    </ul>
  </>
  )
}

export default ToDo;

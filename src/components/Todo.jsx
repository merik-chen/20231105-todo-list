const {useState, useEffect} = require('react')

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
    setTodos([
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
    <h1>ToDo List</h1>

    <from>
      <input value={todo} onChange={e => setTodo(e.target.value)} type='text' placeholder='write down the thing you need to do'></input>
      <button onClick={() => {
        addTodo(todo);
        setTodo('')
      }}>Add ToDo</button>
      <button onClick={async () => buyAnAppliance()}>Buy me an appliance</button>
    </from>

    <ul>
      {todos.map((todo, index) => {
        return <li key={index}>
          ({todo.finished ? 'v' : 'x'}) {todo.text}
          <button onClick={() => markAs(index, !todo.finished)}>marked as {todo.finished ? 'incomplete' : 'done'}</button>
          <button onClick={() => delTodo(index)}>delete</button>
        </li>
      })}
    </ul>
  </>
  )
}

export default ToDo;

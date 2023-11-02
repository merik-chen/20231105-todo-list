export const ToDoDetail = (props) => {
  const {
    todo: {finished, text},
    index,
    markAs,
    delTodo,
  } = props

  return <li className='my-2'>
    ({finished ? 'v' : 'x'}) {text}
    <button className='rounded border border-spacing-2 p-1 mx-1 bg-[#172554] text-white' onClick={() => markAs(index, !finished)}>標示為{finished ? '未' : ''}完成</button>
    <button className='rounded border border-spacing-2 p-1 mx-1 bg-[#fb7185] text-white' onClick={() => delTodo(index)}>刪除</button>
  </li>
}

export default ToDoDetail;

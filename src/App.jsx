import axios from 'axios'
import { useEffect, useReducer, useState} from 'react'
import * as Yup from 'yup'

function reducer(state, action) {
  switch(action.type) {
    case "i":
      return {count:state.count + 1}
     
    case "d":
      return {count:state.count - 1} 
    
    case "r" :
      return {}
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {count: 0})

  const [posts, setPosts] = useState([])
  const instance = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    headers:{"Authorization" : "Bearer token"}
  })

  useEffect(() => {
    instance.get(
      "/todos"
    ) .then(res => setPosts(res.data))
  },[])
  
  const signSchema = Yup.object.shape({
    name:Yup.string().min(3,"Min 3 symbol").required("Name is required"),
    email:Yup.string()
  })
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({type:"i"})}>+</button>
      <button onClick={() => dispatch({type:"d"})}>-</button>

      { 
        posts.map((post,index) => (
          <p key={index}>{post.title}</p>
        ))
      }
    </div>
  )
}

export default App

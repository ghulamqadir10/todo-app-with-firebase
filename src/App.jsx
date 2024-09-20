import { useRef, useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { db, collection, addDoc, getDocs,  } from "./firebaseConfig";
import Edit from "./Edit";
import DeleteTodo from "./Delete";





function Todo() {
  const [todo, setTodo] = useState([]);
  const [edited, setEdited] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(null);
  let todoVal = useRef();
  // adding doucment or database into firestore method
  async function addTodo(e) {
    e.preventDefault();
    const newTodo = todoVal.current.value;
    if (!newTodo) {
      return alert(`please input an todo`);
    }
    console.log(newTodo);
    setLoader(true);
    const docRef = await addDoc(collection(db, `todoLists`), {
      todoItem: newTodo, //object property
    });
    setTodo((prevTodo) => [
      ...prevTodo,
      { todoItem: newTodo, todoId: docRef.id },
    ]);
    todoVal.current.value = ``;
    setLoader(false);

  }
  const getTodos = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, `todoLists`));
      const todosArray = querySnapshot.docs.map((doc) => ({
        todoItem: doc.data().todoItem,
        todoId: doc.id,
      }));
      setTodo(todosArray);
    } catch (error) {
      console.error(`error fetching todos`, error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  const startEdit = (index) => {
    setEdited(index);
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold underline text-accent w-full">Todo App!</h1>
      <div 
        style={{
          width: `500px`,
          minHeight: `200px`,
          // border: `2px solid black`,
          borderRadius: `30px`,
          padding: `20px`,
          margin: `0px auto`,
          marginTop: `40px`,
          boxShadow: `10px 4px 20px 4px grey`,
        }}
      >
        <form className=" text-center" onSubmit={addTodo}>
          {/* <label>Add Todo </label> */}
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="Add todo"
            ref={todoVal}
          />
          <button type="submit" className="btn btn-accent m-2 btn-outline">
            Add todo{" "}
            {loader ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : null}{" "}
          </button>

          {loading ? (
            <div style={{}}>
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <ul className={todo.length > 0 ? `todoList` : `none`}>
              {todo.map((item,index)=>(
              <div style={{display: `flex`, justifyContent:`space-between`, alignItems: `center` ,boxShadow: `4px 1px 4px 4px grey` , borderRadius: `14px`, padding: `4px`, marginTop: `10px`}} className="singal-todo" key={index}>
                {edited !== index ? (
                  <li className="text-left">{item.todoItem}</li>
                ) : (
                  // //ya zara samajna hai
                  <Edit
                    setEditedIndex={setEdited}
                    item={item}
                    index={index}
                    setTodo={setTodo}
                    todo={todo}
                  />
                )}
                <div>
                  <button className="btn btn-accent m-2 btn-outline"
                    onClick={() => 
                      startEdit(index)
                    }
                  >
                    Edit
                  </button>
                  {` `}
                  <DeleteTodo
                    index={index}
                    todo={todo}
                    setTodo={setTodo}
                    edited={edited}
                  />
                  
                </div>
              </div>
              ))} 
            </ul>
          )}
        </form>
      </div>
    </>
  );
}

export default Todo;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   getFirestore,
//   addDoc,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore/lite";

// import { app } from "./firebase";

// function App() {
//   const db = getFirestore(app);

//   const todoVal = useRef();
//   const [todo, setTodo] = useState([]);

//   async function getTodos() {
//     try {
//       const querySnapshot = await getDocs(collection(db, "todos"));
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         setTodo((prevTodos) => [
//           ...prevTodos,
//           { todo: doc.data().todo, id: doc.id },
//         ]);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     // useeffect with dependency empty array work only when page reload
//     getTodos();
//   }, []);

//   const addTodo = async (e) => {
//     e.preventDefault();
//     const newTodo = todoVal.current.value; // save current todo in variable
//     // Add a new document with a generated id.
//     try {
//       // adding todo in firestore
//       const docRef = await addDoc(collection(db, "todos"), {
//         todo: todoVal.current.value,
//       });
//       console.log("Document written with ID: ", docRef.id);
//       setTodo((prevTodos) => [{ todo: newTodo, id: docRef.id }, ...prevTodos]);
//       todoVal.current.value = "";
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async function editTodo(index, id) {
//     const editedTodo = prompt("enter edit todo");
//     todo[index].todo = editedTodo;
//     const edit = doc(db, "todos", id);
//     setTodo([...todo]);
//     // updating todo in firestore here
//     await updateDoc(edit, {
//       todo: editedTodo,
//     });
//   }

//   async function deleteTodo(index, id) {
// todo.splice(index, 1);
//     setTodo([...todo]);
//     await deleteDoc(doc(db, "todos", id)); // delete todo in firestore
//   }

//   return (
//     <div>
//       <form onSubmit={addTodo}>
//         <input type="text" ref={todoVal} />
//         <button type="submit">add todo</button>
//       </form>
//       {todo.length > 0
// ? todo.map((item, index) => (
//             <div key={item.id}>
//               <h2>{item.todo}</h2>
//               <button onClick={() => editTodo(index, item.id)}>edit</button>
//               <button onClick={() => deleteTodo(index, item.id)}>Delete</button>
//             </div>
//           ))
//         : ""}
//     </div>
//   );
// }

// export default App;

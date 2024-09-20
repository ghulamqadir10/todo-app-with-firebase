import { useState } from "react";
import { db,doc } from "./firebaseConfig";
import {  updateDoc } from "firebase/firestore";

export default function Edit({ todo, index, setTodo, item, setEditedIndex }) {
  const [updateTodo, setUpdatodo] = useState(item.todoItem);
  const handleEdit = async () => {
    const trimmedTodo = updateTodo.trim();
    if (trimmedTodo) {
      try {
        let newUpdatedArr = [...todo];
        newUpdatedArr[index].todoItem = trimmedTodo;
        setTodo([...newUpdatedArr]);
        setEditedIndex(false);
        const todoRef = doc(db, "todoLists", newUpdatedArr[index].todoId);
        await updateDoc(todoRef, {
          todoItem: trimmedTodo,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Todo item cannot be empty or just whitespace.");
    }
  };

  return (
    <>
      <input
        className="input w-full input-bordered"
        placeholder="Enter Updated Todo"
        value={updateTodo}
        onChange={(e) => setUpdatodo(e.target.value)}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      ></input>
      <button
        onClick={handleEdit}
        type="button"
        className="btn btn-accent  m-2 btn-outline"
      >
        Update
      </button>{" "}
    </>
  );
}

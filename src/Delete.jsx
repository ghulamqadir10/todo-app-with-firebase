import { db, deleteDoc,doc } from "./firebaseConfig";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DeleteTodo({ setTodo, todo, index, isEdited }) {
  const isButtonDisabled = isEdited === index;
  const [loader, setLoader] = useState(null);
  const deleteTodo = () => {
    try {
      setLoader(true);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
        await deleteDoc(doc(db, "todoLists", todo[index].todoId));
        todo.splice(index, 1);
        setTodo([...todo]);
        setLoader(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={deleteTodo}
      disabled={isButtonDisabled}
      className="btn btn-outline btn-accent"
    >
      Delete
      {loader ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : null}
    </button>
  );
}

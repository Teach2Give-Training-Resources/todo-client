import { todosAPI, type TTodo } from "../../../../features/todos/todosAPI"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todos = () => {
    const { data: todosData, isLoading: todosLoading, error: todoError } = todosAPI.useGetTodosQuery()

    console.log("Todos Data:", todosData);
    return (
        <div>
            {/* <h1 className="text-2xl font-bold mb-4">Todos</h1> */}
            {todosLoading && <p>Loading todos...</p>}
            {todoError && <p className="text-red-500">Error fetching todos</p>}
            {todosData && todosData.data && todosData.data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols ">
                        <thead>
                            <tr className=" bg-gray-600 text-white text-xl ">
                                <th className="px-4 py-2">Todo Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {todosData.data.map((todo: TTodo) => (
                                <tr key={todo.id} className="hover:bg-gray-300 border-b border-gray-400 ">
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{todo.todoName}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{todo.description}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{new Date(todo.dueDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                                        <span className={`badge ${todo.isCompleted ? "badge-success" : "badge-warning"}`}>
                                            {todo.isCompleted ? (
                                                <span className="text-green-700 lg:text-base">Completed</span>
                                            ) : (
                                                <span className="text-yellow-700 lg:text-base">Pending</span>
                                            )}
                                        </span>
                                    </td>
                                    {/* Actions to delete and Edit */}
                                    <td className="px-4 py-2 flex">
                                        <button className="btn btn-sm btn-primary mr-4 text-blue-500">
                                            <FaEdit size={20} />
                                        </button>
                                        <button className="btn btn-sm btn-danger text-red-500">

                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No todos found.</p>
            )}
        </div>
    )
}

export default Todos

import { formatTime } from "@/utils/formatTime";
import React from "react";

const Sidebar = ({ task, onClose, todos, onTodoToggle }) => {
  return (
    <div className="fixed top-0 text-black right-0 h-full w-80 bg-white shadow-lg p-4 z-50 sidebar">
      <button
        className="text-red-500 float-right text-lg"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        X
      </button>
      <h2 className="text-xl font-bold">{task?.title || "No Title"}</h2>
      <p className="text-gray-500">
        {task?.desc || "No description available."}
      </p>
      <p className="text-sm text-blue-500">{`Category: ${
        task?.category || "N/A"
      }`}</p>
      <p className="text-gray-500">{`Difficulty: ${
        task?.difficulty_level || "N/A"
      }`}</p>
      <p className="text-gray-500">{`Note: ${
        task?.note || "No notes provided."
      }`}</p>

      <p className="text-gray-500">
        {`Start: ${
          task?.start_date
            ? formatTime(
                new Date(task.start_date).getHours(),
                new Date(task.start_date).getMinutes()
              )
            : "N/A"
        }`}
      </p>
      <p className="text-gray-500">
        {`End: ${
          task?.end_date
            ? formatTime(
                new Date(task.end_date).getHours(),
                new Date(task.end_date).getMinutes()
              )
            : "N/A"
        }`}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">Task Todos</h3>
        <div className="space-y-2">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <p
                key={todo.id}
                onClick={() => onTodoToggle(todo.id)}
                className={`cursor-pointer ${
                  todo.done ? "line-through text-green-500" : "text-gray-700"
                }`}
              >
                {todo.text}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No todos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

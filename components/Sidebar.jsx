import { formatTime } from "@/utils/formatTime";
import React from "react";

const Sidebar = ({ task, onClose, todos, onTodoToggle }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 sidebar">
      <button className="text-red-500 float-right text-lg" onClick={onClose}>
        X
      </button>
      <h2 className="text-xl font-bold">{task?.title}</h2>
      <p className="text-gray-500">{`Start: ${formatTime(
        new Date(task?.startDate).getHours(),
        new Date(task?.startDate).getMinutes()
      )}`}</p>
      <p className="text-gray-500">{`End: ${formatTime(
        new Date(task?.endDate).getHours(),
        new Date(task?.endDate).getMinutes()
      )}`}</p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">Task Todos</h3>
        <div className="space-y-2">
          {todos.map((todo) => (
            <p
              key={todo.id}
              onClick={() => onTodoToggle(todo.id)}
              className={`cursor-pointer ${
                todo.done ? "line-through text-green-500" : "text-gray-700"
              }`}
            >
              {todo.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

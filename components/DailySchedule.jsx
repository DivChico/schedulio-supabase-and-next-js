import { useEffect, useState, useRef } from "react";

// Extracted utility functions
const formatTime = (hours, minutes) => {
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const calculateEventHeight = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffMinutes = (endTime - startTime) / 1000 / 60;
  return Math.max((diffMinutes / 60) * 50, 40); // Minimum height for short tasks
};

const Header = ({ greeting, formattedDate, currentTime }) => (
  <header className="bg-gray-800 text-white p-4">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl">{greeting}</h1>
        <p>{formattedDate}</p>
      </div>
      <div className="text-lg">{currentTime}</div>
    </div>
  </header>
);

const EventCard = ({ event, onClick, onEdit, onDelete }) => {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const height = calculateEventHeight(start, end);
  const top = ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100 + "%";

  return (
    <div
      className="absolute left-0 w-full md:w-4/5 lg:w-11/12 bg-blue-500 text-white border border-gray-300 shadow-md rounded-lg p-3 cursor-pointer"
      style={{ top, height: `${height}px`, marginTop: "2px" }}
      onClick={() => onClick(event)}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{event.title || "Untitled Event"}</h4>
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event.id);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm">
        {`${formatTime(start.getHours(), start.getMinutes())} - ${formatTime(
          end.getHours(),
          end.getMinutes()
        )}`}
      </p>
    </div>
  );
};

const StyledTimeAxisCalendar = ({ events, date, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [todos, setTodos] = useState([
    { id: 1, text: "Todo 1", done: false },
    { id: 2, text: "Todo 2", done: false },
  ]);
  const timetableRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timetableRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      const scrollPosition = currentHour * 50 + 200;
      timetableRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setShowSidebar(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".sidebar") === null && showSidebar) {
      setShowSidebar(false);
    }
  };

  const handleTodoToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({ time: formatTime(hour, 0), hour, minute: 0 });
  }

  const now = new Date();
  const currentHour = now.getHours();
  const greeting = currentHour < 12 ? "Good Morning" : "Good Evening";
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = formatTime(now.getHours(), now.getMinutes());

  return (
    <div
      className="relative flex flex-col min-h-screen"
      onClick={handleOutsideClick}
    >
      <Header
        greeting={greeting}
        formattedDate={formattedDate}
        currentTime={currentTime}
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="relative flex-1 overflow-y-scroll" ref={timetableRef}>
          <div className="absolute w-full">
            <div className="absolute left-0 w-20 border-r border-gray-300">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="h-12 text-gray-500 text-right pr-2 text-sm"
                >
                  {slot.time}
                </div>
              ))}
            </div>
            <div className="ml-20 relative">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="h-12 border-b border-gray-200"
                ></div>
              ))}
              {events
                .filter(
                  (event) =>
                    new Date(event.startDate).toISOString().split("T")[0] ===
                    date
                )
                .map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    onClick={handleTaskClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {showSidebar && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 sidebar">
          <button
            className="text-red-500 float-right"
            onClick={() => setShowSidebar(false)}
          >
            X
          </button>
          <h2 className="text-xl font-bold">{currentTask?.title}</h2>
          <p className="text-gray-500">{`Start: ${formatTime(
            new Date(currentTask?.startDate).getHours(),
            new Date(currentTask?.startDate).getMinutes()
          )}`}</p>
          <p className="text-gray-500">{`End: ${formatTime(
            new Date(currentTask?.endDate).getHours(),
            new Date(currentTask?.endDate).getMinutes()
          )}`}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Task Todos</h3>
            {todos.map((todo) => (
              <p
                key={todo.id}
                onClick={() => handleTodoToggle(todo.id)}
                className={`cursor-pointer ${
                  todo.done ? "line-through text-green-500" : "text-gray-700"
                }`}
              >
                {todo.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyledTimeAxisCalendar;

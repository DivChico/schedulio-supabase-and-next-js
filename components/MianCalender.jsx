import { formatTime } from "@/utils/formatTime";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EventCard from "./EventCard";

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
                    event.startDate.toISOString().split("T")[0] === date
                  // new Date(event.startDate).toISOString().split("T")[0] ===
                  // date
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
        <Sidebar
          task={currentTask}
          onClose={() => setShowSidebar(false)}
          todos={todos}
          onTodoToggle={handleTodoToggle}
        />
      )}
    </div>
  );
};

export default StyledTimeAxisCalendar;

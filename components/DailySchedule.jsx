import React from "react";

const DailySchedule = ({ schedule }) => {
  const renderTasks = (tasks) => {
    return (
      <ul className="ml-4 list-disc">
        {tasks.map((task, index) => (
          <li key={index} className="mt-1">
            <span className="font-medium text-blue-600">{task.task}</span> —{" "}
            <span className="text-gray-500">
              {task.startTime} - {task.endTime}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Daily Schedule
      </h1>

      {/* Wake Up Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Morning Routine
        </h2>
        {renderTasks(schedule.morningRoutine.tasks)}
      </div>

      {/* Work Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Work</h2>
        {renderTasks(schedule.work.tasks)}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-600">Lunch Break</h3>
          <p className="text-gray-500">
            {schedule.work.lunchBreak.startTime} -{" "}
            {schedule.work.lunchBreak.endTime}
          </p>
        </div>
      </div>

      {/* Personal Projects Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Personal Projects
        </h2>

        {/* SaaS App Development */}
        <h3 className="font-semibold text-gray-600">SaaS App Development</h3>
        {renderTasks(schedule.personalProjects.saasAppDevelopment.tasks)}

        {/* YouTube Channel */}
        <h3 className="font-semibold text-gray-600 mt-4">YouTube Channel</h3>
        {renderTasks(schedule.personalProjects.youtubeChannel.tasks)}
      </div>

      {/* Relaxation Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Relaxation
        </h2>
        {renderTasks(schedule.relaxation.tasks)}
      </div>

      {/* Dinner Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Dinner</h2>
        <p className="text-gray-500">
          {schedule.dinner.startTime} - {schedule.dinner.endTime}
        </p>
      </div>

      {/* Wind Down Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Wind Down</h2>
        {renderTasks(schedule.windDown.tasks)}
      </div>

      {/* Bed Time Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Bed Time</h2>
        <p className="text-gray-500">{schedule.bedTime}</p>
      </div>
    </div>
  );
};

export default DailySchedule;

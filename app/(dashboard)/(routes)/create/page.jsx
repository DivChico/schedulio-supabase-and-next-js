"use client";
import generatePrompt from "@/utils/generatePrompt";
import { useState } from "react";

export default function ScheduleForm({ onSubmit }) {
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [lunchStartTime, setLunchStartTime] = useState("");
  const [lunchEndTime, setLunchEndTime] = useState("");
  const [commitments, setCommitments] = useState([
    { title: "", start: "", end: "" },
  ]);
  const [goals, setGoals] = useState([{ title: "" }]);
  const [personType, setPersonType] = useState("");

  const handleCommitmentChange = (index, e) => {
    const { name, value } = e.target;
    const newCommitments = [...commitments];
    newCommitments[index][name] = value;
    setCommitments(newCommitments);
  };

  const handleAddCommitment = () => {
    setCommitments([...commitments, { title: "", start: "", end: "" }]);
  };

  const handleRemoveCommitment = (index) => {
    setCommitments(commitments.filter((_, i) => i !== index));
  };

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target;
    const newGoals = [...goals];
    newGoals[index][name] = value;
    setGoals(newGoals);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { title: "" }]);
  };

  const handleRemoveGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      wakeUpTime,
      bedTime,
      workStartTime,
      workEndTime,
      lunchStartTime,
      lunchEndTime,
      commitments,
      goals,
      personType,
    };
    generatePrompt(formData);
    // createSchedule(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 text-black bg-gray-100 rounded-md shadow-md max-w-md mx-auto"
    >
      {/* Morning/Night Person Selector */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">
          Are you a morning or night person?
        </label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="personType"
              value="morning"
              checked={personType === "morning"}
              onChange={(e) => setPersonType(e.target.value)}
              className="mr-2"
            />
            Morning
          </label>
          <label>
            <input
              type="radio"
              name="personType"
              value="night"
              checked={personType === "night"}
              onChange={(e) => setPersonType(e.target.value)}
              className="mr-2"
            />
            Night
          </label>
        </div>
      </div>

      {/* Wake Up Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Wake Up Time:</label>
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Bed Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Bed Time:</label>
        <input
          type="time"
          value={bedTime}
          onChange={(e) => setBedTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Work Start Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Work Start Time:</label>
        <input
          type="time"
          value={workStartTime}
          onChange={(e) => setWorkStartTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Work End Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Work End Time:</label>
        <input
          type="time"
          value={workEndTime}
          onChange={(e) => setWorkEndTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Lunch Start Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Lunch Start Time:</label>
        <input
          type="time"
          value={lunchStartTime}
          onChange={(e) => setLunchStartTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Lunch End Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Lunch End Time:</label>
        <input
          type="time"
          value={lunchEndTime}
          onChange={(e) => setLunchEndTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Commitments */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Commitments:</label>
        {commitments.map((commitment, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="title"
              value={commitment.title}
              onChange={(e) => handleCommitmentChange(index, e)}
              placeholder="Commitment Title"
              className="p-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-2 items-center">
              <input
                type="time"
                name="start"
                value={commitment.start}
                onChange={(e) => handleCommitmentChange(index, e)}
                placeholder="Start Time"
                className="p-2 border border-gray-300 rounded-md flex-1"
              />
              <input
                type="time"
                name="end"
                value={commitment.end}
                onChange={(e) => handleCommitmentChange(index, e)}
                placeholder="End Time"
                className="p-2 border border-gray-300 rounded-md flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveCommitment(index)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCommitment}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Add Commitment
        </button>
      </div>

      {/* Goals */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">
          Customization Goals:
        </label>
        {goals.map((goal, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="text"
              name="title"
              value={goal.title}
              onChange={(e) => handleGoalChange(index, e)}
              placeholder={`Goal ${index + 1}`}
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <button
              type="button"
              onClick={() => handleRemoveGoal(index)}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddGoal}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Add Goal
        </button>
      </div>

      <button
        type="submit"
        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Generate Schedule
      </button>
    </form>
  );
}

import React from "react";

const Header = ({ greeting, formattedDate, currentTime }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{greeting}</h1>
          <p className="text-lg">{formattedDate}</p>
        </div>
        <div className="text-lg">{currentTime}</div>
      </div>
    </header>
  );
};

export default Header;

import { useState } from "react";

const CommandInjectionVulnerableComponent = () => {
  const [userInput, setUserInput] = useState("");

  const handleCommand = async () => {
    const response = await fetch(`/api/execute?command=ls ${userInput}`);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleCommand}>Execute Command</button>
    </div>
  );
};

export default CommandInjectionVulnerableComponent;

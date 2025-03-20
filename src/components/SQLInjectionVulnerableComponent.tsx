import { useState } from "react";

const SQLInjectionVulnerableComponent = () => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(`/api/users?name=${userInput}`);
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SQLInjectionVulnerableComponent;

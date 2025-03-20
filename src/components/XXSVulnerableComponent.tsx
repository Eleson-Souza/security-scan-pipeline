import React, { useState } from "react";

const XSSVulnerableComponent = () => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <input type="text" value={userInput} onChange={handleInputChange} />
      {/* Exibindo a entrada do usuário diretamente */}
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
};

export default XSSVulnerableComponent;

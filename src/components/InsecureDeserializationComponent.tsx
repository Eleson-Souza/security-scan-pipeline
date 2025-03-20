import { useState } from "react";

const InsecureDeserializationComponent = () => {
  const [data, setData] = useState("");

  const handleDeserialize = () => {
    const obj = JSON.parse(data); // Desserialização insegura
    console.log(obj);
  };

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleDeserialize}>Deserialize</button>
    </div>
  );
};

export default InsecureDeserializationComponent;

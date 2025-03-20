import { useState } from "react";

const HardCodedCredentialComponent = () => {
  const [userId, setUserId] = useState("");

  const API_KEY = "sk_test_1234567890abcdef";

  const handleSubmit = async () => {
    // Requisição POST sem token CSRF
    await fetch(`/api/updateProfile?key=${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleSubmit}>Update Profile</button>
    </div>
  );
};

export default HardCodedCredentialComponent;

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <div className="card" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
      <p className="card-meta">Session interactions</p>
      <div className="card-title" style={{ fontSize: "1.6rem" }}>{count}</div>
      <button className="btn btn-ghost" style={{ marginTop: "0.5rem" }} onClick={increment}>
        + Log interaction
      </button>
    </div>
  );
}

export default Counter;
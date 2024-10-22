import { useState } from "react";

export default function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [numItem, setNumItem] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = {
      description,
      quantity: numItem,
      packed: false,
      id: Date.now(),
    };
    addItem(newItem);
    console.log(newItem);

    setNumItem(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Travel ? </h3>
      <select
        value={numItem}
        onChange={(e) => {
          setNumItem(Number(e.target.value));
          console.log(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ...."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

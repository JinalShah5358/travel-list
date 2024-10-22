import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "book", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function onClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={handleAddItems} />
      <PackagingList
        setItem={items}
        onDeleteItem={handleDeleteItem}
        onToggleChange={handleToggleItem}
        onClearList={onClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 FAR AWAY 💼</h1>;
}
function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [numItem, setNumItem] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
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
function PackagingList({ setItem, onDeleteItem, onToggleChange, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") {
    sortedItem = setItem;
  }
  if (sortBy === "description") {
    sortedItem = setItem
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "Packed Item") {
    sortedItem = setItem
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleChange={onToggleChange}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort By input value</option>
          <option value="description">sort By description</option>
          <option value="Packed Item">sort By Packed Item</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleChange }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleChange(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  console.log(!items.length);
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding your items to your packing List 🚀</em>
      </footer>
    );
  }
  const numItems = items.length;
  const packedItem = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItem / numItems) * 100);
  console.log(packedItem);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to Go ✈️"
          : `💼 you have ${numItems} items on your list, and you already packed ${packedItem} (${percentage}%)`}
      </em>
    </footer>
  );
}

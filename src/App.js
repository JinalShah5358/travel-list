import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackagingList from "./PackagingList";
import Stats from "./Stats";

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
    const confirmed = window.confirm("Are you sure to delete all Item ? ");
    if (confirmed) setItems([]);
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

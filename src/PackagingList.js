import { useState } from "react";
import Item from "./Item";

export default function PackagingList({
  setItem,
  onDeleteItem,
  onToggleChange,
  onClearList,
}) {
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

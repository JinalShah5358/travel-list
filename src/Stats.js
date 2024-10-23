export default function Stats({ items }) {
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

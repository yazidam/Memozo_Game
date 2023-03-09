import React from "react";

const Shape = ({ item, handleClick, id }) => {
  const itemClass = item.stat ? " active " + item.stat : "";
  return (
    <div className={"card" + itemClass} onClick={() => handleClick(id)}>
      {item.img}
    </div>
  );
};

export default Shape;

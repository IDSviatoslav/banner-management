import React from "react";

function ChoseEntity(props) {
  return (
    <div class="flexbox-horizontal">
      <button onClick={() => props.ChangeEntityType("Category")}>
        Categories
      </button>
      <button onClick={() => props.ChangeEntityType("Banner")}>Banners</button>
    </div>
  );
}
export default ChoseEntity;

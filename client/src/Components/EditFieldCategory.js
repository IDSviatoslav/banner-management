import React, { useState, useEffect } from "react";

function EditField(props) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryReqName, setCategoryReqName] = useState("");

  const createCategory = (event) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
        isDeleted: "false",
        reqName: categoryReqName,
      }),
    };
    fetch("http://192.168.1.192:8080/category", requestOptions)
      .then((response) => response.json())
      .then(console.log("sent something"))
      .catch((err) => console.log("Error " + err));
  };

  const handleChangeName = (event) => {
    setCategoryName(event.target.value);
    console.log("edited name: " + categoryName);
  };

  const handleChangeReqName = (event) => {
    setCategoryReqName(event.target.value);
  };

  const handleSubmitCategoryInfo = (event) => {
    alert("A Category was submitted: " + categoryReqName + " " + categoryName);
    event.preventDefault();
  };

  const handleDeleteCategory = (event) => {
    alert("A Category was deleted: " + categoryReqName + " " + categoryName);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={createCategory}>
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={handleChangeName} />
        </label>
        <label>
          Request ID:
          <input
            type="text"
            value={categoryReqName}
            onChange={handleChangeReqName}
          />
        </label>
        <button type="submit">SAVE</button>
        <button onClick={handleDeleteCategory}>DELETE</button>
      </form>
    </div>
  );
}

export default EditField;

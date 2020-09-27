import React, { useState, useEffect } from "react";

function DisplayCategory(props) {
  const url = "http://127.0.0.1:8080";
  const [catId, setCatId] = useState();
  const [catName, setCatName] = useState("");
  const [catReqName, setCatReqName] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bidResult, setBidResult] = useState("");

  if (props.workMode !== workMode) {
    setWorkMode(props.workMode);
  }
  if (props.categoryId !== catId) {
    setCatId(props.categoryId);
  }

  useEffect(() => {
    if (workMode === "CREATE") {
      setCatId();
      setCatName("");
      setCatReqName("");
    } else if (workMode === "EDIT") {
      setCatId(props.categoryId);
      updateCategoryRequest();
    }
  }, [workMode, props.categoryId]);

  function updateCategoryRequest() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/category" + "/" + catId, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setCatName(response.name);
        setCatReqName(response.reqName);
        console.log(response);
      })
      .catch((err) => console.log("Error: " + err));
  }

  const createOrUpdateCategoryRequest = (event) => {
    event.preventDefault();
    var methodType;
    var id;
    if (workMode === "EDIT") {
      methodType = "PUT";
      id = catId;
    } else {
      id = null;
      methodType = "POST";
    }
    const requestOptions = {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: catName,
        reqName: catReqName,
      }),
    };
    fetch(url + "/category", requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        } else {
          props.UpdateList(true, "CREATE", catId);
        }
      })
      .then((response) => {
        setErrorMessage(response.response);
      })
      .catch((err) => console.log("Error: " + err));
  };

  function deleteCategoryRequest(event) {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/category" + "/" + catId, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        } else {
          props.UpdateList(true, "DELETE");
        }
      })
      .then((response) => {
        setErrorMessage(response.response);
      })
      .catch((err) => console.log("Error: " + err));
  }

  const bidRequest = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/bid" + "/" + catReqName, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((response) => setBidResult(response.response))
      .catch((err) => {
        console.log("Error: " + err);
        setBidResult("no banners to show");
      });
  };

  const changeName = (event) => {
    setCatName(event.target.value);
  };

  const changeReqName = (event) => {
    setCatReqName(event.target.value);
  };

  function closeAlert() {
    document.getElementById("error-msg").style.display = "none";
    setErrorMessage("");
  }

  function closeBidMessage() {
    document.getElementById("bid-msg").style.display = "none";
    setBidResult("");
  }

  return (
    <form class="flexbox-vertical">
      {workMode === "EDIT" && (
        <span class="flex-horizontal">
          <label class="bold-text">Category Id:</label>
          <label>{catId}</label>
        </span>
      )}
      <label class="flex-horizontal"></label>
      <label class="flex-horizontal">
        <l1 class="bold-text">Name</l1>
        <input type="text" value={catName} onChange={changeName} />
      </label>
      <label class="flex-horizontal">
        <l1 class="bold-text">Request Id</l1>
        <input type="text" value={catReqName} onChange={changeReqName} />
      </label>

      {bidResult && (
        <div id="bid-msg" class="alert">
          <span class="closebtn" onClick={closeBidMessage}>
            &times;
          </span>
          <strong>Result:</strong> {bidResult}
        </div>
      )}

      {errorMessage && (
        <div id="error-msg" class="alert">
          <span class="closebtn" onClick={closeAlert}>
            &times;
          </span>
          <strong>Error!</strong> {errorMessage}
        </div>
      )}

      <div class="flexbox-horizontal">
        <button onClick={createOrUpdateCategoryRequest}>
          {props.workMode}
        </button>
        <button onClick={deleteCategoryRequest}>DELETE</button>
        <button onClick={bidRequest}>REQUEST</button>
      </div>
    </form>
  );
}

export default DisplayCategory;

import React, { useState, useEffect } from "react";

function DisplayBanner(props) {
  const url = "http://127.0.0.1:8080";
  const [banId, setBanId] = useState();
  const [banName, setBanName] = useState("");
  const [banPrice, setBanPrice] = useState("");
  const [banCategory, setBanCategory] = useState();
  const [banText, setBanText] = useState();
  const [existingCategories, setExistingCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [workMode, setWorkMode] = useState("");

  if (props.workMode !== workMode) {
    setWorkMode(props.workMode);
  }
  if (props.bannerId !== banId) {
    setBanId(props.bannerId);
  }

  useEffect(() => {
    if (workMode === "CREATE") {
      setBanId("");
      setBanCategory();
      setBanName("");
      setBanPrice("");
      setBanText("");
      let selectElement = document.getElementById("cat-select");
      selectElement.value = "none";
    } else if (workMode === "EDIT") {
      setBanId(props.bannerId);
      updateBannerRequest();
    }
    updateCategoriesRequest();
  }, [workMode, props.bannerId]);

  useEffect(() => {
    console.log("change category " + banCategory);
  }, [banCategory]);

  useEffect(() => {
    console.log("error message " + errorMessage);
  }, [errorMessage]);

  function updateBannerRequest() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/banner" + "/" + banId, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setBanName(response.name);
        setBanCategory(response.category.name);
        setBanPrice(response.price);
        setBanText(response.content);
      })
      .catch((err) => console.log("Error: " + err));
  }

  function updateCategoriesRequest() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/categories", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setExistingCategories(response);
      })
      .catch((err) => console.log("Error: " + err));
  }

  const createOrUpdateBannerRequest = (event) => {
    event.preventDefault();
    var methodType;
    var id;
    if (workMode === "EDIT") {
      methodType = "PUT";
      id = banId;
    } else {
      methodType = "POST";
      id = null;
    }
    const requestOptions = {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: banName,
        content: banText,
        price: banPrice,
      }),
    };
    fetch(url + "/banner" + "/" + banCategory, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        } else {
          props.UpdateList(true, "CREATE", banId);
        }
      })
      .then((response) => {
        setErrorMessage(response.response);
      })
      .catch((err) => console.log("Error: " + err));
  };

  const deleteBannerRequest = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/banner" + "/" + banId, requestOptions)
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
  };

  const changeName = (event) => {
    setBanName(event.target.value);
  };

  const changeBannerPrice = (event) => {
    setBanPrice(event.target.value);
  };

  const changeBannerText = (event) => {
    setBanText(event.target.value);
  };

  const changeCategory = (event) => {
    setBanCategory(event.target.options[event.target.selectedIndex].text);
  };

  function closeAlert(event) {
    document.getElementById("error-msg").style.display = "none";
    setErrorMessage("");
  }

  return (
    <form class="flexbox-vertical">
      {workMode === "EDIT" && (
        <span class="flex-horizontal">
          <label class="bold-text">Id:</label>
          <label>{banId}</label>
        </span>
      )}

      <label class="flexbox-horizontal">
        <l1 class="bold-text">Name</l1>
        <input type="text" value={banName} onChange={changeName} />
      </label>

      <label class="flexbox-horizontal">
        <l1 class="bold-text">Price</l1>
        <input type="number" value={banPrice} onChange={changeBannerPrice} />
      </label>

      <label class="flexbox-horizontal">
        <l1 class="bold-text">Category</l1>
        <select id="cat-select" value={banCategory} onChange={changeCategory}>
          <option value="none" selected disabled hidden>
            Select a Category
          </option>

          {existingCategories.map((category) => {
            return <option key={category.id}> {category.name}</option>;
          })}
        </select>
      </label>

      <span class="flexbox-horizontal">
        <label class="bold-text">Text</label>
        <textarea
          id="banner-text-area"
          value={banText}
          onChange={changeBannerText}
          rows="3"
          cols="20"
        ></textarea>
      </span>

      {errorMessage && (
        <div id="error-msg" class="alert">
          <span class="closebtn" onClick={closeAlert}>
            &times;
          </span>
          <strong>Error!</strong> {errorMessage}
        </div>
      )}
      <div class="flexbox-horizontal">
        <button onClick={createOrUpdateBannerRequest}>{props.workMode}</button>
        <button onClick={deleteBannerRequest}>DELETE</button>
      </div>
    </form>
  );
}

export default DisplayBanner;

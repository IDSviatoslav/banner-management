import React, { useState, useEffect } from "react";

function EntityNavigator(props) {
  const url = "http://127.0.0.1:8080";
  var searchQuery;
  const [receivedEntities, setReceivedEntities] = useState([]);
  const [receivedEntityType, setEntityType] = useState([""]);
  const [updateNow, setUpdateNow] = useState(false);

  if (updateNow !== props.updateCommand) {
    setUpdateNow(props.updateCommand);
  }

  useEffect(() => {
    updateRequest();
  }, [receivedEntityType]);

  useEffect(() => {
    if (updateNow === true) {
      updateRequest();
    }
    props.UpdateList(false);
  }, [updateNow]);

  const searchRequest = (event) => {
    searchQuery = event.target.value;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      url + "/search" + "/" + receivedEntityType + "/" + searchQuery,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setReceivedEntities(data))
      .catch((err) => console.log("Error " + err));
  };

  function updateRequest() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/search" + "/" + receivedEntityType + "/", requestOptions)
      .then((response) => response.json())
      .then((response) => setReceivedEntities(response))
      .catch((err) => console.log("Error " + err));
  }

  if (props.entityType !== receivedEntityType) {
    if (props.entityType === "categories") {
      setEntityType("categories");
    }
    if (props.entityType === "banners") {
      setEntityType("banners");
    }
    updateRequest();
    searchQuery = "";
  }

  return (
    <div class="flexbox-vertical">
      <l1 class="center-text">{receivedEntityType}</l1>
      <input
        type="text"
        value={searchQuery}
        onChange={searchRequest}
        placeholder="enter name..."
      />{" "}
      {receivedEntities.map((entity) => {
        return (
          <l1 key={entity.id} onClick={() => props.DisplayEntity(entity.id)}>
            {entity.name}
          </l1>
        );
      })}{" "}
      <button onClick={() => props.ChangeWorkMode("CREATE")}>Create</button>
    </div>
  );
}
export default EntityNavigator;

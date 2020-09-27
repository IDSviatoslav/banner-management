import React, { useState } from "react";
import ChoseEntity from "./Components/ChoseEntity";
import EntityNavigator from "./Components/EntityNavigator";
import ViewCategory from "./Components/ViewCategory";
import ViewBanner from "./Components/ViewBanner";

function App() {
  var entityView;
  const [entityType, setEntityType] = useState("categories");
  const [workMode, setWorkMode] = useState("CREATE");
  const [bannerId, setBannerId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [updateCommand, setUpdateCommand] = useState(false);

  function changeEntityType(entityType) {
    if (entityType === "Banner") {
      setEntityType("banners");
    } else {
      setEntityType("categories");
    }
    setWorkMode("CREATE");
  }

  function changeWorkMode(newWorkMode) {
    setWorkMode(newWorkMode);
  }

  function displayEntity(entityId) {
    if (entityType === "categories") {
      setCategoryId(entityId);
    } else if (entityType === "banners") {
      setBannerId(entityId);
    }
    setWorkMode("EDIT");
  }

  function updateList(toUpdate, method, entityId) {
    setUpdateCommand(toUpdate);
    if (method === "DELETE") {
      setWorkMode("CREATE");
    } else if (method === "CREATE") {
      setWorkMode("CREATE");
    }
    if (entityType === "banners") {
      setBannerId();
    } else if (entityType === "categories") {
      setCategoryId();
    }
  }

  entityView =
    entityType === "banners" ? (
      <ViewBanner
        bannerId={bannerId}
        workMode={workMode}
        UpdateList={updateList}
      />
    ) : (
      <ViewCategory
        categoryId={categoryId}
        workMode={workMode}
        UpdateList={updateList}
      />
    );

  return (
    <div class="wrapper">
      <div class="flexbox-horizontal">
        <div class="flexbox-vertical">
          <ChoseEntity ChangeEntityType={changeEntityType} />
          <EntityNavigator
            DisplayEntity={displayEntity}
            ChangeWorkMode={changeWorkMode}
            UpdateList={updateList}
            updateCommand={updateCommand}
            entityType={entityType}
          />
        </div>
        {entityView}
      </div>
    </div>
  );
}

export default App;

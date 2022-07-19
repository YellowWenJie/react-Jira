import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import React from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreens = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </>
  );
};

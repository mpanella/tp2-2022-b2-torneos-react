import React, { useState } from "react";
import Cookies from "universal-cookie";

export const Home = () => {
  const cookies = new Cookies();

  let token = cookies.get("token");
  console.log(token);

  return <div>hola</div>;
};

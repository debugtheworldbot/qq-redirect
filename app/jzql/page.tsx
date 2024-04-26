import React from "react";

async function getVersionList() { }
export default async function sP() {
  fetch("/api", {
    method: "GET",
    body: JSON.stringify({ url: "111" }),
    headers: {
      "content-type": "application/json",
    },
  });
  return <div>sP</div>;
}

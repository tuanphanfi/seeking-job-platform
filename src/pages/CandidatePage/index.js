import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const apiAddress = process.env.REACT_APP_BACKEND_SERVER_URL;

export default function Details({ jobtitle, props }) {
  console.log(props);

  let { id } = useParams(); //lay nhung cai ky tu dang sau cai dau /
  let [job, setJob] = useState(null);

  let getDetailData = async () => {
    let url = `${apiAddress}/jobs/${id}`;
    let response = await fetch(url);
    let result = await response.json();
    console.log("result", result);
    setJob(result);
  };

  useEffect(() => {
    getDetailData();
  });

  if (job == null) {
    return "loading";
  }
  return (
    <div>
      <h1>
        {/* Details Page {jobtitle} id value is :{id} */}
        {job.title}
        {job.description}
      </h1>
    </div>
  );
}

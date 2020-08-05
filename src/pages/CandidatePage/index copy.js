import React, { useState, useEffect, useParams } from "react";
import { useHistory } from "react-router-dom";

let history = useHistory();
let [job, setJob] = useState(null);
const jobSelect = () => {
  history.push(`/job/${job.id}`);
};
const { id } = useParams();

const getData = async () => {
  let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
  let data = await fetch(url);
  let result = await data.json();
  setJob(result);
};
useEffect(() => {
  getData();
}, []);

export default function Details(props) {
  console.log({ props });
  return (
    <div className="job-content" onClick={() => jobSelect()}>
      {/* JobCard contents here */}
    </div>
  );
}

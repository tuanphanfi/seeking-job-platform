import React, { useState, useEffect } from "react";
import Moment from "react-moment";
// imrse
import { useHistory, useLocation } from "react-router-dom";
const apiKey = process.env.REACT_APP_BACKEND_SERVER_URL;

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let originalJobs = [];

export default function Jobs() {
  let history = useHistory();
  
  const getDetail = (id)=>{
    history.push(`/jobs/${id}`)
  }

  let query = useQuery();
  const [jobList, setJobList] = useState([]);
  const getData = async () => {
    const url = `${apiKey}/jobs`;
    const data = await fetch(url);
    const result = await data.json();
    console.log(result);
    setJobList(result);
    // filter tu cai originalJobs
    originalJobs = result; //save array full
  };

  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setJobList(originalJobs);
    }

    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    let filteredJobs = originalJobs;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalJobs.filter(
        (job) => job.title.toLowerCase().includes(keyword.toLowerCase()) //if this one true, return/push job into filteredJobs
      );
    }
    if (keyword === "") {
      history.push(`/jobs/`);
    }
    setJobList(filteredJobs);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [originalJobs]);

  if (jobList.length === 0) {
    return <h1>Loading</h1>;
  }

  return (
    <div  className="container border border-blue text-left d-flex flex-column align-items-center">
      {/* search input */}
      {/* moi lan submit cai form, se return 1 value. e === */}
      <form className="w-75" onSubmit={(e) => handleSearch(e)}>
        <input 
          onChange={(e) => handleOnChange(e)}
          className="d-inline-block w-75 px-2 py-1"
          type="text"
        />{" "}
        <button type="submit" className=" btn btn-danger text-white d-inline-block">
          Search  
        </button>
        {/*  */}
      </form>

      <h1>{jobList.length} IT jobs in Vietnam for you</h1>
      {jobList.map((item, index) => {
        return (
          <div onClick={()=>getDetail(item.id)} className="list-item row m-1 bg-warning p-2">
            {/* img */}
            <div className="col-2 d-flex justify-content-center align-items-center border border-danger">
              <img src={item.img} alt="" className="" />
            </div>

            {/* content */}
            <div className="col-8">
              <h3>{item.title}</h3>
              <h4>${item.salary}</h4>
              <ul>
                {item.benefits.map((benefit, indexBenefit) => (
                  <li>{benefit}</li>
                ))}
              </ul>

              {/* tags */}
              {item.tags.map((tag, indexTag) => (
                <p className="d-inline mr-2 border border-dark px-2">{tag}</p>
              ))}
            </div>
            {/* location - time */}
            <div className="col-2">
              <h5 className="text-center text-white bg-danger ">{item.isHotjob ? "Hot Job" : null}</h5>
              <p>
                {item.city} - District: {item.district}
              </p>
              {/* test */}
              <h6>
                <Moment fromNow>{item.time}</Moment>
              </h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

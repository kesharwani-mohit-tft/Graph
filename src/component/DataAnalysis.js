import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Datas } from "../Datas";

const DataAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4500/statics?startDate=&endDate=&camera_Id=&action_Id=&max_confidence=&min_confidence="
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("API", data.data);
  console.log("Fronted", Datas);

  const dates = data.data.map((data) =>
    moment(data.createdAt).format("DD/MM/YYYY")
  );
  const uniqueDatesSet = new Set(dates);
  const uniqueDatesArray = Array.from(uniqueDatesSet);
  // console.log(uniqueDatesArray);

  const confidenceRange = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  const totalAlerts = (dateData, confidenceRange) => {
    const alert = data.data
      .reverse()
      .filter(
        (i) =>
          i.confidence === confidenceRange &&
          moment(i.createdAt).format("DD/MM/YYYY") === dateData
      );
    return alert.length;
  };

  return (
    <>
  
    <div className="flex">
       <div className="w-9/12 bg-sky-100">      
      {/*1-Box ( confidenceHead and confidenceData )  */}
      <div className="flex">
        {/* confidenceHead  (static)*/}
        <span className="">
          {confidenceRange.reverse().map((i) => {
            return <span className="mt-6 ml-10 font-bold flex">{i}</span>;
          })}
        </span>
        {/* confidenceData (dynamic) */}
        {uniqueDatesArray.reverse().map((dateData, i) => {
          return (
            <span key={i} className="ml-10">
              {confidenceRange.map((conRange, j) => {
                return (               
                  <span
                    className={`mt-4 font-semibold flex ml-7 mr-7 rounded-full h-8 w-8 justify-center items-center ${totalAlerts(dateData, conRange)?"bg-sky-500 text-white":"bg-white"}`}
                    key={j}
                  >
                    {totalAlerts(dateData, conRange)}
                  </span>
                 
                );
              })}
            </span>
          );
        })}
      </div>

      {/*2-Box (Date)  */}
      <div className="ml-24 mt-6 pb-4">
        {uniqueDatesArray.map((i) => {
          return (
            <span className="pr-10 font-bold">{i}</span>
          );
        })}
      </div>
       </div>

       <div className="w-3/12 bg-sky-50 just flex flex-col items-center pt-10 rounded-2xl mt-1"  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <div>startDate</div>                                                                               
        <div>endDate</div>
        <div>Action</div>
        <div>Camera</div>
       </div>

    </div>
    </>
  );
};

export default DataAnalysis;







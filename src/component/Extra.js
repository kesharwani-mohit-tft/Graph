//not calling api we have local data from Datas
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ColumnChart.css"; // Import your custom CSS for styling
import { Datas } from "../Datas";

const Extra = () => {
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

  console.log("API",data.data);
  console.log("Fronted",Datas);

  const dates = Datas.map((data) =>
    moment(data.createdAt.$date).format("DD/MM/YYYY")
  );
  const uniqueDatesSet = new Set(dates);
  const uniqueDatesArray = Array.from(uniqueDatesSet);
  // console.log(uniqueDatesArray);


  const confidenceRange = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,1];

  const totalAlerts = (dateData, confidenceRange) => {
    const alert = Datas.reverse().filter(
      (i) =>
        i.confidence === confidenceRange &&
        moment(i.createdAt.$date).format("DD/MM/YYYY") === dateData
    );
    return alert.length;
  };


  return (
    <>

          <></>

                 {/*1-Box ( confidenceHead and confidenceData )  */}
      <div className="flex">
                       {/* confidenceHead  */}
        <span className="">
          {confidenceRange.reverse().map((i) => {
            return <span className="mt-6 ml-10 font-bold flex">{i}</span>;
          })}
        </span>
                       {/* confidenceData */}
        {uniqueDatesArray.reverse().map((dateData, i) => {
          return (
            <span key={i} className="ml-10 bg-slate-300">
              {confidenceRange.map((conRange, j) => {
                return (
                  <span
                    className="mt-6 font-semibold flex text-gray-700 bg-red-400 pl-10 pr-10"
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

                   {/*2-Box (Date Footer)  */}
      <div className="ml-24 mt-10 ">
        {uniqueDatesArray.map((i) => {
          return (
            <span className="mt-20 pr-10 font-bold  bg-red-400">
              {i},
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Extra;

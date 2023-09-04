import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Datas } from "../Datas";
import { MultiSelect } from "primereact/multiselect";

const DataAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [actionId, setActionId] = useState("");
  const [cameraId, setCameraId] = useState("");
  const [minConfidence, setMinConfidence] = useState("");
  const [maxConfidence, setMaxConfidence] = useState("");

  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4500/statics?startDate=${startDate}&endDate=${endDate}&camera_Id=${cameraId}&action_Id=${actionId}&max_confidence=${maxConfidence}&min_confidence=${minConfidence}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const handleSearch = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Action ID:", actionId);
    console.log("Camera ID:", cameraId);  
    fetchData();
  };

  return (
    <>
      <div className="flex">
        {/* Right side */}
        <div className="w-9/12 bg-sky-100 pl-16 pt-2 pb-3">
          <div className="font-bold text-center text-2xl pb-3 flex justify-around">
            <div>Data Analysis</div>
            <div className="flex">Total Alerts - {data.total}</div>
          </div>
          
          {/*1-Box ( confidenceHead and confidenceData )  */}
          <div className="flex">
            {/* confidenceHead  (static)*/}
            <span className="">
              {confidenceRange.reverse().map((i) => {
                return (
                  <span className="mt-[19px] ml-10 font-bold flex">{i}</span>
                );
              })}
            </span>
            {/* confidenceData (dynamic) */}
            {uniqueDatesArray.reverse().map((dateData, i) => {
              return (
                <span key={i} className="ml-10">
                  {confidenceRange.map((conRange, j) => {
                    return (
                      <span
                        className={`mt-3 font-semibold flex ml-7 mr-7 rounded-full h-8 w-8 justify-center items-center ${
                          totalAlerts(dateData, conRange)
                            ? "bg-sky-500 text-white"
                            : "bg-white"
                        }`}
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
              return <span className="pr-10 font-bold">{i}</span>;
            })}
          </div>
        </div>
        {/* Left side */}
        <div
          className="w-3/12 bg-sky-50 just flex flex-col gap-1 items-center pt-3 rounded-2xl mt-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          {/* start date */}
          <div className="mb-3 text-center">
            <div className="text-xl font-semibold ">Start Date</div>
            <input
              type="date"
              className="mt-4 px-10 py-1 rounded"
              value={startDate}
              onChange={(e) => setStartDate(moment(e.target.value).format("YYYY-MM-DD"))}
            ></input>
          </div>
          {/* end date */}
          <div className=" mb-3 text-center">
          <div className="font-semibold text-xl"> End Date</div>
            <input
              type="date"
              className="mt-4 px-10 py-1 rounded "
              value={endDate}
              onChange={(e) => setEndDate(moment(e.target.value).format("YYYY-MM-DD"))}
            ></input>
          </div>
          {/* Action */}
          <div className=" mb-3 text-center">
            <div className="text-xl font-semibold"> Action</div>
            <input
              type="number"
              className="mt-2  px-6 py-1 rounded "
              value={actionId}
              onChange={(e) => setActionId(e.target.value)}
            ></input>
          </div>
           {/* Camera */}
          <div className="mb-3 text-center">
            <div className="text-xl font-semibold ">Camera</div>
            <input
              type="number"
              className="mt-2  px-6 py-1 rounded "
              value={cameraId}
              onChange={(e) => setCameraId(e.target.value)}
            ></input>
          </div>
           {/* min confidence */}
           <div className="mb-3 text-center">
            <div className="text-xl font-semibold ">Min Confidence</div>
            <input
              type="number"
              className="mt-2  px-6 py-1 rounded "
              value={minConfidence}
              onChange={(e) => setMinConfidence(e.target.value)}
            ></input>
          </div>

           {/* max confidence */}
           <div className="mb-3 text-center">
            <div className="text-xl font-semibold ">Max Confidence</div>
            <input
              type="number"
              className="mt-2  px-6 py-1 rounded "
              value={maxConfidence}
              onChange={(e) => setMaxConfidence(e.target.value)}
            ></input>
          </div>

          <button className="bg-green-600 text-white font-semibold px-12 py-2 rounded-lg"     onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default DataAnalysis;

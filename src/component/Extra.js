import React from 'react';
import moment from "moment";
import './ColumnChart.css'; // Import your custom CSS for styling
import {Datas} from "../Datas"

const Extra = () => {

const dates = Datas.map(data => moment(data.createdAt.$date).format("DD/MM/YYYY"));
const uniqueDatesSet = new Set(dates);
const uniqueDatesArray = Array.from(uniqueDatesSet);
// console.log(uniqueDatesArray);

// const confidenceRange = [
//     ' 0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5',
//     '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1 '
//   ];
  const confidenceRange = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];
  
  const totalAlerts=(dateData,confidenceRange,)=>{    
    //   console.log("c",confidenceRange);
    //   console.log("c",Datas);    
    //   console.log("c",dateData);   
  
     const alert = Datas.reverse().filter((i)=>i.confidence === confidenceRange && moment(i.createdAt.$date).format("DD/MM/YYYY") === dateData)    
      return alert.length;
  }

  return (
    <>
    <div className='flex'>
    <span className="">        
      {
        confidenceRange.reverse().map((i)=>{
            return <span className='mt-6 ml-4 font-bold flex'>{i}</span>
        })
      }
    </span>
  
  {uniqueDatesArray.reverse().map((dateData,i)=>{
    return  <span key={i} className="ml-10">        
    {
     confidenceRange.map((conRange, j) => {
        return <span className='mt-6 ml-10 font-semibold flex text-gray-700' key={j}>{totalAlerts(dateData, conRange)}</span>;
    })
    
    }
  </span>
  })}
    </div>

    <div className=" ml-12 mt-10">        
      {
        uniqueDatesArray.map((i)=>{
            return <span className='mt-20 ml-4 font-bold'>{i},{"  "}</span>
        })
      }
    </div>

    </>
  );
};

export default Extra;

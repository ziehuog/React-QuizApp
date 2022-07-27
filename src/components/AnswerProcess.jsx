import React, { useContext } from "react";
import { DATA } from "../utils/data";
import { Context } from "./Context";



const AnswerProcess = () => {
  const {index} = useContext(Context)



  let percentage = DATA.length
  
  const processColor = ((Number(index))/ (Number(percentage)))*200

  const showPercentage = Math.round(((Number(index))/ (Number(percentage))) * 100)

  return (
    <div className="p-[40px] border-b-[2px]">
      <h1 className="font-bold text-[50px]">Reactjs Quiz</h1>

      <div className="w-[200px] h-[20px] bg-[#808080] rounded-[20px] m-auto my-6">
        <div className="h-full bg-indigo-500 rounded-[20px]" style={{width: `${processColor}px`}}></div>
      </div>
      <div className="process__text">{showPercentage}% Complete</div>
    </div>
  );
};

export default AnswerProcess;

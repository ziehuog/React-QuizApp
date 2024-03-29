import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { questionContext } from "./Share/Context/QuestionContext";

const SubmitScreen = () => {

  const { state, data, navigateToScore, currentSubject } = useContext(questionContext);
  const { storeAns } = state;
  console.log(data)

  let navigate = useNavigate();


  return (
    <Fragment>
      <div className="py-[100px] flex justify-center">
      <div className="bg-gray-200/80 p-[40px] rounded-2xl mt-[40px] h-min">
      <div className="text-[30px] text-center py-[30px]  ">
        Do you finished?
      </div>

      {/* map to display question */}
      <div className="border border-gray-900 p-[40px] rounded-2xl m-auto p-auto mb-[50px] ">
        {data.map((data) => {
          return (
            <div key={data.id} className="my-3 ">
              <div className="my-3 "> Câu: {data.id}</div>

              {/* Map to display answers */}
              {data.answers.map((elems) => {
                return (
                  <label key={elems.id}>
                    <span className="bg-slate-400 rounded-[10px] m-[15px] py-2 text-start px-[10px]">
                      <input
                        type="checkbox"
                        name={elems.id}
                        
                        // preview checked
                        readOnly
                        checked={
                          storeAns.length > 0 &&
                          storeAns.some((a) => {
                            if (a.id === data.id && a.answer === elems.id) {
                              return true;
                            }
                            return false;
                          })
                        }
                        className="mx-3"
                      />
                      {elems.id}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="text-center pt-5">
        <button
          className=" border border-gray-900 rounded-[8px] cursor-pointer 
          py-1 px-9 mx-5 py-[7px] hover:bg-indigo-600/60 hover:text-white"
          onClick={() => (navigate(`/question/${currentSubject}`))}
        >
          Back
        </button>
        <button
          className=" border border-gray-900 rounded-[8px] cursor-pointer 
          py-1 px-8 mx-5 py-[7px] hover:bg-indigo-600/60 hover:text-white"
          onClick={navigateToScore}
        >
          Submit
        </button>
      </div>
      </div>
    </div>
    </Fragment>
  );
};

export default SubmitScreen;

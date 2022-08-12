import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { db } from "../../utils/firebase";
import Modals from "./Modals";

function ShowData() {
  const [modalShow, setModalShow] = useState(false);
  const [displayFetch, setDisplayFetch] = useState('block')

  const [allData, setAllData] = useState([]);
  const [upData, setUpData] = useState({
    id: "",
    question: "",
    correctAnswer: "",
    answers: [],
    answerId: []
  });

  const FetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Questions"));

    querySnapshot.forEach((doc) => {
      setAllData((prev) => {
        return [ { data: doc.data(), id: doc.id }, ...prev];
      });
    });
    setDisplayFetch('none')

  };

  const deleteData = async (id) => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      await deleteDoc(doc(db, "Questions", id));
      toast.success("Delete successfully");
      window.location.reload();
    }
  };

  const handleChange = (question) => (e) => {
    console.log(e.target.value);
    setUpData({ ...upData, [question]: e.target.value });
  };

  return (
    <div className="px-6">
      <Modals
        updata={upData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleChange={handleChange}
      />

      <h1 className="text-center text-[35px] pt-7 font-bold ">
        List questions
      </h1>
      <div className="flex justify-center mt-4">
      <button
      style={{display: `${displayFetch}`}}
        className="border mx-2 px-3 py-1 m-auto rounded-md hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60 "
        onClick={FetchData}
      >
        Fetch
      </button>
      </div>
      <SimpleBar style={{ maxHeight: 600 }}>
        {allData.map((items) => (
          <div key={items.data.id} className="border-2 border-black my-4 p-2">
            <div className="flex justify-between">
              <div className="font-bold">Question {items.data.id}</div>
              <div>
                <button
                  variant="primary"
                  onClick={() => {
                    setUpData({
                      question: items.data.question,
                      id: items.id,
                      correctAnswer: items.data.correctAnswer,
                      answers: items.data.answers,
                      answerId: items.data.id

                    });
                    setModalShow(true);
                  }}
                  className="border mx-2 px-3 py-1 rounded-md hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteData(items.id);
                  }}
                  className="border mx-2 px-3 py-1 rounded-md hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="border border-black my-3">
              <p>Question: </p>
              <p>{items.data.question} </p>
              <p>Answers: </p>
              {items.data.answers.map((ans) => (
                <div key={ans.id}>
                  <p>
                    {ans.id}: {ans.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
}

export default ShowData;

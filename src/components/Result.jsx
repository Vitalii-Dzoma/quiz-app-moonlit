import React from "react";

const Result = ({
  showResult,
  quizs,
  marks,
  partnersMarks,
  startOver,
  myValue,
  partnerValue,
}) => {
  let x = 0;

  const resultText = quizs?.find((ob) => {
    if (ob.label === "Your Initial Results") return ob;
  });
  console.log(partnersMarks);

  return (
    <section
      className="bg-dark text-white"
      style={{ display: `${showResult ? "block" : "none"}` }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className={`text-light text-center p-5 rounded ${
                marks > (quizs.length * 5) / 2 ? "bg-success" : "bg-danger"
              }`}
            >
              <h1 className="mb-2 fw-bold">
                {myValue.map((i) => (x += i)).reverse()[0]}
                {marks > (quizs.length * 5) / 2 ? "Awesome!" : "Oops!"}
              </h1>
              <h3 className="mb-3 fw-bold">
                Your total score was {myValue.map((i) => (x += i)).reverse()[0]}{" "}
                and your most common score was {marks}. Your partner score is{" "}
                {partnerValue.map((i) => (x += i)).reverse()[0]} and your most
                common score was {partnersMarks}.{/* {quizs.length * 5} */}
              </h3>

              <button
                onClick={startOver}
                className="btn py-2 px-4 btn-light fw-bold d-inline"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;

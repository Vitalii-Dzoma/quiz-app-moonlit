import React from "react";
import DiscreteSliderMarks from "./Slider";
import DiscreteSliderMarks1 from "./Slider1";
const Quiz = ({
  showQuiz,
  question,
  quizs,
  checkAnswer,
  correctAnswer,
  selectedAnswer,
  questionIndex,
  nextQuestion,
  showTheResult,
  transmitChoice,
}) => {
  return (
    <section
      className="bg-dark text-white"
      style={{ display: `${showQuiz ? "block" : "none"}` }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: "#3d3d3d", borderColor: "#646464" }}
            >
              <div className="d-flex justify-content-between gap-md-3">
                <h5 className="mb-2 fs-normal lh-base">{question?.caption}</h5>
                <h5
                  style={{
                    color: "#60d600",
                    width: "100px",
                    textAlign: "right",
                  }}
                >
                  {quizs.indexOf(question)} / {quizs?.length - 2}
                </h5>
              </div>
              <div>
                <h5>{question.label}</h5>
                {/* {question?.options?.map((item, index) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      correctAnswer === item && "bg-success"
                    }`}
                    onClick={(event) => checkAnswer(event, item)}
                  >
                    {item}
                  </button>
                ))} */}
                {/* {question?.options?.map((item, index) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      correctAnswer === item && "bg-success"
                    }`}
                    onClick={(event) => checkAnswer(event, item)}
                  >
                    {item}
                  </button>
                ))} */}
              </div>

              {questionIndex + 1 !== quizs.length ? (
                <>
                  <DiscreteSliderMarks />
                  <DiscreteSliderMarks1 />
                  <button
                    className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                    onClick={nextQuestion}
                    // disabled={!selectedAnswer}
                  >
                    Next Question
                  </button>
                </>
              ) : (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={showTheResult}
                  disabled={!selectedAnswer}
                >
                  Show Result
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;

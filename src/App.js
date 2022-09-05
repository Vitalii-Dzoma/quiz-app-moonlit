import React, { useEffect, useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import DiscreteSliderMarks from "./components/Slider";

function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [myChosenValue, setMyChosenValue] = useState([]);
  const [notMyChosenValue, setNotMyChosenValue] = useState([]);

  const [marks, setMarks] = useState(0);
  const [partnersMarks, setPartnersMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Load JSON Data
  // useEffect(() => {
  //   fetch("quiz.json")
  //     .then((res) => res.json())
  //     .then((data) => setQuizs(data));
  // }, []);

  useEffect(() => {
    fetch("quiz-data.json")
      .then((res) => res.json())
      .then((data) => setQuizs(data.pages));
  }, []);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length - 1 > questionIndex) {
      setQuesion(quizs[questionIndex]);
      console.log(question);
    }
  }, [quizs, questionIndex]);

  const transmitMyChoice = (event) => {
    setFirstValue(event.target.value);

    // console.log(event.target.value);
    // console.log("Мой вібор", myChosenValue);
  };

  const transmitChoice = (event) => {
    setSecondValue(event.target.value);
    // console.log(event.target.value);
    // console.log("Выбор партнера", notMyChosenValue);
  };

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  //Count result
  const findMostOftenElement = (arr) => {
    const reps = arr.reduce((accum, item) => {
      const newCount = (accum[item] || 0) + 1;
      return { ...accum, [item]: newCount };
    }, {});
    const maxTimes = Math.max.apply(null, Object.values(reps));
    const [recordItem] = Object.entries(reps).find(
      ([, val]) => val === maxTimes
    );

    // console.log(recordItem + " ( " + maxTimes + " times ) ");
    return recordItem;
  };

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
    setMyChosenValue([...myChosenValue, firstValue]);
    setNotMyChosenValue([...notMyChosenValue, secondValue]);
    console.log(myChosenValue);
    console.log(notMyChosenValue);
  };

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
    setMarks(findMostOftenElement(myChosenValue));
    setPartnersMarks(findMostOftenElement(notMyChosenValue));
  };

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
    setMyChosenValue([]);
    setNotMyChosenValue([]);
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
  };

  return (
    <>
      {/* Welcome Page */}
      <Start startQuiz={startQuiz} showStart={showStart} />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
        transmitMyChoice={transmitMyChoice}
        transmitChoice={transmitChoice}
        oftenGoal={findMostOftenElement}
      ></Quiz>

      {/* Result Page */}
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        partnersMarks={partnersMarks}
        startOver={startOver}
        myValue={myChosenValue}
        partnerValue={notMyChosenValue}
      />
    </>
  );
}

export default App;

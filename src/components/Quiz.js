import React from 'react';

const Quiz = ({ showQuiz, question, quizs, checkAnswer, correctAnswer, selectedAnswer, questionIndex, nextQuestion, showTheResult }) => {
    return (
        <section className="bg-dark text-white" style={{ display: `${showQuiz ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            <div className="d-flex justify-content-between gap-x-5">
                                <h4 className='mb-2'>{question?.question}</h4>
                                <h5 style={{ color: '#60d600', minWidth: '100px', marginTop: '5px', textAlign: 'right' }}>{quizs.indexOf(question) + 1} / {quizs?.length}</h5>
                            </div>
                            <div>
                                {
                                    question?.options?.map((item, index) => <div key={index}>
                                        <input
                                            className='d-none'
                                            type="radio"
                                            value={item}
                                            name="answer-option"
                                            id={index}
                                            onClick={checkAnswer}
                                        />

                                        <label htmlFor={index} className="btn py-2 px-3 mt-3 text-start text-light w-100" style={{ background: `${correctAnswer === item ? "#3c8800" : "#333333"}` }}>{item}</label>
                                    </div>)
                                }
                            </div>

                            {
                                (questionIndex + 1) !== quizs.length ?
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={nextQuestion} disabled={!selectedAnswer}>Next Question</button>
                                    :
                                    <button className='btn py-2 w-100 mt-3 bg-primary text-light fw-bold' onClick={showTheResult} disabled={!selectedAnswer}>Show Result</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
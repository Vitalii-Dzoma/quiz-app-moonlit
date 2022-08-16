import React from 'react';

const Result = ({ showResult, quizs, marks, startOver }) => {
    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-light text-center p-5 rounded" style={{ background: '#3c8800' }}>
                            <h3 className='mb-3 fw-bold'>Your Score is {marks} out of {quizs.length * 5}</h3>

                            <button onClick={startOver} className='btn py-2 px-4 btn-light fw-bold d-inline'>Start Over</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;
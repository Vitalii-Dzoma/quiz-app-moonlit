import "./App.css";
import { data } from "./data";
import { useEffect, useState } from "react";

function App() {
  const { pages } = data;
  const [pageNumber, setPageNumber] = useState(0);
  const [pageContent, setPageContent] = useState(pages[pageNumber]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPartnerOption, setSelectedPartnerOption] = useState("");
  const [selectedOptionValue, setSelectedOptionValue] = useState();
  const [selectedOptionPartnerValue, setSelectedOptionPartnerValue] =
    useState();
  const [totalScore, setTotalScore] = useState(0);
  const [totalPartnerScore, setTotalPartnerScore] = useState(0);
  const [commonScore, setCommonScore] = useState([]);
  const [commonPartnerScore, setCommonPartnerScore] = useState([]);

  useEffect(() => {
    setPageContent(pages[pageNumber]);
    console.log(pageContent);
  }, [pageNumber]);

  useEffect(() => {
    if (pageContent.defaultIndex) {
      setSelectedOption(pageContent.options[pageContent.defaultIndex]);
      setSelectedPartnerOption(pageContent.options[pageContent.defaultIndex]);
      setSelectedOptionValue(pageContent.values[pageContent.defaultIndex]);
      setSelectedOptionPartnerValue(
        pageContent.values[pageContent.defaultIndex]
      );
    }
  }, [pageContent]);

  const handleInputChange = (e, option) => {
    setSelectedOption(option);
    setSelectedOptionValue(e.target.value);
  };

  const handleInputPartnerChange = (e, option) => {
    setSelectedPartnerOption(option);
    setSelectedOptionPartnerValue(e.target.value);
  };

  const handleNextClick = () => {
    if (pageContent.options) {
      setTotalScore((prevState) => prevState + +selectedOptionValue);
      setCommonScore((prevState) => [...prevState, +selectedOptionValue]);
      setTotalPartnerScore(
        (prevState) => prevState + +selectedOptionPartnerValue
      );
      setCommonPartnerScore((prevState) => [
        ...prevState,
        +selectedOptionPartnerValue,
      ]);
    }
    setPageNumber((prevState) => prevState + 1);
  };

  const getMostFrequent = (arr) => {
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  };

  const renderResults = () => {
    const common = getMostFrequent(commonScore);

    return pageContent.bodyBold
      .replace("<total_score>", totalScore.toString())
      .replace("<common_score>", common.toString());
  };

  const renderPartnerResults = () => {
    const commonPartner = getMostFrequent(commonPartnerScore);

    return pageContent.bodyBold
      .replace("Your", "Your Partner's")
      .replace("your", "")
      .replace("<total_score>", totalPartnerScore.toString())
      .replace("<common_score>", commonPartner.toString());
  };

  return (
    <section className="bg-dark text-white">
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: "#3d3d3d", borderColor: "#646464" }}
            >
              <div className="gap-md-3">
                {pageContent.body && (
                  <div className="body">
                    {pageContent.body.replace("<partner name>", "Partner")}
                  </div>
                )}
                {pageContent.bodyBold && (
                  <div className="body-bold">{renderResults()}</div>
                )}

                {pageContent.bodyBold && (
                  <div className="body-bold">{renderPartnerResults()}</div>
                )}
                <div className="label" style={{ margin: 50 }}>
                  {pageContent.label}
                </div>
                {pageContent.options && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: 40,
                      marginBottom: 50,
                    }}
                  >
                    {pageContent.options.map((option, index) => (
                      <label
                        htmlFor={option}
                        key={option}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {option}
                        <input
                          id={option}
                          type="checkbox"
                          value={pageContent.values[index]}
                          checked={option === selectedOption}
                          onChange={(e) => handleInputChange(e, option)}
                        />
                      </label>
                    ))}
                  </div>
                )}
                {pageContent.options && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: 40,
                      marginBottom: 50,
                    }}
                  >
                    {pageContent.options.map((option, index) => (
                      <label
                        htmlFor={option}
                        key={option}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {option}
                        <input
                          id={option}
                          type="checkbox"
                          value={pageContent.values[index]}
                          checked={option === selectedPartnerOption}
                          onChange={(e) => handleInputPartnerChange(e, option)}
                        />
                      </label>
                    ))}
                  </div>
                )}
                {pageContent.done && (
                  <button onClick={handleNextClick}>{pageContent.done}</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

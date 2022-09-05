import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import debounce from "lodash/debounce";
import { useState } from "react";
// const [myMarks, setMyMarks] = useState([]);
// const [partnerMarks, setPartnerMarks] = useState([]);
const DEBOUNCE_DELAY = 3000;

const marks = [
  {
    value: 1,
    label: "Strongly disagree",
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
    label: "Neutral",
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
    label: "Strongly agree",
  },
];

const DiscreteSliderMarks1 = ({ transmitChoice }) => {
  const [value, SetValue] = useState(0);

  //   const debouncedChangeHandler = useMemo(
  //     () => debounce((userInput) => fetchQuery(userInput), DEBOUNCE_DELAY),
  //     []
  //   );

  function valuestext(values) {
    SetValue(values);
    return `${values}`;
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={4}
        getAriaValueText={valuestext}
        step={1}
        min={1}
        max={7}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={debounce((event) => transmitChoice(event), DEBOUNCE_DELAY)}
      />
    </Box>
  );
};

export default DiscreteSliderMarks1;

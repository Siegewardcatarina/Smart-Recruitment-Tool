import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import React, { useState } from "react";

const Bar = ({ barData, input }) => {
  const [graphsData, setGraphsData] = useState([]);
  const [lineGraphs, setLineGraphs] = useState([]);
  const [bardata, setBarData] = useState([]);
  console.log(barData);
  console.log(input);

  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[panel] = isExpanded;
      return newExpanded;
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log(graphsData);
  return (
    <div>
      <div>
        {barData &&
          barData.map((entry, index) => (
            <Item key={index}>
              <Accordion
                expanded={expanded[index] || false}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography>{entry.prompt}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <LineChart
                    xAxis={[{ data: entry.data.data.map((item) => item[0]) }]}
                    series={[{ data: entry.data.data.map((item) => item[1]) }]}
                    width={500}
                    height={300}
                  />
                </AccordionDetails>
              </Accordion>
            </Item>
          ))}
      </div>
    </div>
  );
};
export default Bar;

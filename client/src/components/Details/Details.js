import React from "react";

import { Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const Details = ({ pRate, oRate, ...rest }) => {
  return (
    <div style={{ padding: 0 }} className="App">
      <h1>Details</h1>
      <Paper style={{ padding: "20px 20px", width: "1000px" }}>
        <Grid container wrap="nowrap" spacing={2} direction="column">
          {/* <Grid item container wrap="nowrap" spacing={2}> */}
          <Grid item xs={12}>
            <ul>
              {/* <li>3 bed rooms</li>
              <li>Wi-Fi</li> */}
            </ul>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <ul style={{ "list-style-type": "none" }}>
                <li>Property Ratings</li>
                <li>
                  <Rating name="property" size="medium" value={5} /> {pRate[5]}
                </li>
                <li>
                  <Rating name="property" size="medium" value={4} /> {pRate[4]}
                </li>
                <li>
                  <Rating name="property" size="medium" value={3} /> {pRate[3]}
                </li>
                <li>
                  <Rating name="property" size="medium" value={2} /> {pRate[2]}
                </li>
                <li>
                  <Rating name="property" size="medium" value={1} /> {pRate[1]}
                </li>
                <li>
                  <Rating name="property" size="medium" value={0} /> {pRate[0]}
                </li>
              </ul>
            </Grid>
            <Grid item xs={6}>
              <ul style={{ "list-style-type": "none" }}>
                <li>Owner Ratings</li>
                <li>
                  <Rating name="owner" size="medium" value={5} /> {oRate[5]}
                </li>
                <li>
                  <Rating name="owner" size="medium" value={4} /> {oRate[4]}
                </li>
                <li>
                  <Rating name="owner" size="medium" value={3} /> {oRate[3]}
                </li>
                <li>
                  <Rating name="owner" size="medium" value={2} /> {oRate[2]}
                </li>
                <li>
                  <Rating name="owner" size="medium" value={1} /> {oRate[1]}
                </li>
                <li>
                  <Rating name="owner" size="medium" value={0} /> {oRate[0]}
                </li>
              </ul>
              {/* <button>payment</button> */}

              
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Details;

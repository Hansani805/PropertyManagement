import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import axios from '../../util/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    //backgroundColor: "#A28089",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [propertyData, setPropertyData] = useState([
    {
      _id: "603b42dfbfcd3d4998d64a19",
      name: "test",
      price: 1500,
      rating: 2
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/property")
      .then((response) => {
        console.log(response.data.data);
        setPropertyData(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.root}>
      <Grid container justify="flex-start">
        <Grid item container spacing={3} justify="space-evenly">
          {propertyData.map((property) => {
            console.log(property.rating);
            return (
              <Grid item xs={3}>
                <Card data={property} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Comment from "../../components/Comment/Comment";
import Details from "../../components/Details/Details";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "../../components/mainpages/utils/axios";



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
     backgroundColor: "#A28089",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
  media: {
    height: 500,
  },
}));

const PropertyDetails = () => {

  

  const classes = useStyles();
  const location = useLocation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    _id: {
      $oid: "603b42dfbfcd3d4998d64a19",
    },
    pRatings: {
      zero: 0,
      one: 0,
      two: 0,
      three: 3,
      four: 0,
      five: 3,
    },
    oRatings: {
      zero: 0,
      one: 0,
      two: 0,
      three: 4,
      four: 2,
      five: 0,
    },
    rating: 3.8,
    details: [],
    name: "check updatessss",
    price: 1500,
    comments: [
      {
        pRating: 5,
        oRating: 3,
        _id: {
          $oid: "603cc1364f5f9b3ce01a340c",
        },
        gId: "1",
        gName: "guest",
        email: "test@test.com",
        tp: 771234567,
        text: "this is test",
        replies: [],
      },
      {
        pRating: 3,
        oRating: 4,
        _id: {
          $oid: "603cc1934f5f9b3ce01a340d",
        },
        gId: "222",
        gName: "fdffd",
        email: "0777123456",
        tp: null,
        text: "fdfdfdfdfdddf",
        replies: [],
      },
      {
        pRating: 3,
        oRating: 4,
        _id: {
          $oid: "603cc2614f5f9b3ce01a340e",
        },
        gId: "222",
        gName: "fdffd",
        email: "0777123456",
        tp: null,
        text: "fdfdfdfdfdddf",
        replies: [],
      },
      {
        pRating: 3,
        oRating: 3,
        _id: {
          $oid: "603cc26a4f5f9b3ce01a340f",
        },
        gId: "",
        gName: "",
        email: "",
        tp: null,
        text: "",
        replies: [],
      },
    ],
    createdAt: {
      $date: "2021-02-28T07:14:39.175Z",
    },
    updatedAt: {
      $date: "2021-03-01T10:31:06.865Z",
    },
    __v: 0,
  });
  const [loding, setLoading] = useState(true);
  // const [guestId, setGuestId] = useState("");
  // const [guestName, setGuestName] = useState("");
  // const [email, setEmail] = useState("");
  // const [tpNo, setTpNo] = useState("");
  const [pRating, setPRating] = useState(3);
  const [oRating, setORating] = useState(3);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (location.state) {
      axios
        .get(`/property/${location.state._id}`)
        .then((response) => {
          console.log(response);
          setData(response.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      // setLoading(false);
    }
  }, [location.state, load]);

  // const AfterDeleteHandler = (data) => {
  //   useEffect(() => {
  //     setData(data);
  //   }, [])
  // }
  

  const submitHandler = () => {
    var guestName="Smanthika";
    var guestId = "G008";
    axios
      .post("/comment/", {
        pId: data._id,
        gId: guestId,
        gname: guestName,
        // email: email,
        // tp: tpNo,
        pRating: pRating,
        oRating: oRating,
        text: commentText,
      })
      .then((response) => {
        console.log(response);
        // setGuestId("");
        // setGuestName("");
        // setEmail("");
        // setTpNo("");
        setPRating(3);
        setORating(3);
        setCommentText("");
        axios
          .get(`/property/${location.state._id}`)
          .then((response) => {
            console.log(response);
            setData(response.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return loding ? (
    <CircularProgress
      size={100}
      style={{ marginLeft: "48%", marginTop: "20%" }}
    />
  ) : (
    <div className={classes.root}>
      <Paper elevation={0} />
      <Grid container spacing={0} justify="flex-start">
        <Grid item xs={12}>
          <Card>
            {/* <CardActionArea> */}
            <CardMedia
              className={classes.media}
              image="https://www.berjayahotel.com/sites/default/files/hotel-category-offers/kualalumpur/offers-room-berjaya-times-square-hotel-kuala-lumpur.jpg"
              title="Contemplative Reptile"
            />
            {/* </CardActionArea> */}
          </Card>
        </Grid>
        <Details pRate={data.pRatings} oRate={data.oRatings} />
        <div style={{ padding: 14 }} className="App">
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px", width: "1360px" }}>
            {data.comments.map((comment) => (
              <Comment
                key={comment._id}
                pId={data._id}
                commentId={comment._id}
                user={comment.gName}
                rate={comment.pRating}
                replies={comment.replies}
                text={comment.text}
                dat={setLoad}
              />
            ))}
            <div style={{backgroundColor: "#EDF7F6", padding: "10px"}}>
              <Grid container spacing={2} justify="center">
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="gid"
                    label="Guest ID"
                    name="gid"
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="gname"
                    label="Guest Name"
                    name="gname"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="tp"
                    label="Telephone Number"
                    name="tp"
                    value={tpNo}
                    onChange={(e) => setTpNo(e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={12} container>
                  <Grid item xs={3}>
                    <Typography>Property Rating:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Rating
                      name="simple-controlled"
                      size="large"
                      value={pRating}
                      onChange={(event, newValue) => {
                        console.log(event, newValue);
                        setPRating(newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Owner Rating:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Rating
                      name="simple-controlledd"
                      size="large"
                      value={oRating}
                      onChange={(event, newValue) => {
                        console.log(event, newValue);
                        setORating(newValue);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    id="comment"
                    label="Comments..."
                    name="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => submitHandler()}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </div>
        {/* <Grid>
          <Typography>Details: </Typography>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default PropertyDetails;

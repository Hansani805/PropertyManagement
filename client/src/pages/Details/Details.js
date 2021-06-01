import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
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
  // form: {
  //   width: "100%",
  //   marginTop: theme.spacing(3),
  // },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
  root: {
    display: "flex",
    // backgroundColor: "#A28089",
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

const PropertyDetails = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();

  const [loding, setLoading] = useState(true);
  // const [guestId, setGuestId] = useState("");
  // const [guestName, setGuestName] = useState("");
  // const [email, setEmail] = useState("");
  // const [tpNo, setTpNo] = useState("");
  const [pRating, setPRating] = useState(3);
  const [oRating, setORating] = useState(3);
  const [commentText, setCommentText] = useState("");
  const [ratings, setRatings] = useState({ p_rating: [], o_rating: [] });

  useEffect(() => {
    if (location.state) {
      console.log("got hte product id");

      axios
        .get(`/api/comment/${location.state.product_id}`)
        .then(async (response) => {
          console.log(response);
          if (response.data) {
            setData(response.data);
          }
          await getStats();
          setLoading(false);
        })
        .catch((err) => console.log(err));

      setLoading(false);
    } else {
      console.log("no product id");
    }
  }, []);

  

  const commentSection = () => {
    if (data && data.comments && data.comments.length > 0) {
      console.log(data.comments);
    }
    return data && data.comments ? (
      data.comments.map((comment) => (
        <Comment
          key={comment._id}
          pId={data.product_id}
          commentId={comment._id}
          user={comment.gName}
          rate={comment.pRating}
          replies={comment.replies}
          text={comment.comment}
          dat={setLoad}
        />
      ))
    ) : (
      <></>
    );
  };

  const getStats = async () => {
    console.log("is called");
    axios
      .get(`/api/comment/stat/${location.state.product_id}`)
      .then((response) => {
        if (response && response.data && response.data.ratings) {
          setRatings(response.data.ratings);
        }

        
      })
      .catch((err) => console.log(err));
  };

  

  const submitHandler = (e) => {
    e.preventDefault();
    var guestName = "Smanthika";
    var guestId = "G008";

    const comment = {
      gId: guestId,
      gName: guestName,
      
      pRating: pRating,
      oRating: oRating,
      comment: commentText,
      product_id: location.state.product_id,
    };
    console.log("savingggggggg");
    console.log(comment);
    axios
      .post("/api/comment/", comment)
      .then((response) => {
        console.log(response);
        
        setPRating(3);
        setORating(3);
        setCommentText("");
        axios
          .get(`/api/comment/${location.state.product_id}`)
          .then(async (response) => {
            console.log(response);
            if (response.data) {
              setData(response.data);
            }
            await getStats();
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
      size={50}
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
        <Details pRate={ratings.p_rating} oRate={ratings.o_rating} />
        <div style={{ padding: 1 }} className="App">
          <h1>Comments</h1>

          <Paper style={{ padding: "00px 00px", width: "1000px" }}>
            {/* comment section */}
            <div> {commentSection()}</div>
            <div style={{ backgroundColor: "#EDF7F6", padding: "10px" }}>
              <form onSubmit={submitHandler}>
                <Grid container spacing={2} justify="center">
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
                    ></TextField>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
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

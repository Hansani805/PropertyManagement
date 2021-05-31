import React, { useEffect, useState } from "react";

import { Divider, Avatar, Grid, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import axios from "../../components/mainpages/utils/axios";



const Comment = (props) => {
  const { user, rate, replies, text, pId, commentId, dat } = props;
  const [replyData, setReplyData] = useState(replies);
  const [reply, setReply] = useState('');
  const [replyState, setReplyState] = useState(false);
  
  useEffect(() => {
    if(replyState)
      axios
        .post('/api/comment/reply', {pId: pId, commentId: commentId, reply: {user: "W008-Aruna Perera", text: reply}})
        .then((response) => {
          console.log(response);
          setReplyData(prev => [...prev, {user: "W008-Aruna Perera", text: reply}]);
          setReplyState(false);
        })
        .catch((err) => console.log(err));

      // setLoading(false);
  }, [replyState, commentId, pId, reply]);

  return (
    <>
      <Grid container wrap="nowrap" spacing={2} direction="column">
        <Grid item xs={12}>
          <Rating name="read-only" value={rate} readOnly />
        </Grid>
        <Grid item container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Grid item container justify="space-between">
              <Grid item>
                <h4 style={{ margin: 0, textAlign: "left" }}>{user}</h4>
              </Grid>
              {/* <Grid item>
                <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid> */}
            </Grid>

            <p style={{ textAlign: "left" }}>{text}</p>
            <Grid item container>
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                {/* <p style={{ textAlign: "left" }}>
                    This is reply
                  </p> */}
                <ul>
                  {replyData.map((reply) => (
                    <li key={Math.random()}>
                      {reply.user}
                      <br></br>
                      {reply.text}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="email"
              label=""
              placeholder="Reply..."
              multiline
              name="reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Grid justify="space-between" item container xs>
              <Grid item>
                <Button
                  onClick={() => setReplyState(true)}
                  color="primary"
                  variant="contained"
                >
                  Reply
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() =>
                    axios
                      .delete("/api/comment/", {
                        data: { pId: pId, commentId: commentId },
                      })
                      .then((response) => {
                        console.log(response);
                        axios
                          .get(`/api/property/${pId}`)
                          .then((response) => {
                            console.log(response);
                            dat(prev => !prev);
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err))
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

      {/* <Grid container wrap="nowrap" spacing={2} direction="column">
          <Grid item xs={12}>
            <Rating name="read-only" value={2} readOnly />
          </Grid>
          <Grid item container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Sample Person</h4>
              <p style={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet, tortor.
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p>
            </Grid>
          </Grid>
        </Grid> */}
    </>
  );
};

export default Comment;

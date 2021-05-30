import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 140,
  },
});

const PropertyCard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  console.log(props);

  return (
    // <Grid item xs={4}>
    <Card className={classes.root} onClick={() => history.push({pathname: '/item', state: props.data})}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image="https://www.berjayahotel.com/sites/default/files/hotel-category-offers/kualalumpur/offers-room-berjaya-times-square-hotel-kuala-lumpur.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            
          </Typography> */}
          <Rating name="read-only" value={props.data.rating} readOnly />
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        
      </CardActions> */}
    </Card>
    // </Grid>
  );
}

export default PropertyCard;

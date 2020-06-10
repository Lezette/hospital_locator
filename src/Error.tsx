import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

const Error = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Oops! Something Went Wrong
          <span role="img" aria-label="tears">
            😮😪😫
          </span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Please refresh your page
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Error;

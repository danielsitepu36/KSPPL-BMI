import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

axios.defaults.baseURL =
  "https://asia-southeast2-bmi-project-68564.cloudfunctions.net/api";

const styles = (theme) => ({
  ...theme.spreadIt,
  form: {
    textAlign: "center",
  },
  TextField: {
    margin: "8px auto",
  },
  Title: {
    margin: "2px auto",
  },
  Left: {
    textAlign: "left",
  },
  Button: {
    marginTop: "10px",
  },
  Progress: {
    marginTop: "10px",
  },
  Result: {
    textAlign: "left",
  },
  visibleSeparator: {
    width: "80%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      category: "null",
      age: "",
      weight: "",
      height: "",
      loading: false,
      result: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    axios
      .post("/bmi", {
        age: this.state.age,
        weight: this.state.weight,
        height: this.state.height,
      })
      .then((res) => {
        this.setState({
          value: res.data.result.value,
          category: res.data.result.category,
          result: true,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
          result: false,
        });
        console.log(err.response.data);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Grid container>
          <Grid item sm={1} lg={3} xl={4}></Grid>
          <Grid item sm={10} lg={6} xl={4}>
            <Card className={classes.form}>
              <CardContent>
                <Typography variant="h2" className={classes.Title}>
                  Body Mass Index
                </Typography>
                <Typography variant="h6" className={classes.Title}>
                  Created using React, Express and Firebase
                </Typography>
                <Typography className={classes.Title}>
                  By Daniel Suranta S | 18/424185/PA/18290
                </Typography>
                <hr className={classes.visibleSeparator} />
                <Typography variant="h5">Fill your data</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    id="age"
                    name="age"
                    type="age"
                    label="Age"
                    className={classes.TextField}
                    helperText={!this.state.result && this.state.errors.age}
                    error={
                      this.state.errors.age && !this.state.result ? true : false
                    }
                    value={this.state.age}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="weight"
                    name="weight"
                    type="weight"
                    label="Weight"
                    className={classes.TextField}
                    helperText={!this.state.result && this.state.errors.weight}
                    error={
                      this.state.errors.weight && !this.state.result
                        ? true
                        : false
                    }
                    value={this.state.weight}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="height"
                    name="height"
                    type="height"
                    label="Height"
                    className={classes.TextField}
                    helperText={!this.state.result && this.state.errors.height}
                    error={
                      this.state.errors.height && !this.state.result
                        ? true
                        : false
                    }
                    value={this.state.height}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                  >
                    SUBMIT
                  </Button>
                </form>
                {this.state.loading && (
                  <CircularProgress size={30} className={classes.Progress} />
                )}
                <br />
                {this.state.result && (
                  <div>
                    <hr className={classes.visibleSeparator} />
                    <Typography variant="h6" className={classes.Result}>
                      Your BMI score = {this.state.value}
                    </Typography>
                    <Typography variant="h6" className={classes.Result}>
                      Your Category = {this.state.category}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(home);

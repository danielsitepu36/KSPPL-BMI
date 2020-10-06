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
    marginLeft: "10%",
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
      notNormal: false,
      errors: {},
      lWeight: "",
      hWeight: "",
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
          lWeight: res.data.result.LWeight,
          hWeight: res.data.result.HWeight,
          notNormal: false,
          result: true,
          loading: false,
        });
        if (this.state.lWeight != 0 && this.state.hWeight != 0) {
          this.setState({
            notNormal: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
          result: false,
          notNormal: false,
        });
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
          <Grid item sm={1} md={2} lg={3} xl={2}></Grid>
          <Grid item sm={10} md={8} lg={6} xl={8}>
            <Card className={classes.form}>
              <CardContent>
                <Typography variant="h2" className={classes.Title}>
                  Body Mass Index
                </Typography>
                <Typography variant="h6" className={classes.Title}>
                  Created using React, Express, and Firebase
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
                    label="Age (e.g. 22)"
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
                    label="Weight (in kg, e.g. 60)"
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
                    label="Height (in cm, e.g. 165)"
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
                      Your BMI score = {this.state.value.toFixed(2)}
                    </Typography>
                    <Typography variant="h6" className={classes.Result}>
                      Weight category = {this.state.category}
                    </Typography>
                  </div>
                )}
                {this.state.notNormal && (
                  <div>
                    <Typography variant="h6" className={classes.Result}>
                      Optimal weight for you = {this.state.lWeight.toFixed(2)}{" "}
                      kg - {this.state.hWeight.toFixed(2)} kg
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

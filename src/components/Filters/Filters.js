import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Stack,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import UserContext from "../../store/User-Context";

const useStyles = makeStyles((theme) => ({
  radioLabel: {
    display: "flex",
    alignItems: "center",
  },

  radioColor: {
    "&.Mui-checked": {
      color: "#832BE0 !important",
    },
  },

  inpuText: {
    "& label.Mui-focused": {
      color: "#832BE0",
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#832BE0",
      },
    },
  },
}));

export const Filters = () => {
  const userCtx = useContext(UserContext);
  const classes = useStyles();
  const [likePercent, setLikePercent] = useState(userCtx.likePercent);
  const finalLikePercent = userCtx.likePercent;

  useEffect(() => {
    setLikePercent(userCtx.likePercent);
  }, [finalLikePercent]);

  const handleRatingChange = (event) => {
    userCtx.setBookRating((prev) =>
      prev === Number(event.target.value) ? 0 : Number(event.target.value)
    );
    userCtx.setSortOrder("default");
    userCtx.setCurrentPage(1);
    userCtx.setTotalPageCount(0);
    userCtx.setTotalPageCount(userCtx.totalPageCount.value, true);
  };

  const handlerSliderChange = (event, newValue) => {
    setLikePercent(newValue);
  };

  const onSliderStop = (event, newValue) => {
    userCtx.setLikePercent(newValue);
    userCtx.setSortOrder("default");
    userCtx.setCurrentPage(1);
    userCtx.setTotalPageCount(userCtx.totalPageCount.value, true);
  };

  return (
    <div>
      <Typography variant="h5" noWrap>
        Filters
      </Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h6" noWrap style={{ fontWeight: "normal" }}>
          Ratings
        </Typography>

        <Box sx={{ fontSize: "10px" }}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={userCtx.rating}
              onClick={handleRatingChange}
            >
              <FormControlLabel
                value={4}
                control={<Radio className={classes.radioColor} />}
                label={
                  <div className={classes.radioLabel}>
                    <Rating
                      sx={{ mr: 0.7, fontSize: "19px" }}
                      name="read-only"
                      value={4}
                      readOnly
                    />{" "}
                    & up
                  </div>
                }
                readOnly
              />
              <FormControlLabel
                value={3}
                control={<Radio className={classes.radioColor} />}
                label={
                  <div className={classes.radioLabel}>
                    <Rating
                      sx={{ mr: 0.7, fontSize: "19px" }}
                      name="read-only"
                      value={3}
                      readOnly
                    />{" "}
                    & up
                  </div>
                }
                readOnly
              />
              <FormControlLabel
                value={2}
                control={<Radio className={classes.radioColor} />}
                label={
                  <div className={classes.radioLabel}>
                    <Rating
                      sx={{ mr: 0.7, fontSize: "19px" }}
                      name="read-only"
                      value={2}
                      readOnly
                    />{" "}
                    & up
                  </div>
                }
                readOnly
              />
              <FormControlLabel
                value={1}
                control={<Radio className={classes.radioColor} />}
                label={
                  <div className={classes.radioLabel}>
                    <Rating
                      sx={{ mr: 0.7, fontSize: "19px" }}
                      name="read-only"
                      value={1}
                      readOnly
                    />{" "}
                    & up
                  </div>
                }
                readOnly
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" noWrap style={{ fontWeight: "normal" }}>
            Like Percent
          </Typography>
          <Box px={1} mt={1}>
            <Slider
              value={likePercent}
              onChange={handlerSliderChange}
              onChangeCommitted={onSliderStop}
              valueLabelDisplay="auto"
              // disableSwap
              sx={{ color: "#832BE0 !important" }}
            />
          </Box>
          <Grid container columnSpacing={2}>
            <Grid item xs={6} sx={{ flexDirection: "column" }}>
              <Stack>
                <span>Min</span>
                <TextField
                  readOnly
                  className={classes.inpuText}
                  size="small"
                  id="minpercent"
                  variant="outlined"
                  // onBlur={handleMinBlur}
                  value={likePercent[0]}
                  // onChange={handleMinInputChange}
                  // InputProps={{
                  //   step: 10,
                  //   min: 0,
                  //   max: 100,
                  //   type: "number",
                  //   "aria-labelledby": "input-slider",
                  // }}
                />
              </Stack>
            </Grid>
            <Grid item xs={6} sx={{ flexDirection: "column" }}>
              <Stack>
                <span>Max</span>
                <TextField
                  readOnly
                  className={classes.inpuText}
                  size="small"
                  id="minpercent"
                  variant="outlined"
                  value={likePercent[1]}
                  // onChange={handleMaxInputChange}
                  // onBlur={handleMaxBlur}
                  // InputProps={{
                  //   step: 10,
                  //   min: 0,
                  //   max: 100,
                  //   type: "number",
                  //   "aria-labelledby": "input-slider",
                  // }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

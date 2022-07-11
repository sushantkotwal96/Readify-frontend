import { Box, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UserContext from "../../store/User-Context";
import { useContext, useState } from "react";
const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& .MuiInput-underline:after": {
      borderBottom: "1.5px solid #832BE0!important",
      // borderBottomColor: "#832BE0 !important",
    },
  },
}));

export const SearchBar = () => {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [key, setKey] = useState(userCtx.keyword);

  const setKeywordInCtx = (event) => {
    event.preventDefault();
    userCtx.setKeyword(key);
    userCtx.setSortOrder("default");
    userCtx.setCurrentPage(1);
    userCtx.setTotalPageCount(userCtx.totalPageCount.value, true);
  };

  return (
    <Box
      sx={{ pr: { sm: 3 } }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={setKeywordInCtx}
    >
      <TextField
        className={classes.inpuText}
        id="standard-basic"
        placeholder="Search by title, author or genre"
        variant="standard"
        margin="normal"
        value={key}
        fullWidth
        autoComplete="off"
        onChange={(event) => {
          setKey(event.target.value);
        }}
        InputProps={{
          autoComplete: "off",
          form: {
            autoComplete: "off",
          },
          endAdornment: (
            <IconButton sx={{ color: "#832BE0" }} type="submit">
              <SearchOutlinedIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

import { Filters } from "./Filters";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SortSelect } from "./SortSelect";

const useStyles = makeStyles((theme) => ({
  filterIconButton: {
    fontSize: "40px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px !important",
    },
  },
}));

export const FilterModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          py: 0.7,
        }}
        onClick={handleClickOpen}
      >
        <TuneIcon
          className={classes.filterIconButton}
          sx={{ border: "solid 1px #832BE0", borderRadius: "5px" }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          display: {
            md: "none",
            xs: "block",
          },
        }}
      >
        <DialogContent>
          <Filters />
          <Box sx={{ mt: 2, display: { sm: "none", xs: "flex" } }}>
            <SortSelect />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#832BE0" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

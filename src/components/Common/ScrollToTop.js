import { makeStyles } from "@mui/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  scrollUp: {
    position: "fixed !important",
    right: "20px !important",
    bottom: "-100px !important",
    backgroundColor: "#D843DB !important",
    padding: "10px !important",
    borderRadius: "50% !important",
    zIndex: "9999 !important",
    transition: ".4s !important",
    display: "flex !important",
    alignItems: "center !important",
    cursor: "pointer !important",
    minWidth: "0 !important",
  },

  showScroll: {
    bottom: "20px !important",
  },
}));

export const ScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("scroll", showScrollToTopHandler);

    //cleanup function
    return () => {
      window.removeEventListener("scroll", showScrollToTopHandler);
    };
  }, [showScrollToTop]);

  const showScrollToTopHandler = () => {
    if (window.scrollY >= 260) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      className={`${classes.scrollUp} ${showScrollToTop && classes.showScroll}`}
      onClick={scrollToTopHandler}
      variant="contained"
    >
      <KeyboardArrowUpIcon />
    </Button>
  );
};

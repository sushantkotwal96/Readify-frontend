import { Pagination } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../store/User-Context";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: "center",

    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: "#832BE0",
        color: "#fff",
        "&:hover": {
          background: "#832BE0",
          opacity: ".8",
        },
      },

      "@media (max-width:390px)": {
        minWidth: "35px",
        height: "35px",
      },

      "@media (max-width:415px)": {
        margin: "0",
      },
    },
  },
}));

export const PaginationTab = ({ totalPageCount }) => {
  const userCtx = useContext(UserContext);
  const classes = useStyles();

  const handlePageChange = (event, value) => {
    userCtx.setCurrentPage(value);
  };

  return (
    <Pagination
      count={totalPageCount}
      defaultPage={1}
      page={userCtx.currentPage}
      size="large"
      onChange={handlePageChange}
      siblingCount={0}
      showFirstButton
      showLastButton
      classes={{ ul: classes.paginator }}
    />
  );
};

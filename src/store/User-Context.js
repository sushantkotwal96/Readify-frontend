import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

const UserContext = createContext({
  userData: {},
  setUserData: (user) => {},
  rating: 0,
  setBookRating: (rating) => {},
  likePercent: [0, 100],
  setLikePercent: (likePercent) => {},
  sortOrder: "default",
  setSortOrder: (order) => {},
  deleteBookMode: {
    booklistId: 0,
    isDelete: false,
  },
  setDeleteBookMode: (booklist) => {},
  lastVisitedList: "0",
  setLastVisitedList: (value) => {},
  keyword: "",
  setKeyword: (key) => {},
  currentPage: 1,
  setCurrentPage: (page) => {},
  totalPageCount: {
    value: 1,
    getNewValue: true,
  },
  setTotalPageCount: (value, flag) => {},
});

export const UserContextProvider = (props) => {
  const [userDataStored, setUserDataStored] = useState(
    JSON.parse(localStorage.getItem("readifyUser"))
  );

  const [ratingStored, setRatingStored] = useState(0);
  const [likePercentStored, setLikePercentStored] = useState([0, 100]);
  const [sortOrderStored, setSortOrderStored] = useState("default");
  const [deleteBookModeStored, setDeleteBookModeStored] = useState({
    booklistId: "0",
    isDelete: false,
  });

  const [lastVisitedListStored, setLastVisitedListStored] = useState("0");
  const [keywordStored, setKeywordStored] = useState("");
  const [currentPageStored, setCurrentPageStored] = useState(1);
  const [totalPageCountStored, setTotalPageCountStored] = useState({
    value: 1,
    getNewValue: true,
  });

  const userIsLoggedHandler = (user) => {
    setUserDataStored(user);
  };

  const ratingHandler = (rating) => {
    setRatingStored(rating);
  };

  const likePercentHandler = (likePercent) => {
    setLikePercentStored(likePercent);
  };

  const sortOrderHandler = (order) => {
    setSortOrderStored(order);
  };

  const deleteBookModeHandler = (booklist) => {
    setDeleteBookModeStored(booklist);
  };

  const lastVisitedListHandler = (value) => {
    setLastVisitedListStored(value);
  };

  const keywordHandler = (key) => {
    setKeywordStored(key);
  };

  const currentPageHandler = (page) => {
    setCurrentPageStored(page);
  };

  const totalPageCountHandler = (count, flag) => {
    const totalCount = {
      value: count,
      getNewValue: flag,
    };
    setTotalPageCountStored(totalCount);
  };

  const context = useMemo(
    () => ({
      userData: userDataStored,
      setUserData: userIsLoggedHandler,
      rating: ratingStored,
      setBookRating: ratingHandler,
      likePercent: likePercentStored,
      setLikePercent: likePercentHandler,
      sortOrder: sortOrderStored,
      setSortOrder: sortOrderHandler,
      deleteBookMode: deleteBookModeStored,
      setDeleteBookMode: deleteBookModeHandler,
      lastVisitedList: lastVisitedListStored,
      setLastVisitedList: lastVisitedListHandler,
      keyword: keywordStored,
      setKeyword: keywordHandler,
      currentPage: currentPageStored,
      setCurrentPage: currentPageHandler,
      totalPageCount: totalPageCountStored,
      setTotalPageCount: totalPageCountHandler,
    }),
    [
      userDataStored,
      ratingStored,
      likePercentStored,
      sortOrderStored,
      deleteBookModeStored,
      lastVisitedListStored,
      keywordStored,
      currentPageStored,
      totalPageCountStored,
    ]
  );

  return (
    <UserContext.Provider value={context}>
      <ThemeProvider theme={theme}> {props.children}</ThemeProvider>
    </UserContext.Provider>
  );
};

export default UserContext;

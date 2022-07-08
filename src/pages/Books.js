import { BookList } from "../components/Books/BookList";
import { SideFilterPanel } from "../components/Filters/SideFilterPanel";
import { SearchBar } from "../components/Common/SearchBar";
import { Grid, Container, Box } from "@mui/material";
import { AlertBox } from "../components/Common/AlertBox";
import { Footer } from "../components/LandingPage/Footer";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../store/User-Context";
import { SortSelect } from "../components/Filters/SortSelect";
import { FilterModal } from "../components/Filters/FilterModal";
import { CardSkeleton } from "../components/Books/CardSkeleton";
import { baseUrl } from "../baseUrl";
import { ScrollToTop } from "../components/Common/ScrollToTop";
import { PaginationTab } from "../components/Pagination/PaginationTab";

export const Books = () => {
  const userCtx = useContext(UserContext);
  const rating = userCtx.rating;
  const likePercent = userCtx.likePercent;
  const sortOrder = userCtx.sortOrder;
  const keyword = userCtx.keyword;
  const currentPage = userCtx.currentPage;
  const [bookList, setBookList] = useState([]);
  const [fetchBookDone, setFetchBooksDone] = useState(false);
  const [responseError, setResponseError] = useState(false);

  useEffect(() => {
    getBooksHandler();
    scrollToTopHandler();
  }, [rating, keyword, likePercent, sortOrder, currentPage]);

  const getBooksHandler = async () => {
    const getNewCount = userCtx.totalPageCount.getNewValue;
    setFetchBooksDone(false);
    try {
      const response = await fetch(
        baseUrl +
          `/books?keyword=${keyword}&rating=${rating}&min=${likePercent[0]}&max=${likePercent[1]}&order=${sortOrder}&page=${currentPage}&getnewcount=${getNewCount}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setBookList(data.books);

        if (getNewCount) {
          totalPageCountHandler(data.total_count);
        }
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
      setResponseError(true);
    }

    setFetchBooksDone(true);
  };

  const totalPageCountHandler = (totalBooks) => {
    if (totalBooks !== 0) {
      const value = Math.ceil(totalBooks / 30);

      userCtx.setTotalPageCount(value, false);
    } else {
      userCtx.setTotalPageCount(0, false);
    }
  };

  const currentPageHandler = (value) => {
    userCtx.setCurrentPage(value);
  };

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <>
      <div>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: { xs: "35px", sm: "40px", md: "50px" },
          }}
        >
          <Grid
            item
            md={2.8}
            lg={2}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <SideFilterPanel />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={10}
            sx={{
              borderLeft: "linear 2px #CFCBCF",
              boxShadow: "inset 4px 0 12px -9px rgba(0,0,0,0.36)",
              paddingBottom: "50px",
            }}
          >
            <Container maxWidth="xl">
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sm={1}
                  sx={{
                    display: {
                      md: "none",
                      xs: "flex",
                    },
                    alignItems: "flex-end",
                    pb: 0.5,
                  }}
                >
                  <FilterModal />
                </Grid>
                <Grid
                  item
                  xs={11}
                  sm={7.5}
                  md={9}
                  lg={9.5}
                  sx={{ pt: 1.5, pl: { xs: 2, sm: 1, md: 0 } }}
                >
                  <SearchBar />
                </Grid>
                <Grid
                  item
                  // xs={3.5}
                  sm={3.5}
                  md={3}
                  lg={2.5}
                  sx={{ display: { sm: "flex", xs: "none" }, pt: 1.5 }}
                >
                  <SortSelect />
                </Grid>
              </Grid>

              {responseError && <AlertBox message="There was some error!" />}

              {!responseError && fetchBookDone ? (
                bookList.length !== 0 ? (
                  <BookList books={bookList} parentNode={"books"} />
                ) : (
                  <AlertBox message="No Books found!" />
                )
              ) : (
                !responseError && !fetchBookDone && <CardSkeleton />
              )}

              <Box
                mt={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <PaginationTab
                  totalPageCount={userCtx.totalPageCount.value}
                  currentPageHandler={currentPageHandler}
                  currentPage={userCtx.currentPage}
                />
              </Box>
            </Container>
          </Grid>
        </Grid>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

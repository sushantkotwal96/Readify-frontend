import { useEffect, useState, useContext } from "react";
import UserContext from "../store/User-Context";
import { baseUrl } from "../baseUrl";
import { Container, Box, Typography } from "@mui/material";
import { AlertBox } from "../components/Common/AlertBox";
import { CardSkeleton } from "../components/Books/CardSkeleton";
import { BookList } from "../components/Books/BookList";
import { PaginationTab } from "../components/Pagination/PaginationTab";
import { Footer } from "../components/LandingPage/Footer";
import { ScrollToTop } from "../components/Common/ScrollToTop";

export const Recommondations = () => {
  const userCtx = useContext(UserContext);

  const [recommList, setRecommList] = useState([]);
  const currentPage = userCtx.recomCurrentPage;
  const totalCount = userCtx.recomTotalCount;
  const [responseError, setResponseError] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const recommCurrentPageHandler = (value) => {
    userCtx.setRecomCurrentPage(value);
  };

  const fetchRecommendations = async () => {
    if (sessionStorage.getItem("recommendations")) {
      const bookList = JSON.parse(sessionStorage.getItem("recommendations"));
      setRecommList(bookList);
      userCtx.setRecomTotalCount(Math.ceil(bookList.length / 24));
    } else {
      try {
        const response = await fetch(
          baseUrl + `/recommendations?id=${userCtx.userData.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setRecommList(data.recommendations);
          sessionStorage.setItem(
            "recommendations",
            JSON.stringify(data.recommendations)
          );
          // console.log(data.total_length);
          userCtx.setRecomTotalCount(Math.ceil(data.total_length / 24));
        }
      } catch (error) {
        console.log(error);
        setResponseError(true);
      }
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginY: "70px",
          minHeight: "560px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "28px", sm: "32px", md: "35px" },
            marginTop: "100px",
            px: { xs: 1, md: 0.5 },
          }}
        >
          Recommondations
        </Typography>

        {responseError && <AlertBox message="There was some error!" />}
        {!responseError &&
          (recommList.length !== 0 ? (
            <BookList
              books={recommList.slice((currentPage - 1) * 24, 24 * currentPage)}
              parentNode={"books"}
            />
          ) : (
            <CardSkeleton />
          ))}

        <Box
          mt={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <PaginationTab
            totalPageCount={userCtx.recomTotalCount}
            currentPage={currentPage}
            currentPageHandler={recommCurrentPageHandler}
          />
        </Box>
      </Container>
      <Footer />
      <ScrollToTop />
    </>
  );
};

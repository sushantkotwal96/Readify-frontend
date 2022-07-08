import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Rating,
  Chip,
  Button,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Progress } from "./Progress";
import UserContext from "../../store/User-Context";
import { LoginAlertModal } from "./LoginAlertModal";
import { BookListAlertModal } from "./BookListAlertModal";
import { AddToBookListModal } from "./AddToBookListModal";
import { SuccessModal } from "../Common/SuccessModal";
import { BookList } from "./BookList";
import { baseUrl } from "../../baseUrl";
import { CardSkeleton } from "./CardSkeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    "&.MuiCard-root": {
      background: "none !important",

      [theme.breakpoints.down("sm")]: {
        padding: "2px",
      },
    },
  },
  cardMedia: {
    aspectRatio: "4/6",
    width: "100%",
    borderRadius: "15px !important",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
  },

  textBox: {
    display: "flex",
    flexDirection: "row",
  },

  bookTextBox: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "4.5%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "7%",
    },
  },

  bookText: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "22px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px !important",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "24px !important",
    },
  },

  addBookButton: {
    borderRadius: "28px !important",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",

    backgroundColor: "#D843DB !important",
  },
}));

const Message = "Book added to the booklist successfuly!";

export const BookDetails = (props) => {
  const [book, setBook] = useState(props.book);
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openBooklistAlertModal, setOpenBooklistAlert] = useState(false);
  const [openAddToBooklistModal, setOpenAddToBooklistModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setBook(props.book);
  }, []);

  useEffect(() => {
    getRecommenations();
  }, [book]);

  const addToBooklistHandler = () => {
    if (userCtx.userData) {
      setOpenAddToBooklistModal(true);
    } else {
      setOpenLoginAlert(true);
    }
  };

  const closeAddToBooklistModalHandler = () => {
    setOpenAddToBooklistModal(false);
  };

  const closeAlertHandler = () => {
    setOpenLoginAlert(false);
  };

  const booklistAlertHandler = () => {
    setOpenBooklistAlert((prev) => !prev);
  };

  const responseHandler = () => {
    setSuccessModal((prev) => !prev);
  };

  const getRecommenations = async () => {
    try {
      const response = await fetch(
        baseUrl + `/bookdatarecommendations?id=${book.book_id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setRecommendations(data.book_recommendations);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        container
        pt={{ sm: 10, xs: 5 }}
        sx={{
          marginTop: "60px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={4.5}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Card className={classes.card} elevation={0}>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={book.book_image}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={7.5} md={7} className={classes.bookTextBox}>
          <Typography
            variant="h4"
            sx={{ fontSize: { sm: "28px", md: "34px" } }}
          >
            {book.book_title}
          </Typography>
          <Rating
            precision={0.5}
            value={book.book_rating}
            sx={{ p: 0.9, pl: 0, fontSize: { sm: "18px", md: "1.5rem" } }}
            readOnly
          />
          <Box className={classes.textBox} sx={{ pt: { xs: 2, sm: 1, md: 2 } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              className={classes.bookText}
            >
              Author:
            </Typography>
            <Typography
              variant="h5"
              sx={{ pl: 3.7 }}
              className={classes.bookText}
            >
              {book.book_author}
            </Typography>
          </Box>
          <Box className={classes.textBox} sx={{ pt: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mt: 0.2 }}
              className={classes.bookText}
            >
              Genres:
            </Typography>
            <Box sx={{ pl: 2 }}>
              {book.book_genre.split(", ").map((genre, idx) => {
                return (
                  <Chip
                    key={"chip" + idx}
                    label={genre}
                    sx={{
                      mt: 0.7,
                      ml: 1,
                      fontSize: { xs: "16px", sm: "13px", md: "16px" },
                    }}
                    className={classes.genreChip}
                  />
                );
              })}
            </Box>
          </Box>
          <Box
            className={classes.textBox}
            sx={{
              pt: 3,
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mt: { md: 1 } }}
              className={classes.bookText}
            >
              Like <br />
              Percent:
            </Typography>
            <Box sx={{ pl: 2, width: "100%" }}>
              <Progress done={book.book_like_percent} />
            </Box>
          </Box>
          <Box sx={{ mt: { xs: 5, md: 4, lg: 6 } }}>
            <Button
              variant="contained"
              className={classes.addBookButton}
              onClick={addToBooklistHandler}
              sx={{
                fontSize: { xs: "18px", sm: "14px", md: "16px", lg: "18px" },
              }}
            >
              Add to BookList
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          px: { lg: 10, md: 5 },
          mt: 6,
          textAlign: "justify",
          textJustify: "inner-word",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mt: 1, color: "#D843DB" }}
        >
          Description
        </Typography>
        <Typography
          fontWeight="normal"
          sx={{ mt: 3, fontSize: { sm: "16.8px", md: "18px", lg: "20px" } }}
        >
          {book.book_description}
        </Typography>
      </Box>
      <Box
        sx={{
          px: { lg: 10, md: 5 },
          mt: 6,
          textAlign: "justify",
          textJustify: "inner-word",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mt: 1, color: "#D843DB" }}
        >
          Recommendations
        </Typography>

        {recommendations.length === 0 ? (
          <CardSkeleton />
        ) : (
          <BookList parentNode={"books"} books={recommendations} />
        )}
      </Box>

      {openLoginAlert && (
        <LoginAlertModal closeAlertHandler={closeAlertHandler} isOpen={true} />
      )}

      {openAddToBooklistModal && (
        <AddToBookListModal
          closeAddToBooklistModalHandler={closeAddToBooklistModalHandler}
          responseHandler={responseHandler}
          booklistAlertHandler={booklistAlertHandler}
          isOpen={true}
          bookId={book.book_id}
        />
      )}

      {openBooklistAlertModal && (
        <BookListAlertModal
          isOpen={true}
          booklistAlertHandler={booklistAlertHandler}
        />
      )}

      {successModal && (
        <SuccessModal
          responseHandler={responseHandler}
          isOpen={true}
          message={Message}
        />
      )}
    </>
  );
};

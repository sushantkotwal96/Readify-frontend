import { BookDetails } from "../components/Books/BookDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { baseUrl } from "../baseUrl";
import { AlertBox } from "../components/Common/AlertBox";

export const BookData = () => {
  const { id } = useParams();

  const [book, setBook] = useState();
  const [responseError, setResponseError] = useState(false);
  const [bookError, setBookError] = useState(false);

  const getBook = async () => {
    try {
      const response = await fetch(baseUrl + `/bookdata?id=${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setBook(data.book);
      } else {
        console.log(response.message);
        setBookError(true);
      }
    } catch (error) {
      console.log(error);
      setResponseError(true);
    }
  };

  useEffect(() => {
    setBook(null);
    getBook();
  }, [id]);

  return (
    <>
      {responseError && <AlertBox message="There was some error!" />}
      {!responseError && bookError ? (
        <AlertBox message="Book not Found" />
      ) : (
        <Container maxWidth="xl">
          {book && <BookDetails book={book} />}
        </Container>
      )}
    </>
  );
};

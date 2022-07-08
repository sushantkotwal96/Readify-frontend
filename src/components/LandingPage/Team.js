import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  TeamDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const Team = () => {
  const classes = useStyles();
  return (
    <div className={classes.TeamDiv}>
      <Container
        maxWidth="md"
        sx={{ paddingTop: "70px", marginBottom: "70px" }}
      >
        <Typography variant="h3" align="center" sx={{ marginBottom: "40px" }}>
          Team
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontSize: { xs: "16.8px", md: "24px" },
            textAlign: "justify",
            textJustify: "inner-word",
          }}
          paragraph
        >
          Hello there! This app was made by our team - Shubham Bhagat, Ameya
          Dalvi, Shefali Luley and Sushant Kotwal, and our goal is to provide
          users with the best book recommendations. Being avid readers
          ourselves, we hope this platform helps every reader out there to
          expand their reading horizon. It does not matter if you are a beginner
          or an experienced reader, we are there to have your back.
        </Typography>
      </Container>
    </div>
  );
};

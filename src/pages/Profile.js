import {
  Box,
  Container,
  Stack,
  Alert,
  Autocomplete,
  Popper,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useEffect, useState, useRef, useContext } from "react";
import { makeStyles } from "@mui/styles";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { baseUrl } from "../baseUrl";
import UserContext from "../store/User-Context";
import { genres } from "../components/login/genres";

const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: "#832BE0",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#832BE0",
    },
  },

  errorText: {
    "& label.Mui-focused": {
      color: "red",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "red",
    },
  },

  signupButton: {
    borderRadius: "5px !important",
    border: "solid 1px #832BE0 !important",
    background: "none !important",
    color: "#832BE0 !important",
  },
}));

const CustomerPopper = (props) => {
  const modifiers = [
    {
      name: "flip",
      options: {
        fallbackPlacements: [],
      },
    },
  ];

  return (
    <Popper
      {...props}
      modifiers={modifiers}
      popperOptions={{
        placement: "bottom",
      }}
    />
  );
};

export const Profile = () => {
  const userCtx = useContext(UserContext);
  const [firstNameError, setFistNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genre1Error, setGenre1Error] = useState(false);
  const [genre2Error, setGenre2Error] = useState(false);
  const [genre3Error, setGenre3Error] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [defaultUser, setDefaultUser] = useState();
  const [updatedUser, setUpdatedUser] = useState(defaultUser);
  const [successResponse, setSuccessResponse] = useState(false);

  const classes = useStyles();

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const genre1Ref = useRef();
  const genre2Ref = useRef();
  const genre3Ref = useRef();

  useEffect(() => {
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setGenre1Error(false);
    setGenre2Error(false);
    setGenre3Error(false);
    setResponseError(false);
    setSuccessResponse(false);
    getUser();
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const email = emailRef.current.value;

    const genre1 = genre1Ref.current.value;
    const genre2 = genre2Ref.current.value;
    const genre3 = genre3Ref.current.value;

    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);

    setGenre1Error(false);
    setGenre2Error(false);
    setGenre3Error(false);

    if (fname === "") {
      errorFlag = true;
      setFistNameError(true);
    }

    if (lname === "") {
      errorFlag = true;
      setLastNameError(true);
    }

    if (email === "") {
      errorFlag = true;
      setEmailError(true);
    } else if (
      (email.match(/@/g) || []).length !== 1 ||
      (email.match(/\./g) || []).length < 1
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (
      email.indexOf(".") === 0 ||
      email.indexOf("@") === 0 ||
      email.indexOf("-") === 0 ||
      email.indexOf("_") === 0
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (/[^a-zA-Z0-9.@_-]/.test(email)) {
      errorFlag = true;
      setEmailError(true);
    }

    if (genre1 === "") {
      errorFlag = true;
      setGenre1Error(true);
    }
    if (genre2 === "") {
      errorFlag = true;
      setGenre2Error(true);
    }
    if (genre3 === "") {
      errorFlag = true;
      setGenre3Error(true);
    }

    return errorFlag;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const isError = isInputError();

    if (!isError) {
      setFistNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setGenre1Error(false);
      setGenre2Error(false);
      setGenre3Error(false);

      const inputPayload = {
        userId: userCtx.userData.user_id,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        emailId: updatedUser.email_id,
        genre1: updatedUser.genre_1,
        genre2: updatedUser.genre_2,
        genre3: updatedUser.genre_3,
      };

      // console.log(inputPayload);

      try {
        const response = await fetch(baseUrl + "/updateprofile", {
          method: "PUT",
          body: JSON.stringify(inputPayload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const user = {
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            user_id: userCtx.userData.user_id,
          };
          localStorage.setItem("readifyUser", JSON.stringify(user));
          userCtx.setUserData(user);
          setResponseError(false);
          setSuccessResponse(true);
          editProfileHandler();
          sessionStorage.removeItem("recommendations");
        } else if (response.status === 403) {
          console.log(response.json().message);
          setResponseError(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editProfileHandler = () => {
    setEditProfile((prev) => !prev);
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        baseUrl + `/profile?id=${userCtx.userData.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setDefaultUser(data.profile);
        setUpdatedUser(data.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEditHandler = () => {
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setGenre1Error(false);
    setGenre2Error(false);
    setGenre3Error(false);

    setUpdatedUser(defaultUser);
    editProfileHandler();
  };

  const handleChange = () => {
    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const email = emailRef.current.value;
    // const genre1 = genre1Ref.current.value;
    // const genre2 = genre2Ref.current.value;
    // const genre3 = genre3Ref.current.value;

    const updatedUserProfile = {
      ...updatedUser,
      first_name: fname,
      last_name: lname,
      email_id: email,
    };

    // console.log("updated user:", updatedUserProfile);

    setUpdatedUser(updatedUserProfile);
  };

  return (
    updatedUser && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          mt: 20,
        }}
      >
        <h1>Profile</h1>
        {responseError && (
          <Alert severity="error">There was some error. Try again!</Alert>
        )}

        {successResponse && (
          <Alert severity="success">Profile updated successfully!</Alert>
        )}

        <Container maxWidth="sm">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
            mt={2}
          >
            {/* {console.log("updated user", updatedUser)} */}
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <TextField
                className={
                  firstNameError ? classes.errorText : classes.inpuText
                }
                required
                id="outlined-required1"
                label="First Name"
                fullWidth
                onChange={handleChange}
                variant="filled"
                error={firstNameError}
                helperText={firstNameError && "Incorrect Entry."}
                inputRef={fNameRef}
                value={updatedUser.first_name}
                inputProps={{
                  readOnly: !editProfile,
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              <TextField
                className={lastNameError ? classes.errorText : classes.inpuText}
                required
                id="outlined-required2"
                label="Last Name"
                fullWidth
                onChange={handleChange}
                variant="filled"
                error={lastNameError}
                helperText={lastNameError && "Incorrect Entry."}
                inputRef={lNameRef}
                value={updatedUser.last_name}
                inputProps={{
                  readOnly: !editProfile,
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              mt={2}
            >
              <TextField
                className={emailError ? classes.errorText : classes.inpuText}
                required
                id="outlined-required3"
                label="Email Id"
                fullWidth
                onChange={handleChange}
                variant="filled"
                error={emailError}
                helperText={emailError && "Incorrect Entry."}
                inputRef={emailRef}
                value={updatedUser.email_id}
                inputProps={{
                  readOnly: !editProfile,
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Stack>
            <Stack spacing={2} mt={2}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Autocomplete
                  readOnly={!editProfile}
                  onChange={(event, newValue) => {
                    setUpdatedUser({ ...updatedUser, genre_1: newValue });
                  }}
                  value={updatedUser.genre_1}
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  PopperComponent={CustomerPopper}
                  options={genres}
                  ListboxProps={{ style: { maxHeight: "13rem" } }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={
                        genre1Error ? classes.errorText : classes.inpuText
                      }
                      fullWidth
                      variant="filled"
                      required
                      label="Genre 1"
                      error={genre1Error}
                      helperText={genre1Error && "Incorrect Entry."}
                      inputRef={genre1Ref}
                    />
                  )}
                />

                <Autocomplete
                  readOnly={!editProfile}
                  value={updatedUser.genre_2}
                  onChange={(event, newValue) => {
                    setUpdatedUser({ ...updatedUser, genre_2: newValue });
                  }}
                  disablePortal
                  id="combo-box-demo2"
                  fullWidth
                  PopperComponent={CustomerPopper}
                  options={genres}
                  ListboxProps={{ style: { maxHeight: "13rem" } }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={
                        genre2Error ? classes.errorText : classes.inpuText
                      }
                      fullWidth
                      variant="filled"
                      required
                      label="Genre 2"
                      error={genre2Error}
                      helperText={genre2Error && "Incorrect Entry."}
                      inputRef={genre2Ref}
                      onChange={handleChange}
                    />
                  )}
                />

                <Autocomplete
                  readOnly={!editProfile}
                  value={updatedUser.genre_3}
                  onChange={(event, newValue) => {
                    setUpdatedUser({ ...updatedUser, genre_3: newValue });
                  }}
                  disablePortal
                  id="combo-box-demo3"
                  fullWidth
                  PopperComponent={CustomerPopper}
                  options={genres}
                  ListboxProps={{ style: { maxHeight: "13rem" } }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={
                        genre3Error ? classes.errorText : classes.inpuText
                      }
                      fullWidth
                      variant="filled"
                      required
                      label="Genre 3"
                      error={genre3Error}
                      helperText={genre3Error && "Incorrect Entry."}
                      inputRef={genre3Ref}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Stack>

            {!editProfile ? (
              <Box
                mt={5.5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={editProfileHandler}
                  variant="outlined"
                  className={classes.signupButton}
                  endIcon={<EditOutlinedIcon />}
                >
                  Edit Profile
                </Button>
              </Box>
            ) : (
              <Stack
                direction="row"
                spacing={3}
                mt={5.3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  onClick={cancelEditHandler}
                  endIcon={<ClearOutlinedIcon />}
                  sx={{
                    border: "solid 1px #E43E48",
                    borderRadius: "5px",
                    color: "#E43E48",
                    background: "none !important",
                    px: 2,
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  endIcon={<DoneOutlinedIcon />}
                  sx={{
                    border: "solid 1px #4F8A15",
                    borderRadius: "5px",
                    color: "#4F8A15",
                    background: "none !important",
                    px: 2,
                  }}
                >
                  Confirm
                </Button>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>
    )
  );
};

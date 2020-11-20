// @ts-ignore
import React, { useState } from "react";
import "./App.css";
import { RegEx } from "./util/constants";
import { replaceStr } from "./util/helpers";
import useFieldValueValidator from "./hooks/useFieldValueValidator";
import ValidateString from "./component/validateString/index";
import {
  Box,
  TextField,
  makeStyles,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import { BLACK, WHITE } from "./util/colors";
import { Eye, EyeCross } from "./assets";

const useStyles = makeStyles((theme: any) => ({
  fieldStyle: {
    width: "100%",
    height:'35px',
    "& .Mui-selected": {
      background: BLACK,
      color: WHITE,
      "& :hover": {
        background: BLACK,
        color: WHITE,
      },
    },
    "& .Mui-selected:hover": {
      background: BLACK,
      color: WHITE,
    },
  },
  textFieldWrapperStyle: {
    marginBottom: theme.spacing(4),
  },
  removemargin: {
    margin: 0,
  },
}));

const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameValidations, setUserNameValidations] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState(false);
  const { textFieldWrapperStyle, fieldStyle, removemargin } = useStyles();
  const [primaryEmail, setPrimaryEmail] = useState();
  const [mobNumber, setMobNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notEmail, setNotEmail] = useState(false);
  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    setUserName(targetValue);
  };

  const onInputFocus = (event: any) => {
    if (event.target.id === "username") {
      setUserNameValidations(true);
    } else if (event.target.id === "password") {
      setPasswordValidations(true);
    }
  };

  const userNameValidationOption = [
    {
      label: "Upper and lowercase letters",
      regex: RegEx.ONE_UPPER_LOWER_CASE,
    },
    {
      label: "Use 1 digit atleast",
      regex: RegEx.ONE_NUMBER,
    },
    {
      label: "Minimum of 8 characters",
      regex: replaceStr(replaceStr(RegEx.MIN_MAX, "min", 8), "max", 20),
    },
  ];

  const passwordValidationOption = [
    {
      label: "Minimum one lower digit",
      regex: RegEx.ONE_DIGIT_LOWER_CASE,
    },
    {
      label: "Minimum 8 and maximum 20 charectors are allowed",
      regex: replaceStr(replaceStr(RegEx.MIN_MAX, "min", 8), "max", 20),
    },
    {
      label: "Same number should repeat thrice",
      regex: RegEx.THRICEREPETITION,
    },
  ];

  const {
    list: userNameList,
    valid: validUsernameRegex,
  } = useFieldValueValidator(username, userNameValidationOption);

  const {
    list: passwordList,
    valid: validPasswordRegex,
  } = useFieldValueValidator(password, passwordValidationOption);
  const passwordMatchUsername = password ? !(username === password) : false;

  const onBlur = () => {
    setUserNameValidations(false);
    setPasswordValidations(false);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let targetValue = event.target.value
    let regex = new RegExp(RegEx.NUMERIC_ONLY);
    if (targetValue === "" || regex.test(targetValue)) {
        setMobNumber(targetValue);
    }
}

const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  let targetValue = event.target.value;
  setPrimaryEmail(targetValue);
  const emailRegex = new RegExp(RegEx.EMAIL_REGEX);
  setNotEmail(!emailRegex.test(targetValue));
};

  const handleSubmit = () => {};

  let isPasswordMatched =  passwordMatchUsername && validPasswordRegex && passwordList.every(({ valid }, i) => { return valid });
  let isUserNameMatched = username.length >= 8 && validUsernameRegex && userNameList.every(({ valid }, i) => { return valid });
  

  return (
    <Box mt={5} ml={5} maxWidth='500px' >
      <h2>Sample Form</h2>
      <ul>
        <li>Responsive form</li>
      </ul>

      <Box className='container'>
        <form key='form_sample' onSubmit={() => handleSubmit()}>
          <Box mb={8}>
            <TextField
              className={fieldStyle}
              id='username'
              required
              autoComplete='nope'
              // autoFocus={true}
              value={username}
              label={"User Name"}
              variant='outlined'
              onChange={onChangeUserName}
              onFocus={onInputFocus}
              onBlur={() => onBlur()}
              aria-describedby={"User Name"}
              inputProps={{
                "aria-label": "User Name",
                maxLength: 15,
                autoComplete: "off",
              }}
            />
            {userNameValidations && userNameList && userNameList.length > 0 && (
              <Box mt={3} mb={1}>
                {userNameList.map((item, i) => {
                  const { label, valid } = item;
                  return (
                    <ValidateString key={i} label={label} active={valid} />
                  );
                })}
              </Box>
            )}
          </Box>

          <Box mb={8}>
            <TextField
              className={fieldStyle}
              autoComplete='new-password'
              id='password'
              // autoFocus={true}
              type={showPassword ? "text" : "password"}
              value={password}
              variant='outlined'
              required
              label={"Password"}
              onChange={onChangePassword}
              onFocus={onInputFocus}
              onBlur={() => onBlur()}
              aria-describedby={"Password"}
              inputProps={{
                "aria-label": "Password",
                maxLength: 20,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={"show password"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeCross />}
                  </IconButton>
                ),
              }}
            />
            {passwordValidations && passwordList && passwordList.length > 0 && (
              <Box mt={3} mb={1}>
                {passwordList.map((item, i) => {
                  const { label, valid } = item;
                  return (
                    <ValidateString key={i} label={label} active={valid} />
                  );
                })}
                <ValidateString
                  label={"Password should not match username"}
                  active={passwordMatchUsername}
                />
              </Box>
            )}
          </Box>


          <Box mb={2}>
            <TextField
              className={textFieldWrapperStyle}
              id='email'
              value={primaryEmail}
              fullWidth
              required
              error={notEmail}
              helperText={notEmail ? 'Please Provide correct email id':''}
              label={"Primary Email"}
              variant='outlined'
              onChange={onEmailChange}
              aria-describedby={"Primary Email"}
              inputProps={{
                "aria-label": "Primary Email",
              }}
            />
          </Box>

          <Box mb={6}>
            <TextField
              className={fieldStyle}
              id='mobNumber'
              autoComplete='off'
              value={mobNumber}
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+971</InputAdornment>
                ),
              }}
              label={"Mobile Number"}
              onChange={handleNumberChange}
              aria-describedby={"Mobile Number"}
              inputProps={{
                "aria-label": "Mobile Number",
                maxLength: 10,
              }}
            />
          </Box>


          <Box className='row'>
            <Button
              variant='contained'
              color='primary'
              size='large'
              disabled={!isPasswordMatched || !isUserNameMatched || primaryEmail === '' }
              // onClick={() =>}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default App;

import "../../../src/App.css";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import LightDarkMode from "../LightDarkMode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserNotRegisterError from "./UserNotRegisterError";
import { useLocalStorage } from "@mantine/hooks";

export default function LoginPage() {
  var API = "https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api";
  const navigate = useNavigate();

  const [userDataList, setUserDataList] = useState([]);
  const [isUserExist, setIsUserExist] = useState(true);
  const [openedErroModel, setOpenedErroModel] = useState(false);

  // fetch userlist from api =================================================================

  useEffect(() => {
    fetch(`${API}/users`).then((res) =>
      res.json().then((data) => {
        const usersDetails = data.map(function (obj) {
          let userList = obj;
          return userList;
        });
        setUserDataList(usersDetails);
      })
    );
  }, []);

  // ==========================================================

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b$/.test(value)
          ? null
          : "Invalid email",
    },
  });

  // save current userdata in local ==========================================================

  const [currentUserData, setCurrentUserData] = useLocalStorage({
    key: "currentUserData",
    defaultValue: {},
  });
  // ==========================================================

  const handleSubmit = (values) => {
    let userEmails = [];
    userDataList.forEach((user) => {
      userEmails.push(user.email.toLowerCase());
    });

    let inputValue = values.email.toLowerCase();

    // get single user details
    let currentUser = userDataList.filter((user) => {
      let emailaddress = user.email.toLowerCase();
      return inputValue === emailaddress;
    });
    setCurrentUserData(currentUser[0]);

    if (userEmails.indexOf(inputValue) !== -1) {
      if (
        currentUser[0].hasOwnProperty("email") &&
        inputValue === currentUser[0].email.toLowerCase()
      ) {
        let currentUserinlocal = JSON.parse(
          localStorage.getItem("currentUserData")
        );
        let userId = currentUserinlocal.id;

        setCurrentUserData(currentUser[0]);
        navigate(`/users/${userId}/todos`);
      }
    } else if (userEmails.indexOf(inputValue) === -1) {
      setIsUserExist(false);
      setOpenedErroModel(true);
      setCurrentUserData({});
    }
  };

  return (
    <div className="login-comp">
      {isUserExist === false && openedErroModel === true ? (
        <div className="userLoginError">
          <UserNotRegisterError
            openedErroModel={openedErroModel}
            setOpenedErroModel={setOpenedErroModel}
          />
        </div>
      ) : null}

      <div className="swithTheme-btn">
        <LightDarkMode />
      </div>

      <div className="formBox">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              title="Email"
              {...form.getInputProps("email")}
            />

            <Group position="right" mt="md">
              <Button size="xs" type="submit">
                Sign In
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
}

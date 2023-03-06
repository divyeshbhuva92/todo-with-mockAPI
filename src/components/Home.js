import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import LightDarkMode from "./LightDarkMode";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Userhome from "./AppPages/Userhome";
import CreateTodo from "./AppPages/TodoComponent/CreateTodo";
import DeleteUser from "./AppPages/TodoComponent/DeleteUser";
import EditTodo from "./AppPages/TodoComponent/EditTodo";

export default function Home() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [currentUserData, setCurrentUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUserData")) || [];
  });
  useEffect(() => {
    if (currentUserData.length > 0) {
      localStorage.setItem("currentUserData", JSON.stringify(currentUserData));
    }
  }, [currentUserData]);

  // sign out =================================================================

  const handleClick = () => {
    localStorage.setItem("currentUserData", JSON.stringify({}));
    navigate("/");
  };

  let currentUserinlocal = JSON.parse(localStorage.getItem("currentUserData"));
  let userId = currentUserinlocal.id;

  let firstName = currentUserData.name.split(" ");
  return (
    <div className="appshell-container">
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        header={
          <Header height={{ base: 50, md: 60 }} p="sm">
            <div
              className="HeaderContainer"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="sm"
                />
              </MediaQuery>

              <Text>Welcome {firstName[0]}</Text>
              <div className="swithTheme-btn">
                <LightDarkMode />
              </div>
            </div>
          </Header>
        }
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 250 }}
          >
            <div className="home-navbar">
              <div className="navbar-content">
                <Text component={Link} varient="link" to="todos">
                  Home
                </Text>
                <Text component={Link} varient="link" to="create-todo">
                  Create Todo
                </Text>
                <Text component={Link} varient="link" to="deleteUser">
                  Delete User Account
                </Text>

                <Text onClick={() => handleClick()}>Sign Out</Text>
              </div>
              <div className="navbar-userdetail">
                <div className="user-profile">
                  <img
                    className="user-img"
                    src={currentUserData.avatar}
                    alt="User-Avatar"
                  />
                  <p>{currentUserData.name}</p>
                </div>
              </div>
            </div>
          </Navbar>
        }
      >
        <Routes>
          <Route path="todos/*" element={<Userhome userid={userId} />} />
          <Route path="create-todo" element={<CreateTodo id={todoId} />} />
          <Route
            path="todos/:todoId"
            element={<EditTodo todoId={todoId} userid={userId} />}
          />
          <Route path="deleteUser" element={<DeleteUser userid={userId} />} />
        </Routes>
      </AppShell>
    </div>
  );
}

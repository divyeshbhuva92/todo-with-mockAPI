import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteUser() {
  const userID = JSON.parse(localStorage.getItem("currentUserData")).id;
  const navigate = useNavigate();

  const [accDelete, setAccDelete] = useState({});

  const form = useForm({
    initialValues: {
      userEmail: "",
    },
  });

  useEffect(() => {
    fetch(`https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users/${userID}`)
      .then((res) => res.json())
      .then((activeUser) => {
        const activeUserEmail = activeUser.email.toLowerCase();
        setAccDelete(activeUserEmail);
      });
  }, []);
  // console.log(accDelete);

  const handleSubmit = ({ userEmail }) => {
    if (userEmail === "") {
      alert("Please enter a email");
    } else if (userEmail !== "") {
      if (userEmail === accDelete) {
        console.log(userEmail);
        fetch(
          `https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users/${userID}`,
          {
            method: "DELETE",
          }
        ).then(() => {
          navigate("/");
        });
      } else {
        alert("Entered invalid email");
      }
    }
  };

  return (
    <div className="delete-user-container">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="Headers">Delete User Account</div>
          <div className="add-title">
            <TextInput
              mb="xs"
              withAsterisk
              label="email"
              placeholder="Enter email here..."
              title="email"
              {...form.getInputProps("userEmail")}
            />
          </div>

          <Group position="center" mt="xs">
            <Button size="xs" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default DeleteUser;

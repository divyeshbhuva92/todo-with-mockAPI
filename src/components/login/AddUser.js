import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput } from "@mantine/core";

import { useNavigate } from "react-router-dom";

var API = "https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api";

function AddUser() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      avatar: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) =>
        /^\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b$/.test(value)
          ? null
          : "Invalid email",
      avatar: (value) => (value.length < 5 ? "Invalid avatar url" : null),
    },
  });

  const handleSubmit = ({ name, email, avatar }) => {
    let createdAt = new Date().toJSON();
    const user = { name, email, avatar, createdAt };
    // console.log(user);

    fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      // console.log("user added successfully");
      navigate("/");
    });
  };

  return (
    <div className="createUser-container">
      <div className="addUserdetails-container">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Enter your name here"
              title="Name"
              // onChange={(e) => setName(e.target.value)}
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Enter your email here"
              title="Email"
              // onChange={(e) => setEmail(e.target.value)}
              {...form.getInputProps("email")}
            />

            <TextInput
              withAsterisk
              label="Avatar"
              placeholder="Enter your avatar url here"
              title="Avatar url"
              // onChange={(e) => setAvatar(e.target.value)}
              {...form.getInputProps("avatar")}
            />

            <Group position="right" mt="md">
              <Button size="xs" type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default AddUser;

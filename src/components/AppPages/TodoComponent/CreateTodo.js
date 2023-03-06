import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const location = useLocation();
  let arrOfLocation = location.pathname.split("/");
  arrOfLocation.splice(arrOfLocation.length - 1, 1, "todos").shift();
  let newarrOfLocation = arrOfLocation.join("/");

  let UserIDInApi = [...arrOfLocation];

  var userAPI = `https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users/${UserIDInApi[2]}`;

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = ({ title, description }) => {
    const todo = { title, description };
    // console.log(todo);

    if (title === "" && description !== "") {
      alert("Title should not be empty");
    } else if (title !== "" && description === "") {
      alert("Details should not be empty");
    } else if (title === "" || description === "") {
      alert("Title & details should not be empty");
    } else if (title !== "" && description !== "") {
      fetch(`${userAPI}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      })
        .then(() => {
          navigate(newarrOfLocation);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="todoinput-removeall">
      <div className="add-list">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="Headers">Create New Todo</div>
            <div className="add-title">
              <TextInput
                mb="xs"
                withAsterisk
                label="Title"
                placeholder="Enter title here..."
                title="Title"
                {...form.getInputProps("title")}
              />
            </div>
            <div className="add-details">
              <Textarea
                mb="xs"
                withAsterisk
                label="Details"
                placeholder="Enter description here..."
                title="Details"
                {...form.getInputProps("description")}
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
    </div>
  );
}

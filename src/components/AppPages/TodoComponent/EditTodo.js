import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  let arrOfLocation = location.pathname.split("/");
  arrOfLocation.splice(arrOfLocation.length - 1, 1).shift();
  let newarrOfLocation = arrOfLocation.join("/");
  let UserIDInApi = [...arrOfLocation];

  var userAPI = `https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users/${UserIDInApi[2]}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${userAPI}/todos/${todoId}`)
      .then((res) => {
        return res.json();
      })
      .then((todoitem) => {
        setTitle(todoitem.title);
        setDescription(todoitem.description);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    const updatedTodo = { title, description };

    if (title === "" && description !== "") {
      alert("Title should not be empty");
    } else if (title !== "" && description === "") {
      alert("Details should not be empty");
    } else if (title === "" || description === "") {
      alert("Title & details should not be empty");
    } else if (title !== "" && description !== "") {
      fetch(`${userAPI}/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
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
          <div className="Headers">Edit Todo</div>
          <div className="add-title">
            <TextInput
              mb="xs"
              withAsterisk
              label="Title"
              placeholder="Enter title here..."
              title="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="add-details">
            <Textarea
              mb="xs"
              withAsterisk
              label="Details"
              placeholder="Enter Details here..."
              title="Details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Group position="center" mt="xs">
            <Button size="xs" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Box>
      </div>
    </div>
  );
}

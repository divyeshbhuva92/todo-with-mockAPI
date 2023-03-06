import { Button, Group, Modal, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function UserNotRegisterError({ openedErroModel, setOpenedErroModel }) {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  return (
    <div>
      <Modal
        size="sm"
        opened={openedErroModel}
        onClose={() => setOpenedErroModel(false)}
        title="Error"
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.61}
        overlayBlur={3}
      >
        User is not Registered, Plz register before continues.
        <Group position="right" mt="md">
          <Button onClick={() => navigate("/signup")}>Register Now!</Button>
        </Group>
      </Modal>
    </div>
  );
}

export default UserNotRegisterError;

import { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Userhome = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);

  // ==================================== modify location =================================================
  const location = useLocation();
  let arrOfLocation = location.pathname.split("/");
  let UserIDInApi = [...arrOfLocation];

  const todosApi = `https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users/${UserIDInApi[2]}/todos`;

  // =====================fetch todos from api =========================
  useEffect(() => {
    fetch(`${todosApi}`)
      .then((res) => {
        return res.json();
      })
      .then((todolist) => {
        setItemList(todolist);
      })
      .catch((err) => console.log(err));
  }, [location]);

  // ========================= operation on items =========================
  const [deleteitem, setDeleteitem] = useState({});
  useEffect(() => {
    fetch(`${todosApi}`)
      .then((res) => {
        return res.json();
      })
      .then((deleteitems) => {
        setDeleteitem(deleteitems[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const DeleteItem = () => {
    const deleteID = deleteitem.id;
    fetch(`${todosApi}/${deleteID}`, {
      method: "DELETE",
    }).then(() => {
      // window.location.reload();
      navigate(location.pathname);
    });
  };

  return (
    <div className="main-div">
      <div className="showItems">
        {itemList &&
          itemList.map((elem) => {
            return (
              <Paper className="Item" shadow="lg" key={elem.id}>
                <div className="todo-title-container">
                  <div className="todotitle">{elem.title}</div>
                  <div className="itemButtons">
                    <Link
                      className="btn-edit"
                      component={Link}
                      varient="link"
                      to={`${elem.id}`}
                    >
                      <EditRoundedIcon />
                    </Link>
                    <Link className="btn-delete" onClick={DeleteItem}>
                      <DeleteIcon />
                    </Link>
                  </div>
                </div>
                <div className="todo-details">{elem.description}</div>
              </Paper>
            );
          })}
      </div>
    </div>
  );
};

export default Userhome;

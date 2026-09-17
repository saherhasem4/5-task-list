import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export default function Task({ task }) {
  const { handleCheckBtn, handleShowEditDialog, handleShowDelDialog } =
    useContext(TasksContext);
  return (
    <Card
      style={{
        textAlign: "right",
        backgroundColor: "teal",
        color: "white",
        marginBottom: "15px",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4">{task.title}</Typography>
          <Typography>{task.body}</Typography>
        </div>
        <CardActions>
          <IconButton
            className="icon-btn"
            style={{
              color: task.status ? "white" : "green",
              backgroundColor: task.status ? "green" : "white",
              border: `4px solid ${task.status ? "white" : "green"}`,
            }}
            onClick={() => {
              handleCheckBtn(task);
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            className="icon-btn"
            style={{
              color: "blue",
              backgroundColor: "white",
              border: "4px solid blue",
              margin: "auto 10px",
            }}
            onClick={() => handleShowEditDialog(task)}
          >
            <EditDocumentIcon />
          </IconButton>
          <IconButton
            className="icon-btn"
            style={{
              color: "red",
              backgroundColor: "white",
              border: "4px solid red",
            }}
            onClick={() => handleShowDelDialog(task)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}

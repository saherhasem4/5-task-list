import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import Task from "./Task";
import { Grid } from "@mui/system";
import { TasksContext } from "../contexts/TasksContext";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function TaskList() {
  const { handleShowHideBar } = useContext(SnackbarContext);
  const taskArray = [
    {
      id: uuid(),
      title: "المهمة الأولى",
      body: "تفاصيل المهمة الاولى",
      status: true,
    },
    {
      id: uuid(),
      title: "المهمة الثانية",
      body: "تفاصيل المهمة الثانية",
      status: false,
    },
  ];
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? taskArray;
    setTasks(storageTasks);
  }, []);
  const [tasks, setTasks] = useState(taskArray);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [dialogTask, setDialogTask] = useState({ title: "", body: "" });
  const [newTitle, setNewTitle] = useState("");
  const [theFilter, setTheFilter] = useState("all");
  let tasksToRender = useMemo(() => {
    if (theFilter === "all") {
      return tasks.filter((e) => e);
    } else if (theFilter === "pending") {
      return tasks.filter((e) => !e.status);
    } else if (theFilter === "done") {
      return tasks.filter((e) => e.status);
    }
  }, [theFilter, tasks]);
  function handleCheckBtn(task) {
    const updatedTasks = tasks.map((e) => {
      if (e.id === task.id) {
        e.status = !e.status;
      }
      return e;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleShowHideBar("تم الحفظ بنجاح");
  }
  function handleShowEditDialog(task) {
    setDialogTask(task);
    setShowEditDialog(true);
  }
  function handleShowDelDialog(task) {
    setDialogTask(task);
    setShowDelDialog(true);
  }
  function addNewTask() {
    if (newTitle) {
      const updatedTasks = [
        ...tasks,
        {
          id: uuid(),
          title: newTitle,
          body: "",
          status: false,
        },
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTitle("");
      handleShowHideBar("تم الإضافة بنجاح");
    }
  }
  function editTask() {
    const updatedTasks = tasks.map((e) => {
      if (e.id === dialogTask.id) {
        e = dialogTask;
      }
      return e;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowEditDialog(false);
    handleShowHideBar("تم التعديل بنجاح");
  }
  const content = tasksToRender.map((e) => <Task key={e.id} task={e} />);
  return (
    <TasksContext.Provider
      value={{ handleShowDelDialog, handleShowEditDialog, handleCheckBtn }}
    >
      <Dialog open={showDelDialog} onClose={() => setShowDelDialog(false)}>
        <DialogTitle>انتبه</DialogTitle>
        <DialogContent>
          هل انت متأكد من القيام بحذف المهمة؟ ليس هنالك تراجع بعد الحذف
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const updatedTasks = tasks.filter((e) => e.id !== dialogTask.id);
              setTasks(updatedTasks);
              localStorage.setItem("tasks", JSON.stringify(updatedTasks));
              setShowDelDialog(false);
              handleShowHideBar("تم الحذف بنجاح");
            }}
          >
            حذف
          </Button>
          <Button onClick={() => setShowDelDialog(false)}>إلغاء ألأمر</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>تعديل</DialogTitle>
        <DialogContent>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            value={dialogTask.title}
            onChange={(e) =>
              setDialogTask({ ...dialogTask, title: e.target.value })
            }
          />
          <TextField
            style={{ width: "100%" }}
            value={dialogTask.body}
            onChange={(e) =>
              setDialogTask({ ...dialogTask, body: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => editTask()}>تعديل</Button>
          <Button onClick={() => setShowEditDialog(false)}>إلغاء الأمر</Button>
        </DialogActions>
      </Dialog>
      <Card style={{ margin: "30px auto", maxWidth: "550px" }}>
        <CardContent>
          <Typography variant="h1">مهامي</Typography>
          <Divider />
          <ToggleButtonGroup style={{ margin: "20px auto", direction: "ltr" }}>
            <ToggleButton
              onClick={() => setTheFilter("pending")}
              selected={theFilter === "pending"}
            >
              غير منجزة
            </ToggleButton>
            <ToggleButton
              onClick={() => setTheFilter("done")}
              selected={theFilter === "done"}
            >
              منجزة
            </ToggleButton>
            <ToggleButton
              onClick={(e) => setTheFilter("all")}
              selected={theFilter === "all"}
            >
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {content}
          <Grid container spacing={2}>
            <Grid size={9}>
              <TextField
                label="مهمة جديدة"
                style={{ width: "100%" }}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewTask();
                  }
                }}
              />
            </Grid>
            <Grid size={3}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => addNewTask()}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </TasksContext.Provider>
  );
}

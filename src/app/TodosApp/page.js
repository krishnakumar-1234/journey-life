"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCheck,
  faPen,
  faFile,
  faBook,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css"; // Ensure you have Tailwind CSS setup
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [fileLists, setFileLists] = useState([]);
  const [selectedFileList, setSelectedFileList] = useState(null);
  const [newFileListName, setNewFileListName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editFileListName, setEditFileListName] = useState("");
  const [editFileListId, setEditFileListId] = useState(null);
  const [reward, setReward] = useState(false);

  // Retrieve data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("KrishnaWeb");
    if (savedData) {
      setFileLists(JSON.parse(savedData));
    }
  }, []);

  // Save data to local storage whenever fileLists changes
  useEffect(() => {
    if (fileLists.length > 0) {
      localStorage.setItem("KrishnaWeb", JSON.stringify(fileLists));
    } else {
      localStorage.removeItem("KrishnaWeb");
    }
  }, [fileLists]);

  // Add a new file list
  const addFileList = () => {
    if (newFileListName) {
      const creationDate = new Date().toLocaleString();
      setFileLists((prevFileLists) => [
        ...prevFileLists,
        {
          id: Date.now(),
          name: newFileListName,
          tasks: [],
          date: creationDate,
          dateTracker: {},
        },
      ]);
      setNewFileListName("");
      toast.success("File list added!");
    }
  };

  // Add a new task to the selected file list
  const addTask = () => {
    if (newTaskName && selectedFileList !== null) {
      const updatedFileLists = fileLists.map((fileList) => {
        if (fileList.id === selectedFileList) {
          const today = new Date().toISOString().split("T")[0];
          const updatedDateTracker = { ...fileList.dateTracker };
          if (updatedDateTracker[today]) {
            updatedDateTracker[today] += 1;
          } else {
            updatedDateTracker[today] = 1;
          }

          // Check if reward condition is met
          if (updatedDateTracker[today] === 10) {
            setReward(true);
            const audio = new Audio("/23 Light And Happy.mp3"); // Add the path to your sound file
          //   audio.play();
            setTimeout(() =>  setReward(false), 5000); // Show reward for 5 seconds
          }

          return {
            ...fileList,
            tasks: [
              ...fileList.tasks,
              {
                id: Date.now(),
                name: newTaskName,
                completed: false,
              },
            ],
            dateTracker: updatedDateTracker,
          };
        }
        return fileList;
      });
      setFileLists(updatedFileLists);
      setNewTaskName("");
      toast.success("Task added!");
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    const updatedFileLists = fileLists.map((fileList) => {
      if (fileList.id === selectedFileList) {
        return {
          ...fileList,
          tasks: fileList.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          }),
        };
      }
      return fileList;
    });
    setFileLists(updatedFileLists);
  };

  // Delete a task from the selected file list
  const deleteTask = (taskId) => {
    const updatedFileLists = fileLists.map((fileList) => {
      if (fileList.id === selectedFileList) {
        return {
          ...fileList,
          tasks: fileList.tasks.filter((task) => task.id !== taskId),
        };
      }
      return fileList;
    });
    setFileLists(updatedFileLists);
    toast.error("Task deleted!");
  };

  // Edit a task name
  const editTask = (taskId) => {
    const task = fileLists
      .find((fileList) => fileList.id === selectedFileList)
      .tasks.find((task) => task.id === taskId);
    setEditTaskName(task.name);
    setEditTaskId(taskId);
  };

  // Save the edited task name
  const saveTask = () => {
    const updatedFileLists = fileLists.map((fileList) => {
      if (fileList.id === selectedFileList) {
        return {
          ...fileList,
          tasks: fileList.tasks.map((task) => {
            if (task.id === editTaskId) {
              return { ...task, name: editTaskName };
            }
            return task;
          }),
        };
      }
      return fileList;
    });
    setFileLists(updatedFileLists);
    setEditTaskName("");
    setEditTaskId(null);
    toast.success("Task edited!");
  };

  // Delete a file list
  const deleteFileList = (fileListId) => {
    const updatedFileLists = fileLists.filter(
      (fileList) => fileList.id !== fileListId
    );
    setFileLists(updatedFileLists);
    if (selectedFileList === fileListId) {
      setSelectedFileList(null);
    }
    toast.error("File list deleted!");
  };

  // Edit a file list name
  const editFileList = (fileListId, fileListName) => {
    setEditFileListName(fileListName);
    setEditFileListId(fileListId);
  };

  // Save the edited file list name
  const saveFileList = () => {
    const updatedFileLists = fileLists.map((fileList) => {
      if (fileList.id === editFileListId) {
        return { ...fileList, name: editFileListName };
      }
      return fileList;
    });
    setFileLists(updatedFileLists);
    setEditFileListName("");
    setEditFileListId(null);
    toast.success("File list edited!");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <ToastContainer />
      {reward && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-300 text-black text-center p-4 z-50">
          <FontAwesomeIcon icon={faTrophy} className="mr-2" />
          <strong>Congratulations!</strong> You completed ten tasks today!
        </div>
      )}
      <div className="w-full lg:w-1/4 bg-black text-white flex flex-col borderinside rounded h-[92vh]">
        <div className="flex-1 overflow-y-auto">
          {fileLists.map((fileList) => (
            <div
              key={fileList.id}
              className={`p-4 flex items-center justify-between cursor-pointer selectedFileList  ${
                selectedFileList === fileList.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedFileList(fileList.id)}
            >
              <div className="flex items-center gap-2">
                {/* <FontAwesomeIcon icon={faBook} className="mr-2" /> */}
                <p className="p-2 booksIcons flex items-center justify-center rounded-full h-9 w-9 text-2xl">📚</p>
                <div>
                  <div>{fileList.name}</div>
                  <div className=" text-gray-400 datetracker">{fileList.date}</div>
                </div>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    editFileList(fileList.id, fileList.name);
                  }}
                  className="ml-2 p-1 h-8  w-8 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFileList(fileList.id);
                  }}
                  className="ml-2 p-1 h-8  w-8 bg-red-600 hover:bg-red-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <input
            type="text"
            value={newFileListName}
            onChange={(e) => setNewFileListName(e.target.value)}
            className="p-2 w-full bg-gray-800 outline-none border-gray-300 rounded"
            placeholder="New File List"
          />
          <button
            onClick={addFileList}
            className="mt-2 w-full p-2 bg-blue-600 hover:bg-blue-500 rounded"
          >
            <FontAwesomeIcon icon={faPlus} /> Add File List
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 h-[92vh] rightvaluestodosShowUp">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl text-white">
            {selectedFileList !== null
              ? fileLists.find((fileList) => fileList.id === selectedFileList)
                  ?.name
              : "Select a File List"}
          </h1>
          {selectedFileList !== null && (
            <button
              onClick={() => setSelectedFileList(null)}
              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
            >
              Clear Selection
            </button>
          )}
        </div>
        {selectedFileList !== null && (
          <div>
            <div className="mb-4 ">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="p-2 w-full bg-gray-800 outline-none text-white rounded"
                placeholder="New Task"
              />
              <button
                onClick={addTask}
                className="mt-2 w-full text-white p-2 bg-blue-600 hover:bg-blue-500 rounded"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Task
              </button>
            </div>
            <ul>
              {fileLists
                .find((fileList) => fileList.id === selectedFileList)
                ?.tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex justify-between items-center p-2 mb-2 bg-black text-white listInsidefile rounded ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    <div>
                      <span>{task.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="p-1 bg-green-600 hover:bg-green-500 text-white rounded-full h-8 w-8"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        onClick={() => editTask(task.id)}
                        className="p-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full h-8 w-8"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 bg-red-600 hover:bg-red-500 text-white rounded-full h-8 w-8"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {editTaskId && (
          <div className="mb-4">
            <input
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              className="p-2 w-full bg-gray-200 border border-gray-300 rounded"
            />
            <button
              onClick={saveTask}
              className="mt-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
            >
              Save Task
            </button>
          </div>
        )}
        {editFileListId && (
          <div className="mb-4">
            <input
              type="text"
              value={editFileListName}
              onChange={(e) => setEditFileListName(e.target.value)}
              className="p-2 w-full bg-gray-200 border border-gray-300 rounded"
            />
            <button
              onClick={saveFileList}
              className="mt-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
            >
              Save File List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

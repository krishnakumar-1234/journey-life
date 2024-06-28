"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUser,
  faCog,
  faSignOutAlt,
  faBell,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Page({ params }) {
  const router = useRouter();
  const [learningWeb, setLearningWeb] = useState(null);
  const [todosData, setTodosData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (!savedData) {
      router.push("/");
      return;
    }

    setLearningWeb(JSON.parse(savedData));

    // Fetch TodosAppData from localStorage
    const savedTodosData = localStorage.getItem("TodosAppData");
    if (savedTodosData) {
      setTodosData(JSON.parse(savedTodosData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("LearningWeb");
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLearningWeb(null);
  };

  const profileBoxes = [
    {
      icon: faChartPie,
      title: "Dashboard",
      description: "View your dashboard.",
      link: "/dashboard",
    },
    {
      icon: faUser,
      title: "Profile",
      description: "View and edit your profile.",
      link: "/profile",
    },
    {
      icon: faCog,
      title: "Settings",
      description: "Manage your account settings.",
      link: "/settings",
    },
    {
      icon: faSignOutAlt,
      title: "Logout",
      description: "Sign out from your account.",
      action: handleLogout,
    },
  ];

  const recentActivities = [
    "Completed a task on the TodosApp",
    "Updated profile picture",
    "Changed account settings",
  ];

  const notifications = [
    "New message from admin",
    "Profile update successful",
    "Password change request",
  ];

  // Process the todosData to get the dates and counts
  const processedTodosData = todosData.reduce((acc, todo) => {
    const date = new Date(todo.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + (todo.completed ? 1 : 0);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(processedTodosData),
    datasets: [
      {
        label: "Todos Completed",
        data: Object.values(processedTodosData),
        backgroundColor: "greenyellow",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Todos Activity Over Time",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8 flex items-center">
        {learningWeb && (
          <img
            src={learningWeb.ProfilePic || "/user.avif"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div className="ml-4">
          <div className="font-bold text-3xl">@{params.userprofile}</div>
          <div className="mt-1 text-sm italic">Welcome to your profile.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl text-center">
        {profileBoxes.map((box, index) => (
          <div key={index}>
            {box.link ? (
              <Link href={box.link}>
                <button>
                  <div className="w-full h-[150px] flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer">
                    <FontAwesomeIcon
                      icon={box.icon}
                      className="text-4xl text-white mb-2"
                    />
                    <div className="text-white font-medium">{box.title}</div>
                    <div className="text-gray-400 text-sm text-center mt-1">
                      {box.description}
                    </div>
                  </div>
                </button>
              </Link>
            ) : (
              <div className="w-full flex items-center justify-center">
                <button
                  className="w-full h-[150px] flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                  onClick={box.action}
                >
                  <FontAwesomeIcon
                    icon={box.icon}
                    className="text-4xl text-white mb-2"
                  />
                  <div className="text-white font-medium">{box.title}</div>
                  <div className="text-gray-400 text-sm text-center mt-1">
                    {box.description}
                  </div>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl mt-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl text-center mt-8">
        <div className="w-full bg-gray-800 rounded-lg p-4">
          <div className="font-bold text-lg mb-4">Recent Activities</div>
          <ul className="text-left">
            {recentActivities.map((activity, index) => (
              <li key={index} className="mb-2">
                <FontAwesomeIcon
                  icon={faHistory}
                  className="text-yellow-500 mr-2"
                />
                {activity}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full bg-gray-800 rounded-lg p-4">
          <div className="font-bold text-lg mb-4">Notifications</div>
          <ul className="text-left">
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                <FontAwesomeIcon icon={faBell} className="text-red-500 mr-2" />
                {notification}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        {learningWeb ? (
          <Link href="/">
            <button className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
              Go Back to Home
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
              Login
            </button>
          </Link>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Page;

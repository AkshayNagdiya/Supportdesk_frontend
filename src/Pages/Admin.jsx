import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, usersLogOut } from "../Features/Auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const newTickets = tickets?.filter(
    (ticket) => ticket?.status.toLowerCase() === "new"
  );
  const Pendingtickets = tickets?.filter(
    (ticket) => ticket?.status.toLowerCase() === "open"
  );

  const handleUserManagement = () => {
    navigate("/users");
  };

  const handleContentManagement = () => {
    navigate("/alltickets")
  };

  const handleNotifications = () => {
    navigate("/Newtickets");
  };

  const handlepending = () => {
    navigate("/pendingtickets")
  };

  const handlelogout = () => {
    navigate("/login");
    dispatch(usersLogOut());
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-800 px-4 md:px-0">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-6 md:p-10 lg:p-16 max-w-2xl w-full border border-gray-300 transform transition-all duration-500">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center text-gray-800">
          Admin Panel
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            onClick={handleUserManagement}
          >
            User Management
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            onClick={handleContentManagement}
          >
            Ticket Management
            {tickets?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                {tickets.length}
              </span>
            )}
          </button>
          <button
            className="relative bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            onClick={handleNotifications}
          >
            Notifications
            {newTickets?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                {newTickets.length}
              </span>
            )}
          </button>

          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            onClick={handlepending}
          >
            Pending
            {Pendingtickets?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                {Pendingtickets.length}
              </span>
            )}
          </button>
        </div>
        <Link onClick={handlelogout} to={"/login"}>
          <button className="bg-red-500 w-full mt-4 md:mt-6 hover:bg-red-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

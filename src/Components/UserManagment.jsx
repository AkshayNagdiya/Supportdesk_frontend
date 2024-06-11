import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, fetchAllUsers } from "../Features/Auth/AuthSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { allusers, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleBlockUser = (userId) => {
    dispatch(blockUser({ userId }));
  };

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allusers
    ? allusers.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  // Calculate total pages
  const totalPages = allusers ? Math.ceil(allusers.length / usersPerPage) : 1;

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 to-gray-800 md:p-4">
      <div className="bg-white bg-opacity-90 shadow-xl md:rounded-lg p-6 md:p-10 max-w-5xl h-screen md:h-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          User Management
        </h2>
        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {isError && <p className="text-red-500 text-center">{message}</p>}
        {allusers && allusers?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {user.username}
                  </h3>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <p
                    className={`mb-4 ${
                      user.isBlocked ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </p>
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 transition duration-300"
                    disabled={user.isBlocked}
                  >
                    Block
                  </button>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex w-full items-center justify-center">
              <div className="flex justify-center mt-8 fixed bottom-1">
                <nav>
                  <ul className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index}>
                        <button
                          onClick={() => paginate(index + 1)}
                          className={`px-4 py-2 rounded-lg transition duration-300 ${
                            currentPage === index + 1
                              ? "bg-gray-500 text-white"
                              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

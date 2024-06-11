import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usersLogOut } from "../Features/Auth/AuthSlice";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isSuccess, isError, users, message } = useSelector(
    (state) => state.auth
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handlelogout = () => {
    navigate(location.pathname === ("/login"));
    dispatch(usersLogOut());
    window.location.reload();
  };

  useEffect(() => {
    if (users && isSuccess) {
      navigate("/");
      toast.success(`welcome 🎉 ${users.name}`);
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [isSuccess, isError, message, users]);

  if (isLoading) {
    return (
      <h1 className="loading flex justify-center items-center h-screen py-10">
        <PulseLoader
          loading={true}
          color="gray"
          style={{ paddingBlock: "20px" }}
        />
      </h1>
    );
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {!users ? (
          <>
            {" "}
            <Link
              to="/login"
              className="text-xl md:text-3xl font-bold text-white"
            >
              ResolveIt
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/" className="text-xl md:text-3xl font-bold text-white">
              ResolveIt
            </Link>
          </>
        )}
        {users?.role === "admin" ? (
          <></>
        ) : (
          <>
            {" "}
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    ""
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </>
        )}
        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {users ? (
            <>
              <Link
                to="/login"
                onClick={handlelogout}
                className={`text-white p-2 px-4 bg-red-600 hover:text-gray-200 transition duration-300 ${
                  isActive("/login")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-white hover:text-gray-200 transition duration-300 ${
                  isActive("/login")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-white hover:text-gray-200 transition duration-300 ${
                  isActive("/register")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 pt-8 z-50 bg-gray-800 bg-opacity-80 w-full h-full md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-start h-full gap-4">
          <button className="text-white self-end mx-4 mb-4" onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {users ? (
            <>
              <Link
                to="/tickets"
                className={`text-white hover:text-gray-200 transition duration-300 px-8 py-2 ${
                  isActive("/tickets")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
                onClick={closeMenu}
              >
                Tickets
              </Link>
              <Link
                to="/ticketsform"
                className={`text-white hover:text-gray-200 transition duration-300 px-8 py-2 ${
                  isActive("/ticketsform")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
                onClick={closeMenu}
              >
                NewTickets
              </Link>
            </>
          ) : (
            <></>
          )}
          {users ? (
            <Link onClick={closeMenu}>
              <Link
                to="/login"
                onClick={handlelogout}
                className={`fixed bottom-0 w-full text-center text-white p-2 px-4 bg-red-600 hover:text-gray-200 transition duration-300 ${
                  isActive("/login")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
              >
                Logout
              </Link>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-white hover:text-gray-200 transition duration-300 px-8 py-2 ${
                  isActive("/login")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-white hover:text-gray-200 transition duration-300 px-8 py-2  ${
                  isActive("/register")
                    ? "bg-blue-500 text-white py-2 px-4 rounded transition duration-300 "
                    : ""
                }`}
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { users } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  // Function to calculate the height of the content dynamically
  const calculateContentHeight = () => {
    const windowHeight = window.innerHeight;
    const navbarHeight = 75;
    return windowHeight - navbarHeight;
  };

  useEffect(()=>{
    if(users?.role === "admin"){
      navigate("/admin")
    }
  },[])

  return (
    <div
      className="flex flex-col justify-center items-center px-4 md:px-0"
      style={{ height: `${calculateContentHeight()}px` }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Support Desk!</h1>
        <p className="text-sm md:text-lg mb-8">
          Your go-to platform for managing customer support tickets.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
          {users ? (
            <>
              <Link
                to="/tickets"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4 md:mb-0 w-full md:w-auto text-center"
              >
                View Tickets
              </Link>
              <Link
                to="/ticketsform"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded w-full md:w-auto text-center"
              >
                Create New Ticket
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4 md:mb-0 w-full md:w-auto text-center"
              >
                View Tickets
              </Link>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded w-full md:w-auto text-center"
              >
                Create New Ticket
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

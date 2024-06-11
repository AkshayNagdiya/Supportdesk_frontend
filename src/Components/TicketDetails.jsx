import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  fetchTicketDetails,
  updateTicketStatus,
} from "../Features/Tickets/TicketSlice";

const TicketDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTicketDetails(id));
  }, [dispatch, id]);

  const handleStatusChange = () => {
    dispatch(updateTicketStatus({ id, status: "closed" }));
    // Reload the page after updating the status
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader loading={true} color="gray" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-4">{message}</div>;
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="container px-4 md:mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h1 className="text-3xl font-semibold text-white text-center">
              Ticket Details
            </h1>
          </div>
          {ticket ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{ticket.title}</h2>
              <p className="text-gray-700 mb-6">{ticket.description}</p>
              <p className="text-gray-700 text-sm mb-4">
                Token no. :- {ticket._id}
              </p>

              <div className="mb-4">
                <span className="font-semibold text-gray-800">Status: </span>
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded-full text-white ${
                    ticket.status === "closed" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-800">
                  Created At:{" "}
                </span>
                <span>{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
              {/* Conditionally render UI elements based on ticket status */}
              {ticket.status === "closed" && (
                <div className="bg-red-100 p-4 rounded-md mb-4">
                  <p className="text-red-600 font-semibold">
                    This ticket is closed.
                  </p>
                </div>
              )}
              {/* Button to change status */}
              {users.role === "admin" ? (
                <>
                  {ticket.status === "closed" ? (
                    <>
                      <button className="bg-blue-400 text-white py-2 px-6 rounded-full transition duration-300">
                        Change Status to Close
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                        onClick={handleStatusChange}
                      >
                        Change Status to Close
                      </button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No ticket found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

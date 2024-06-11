import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
    TicketView,
  fetchTicketsByUsername,
  updateTicketStatus,
} from "../Features/Tickets/TicketSlice";
import { animated, useSpring } from "react-spring"; // Import React Spring

const IssuesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.auth);
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const username = users?.username;

  useEffect(() => {
    if (username) {
      dispatch(TicketView());
    }
  }, [dispatch, username]);

  const handleCardClick = (ticketId, status) => {
    if (status?.toLowerCase() === "new") {
      dispatch(updateTicketStatus({ id: ticketId, status: "open" }));
    }
    navigate(`/ticket/${ticketId}`);
  };

  const fadeInAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 20 },
  });

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
    <div className="container mx-auto px-4 py-6">
      {tickets.length > 0 && (
        <h1 className="text-3xl font-semibold mb-8 text-center rounded-md bg-gray-500 py-4 text-gray-100">
          All Tickets
        </h1>
      )}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tickets.map((ticket) => (
          <animated.div
            key={ticket?._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            style={fadeInAnimation}
            onClick={() => handleCardClick(ticket?._id, ticket?.status)}
          >
            <div className="bg-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {ticket?.product}
              </h2>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  ticket?.status.toLowerCase() === "new"
                    ? "text-red-600 bg-red-200"
                    : ticket?.status.toLowerCase() === "open"
                    ? "text-green-600 bg-green-200"
                    : "text-gray-300 bg-gray-500"
                }`}
              >
                {ticket?.status}
              </span>
            </div>
            <div className="p-6">
              <p className="text-red-700 text-sm mb-4">
                Token no. :- {ticket?._id}
              </p>
              <p className="text-gray-700 mb-4">{ticket?.description}</p>
              <p className="text-gray-600 text-sm">
                Created At: {new Date(ticket?.createdAt).toLocaleString()}
              </p>
            </div>
          </animated.div>
        ))}
      </div>
      {tickets.length === 0 && (
        <div className="text-center flex justify-center items-center h-[60vh] text-gray-500 mt-6">
          No tickets found
        </div>
      )}
    </div>
  );
};

export default IssuesList;

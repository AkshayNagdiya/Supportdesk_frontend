import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { fetchTicketsByUsername } from '../Features/Tickets/TicketSlice';

const Ticket = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const { tickets, isLoading, isError, message } = useSelector((state) => state.ticket);

  useEffect(() => {
    const username = users.username; // Replace with the actual username
    dispatch(fetchTicketsByUsername(username));
  }, [dispatch]);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">Open</span>;
      case 'In Progress':
        return <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">In Progress</span>;
      case 'Closed':
        return <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">Closed</span>;
      default:
        return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">Unknown</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Tickets</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
            <p className="text-gray-700 mb-4">{ticket.description}</p>
            <div className="mb-2">{getStatusBadge(ticket.status)}</div>
            <p className="text-gray-600"><span className="font-semibold">Created At:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;

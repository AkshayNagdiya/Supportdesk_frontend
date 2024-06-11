import axios from "axios";

const CreateTicket = async (formData) => {
  const response = await axios.post(
    "https://supportdesk-backend-1.onrender.com/api/tickets",
    formData
  );
  localStorage.setItem("tickets", JSON.stringify(response.data));
  return response.data;
};

const GetTickets = async () => {
  const response = await axios.get("https://supportdesk-backend-1.onrender.com/api/tickets");
  localStorage.setItem("tickets", JSON.stringify(response.data));
  return response.data;
};

const getTicketsByUsername = async (username) => {
  try {
    const response = await axios.get(
      `https://supportdesk-backend-1.onrender.com/api/tickets/username/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching tickets for username ${username}:`, error);
    throw error;
  }
};

const getTicketById = async (Id) => {
  try {
    const response = await axios.get(`https://supportdesk-backend-1.onrender.com/api/tickets/${Id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket for ID ${userId}:`, error);
    throw error;
  }
};

const updateTicketStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `https://supportdesk-backend-1.onrender.com/api/tickets/${id}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket status for ID ${id}:`, error);
    throw error;
  }
};

const Ticketservice = {
  GetTickets,
  CreateTicket,
  getTicketsByUsername,
  getTicketById,
  updateTicketStatus,
};

export default Ticketservice;

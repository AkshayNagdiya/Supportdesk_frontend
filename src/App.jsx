import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import RegisterForm from "./Pages/Register";
import LoginForm from "./Pages/Login";
import TicketList from "./Components/TicketList";
import CreateTicketForm from "./Pages/TicketForm";
import AdminPanel from "./Pages/Admin";
import TicketDetails from "./Components/TicketDetails";
import { useSelector } from "react-redux";
import UserManagement from "./Components/UserManagment";
import Notification from "./Components/Notifications";
import PendingTickets from "./Components/PendingTickets";
import AllTickets from "./Components/AllTickets";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const user = true;
  const { users } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {users?.role === "admin" ? <></> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/ticketsform" element={<CreateTicketForm />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/pendingtickets" element={<PendingTickets />} />
          <Route path="/Alltickets" element={<AllTickets />} />
          <Route path="/Newtickets" element={<Notification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

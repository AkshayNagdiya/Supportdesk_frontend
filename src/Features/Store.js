import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import ticketReducer from "./Tickets/TicketSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer,
    ticket : ticketReducer,
  },
});

export default Store;

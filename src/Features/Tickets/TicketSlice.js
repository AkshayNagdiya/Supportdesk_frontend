import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TicketService from "../Tickets/TicketServies";

const initialState = {
  tickets: [],
  ticket: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const Ticketcreate = createAsyncThunk(
  "ticket/create",
  async (formData, thunkAPI) => {
    try {
      return await TicketService.CreateTicket(formData);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const TicketView = createAsyncThunk(
  "ticket/view",
  async (_, thunkAPI) => {
    try {
      return await TicketService.GetTickets();
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserTickets = createAsyncThunk(
  "ticket/fetchUserTickets",
  async (userId, thunkAPI) => {
    try {
      return await TicketService.getTicketsByUserId(userId);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchTicketsByUsername = createAsyncThunk(
  "ticket/fetchTicketsByUsername",
  async (username, thunkAPI) => {
    try {
      return await TicketService.getTicketsByUsername(username);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchTicketDetails = createAsyncThunk(
  "ticket/fetchDetails",
  async (id, thunkAPI) => {
    try {
      return await TicketService.getTicketById(id);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "ticket/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await TicketService.updateTicketStatus(id, status);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TicketView.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(TicketView.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
        state.isError = false;
      })
      .addCase(TicketView.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(Ticketcreate.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(Ticketcreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets.push(action.payload);
        state.isError = false;
      })
      .addCase(Ticketcreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchUserTickets.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchTicketsByUsername.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchTicketsByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
        state.isError = false;
      })
      .addCase(fetchTicketsByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchTicketDetails.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchTicketDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
        state.isError = false;
      })
      .addCase(fetchTicketDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedTicket = state.tickets.find(ticket => ticket._id === action.payload._id);
        if (updatedTicket) {
          updatedTicket.status = action.payload.status;
        }
        state.isError = false;
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default ticketSlice.reducer;

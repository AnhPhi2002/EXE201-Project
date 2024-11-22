import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Room } from "@/lib/api/types/types";

const API_BASE_URL = "https://learnup.work/api/meetings";

// Fetch all rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return await response.json();
});

// Add a new room
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (newRoom: Partial<Room>, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) {
        throw new Error("Failed to add room");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);

    }
  }
);

// Update a room
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ id, updatedRoom }: { id: string; updatedRoom: Partial<Room> }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedRoom),
    });
    if (!response.ok) {
      throw new Error("Failed to update room");
    }
    return await response.json();
  }
);

// Delete a room
export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete room");
  }
  return id;
});

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [] as Room[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch rooms";
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.unshift(action.payload); // Add the new room at the top
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex((room) => room._id === action.payload._id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      });
  },
});

export default roomSlice.reducer;

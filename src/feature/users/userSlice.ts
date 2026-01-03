import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

interface UserState {
  list: User[];
  loading: boolean;
}

const initialState: UserState = {
  list: [],
  loading: false,
};

// export const fetchUsers = createAsyncThunk("users/fetch", async () => {
//   const res = await fetch("https://dummyjson.com/users?limit=10");
//   const data = await res.json();
//   console.log("data", data);
//   return data.users as User[];
// });

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUser",
  async () => {
    const res = await fetch("https://dummyjson.com/users?limit=10");
    const data = await res.json();
    console.log("data", data.users);
    return data.users as User[];
  }
);

// export const fetchUser = createAsyncThunk<User[],void,{rejectedValue :string}>(
//   'user/fetch'
//   async(_ , {rejectedValue}) => {

//   }
// )

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.list.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "user/login",
    async (creds, { rejectWithValue }) => {
        const urlLogin = `/api/auth/login`
        const urlAuth = `/api/auth/me`
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify(creds)
        };
        try {
            await fetch(urlLogin, options)
            const res = await fetch(urlAuth, { credentials: 'include' });
            if (!res.ok) return null;
            return await res.json();
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const authUser = createAsyncThunk(
    "user/auth",
    async (_, { rejectWithValue }) => {
        const urlAuth = `/api/auth/me`
        try {
            const res = await fetch(urlAuth, { credentials: 'include' });
            if (!res.ok) return null;
            return res.json();
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        loading: true,
        err: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                loginUser.pending, (state) => {
                    console.log("Attempting to log in...")
                    state.loading = true;
                    state.err = null;
            })
            .addCase(
                loginUser.fulfilled, (state, action) => {
                    state.currentUser = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                loginUser.rejected, (state, action) => {
                    state.currentUser = null;
                    state.err = action.payload
                    state.loading = false;
                }
            )
            .addCase(
                authUser.pending, (state) => {
                    console.log("Authenticating...")
                    state.loading = true;
                    state.err = null;
            })
            .addCase(
                authUser.fulfilled, (state, action) => {
                    console.log("accepted");
                    state.currentUser = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                authUser.rejected, (state, action) => {
                    console.log("rejected: ", action.payload);
                    state.currentUser = null;
                    state.err = action.payload
                    state.loading = false;
                }
            )
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
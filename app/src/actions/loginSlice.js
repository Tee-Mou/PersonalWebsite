import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      user: null,
      perms: null
    },
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload
    },
    logout: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const {login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.userData.user;
export const selectUserPerms = (state) => state.user.userData.perms;
export default userSlice.reducer;
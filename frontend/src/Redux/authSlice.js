import { createSlice } from '@reduxjs/toolkit'
import { loginUser, verifyUser, registerUser } from './auth.service'

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: null,
}
function success(message){

}
function error(message){

}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userToken = null
      state.userInfo = {}
      state.sellerInfo = {}
      state.error = null
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload.message
        state.userToken = payload.token
        state.userInfo = payload.data.user
        localStorage.setItem('userToken', payload.token)
        success("Login Successful");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
        error("Login Failed");
      })
      builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload.message
        state.userToken = payload.token
        state.userInfo = payload.data.user
        console.log("verified")
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = {'message': payload}
        console.log("not verified")
      })
      builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = true
        state.error = null
        success("Registration Successful");
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
        error("Registration Failed");
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

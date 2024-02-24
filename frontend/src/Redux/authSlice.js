import { createSlice } from '@reduxjs/toolkit'
import { loginUser, verifyUser } from './auth.service'


const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: null,
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
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
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
        localStorage.setItem('userToken', payload.token)
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

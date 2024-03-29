import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../api'


  const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

export const loginUser = createAsyncThunk(
    'auth/signin',
    async ({ username, password }, { rejectWithValue }) => {
      console.log("loggingin")
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await client.post(
          `api/signin/`,
          { username, password },
          config,
        )
        return data
      } catch (error) {
        if (error.response?.data?.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    },
  )
  
  export const verifyUser = createAsyncThunk(
    'auth/verify',
    async ({ }, { rejectWithValue }) => {
        console.log("val = ",userToken)
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
        const { data } = await client.get(
          `api/verify/`,
          config,
        )
        return data
      } catch (error) {
        if (error.response?.data?.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    },
  )
  
  export const registerUser = createAsyncThunk(
    'auth/sigup',
    async ({ username, firstname, lastname, email, password, type }, { rejectWithValue }) => {
      console.log("registering")
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await client.post(
          `api/signup/`,
          { username, firstname, lastname, email, password, type },
          config,
        )
        return data
      } catch (error) {
        if (error.response?.data?.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    },
  )
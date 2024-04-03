import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  id: null,
  username: null,
  input:'',
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserToken: (state) => {
      state.value += 1
    },
    setUserName: (state) => {
      state.value -= 1
    },
    setUserId: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { setUserToken, setUserName, setUserId } = userSlice.actions

export default userSlice.reducer
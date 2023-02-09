import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'

// Define a type for the slice state
interface BackgroundState {
  color: string
}

// Define the initial state using that type
const initialState: BackgroundState = {
  color: "black"
}

export const backgroundSlice = createSlice({
  name: 'background',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload
    },
  },
})

export const {changeColor } = backgroundSlice.actions

// Other code such as selectors can use the imported `RootState` types

export default backgroundSlice.reducer
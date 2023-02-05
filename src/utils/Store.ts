import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

export default configureStore({
    reducer: {
      counter: counterSlice
    }
  })
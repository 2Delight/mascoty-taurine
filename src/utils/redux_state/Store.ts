import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import backgroundSlice from './BackgroundSlice'

export const store =  configureStore({
    reducer: {
      background: backgroundSlice
    }
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
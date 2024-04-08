import { configureStore } from '@reduxjs/toolkit'
import teamSlice from './team'
export const store = configureStore({
    reducer: {
        team: teamSlice,
    },
})
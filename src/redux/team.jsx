import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: [],
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addItemToTeam(state, action) {
            const newUser = action.payload;
            state.teams.push(newUser);
        },
        removeUserFromTeam(state, action) {
            const userId = action.payload;
            state.teams = state.teams.filter(user => user.id !== userId);
        },
        clearTeam(state) {
            state.teams = [];
        },
    },
});

export const { addItemToTeam, removeUserFromTeam, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;
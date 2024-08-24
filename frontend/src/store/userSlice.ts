// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    _id: string;
    email: string;
    nickname: string;
    image: string;
}

const initialState: UserState = {
    _id: '',
    email: '',
    nickname: '',
    image: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(_state, action: PayloadAction<UserState>) {
            return action.payload;
        },
        clearUser() {
            return initialState;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

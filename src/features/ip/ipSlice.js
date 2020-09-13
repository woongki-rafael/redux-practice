import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const getIp = createAsyncThunk('ip/getIp', async () => {
  const response = await fetch('https://api.ipify.org?format=json');
  return await response.json();
});

export const ipSlice = createSlice({
  name: 'ip',
  initialState: {
    hostIp: null,
    history: [],
    error: null,
    status: 'idle'
  },
  reducers: {
    addHistory: {
      reducer(state, action){
        state.history.push(action.payload);
      },
      prepare(ip){
        return {
          payload: {
            id: nanoid(),
            ip
          }
        }
      }
    }
  },
  extraReducers: {
    [getIp.pending]: (state) => {
      state.status = 'loading';
    },
    [getIp.fulfilled]: (state, action) => {
      state.status = 'success';
      state.hostIp = action.payload.ip;
    },
    [getIp.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const { addHistory } = ipSlice.actions;

export const selectIp = state => state.ip.hostIp;
export const selectHistory = state => state.ip.history;

export default ipSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ipReducer from '../features/ip/ipSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    ip: ipReducer
  },
});

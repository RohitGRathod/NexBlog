import { configureStore } from '@reduxjs/toolkit';
import reducers from './Service'


const Store = configureStore({
    reducer: {
        auth: reducers,
    }
    

});
export default Store;
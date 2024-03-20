import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	loading: false,
	data: [],
	error: '',
}

const url = 'https://v6.exchangerate-api.com/v6/158b157dd24652eceb026e60/latest/USD'

const fetchData = createAsyncThunk('data/fetchData', () => {
	return axios.get(url).then(response => response.data)
})

const apiSlice = createSlice({
	name: 'data',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchData.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.loading = false
			state.data = action.payload
			state.error = ''
		})
		builder.addCase(fetchData.rejected, (state, action) => {
			state.loading = false
			state.data = []
			state.error = action.error.message
		})
	},
})

export default apiSlice.reducer

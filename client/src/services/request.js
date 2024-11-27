import axios from 'axios'

const authClient = axios.create({
  baseURL: 'http://localhost:8000/auth/', //
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
  },
})

export const auth = async (data) => {
  try {
    const response = await authClient.post('/login', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getUser = async (data) => {
  try {
    const response = await apiClient.get('users', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const addUser = async (data) => {
  try {
    const response = await apiClient.post('users', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const updateUser = async (data) => {
  try {
    const {id} = data
    delete data.id
    const response = await apiClient.put(`users/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`users/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getSalary = async (data) => {
  try {
    const response = await apiClient.get('salary', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const addSalary = async (data) => {
  try {
    const response = await apiClient.post('salary', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getAbsen = async (data) => {
  try {
    const response = await apiClient.get('absen', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const addAbsen = async (data) => {
  try {
    const response = await apiClient.post('absen', data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
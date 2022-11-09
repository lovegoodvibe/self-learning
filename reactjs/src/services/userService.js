import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const getCreateUser = (inputData) => {
    return axios.post("/api/create-new-user", inputData)
}
const getDeleteUser = (inputId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: inputId
        }
    })
}
const getEditUser = (inputData) => {
    return axios.put('/api/edit-user', {
        inputData
    })
}
export { handleLoginApi, getAllUsers, getCreateUser, getDeleteUser, getEditUser };
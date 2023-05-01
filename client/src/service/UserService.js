import axios from "axios";


export default class UserService {


    async getUsers() {
        const response = await axios.get(`/users`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data.data;
    }


    async getRoles() {
        const response = await axios.get(`/users`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data.data;
    }

  
}

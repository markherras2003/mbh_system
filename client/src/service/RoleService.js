import axios from "axios";


export default class RoleService {

    async getRoles() {
        const response = await axios.get(`/roles`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data.data;
    }

}

import axios from "axios";


export default class PermissionService {

    async getPermissions() {
        const response = await axios.get(`/permissions`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data.data;
    }



    async getPermissionsState() {
        const response = await axios.get(`/permissionstate`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.data.data;
    }

}

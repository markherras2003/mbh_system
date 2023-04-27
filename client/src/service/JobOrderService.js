import axios from "axios";

export default class JobOrderService {
    async getJobOrders() {
        const response = await axios.get('/joborder');
        return response.data.data;
    }
}

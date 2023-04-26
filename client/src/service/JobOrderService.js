import axios from "axios";

export default class JobOrderService {
    async getJobOrders() {
        const response = await axios.get('/joborder');
        return response.data.data;
    }

    async handleAdd() {
        try {
            const response = await axios.post(`/joborder`, {
                client_name: '',
                unit_description: '',
                unit_model: '',
                unit_accessories: '',
                unit_problem: '',
                resolution: '',
                received_by: '',
                job_order_by: '',
                tech_incharge: '',
            });
            console.log(response);
        } catch (error) {
                errorMessage.value = "An unknown error occurred.";
        }
    }

}

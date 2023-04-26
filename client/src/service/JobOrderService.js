export default class JobOrderService {
    getJobOrders() {
        return fetch('demo/data/joborder.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}

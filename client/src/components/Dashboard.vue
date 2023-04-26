<script setup>
import { onMounted , ref} from 'vue';
import JobOrderService from '@/service/JobOrderService';


const joborders = ref(null);
const joborderService = new JobOrderService();


onMounted(() => {
    joborderService.getJobOrders().then((data) => (joborders.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

</script>


<template>
<div class="grid">
    <div class="col-12 lg:col-4 xl:col-4">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Job Orders</span>
                    <div class="text-900 font-medium text-xl">300</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">24 new </span>
            <span class="text-500">since last visit</span>
        </div>
    </div>

    <div class="col-12 lg:col-4 xl:col-4">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Revenue</span>
                    <div class="text-900 font-medium text-xl">PHP 3,000</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">%52+ </span>
            <span class="text-500">since last week</span>
        </div>
    </div>

    <div class="col-12 lg:col-4 xl:col-4">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">Customers</span>
                    <div class="text-900 font-medium text-xl">2500</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span class="text-green-500 font-medium">520 </span>
            <span class="text-500">newly registered</span>
        </div>
    </div>

    <div class="col-12 xl:col-12">
        <div class="card">
            <h5>Recent Job Orders</h5>
            <DataTable :value="joborders" :rows="5" :paginator="true" responsiveLayout="scroll">
                <Column field="job_id" header="Job Order #" :sortable="true" style="width: 35%"></Column>
                <Column field="client_name" header="Name" :sortable="true" style="width: 35%"></Column>
                <Column field="unit_description" header="Description" :sortable="true" style="width: 35%"></Column>
                <Column field="unit_problem" header="Unit Problem" :sortable="true" style="width: 35%"></Column>
                <Column style="width: 15%">
                    <template #header> View </template>
                    <template #body>
                        <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>


</div>
</template>

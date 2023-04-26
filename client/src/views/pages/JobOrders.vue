<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import JobOrderService from '@/service/JobOrderService';
import { useToast } from 'primevue/usetoast';
import axios from "axios";

const toast = useToast();


const joborders = ref (null);
const joborderDialog = ref(false);
const deleteJobOrderDialog = ref(false);
const deleteJobOrdersDialog = ref(false);
const joborder = ref({});
const selectedJobOrders = ref(null);

const dt = ref(null);
const filters = ref({});
const submitted = ref(false);


const joborderService = new JobOrderService();

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    joborderService.getJobOrders().then((data) => (joborders.value = data));
});

const openNew = () => {
    joborder.value = {};
    submitted.value = false;
    joborderDialog.value = true;
};

const hideDialog = () => {
    joborderDialog.value = false;
    submitted.value = false;
};

const saveJobOrder = async  () => {
    submitted.value = true;
    if (joborder.value.client_name && joborder.value.client_name.trim()) {
        if (joborder.value.job_id) {
            //joborder.value[findIndexById(joborder.value.job_id)] = joborder.value;
            const index = findIndexById(joborder.value.job_id);
  const updatedJobOrder = { ...joborders.value[index], ...joborder.value };
  joborders.value.splice(index, 1, updatedJobOrder);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Job Order Updated', life: 3000 });
        } else {
            joborder.value.job_id = createId();
            const response = await axios.post(`/joborder`, {
                client_name: joborder.value.client_name,
                unit_description: joborder.value.unit_description,
                unit_model: joborder.value.unit_model,
                unit_accessories: joborder.value.unit_accessories,
                unit_problem: joborder.value.unit_problem,
                resolution: joborder.value.resolution,
                received_by: joborder.value.received_by,
                job_order_by: joborder.value.job_order_by,
                tech_incharge: joborder.value.tech_incharge,
            });
            console.log(response);
            joborders.value.push(joborder.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Job Order Created', life: 3000 });
        }
        joborderDialog.value = false;
        joborder.value = {};
    }
};

const editJobOrder = (editJobOrder) => {
    joborder.value = { ...editJobOrder };
    console.log(joborder.value);
    joborderDialog.value = true;
};

const confirmDeleteJobOrder = (editJobOrder) => {
    joborder.value = editJobOrder;
    deleteJobOrderDialog.value = true;
};

const deleteJobOrder = () => {
    joborders.value = joborders.value.filter((val) => val.id !== joborder.value.id);
    deleteJobOrderDialog.value = false;
    joborder.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Job Order Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < joborders.value.length; i++) {
        if (joborders.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'new#-'+id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteJobOrdersDialog.value = true;
};
const deleteSelectedJobOrders = () => {
    joborder.value = joborder.value.filter((val) => !selectedJobOrders.value.includes(val));
    deleteJobOrdersDialog.value = false;
    selectedJobOrders.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Job Orders Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedJobOrders || !selectedJobOrders.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="joborders"
                    v-model:selection="selectedJobOrders"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Job Orders"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Job Orders</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="job_id" header="Job Order #" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Job Order #</span>
                            {{ slotProps.data.job_id }}
                        </template>
                    </Column>
                    <Column field="client_name" header="Client Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Client Name</span>
                            {{ slotProps.data.client_name }}
                        </template>
                    </Column>
                    <Column field="unit_description" header="Unit Description" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Unit Description</span>
                            {{ slotProps.data.unit_description }}
                        </template>
                    </Column>
                    <Column field="unit_model" header="Unit Model" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Unit Model</span>
                            {{ slotProps.data.unit_model }}
                        </template>
                    </Column>
                    <Column field="unit_accessories" header="Unit Accessories" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Unit Accessories</span>
                            {{ slotProps.data.unit_accessories }}
                        </template>
                    </Column>
                    <Column field="unit_problem" header="Unit Problem" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Unit Accessories</span>
                            {{ slotProps.data.unit_accessories }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editJobOrder(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteJobOrder(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>


                <Dialog v-model:visible="joborderDialog" :style="{ width: '600px' }" header="Job Order Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Client Name</label>
                        <InputText id="client_name" v-model.trim="joborder.client_name" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.client_name }" />
                        <small class="p-invalid" v-if="submitted && !joborder.client_name">Client Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="unit_description">Description</label>
                        <Textarea id="unit_description" v-model="joborder.unit_description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="unit_model">Unit Model </label>
                            <InputText id="unit_model" v-model.trim="joborder.unit_model" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.unit_model }" />
                            <small class="p-invalid" v-if="submitted && !joborder.unit_model">Unit Model is required.</small>
                        </div>

                        <div class="field col">
                            <label for="unit_accessories">Unit Accessories </label>
                            <InputText id="unit_accessories" v-model.trim="joborder.unit_accessories" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.unit_accessories }" />
                            <small class="p-invalid" v-if="submitted && !joborder.unit_accessories">Unit Accessories is required.</small>
                        </div>
                    </div>

                    <div class="field">
                        <label for="unit_problem">Unit Problem</label>
                        <Textarea id="unit_problem" v-model="joborder.unit_problem" required="true" rows="3" cols="20" />
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="resolution">Resolution </label>
                            <InputText id="resolution" v-model.trim="joborder.resolution" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.resolution }" />
                            <small class="p-invalid" v-if="submitted && !joborder.resolution">Resolution is required.</small>
                        </div>

                        <div class="field col">
                            <label for="received_by">Received By</label>
                            <InputText id="received_by" v-model.trim="joborder.received_by" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.received_by }" />
                            <small class="p-invalid" v-if="submitted && !joborder.received_by">Received by is required.</small>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="job_order_by">Job Order By</label>
                            <InputText id="job_order_by" v-model.trim="joborder.job_order_by" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.job_order_by }" />
                            <small class="p-invalid" v-if="submitted && !joborder.job_order_by">Job Order By is required.</small>
                        </div>

                        <div class="field col">
                            <label for="tech_incharge">Tech incharge</label>
                            <InputText id="tech_incharge" v-model.trim="joborder.tech_incharge" required="true" autofocus :class="{ 'p-invalid': submitted && !joborder.tech_incharge }" />
                            <small class="p-invalid" v-if="submitted && !joborder.tech_incharge">Tech incharge is required.</small>
                        </div>
                    </div>

        
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveJobOrder" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteJobOrdersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="joborder"
                            >Are you sure you want to delete <b>{{ joborder.client_name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteJobOrderDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteJobOrder" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteJobOrdersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="joborder">Are you sure you want to delete the selected job orders?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteJobOrderDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedJobOrders" />
                    </template>
                </Dialog>

              
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>

<template>
    <div class="w-full " >
        <main v-if="content " class=" flex-1 overflow-x-hidden overflow-y-auto  w-full">
            <div class="px-4 mb-6 py-4 rounded-lg shadow-md bg-white dark:bg-gray-700 flex w-full">
                <h1 class="font-bold text-lg w-full" v-text="content.title"></h1>
            </div>
            <div class="mx-2 bg-white px-4 rounded shadow-sm py-2 ">
                    
                <div class="card-header align-items-center py-5 gap-2 gap-md-5 w-full flex ">
                    <div class="card-title">
                        <div class="d-flex align-items-center position-relative my-1">
                            <input type="text"  v-model="searchValue" data-kt-ecommerce-order-filter="search" class="form-control form-control-solid w-250px ps-12" placeholder="Search Report">
                        </div>
                        <div id="kt_ecommerce_report_views_export" class="d-none"><div class="dt-buttons btn-group flex-wrap">      <button class="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="kt_ecommerce_report_views_table" type="button"><span>Copy</span></button> <button class="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="kt_ecommerce_report_views_table" type="button"><span>Excel</span></button> <button class="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="kt_ecommerce_report_views_table" type="button"><span>CSV</span></button> <button class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="kt_ecommerce_report_views_table" type="button"><span>PDF</span></button> </div></div>
                    </div>
                    <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                        <div class="w-150px">
                            <select v-model="searchField" class="form-select form-select-solid select2-hidden-accessible" data-control="select2" data-hide-search="true" data-placeholder="Rating" data-kt-ecommerce-order-filter="rating" data-select2-id="select2-data-9-zple" tabindex="-1" aria-hidden="true" data-kt-initialized="1">
                                <option v-for="col in content.columns" v-text="col.text" :value="col.value"></option>
                            </select>
                        </div>
                    </div>
                    <a href="javascript:;" class="uppercase p-2 mx-2 text-center text-white w-32 rounded-lg bg-danger" @click="openCreate()" v-text="translate('add_new')"></a>
                </div>
                <datatabble 
                    :search-field="searchField"
                    :search-value="searchValue"
                    alternating class="align-middle fs-6 gy-5 table table-row-dashed px-6" :body-text-direction="translate('is_rtl')" fixed-checkbox v-if="content.columns" :headers="content.columns" :items="content.items" >

                    <template #item-details="item">
                        <button v-if="!item.not_editable" class="p-2  hover:text-gray-600 text-purple" @click="handleAction('details', item)">
                            <vue-feather class="w-5" type="edit"></vue-feather>
                        </button>
                    </template>

                    <template #item-edit="item">
                        <button v-if="!item.not_editable" class="p-2  hover:text-gray-600 text-purple" @click="handleAction('edit', item)">
                            <vue-feather class="w-5" type="edit"></vue-feather>
                        </button>
                    </template>
                    <template #item-delete="item">
                        <button v-if="!item.not_removeable" class="p-2 hover:text-gray-600 text-red-500" @click="handleAction('delete', item)">
                            <vue-feather class="w-5" type="x-circle"></vue-feather>
                        </button>
                    </template>
                </datatabble>

                <side_form_create ref="activeFormCreate" @callback="closeSide" :conf="conf" :model="'EmailTemplate.create'" v-if="showAddSide && !showEditSide" :columns="content.fillable"  class="col-md-3" />
            
                <side-form-update ref="activeFormUpdate" @callback="closeSide" :key="activeItem" :conf="conf" :model="'EmailTemplate.update'" v-if="showEditSide && !showAddSide" :item="activeItem" :model_id="activeItem.template_id" index="template_id"  :columns="content.fillable"  class="col-md-3" />


            </div>
        </main>
    </div>
</template>
<script>

import 'vue3-easy-data-table/dist/style.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import {defineAsyncComponent, ref} from 'vue';
const SideFormCreate = defineAsyncComponent(() =>
  import('@/components/includes/side-form-create.vue')
);
const SideFormUpdate = defineAsyncComponent(() =>
  import('@/components/includes/side-form-update.vue')
);
import {translate, handleGetRequest, deleteByKey} from '@/utils.vue';
    
export default
{
    components: {
        'datatabble': Vue3EasyDataTable,
        'side_form_create': SideFormCreate,
        SideFormUpdate
    },
    
    setup(props) {
        
        const showAddSide = ref(false);
        const showEditSide = ref(false);

        const url =  props.conf.url+props.path+'?load=json';

        const activeItem = ref({});
        const showLoader = ref(null);
        const searchField = ref("payment_id");
        const searchValue = ref("");
        
        const content =  ref({
                title: '',
                items: [],
                columns: [],
            });
        
        function load()
        {
            handleGetRequest( url ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response))
                searchField.value = content.value.columns[1].value;
            });
        }
        
        load();

        function closeSide (data) 
        {
            showAddSide.value = false;
            showEditSide.value = false;
        }

        /**
         * Handle actions from datatable buttons
         * Called From 'dataTableActions' component
         * 
         * @param String actionName 
         * @param Object data
         */  
        function  handleAction(actionName, data) {
            console.log(props.lang.lang)
            switch(actionName) 
            {
                case 'details':
                    window.open(props.conf.url+'admin/email_builder?lang='+props.lang.lang+'&template_id='+data.template_id, '_blank').focus();
                    break;  

                case 'edit':
                    showAddSide.value = false; 
                    activeItem.value = data;
                    showEditSide.value = true; 
                    break;  

                case 'delete':
                    deleteByKey('template_id', data, 'EmailTemplate.delete');
                    break;  
            }
        }

        
        function openCreate() 
        {
            showAddSide.value = true; 
            showEditSide.value = false; 
        }

        return {
            showAddSide,
            showEditSide,
            openCreate,
            closeSide,
            url ,
            content,
            activeItem,
            showLoader,
            translate,
            searchField,
            searchValue,
            handleAction
        };
    },
    props: [
        'path',
        'langs',
        'setting',
        'conf',
        'auth',
    ],
};
</script>
<template>
    <div class="w-full flex overflow-auto" >
        <vue-csv-import v-model="csv" :fields="{
                name: { required: false, label: 'Full_Name' },
                mobile: { required: false, label: 'Phone_Number' },
                whatsapp: { required: false, label: 'Whatsapp' },
                job_title: { required: false, label: 'Job_Title' },
                email: { required: false, label: 'Email' },
            }">
            <div class="card-body pt-0">
                <div class="settings-form">

                    <vue-csv-errors></vue-csv-errors>
                    <div class="w-full flex ">
                        <vue-csv-input class="w-full" v-slot="{ file, change }"></vue-csv-input>
                        <div class="py-5 text-lg" >
                            <vue-csv-toggle-headers v-slot="{ hasHeaders, toggle }">
                                <checkbox />
                                <button @click.prevent="toggle" v-text="translate('File has Headers')"></button>
                            </vue-csv-toggle-headers>
                        </div>
                    </div>
                    <vue-csv-table-map autoMatch="true"
                        autoMatchIgnoreCase="true"></vue-csv-table-map>
                </div>
            </div>
            <p class="text-center mt-10">
                <vue-csv-submit @click="handleImport"
                    class="uppercase px-4 py-3 mx-2 text-center text-white rounded-lg bg-danger"
                    url="/api/addProductsCSV"
                    :config="{ params: {  } }"
                    v-slot="{ submit, mappedCsv }">
                    <!-- <button @click.prevent="submit" >{{ translate('Next') }}</button> -->

                    <a href="javascript:;"
                        class="uppercase px-4 py-3 mx-2 text-center text-white rounded-lg bg-danger"
                        v-text="translate('Next')"></a>
                </vue-csv-submit>
            </p>
        </vue-csv-import>
    </div>
</template>
<script>

import { VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport, VueCsvTableMap, VueCsvImportPlugin } from 'vue-csv-import';

import {defineAsyncComponent, ref} from 'vue';
import {translate, handleGetRequest, handleRequest, deleteByKey, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails} from '@/utils.vue';


const form_field = defineAsyncComponent(() =>
  import('@/components/includes/form_field.vue')
);


export default 
{
    components:{
        VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport, VueCsvTableMap, VueCsvImportPlugin,
        form_field,
    },
    name:'Import Products',
    setup(props) {

        const url =  props.conf.url+props.path+'?load=json';

        const showEditSide = ref(false);
        const activeItem = ref({});
        const content = ref({});
        const showWizard =  ref(false);
        const fillable =  ref(['Info', 'Time','Start location','End location','Driver']);
        const searchValue = ref("");
        const searchField = ref("#");
        

        const closeSide = () => {
            showEditSide.value = false;
        }


        const load = () => {
            handleGetRequest( url ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response))
                searchField.value = content.value.columns[1].value;
            });
        }
        
        // load();


        const addProductWizard = () => 
        {
            activeItem.value = {};
            showWizard.value = true;
        }
        
        const handleImport = () => {
        }
        
        return {
            handleImport,
            showEditSide,
            url,
            content,
            fillable,
            activeItem,
            searchValue,
            searchField,
            translate,
            showWizard,
            closeSide,
            addProductWizard,
        };
    },

    props: [
        'path',
        'langs',
        'system_setting',
        'business_setting',
        'setting',
        'conf',
        'currency',
        'auth',
    ],
    
};
</script>
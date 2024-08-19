<template>
    <div class="w-full flex overflow-auto">

        <div id="kt_app_content_container" class="app-container  container-xxl ">
            <!--begin::Card-->
            <div class="card">
                <!--begin::Card body-->
                <div class="card-body">
                    <!--begin::Heading-->
                    <div class="card-px pt-15 pb-15">
                        
                        <vue-csv-import  @change="onCsvImport" v-model="csv" :fields="content.columns">
                            


                                
                            <div class="card-body pt-0">
                                <div class="settings-form text-center ">

                                    <!--begin::Title-->
                                    <h2 class="fs-2x fw-bold mb-0" v-if="!csv" v-text="translate('Import products')"></h2>
                                    <!--end::Title-->

                                    <!--begin::Description-->
                                    <p class="text-gray-500 fs-4 fw-semibold py-7">
                                        {{ translate('Click on the below buttons to upload the CSV file') }} <br>{{translate('then assign')}}. </p>
                                    <!--end::Description-->
                                    
                                    <div class="w-full gap-4 ">
                                        
                                        <!--begin::Action-->
                                        <label class="btn btn-primary er fs-6 px-8 py-4" data-bs-toggle="modal"
                                            data-bs-target="#kt_modal_create_campaign" > 
                                            <span v-text="translate('Upload CSV file')"></span>
                                            <vue-csv-input @change="onCsvImport" class="hidden" v-slot="{ file, change }"></vue-csv-input>
                                        </label>
                                        <!--end::Action-->
                                        
                                        <!--begin::Action-->
                                        <a target="_blank" href="/uploads/products-sample.csv" class="btn btn-danger er fs-6 px-8 py-4 mx-6" v-text="translate('Download Example')"></a>
                                        <!--end::Action-->
                                    </div>
                                    <vue-csv-errors></vue-csv-errors>
                                    
                                    <div class="w-full flex " v-if="canSubmit">
                                        <div class="py-5 text-lg w-full" >
                                            <vue-csv-toggle-headers v-slot="{ hasHeaders, toggle }">
                                                <checkbox />
                                                <button @click.prevent="toggle" v-text="translate('File has Headers')"></button>
                                            </vue-csv-toggle-headers>
                                        </div>
                                        <vue-csv-submit @click="handleImport"
                                            class="uppercase px-4 py-3 mx-2 text-center text-white rounded-lg bg-danger"
                                            url="/api/create?type=addProductsCSV"
                                            :config="{ params: {  } }"
                                            v-slot="{ submit, mappedCsv }">
                                            <!-- <button @click.prevent="submit" >{{ translate('Next') }}</button> -->

                                            <a href="javascript:;"
                                                class="uppercase px-4 py-3 mx-2 text-center text-white rounded-lg bg-danger"
                                                v-text="translate('Next')"></a>
                                        </vue-csv-submit>
                                    </div>

                                    <div class="container mx-auto overflow-x-auto py-10" >
                                            
                                        <vue-csv-table-map autoMatch="true" autoMatchIgnoreCase="true"></vue-csv-table-map>
                                    </div>
                                    
                                </div>
                            </div>
                                    
                            <!--begin::Illustration-->
                            <div class="text-center pb-15 px-5" v-if="!canSubmit">
                                <img :src="'/uploads/img/2.png'" alt="" class="mw-100 h-200px h-sm-325px">
                            </div>
                            <!--end::Illustration-->
                        </vue-csv-import>
                    </div>
                    <!--end::Heading-->

                </div>
                <!--end::Card body-->
            </div>
            <!--end::Card-->
        </div>


    </div>
</template>
<script>

import { VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport, VueCsvTableMap, VueCsvImportPlugin } from 'vue-csv-import';

import { defineAsyncComponent, ref } from 'vue';
import { translate, handleGetRequest, handleRequest, deleteByKey, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails } from '@/utils.vue';


const form_field = defineAsyncComponent(() =>
    import('@/components/includes/form_field.vue')
);


export default
    {
        components: {
            VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport, VueCsvTableMap, VueCsvImportPlugin,
            form_field,
        },
        name: 'Import Products',
        setup(props) {

            const url = props.conf.url + props.path + '?load=json';

            const canSubmit = ref(false);
            const activeItem = ref({});
            const content = ref({});
            const showWizard = ref(false);
            const fillable = ref(['Info', 'Time', 'Start location', 'End location', 'Driver']);
            const searchValue = ref("");
            const searchField = ref("#");


            const closeSide = () => {
                showEditSide.value = false;
            }


            const load = () => {
                handleGetRequest(url).then(response => {
                    content.value = JSON.parse(JSON.stringify(response))
                });
            }

            load();


            const addProductWizard = () => {
                activeItem.value = {};
                showWizard.value = true;
            }

            const onCsvImport = (data) => {
                canSubmit.value = true
            }
            
            const handleImport = () => {
            }

            return {
                onCsvImport,
                handleImport,
                canSubmit,
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
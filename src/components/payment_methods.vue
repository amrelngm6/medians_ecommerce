<template>
    <div class="w-full flex overflow-auto" >
        <payment_wizard :item="activeItem" :system_setting="system_setting" :conf="conf" :auth="auth" v-if="showWizard" @callback="showWizard = false" />
        <div  v-if="content && !showWizard" class=" w-full relative">
            
            <div class=" " v-if="content.items && !content.items.length ">
                <div class="card">
                    <div class="card-body">
                        <div class="card-px text-center pt-15 pb-15">
                            <h2 class="fs-2x fw-bold mb-0" v-text="content.title"></h2>
                            <p class="text-gray-400 fs-4 font-semibold py-7" v-text="translate('Add your first Payment method using this below wizard')"></p>
                            <a v-text="translate('add_new')" @click="showAddSide = true, activeItem = {}" href="javascript:;" class="text-white btn btn-primary er fs-6 px-8 py-4" ></a>
                        </div>

                        <div class="text-center pb-15 px-5">
                            <img :src="'/uploads/img/start-wizard.png'" alt="" class="mx-auto mw-100 h-200px h-sm-325px">          
                        </div>
                    </div>
                </div>
            </div>

            <main class=" flex-1 overflow-x-hidden overflow-y-auto  w-full relative" v-if="content.items">
                <div class="px-4 mb-6 py-4 rounded-lg shadow-md bg-white dark:bg-gray-700 flex w-full">
                    
                    <h1  class="font-bold text-lg w-full" v-text="content.title"></h1>
                    <a href="javascript:;" class="uppercase p-2 mx-2 text-center text-white w-32 rounded-lg bg-danger" @click="showAddSide = true, activeItem = {}" v-text="translate('add_new')"></a>
                </div>
                <hr class="mt-2" />
                <div class="w-full bg-white" >

                    <datatabble  class="align-middle fs-6 gy-5 table table-row-dashed px-6" :body-text-direction="translate('is_rtl')" fixed-checkbox v-if="content.columns" :headers="content.columns" :items="content.items" >

                        <template #item-picture="item">
                            <img :src="item.picture" class="w-8 h-8 rounded-full" />
                        </template>

                        <template #item-edit="item">
                            <button v-if="!item.not_editable" class="p-2  hover:text-gray-600 text-purple" @click="handleAction('edit', item)">
                                <vue-feather class="w-5" type="edit"></vue-feather>
                            </button>
                        </template>
                        <template #item-delete="item">
                            <button v-if="!item.not_removeable" class="p-2 hover:text-gray-600 text-red-500" @click="handleAction('delete', item)">
                                <delete_icon class="w-5"/>
                            </button>
                        </template>
                    </datatabble>
                </div>
            </main>
    
            <side_form_create ref="activeFormCreate" @callback="closeSide" :auth="auth" :conf="conf" :model="'PaymentMethod.create'" :columns="content.fillable"  class="col-md-3" v-if="showAddSide && !showWizard"  />
                
            <!-- <side_form_update ref="activeFormUpdate" @callback="closeSide" :key="activeItem" :auth="auth" :conf="conf" :model="'PaymentMethod.update'" :item="activeItem" :model_id="activeItem.payment_method_id" index="payment_method_id"  :columns="content.fillable"  class="col-md-3"  v-if="showWizard && !showAddSide" /> -->
            
        </div>
    </div>
</template>
<script>

import delete_icon from '@/components/svgs/trash.vue';
import route_icon from '@/components/svgs/route.vue';
import car_icon from '@/components/svgs/car.vue';

import 'vue3-easy-data-table/dist/style.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import {defineAsyncComponent, ref} from 'vue';
import {translate, handleGetRequest, handleRequest, deleteByKey, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails} from '@/utils.vue';


const form_field = defineAsyncComponent(() =>
  import('@/components/includes/form_field.vue')
);

const side_form_create = defineAsyncComponent(() => import('@/components/includes/side-form-create.vue') );
const side_form_update = defineAsyncComponent(() => import('@/components/includes/side-form-update.vue') );

import tooltip from '@/components/includes/tooltip.vue';
import payment_wizard from '@/components/wizards/paymentMethodWizard.vue';



export default 
{
    components:{
        'datatabble': Vue3EasyDataTable,
        side_form_create,
        side_form_update,
        delete_icon,
        car_icon,
        route_icon,
        form_field,
        tooltip,
        payment_wizard
    },
    name:'PaymentMethods',
    setup(props) {

        const url =  props.conf.url+props.path+'?load=json';

        const showWizard = ref(false);
        const showAddSide = ref(false);
        const activeItem = ref({});
        const content = ref({});
        
        const closeSide = () => {
            showWizard.value = false;
            showAddSide.value = false;
        }

        const load = () => {
            handleGetRequest( url ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response))
            });
        }
        
        load();


        /**
         * Handle actions from datatable buttons
         * Called From 'dataTableActions' component
         * 
         * @param String actionName 
         * @param Object data
         */  
         const handleAction =  (actionName, data) =>  {
            switch(actionName) 
            {

                case 'edit':
                    showAddSide.value = false
                    activeItem.value = data;
                    showWizard.value = true
                    break;  

                case 'delete':
                    deleteByKey('payment_method_id', data, 'PaymentMethod.delete');
                    break;  

                    
                case 'close':
                    showAddSide.value = false;
                    showWizard.value = false;
                    activeItem.value = {};
                    break;
            }
        }

        
        return {
            showAddSide,
            showWizard,
            url,
            content,
            activeItem,
            translate,
            closeSide,
            handleAction,
        };
    },

    props: [
        'path',
        'langs',
        'system_setting',
        
        'setting',
        'conf',
        'auth',
    ],
    
};
</script>
<template>
    <div class="sidebar-create-form fixed top-14 left-0 right-0 m-auto" style="z-index:9999"  >
        <div class="rounded-lg shadow-lg bg-white dark:bg-gray-700 relative h-[90vh]  overflow-y-auto" >
            <form action="/api/update" method="POST" data-refresh="1" id="add-device-form" class="action p-4   m-auto rounded-lg max-w-xl ">
                <div class="w-full flex">
                    <h1 class="w-full m-auto max-w-xl text-base mb-10 " v-text="translate('update')"></h1>
                    <span class="cursor-pointer py-1 px-2" @click="emitClose"><close_icon /></span>
                </div>
                <input name="type" type="hidden" :value="model">
                
                <div class="py-1 w-full pt-4" v-for="column in columns" v-if="columns">
                    
                    <span class="block mb-2  text-gray-600 text-lg" v-text="column.title" v-if="column.column_type != 'hidden'"></span>
                    <form_field :callback="closeSide" :column="column" :model="model"  :item="item" :conf="conf"></form_field>

                </div>

                <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800" v-text="translate('save')"></button>
            </form>
        </div>
    </div>
</template>
<script>
import close_icon from '@/components/svgs/Close.vue';
import field from '@/components/includes/Field.vue';
import form_field from '@/components/includes/form_field.vue';
import {translate} from '@/utils.vue';

export default 
{
    components: {
        'vue-medialibrary-field': field,
        form_field,
        close_icon,
    },

    props: [
        'columns',
        'model',
        'model_id',
        'item',
        'index',
        'conf',
    ],

    emits: ['callback'],

    setup(props, {emit}) {

        const emitClose = (model) => 
        {
            model ? emit('callback', model) : '';
        }

        
        const setActiveStatus = (item, key) => {
            item[key] = !item[key];
        }      

        const isInput = (val) =>
        {
            switch (val) 
            {
                case 'text':
                case 'number':
                case 'email':
                case 'time':
                case 'date':
                case 'phone':
                case 'number':
                case '':
                    return true;
                    break;
            }
            return false;
        }

        const handleName = (column) => {
            return  (column && column.custom_field) ? 'params[field]['+column.key+']' : 'params['+column.key+']';
        }

        return {
            file: '',
            isInput,
            setActiveStatus,
            emitClose,
            handleName,
            itemData: props.item,
            translate
        }
    }
};
</script>

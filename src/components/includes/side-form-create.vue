<template>
    <div class="sidebar-create-form fixed top-14 left-0 right-0 m-auto" style="z-index:9999" >
        <div class="rounded-lg shadow-lg bg-white dark:bg-gray-700 relative h-[90vh]  overflow-y-auto" >
            <form action="/api/create" method="POST" data-refresh="1" id="add-device-form" class="action  p-4  m-auto rounded-lg max-w-xl pb-10">
                <div class="w-full flex">
                    <h1 class="w-full m-auto max-w-xl text-base mb-10 " v-text="translate('ADD_new')"></h1>
                    <span class="cursor-pointer py-1 px-2" @click="emitClose(model)"><close_icon /></span>
                </div>
                <input name="type" type="hidden" :value="model">
                <input name="params[active]" type="hidden" value="1">
                
                <div  v-for="column in columns" v-if="columns">
                    <div class="py-1 w-full pt-4" v-if="column" >

                        <label v-if="column.withLabel" class="text-lg pt-3 block" v-text="column.title"></label>
                        
                        <input v-if="column.column_type == 'hidden'" :name="'params['+column.key+']'" type="hidden" v-model="column.default">
                        
                        <input :required="column.required" v-if="isInput(column.column_type)" :name="'params['+column.key+']'"  autocomplete="off" :type="column.column_type" class="form-control form-control-solid" :placeholder="column.title">

                        <input v-if="column.column_type == 'password'" autocomplete="off" :name="'params['+column.key+']'" :type="column.column_type" class="form-control form-control-solid" :placeholder="column.title">

                        <textarea  :required="column.required"  v-if="column.column_type == 'textarea'" :name="'params['+column.key+']'" rows="4" class="mt-3 form-control form-control-solid" :placeholder="column.title"></textarea>

                        <select :required="column.required"  :name="'params['+column.key+']'" :type="column.column_type" class="form-control form-control-solid" v-if="column.data && column.column_type == 'select'"  :placeholder="column.title">
                            <option value="0" v-if="!column.required" v-text="translate('-- Choose') +' '+ column.title"></option>
                            <option v-for="option in column.data" :value="option[column.column_key ? column.column_key : column.key]" v-text="option[column.text_key]"></option>
                        </select>

                        <div v-if="column.column_type == 'checkbox' && !showLoader"  class="flex gap gap-2 cursor-pointer my-2" @click="setActiveStatus(column)">
                            <span :for="column.key" class="block" v-text="column.title"></span>
                            <span :class="!column.active ? 'bg-gray-200' : 'bg-red-400'" class="mx-2 mt-1 bg-red-400 block h-4 relative rounded-full w-8" style="direction: ltr;" ><a class="absolute bg-white block h-4 relative right-0 rounded-full w-4" :style="{left: column.active ? '16px' : 0}"></a></span>
                            <span v-if="!column.without_text" v-text="column.active ? translate('Active') : translate('Pending')" class=" font-semibold inline-flex items-center px-2 py-1 rounded-full text-xs font-medium "></span>
                            <input v-model="column.active"  type="checkbox" class="hidden" :name="'params['+column.key+']'" />
                        </div>
                        
                        <vue-medialibrary-field :key="item" v-if="column.column_type == 'file'" :name="'params['+column.key+']'" :filepath="null" :api_url="conf.url"></vue-medialibrary-field>

                        <vue-medialibrary-field :key="item" v-if="column.column_type == 'picture' " :name="'params['+column.key+']'" :filepath="null"  :api_url="conf.url"></vue-medialibrary-field>
                    </div>

                </div>

                <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800 px-6" v-text="translate('save')"></button>
            </form>
        </div>
    </div>
</template>
<script>
import close_icon from '@/components/svgs/Close.vue';
import field from '@/components/includes/Field.vue';
import { translate } from '@/utils.vue';


export default 
{
    components: {
        'vue-medialibrary-field': field,
        close_icon
    },
    props: [
        'conf',
        'columns',
        'model',
    ],
    data() {
        return {
            file: '',
            showLoader: false,
        }
    },
    methods: {
        emitClose(model)
        {
            model ? this.$emit('callback', model) : '';
        },

        isInput(val)
        {
            switch (val) 
            {
                case 'text':
                case 'number':
                case 'email':
                case 'time':
                case 'date':
                case 'phone':
                case '':
                    return true;
                    break;
            }
            return false;
        },   
        setActiveStatus(column) {
            column.active = !column.active;
        },
        translate(i)
        {
            return translate(i);
        }
     
    }

};
</script>

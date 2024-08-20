<template>
  <div class=" w-full relative">
    <close_icon class="absolute top-4 right-4 z-10 cursor-pointer" @click="back" />
    
    <div v-if="loader" :key="loader" class="bg-white fixed w-full h-full top-0 left-0" style="z-index:99999; opacity: .9;">
        <img class="m-auto w-500px" :src="'/uploads/loader.gif'" />
    </div>
    <h2 v-text="item.name"></h2>
    <p v-text="translate('Drag & Drop your link for menu') + ' ' + item.type"></p>

    <div class="flex">
      <div class="w-300px h-300px">
        <div class="flex text-center">
          <span class="w-full px-4 py-2  " :class="allPages == pages ? 'bg-red-600 border border-1 border-danger  fw-bold rounded-xl' : 'cursor-pointer'" @click="allPages = pages" v-text="translate('Pages')"></span>
          <span class="w-full px-4 py-2 " :class="allPages == categories ? 'bg-red-600 border border-1 border-danger  fw-bold rounded-xl' : 'cursor-pointer'" @click="allPages = categories" v-text="translate('Categories')"></span>
        </div>
          <VueDraggable class="shadow-sm shadow-sm flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-white overflow-auto"
          v-model="allPages" animation="150" ghostClass="ghost" group="people" >
          <div v-for="page in allPages" @click="addMenu(page)" :key="page" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
            {{ page.name }}
          </div>
        </VueDraggable>
      </div>
      <div class=" " >
        <div class="shadow-sm shadow-sm flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-white overflow-auto" >
          
            <Draggable ref="tree" textKey="name" childrenKey="items" maxLevel="2"  v-model="treeData" treeLine @change="change">
              <template #default="{ node, stat }" >
                {{ node.children }}
                <div class="cursor-move h-30 bg-gray-500/5 rounded p-3 my-1 flex">
                  <span class="mtl-ml w-full">{{ node.name }}</span>
                  <vue-feather type="delete" @click="remove(stat)" />
                </div>
              </template>
            </Draggable>
        </div>
        <button @click="saveItem" id="kt_ecommerce_add_product_submit" class="btn btn-primary"><span class="indicator-label" v-text="translate('Save Changes')"></span></button>
      </div>
    </div>
    <div class="flex justify-between">
      <preview-list :list="allPages" />
      <preview-list :list="selectedPages" />
    </div> 
  </div>
</template>
<script>

import close_icon from '@/components/svgs/Close.vue';
import { handleAccess, handleRequest, translate } from '@/utils.vue';
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'


import { BaseTree, Draggable } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'



export default
  {
    components: {
      Draggable  ,
      VueDraggable,
      close_icon
    },
    emits: ['close'],
    setup(props, {emit}) {

      const tree = ref(false);
      const loader = ref(false);
      const allPages = ref([])
      

      const selectedPages = ref([]);
      allPages.value = props.pages ??  [];
      
      const handleSelected = () => {
        let array = props.active_links;
        for (let i = 0; i < array.length; i++) {
          const element = array[i].page;
          element.type = array[i].type;
          if (element.type == props.item.type)
          {
            selectedPages.value[selectedPages.value.length] = element;
          }
        }
      }
      
      handleSelected();

      const onUpdate = () => {
        saveItem();
      }
      const onAdd = () => {
        saveItem();
        console.log('add')
      }
      const change = (stat) => {
        console.log(stat)
      }
      const remove = (stat) => {
        tree.value.remove(
          stat
        )
      }
      const back = () => {
        emit('close');
      }

      
      const saveItem = () => {
        console.log(selectedPages.value)
          loader.value = true;
          var params = new URLSearchParams();
          params.append('params[type]', props.item.type )
          params.append('params[items]', JSON.stringify(selectedPages.value.filter(e=> e != null)) )
          params.append('type', 'Menu.update' )
          handleRequest(params, '/api/update').then(response => {
              loader.value = false;
              handleAccess(response)
          })
      }
      
      const treeData = ref(selectedPages.value);
      
      const addMenu = (page) => {

          tree.value.add(
            page
          )
      }

      return {
        change,
        tree,
        addMenu,
        treeData,
        loader,
        allPages,
        selectedPages,
        back,
        translate,
        saveItem,
        onUpdate,
        onAdd,
        remove
      };
    },
    props: [
      'path',
      'langs',
      'setting',
      'conf',
      'auth',
      'pages',
      'categories',
      'active_links',
      'item',
    ],
  };
</script>
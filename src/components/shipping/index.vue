<template>
    <div class=" w-full">
        <data_table_page ref="data_table" :conf="conf" :path="path" :setting="setting" :auth="auth" object_name="Shipping" object_key="shipping_id" ></data_table_page>
    </div>
</template>
<script>


export default 
{
    components: {
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
<template>
    <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <div class="card-header">
            <div class="card-title">
                <h2 v-text="translate('Invoices')"></h2>
            </div>
        </div>
        <div class="card-body pt-2" v-if="invoices">
            <table id="kt_customer_details_invoices_table_1"
                class="table align-middle table-row-dashed fs-6 fw-bold gs-0 gy-4 p-0 m-0">
                <thead class="border-bottom border-gray-200 fs-7 text-uppercase fw-bold">
                    <tr class="text-start text-gray-500">
                        <th class="min-w-100px" v-text="translate('Payment method')"></th>
                        <th class="min-w-100px" v-text="translate('Code')"></th>
                        <th class="min-w-100px" v-text="translate('Amount')"></th>
                        <th class="min-w-100px" v-text="translate('Status')"></th>
                        <th class="min-w-125px" v-text="translate('Date')"></th>
                        <th class="w-100px" v-text="translate('Plan')"></th>
                    </tr>
                </thead>
                <tbody class="fs-6 fw-semibold text-gray-600">
                    <tr v-for="invoice in invoices">
                        <td><a href="#" class="text-gray-600 text-hover-primary" v-text="invoice.payment_method"></a></td>
                        <td class="text-success" v-text="currency.symbol + '' + invoice.total_amount "></td>
                        <td><a href="#" class="text-gray-600 text-hover-primary" v-text="invoice.code"></a></td>
                        <td><span class="badge badge-light-warning" v-text="invoice.status"></span></td>
                        <td v-text="invoice.date"></td>
                        <td v-text="invoice.item && invoice.item.item ? invoice.item.item.name : ''"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<script>

import { ref } from 'vue';
import { translate } from '@/utils.vue';

export default {

    components: {
    },
    setup(props) {

        const activeItem = ref({});

        activeItem.value = props.item;

        return {
            activeItem,
            translate,
        };
    },

    props: [
        'path',
        'langs',
        'setting',
        'system_setting',
        
        'conf',
        'auth',
        'item',
        'invoices',
        'currency'
    ]
};
</script>
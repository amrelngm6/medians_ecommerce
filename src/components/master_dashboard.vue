<template>
    <div class="w-full overflow-auto" >

        <div class="top-0 py-2 w-full px-4 bg-gray-50 mt-0 sticky rounded" style="z-index:9">
            <div class="w-full flex gap-6">
                <h3 class="text-base lg:text-lg whitespace-nowrap" v-text="translate('Dashboard Reports')"></h3> 
                
                <div class="w-full">
                    <vue-tailwind-datepicker 
                        class="text-lg"
                        :formatter="formatter"
                        @update:model-value="handleSelectedDate($event)"
                        :separator="' - '+translate('To')+' - '"
                        v-model="dateValue" />
                </div>
            </div>
        </div>

        <div class="block w-full overflow-x-auto py-2" v-if="content">
            <div class="w-full overflow-y-auto overflow-x-hidden px-2 mt-6" >
                <div class="w-full gap-6 flex ">
                    <div class="card card-flush h-md-50 mb-5 mb-xl-10 w-full">
                        <div class="card-header pt-5">
                            <div class="card-title d-flex flex-column">   
                                <div class="d-flex align-items-center">
                                    <span class="fs-4 fw-semibold text-gray-500 me-1 align-self-start" v-text="currency.symbol"></span>
                                    <span class="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2" v-text="Number(content.total_invoices_amount).toFixed(2)"></span>
                                </div>
                                <span class="text-gray-500 pt-1 fw-semibold fs-6" v-text="translate('Total invoices amount')"></span>
                            </div>
                        </div>

                        <div class="px-4 pt-2 pb-4 d-flex align-items-center">
                            <div class="d-flex flex-center me-5 pt-2"></div>
                            <div class="d-flex flex-column content-justify-center w-100">
                                <div class="d-flex gap-4 fs-6 fw-semibold align-items-center" v-for="invoice in content.payment_methods_invoices_amount">
                                    <div class=" rounded-2  my-3"><img class="w-10 h-10" :src="'/uploads/img/payment_methods/'+invoice.payment_method.toLowerCase()+'.png'" /></div>
                                    <div class="text-gray-500 flex-grow-1 me-4" v-text="invoice.payment_method"></div>
                                    <div class="fw-bolder text-gray-700 text-xxl-end" v-text="currency.symbol+''+Number(invoice.value).toFixed(2)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-column h-100 w-full">
                        <div class="w-full flex gap-4">
                            <div class="mb-7 w-full">
                                <div class="d-flex flex-stack mb-6">
                                    <div class="flex-shrink-0 me-5">
                                        <span class="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1" v-text="translate('Welcome')"></span>
                                        <span class="text-gray-800 fs-1 fw-bold" v-text="auth.name"></span>
                                        <span class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7" v-text="translate('Active')"></span>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center flex-wrap d-grid gap-2">
                                    <div class="d-flex align-items-center me-5 me-xl-13">
                                        <img :src="system_setting['logo'] ?? '/uploads/images/default_logo.png'" class="h-20" alt="">                                                    
                                    </div>                    
                                </div>
                            </div>
                            <img :src="'/uploads/img/dashboard-placeholder.svg'" />

                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                        <div class="relative overflow-hidden">
                            <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark pb-30" text_class="fs-4 text-white" value_class="text-white" :title="translate('Orders')" :value="content.invoices_count"></dashboard_card_white>
                            <line_charts  class="absolute bottom-0 w-full mb-8"  v-if="content.orders_charts" type="bar" :key="content" :data="getChartData(content.orders_charts, 'label', 'total_amount')" />
                        </div>
                        
                        <div class="relative overflow-hidden">
                            <dashboard_card_white  icon="/uploads/img/booking-paid.png" classes="bg-info pb-30" text_class="fs-4 text-white" value_class="text-white"  :title="translate('New Products')" :value="content.products_count"></dashboard_card_white>
                            <line_charts class="absolute bottom-0 w-full mb-8"  v-if="content.orders_charts" type="bar" :key="content" :data="getChartData(content.products_charts, 'label', 'y')" />
                        </div>
                        
                        <div class="relative overflow-hidden">
                            <dashboard_card_white  icon="/uploads/img/booking_income.png" classes="bg-success pb-30"  text_class="fs-4 text-white" value_class="text-white"  :title="translate('Newsletter Subscriber')" :value="content.subscribers_count"></dashboard_card_white>
                            <line_charts  class="absolute bottom-0 w-full mb-8"  v-if="content.subscribers_charts" type="bar" :key="content" :data="getChartData(content.subscribers_charts, 'label', 'y')" />
                        </div>
                        
                        <div class="relative overflow-hidden">
                            <dashboard_card_white  icon="/uploads/img/products_icome.png" classes="bg-danger pb-30"  text_class="fs-4 text-white" value_class="text-white"  :title="translate('Total Visits')" :value="content.visits_count"></dashboard_card_white>
                            <line_charts  class="absolute bottom-0 w-full mb-8"  v-if="content.orders_charts" type="bar" :key="content" :data="getChartData(content.visits_charts, 'date', 'y')" />
                        </div>
                    </div>
                </div>
                
                <div class="w-full lg:flex gap gap-6 pb-6">
                    <div class="card mb-0 min-w-350px">
                        <div class="w-full p-4">
                            <div class="w-full flex gap-2 pt-4">
                                <h4 class="w-full ml-4" v-text="translate('Top products')"></h4>
                            </div>
                            <p class="text-gray-500 px-4 " v-text="translate('top products with high orders')"></p>
                        </div>
                        <div class="w-full px-8">
                            <div class="w-full" v-if="content">   
                                <div class="w-full ">       
                                    <div class="table-responsive">
                                        <table class="table table-row-dashed align-middle gs-0 gy-4 my-0">
                                            <thead>
                                                <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">                                    
                                                    <th class="ps-0 w-50px" v-text="translate('Item')"></th>
                                                    <th class=""></th>
                                                    <th class="text-end min-w-50px" v-text="translate('QTY')"></th>
                                                    <th class="pe-0 text-end min-w-50px" v-text="translate('Total Price')"></th>
                                                </tr>
                                            </thead>
                                            <!--end::Table head-->

                                            <!--begin::Table body-->
                                            <tbody>
                                                <tr v-for="orderItem in content.latest_order_items">
                                                    <td>                                             
                                                        <img v-if="orderItem && orderItem.item" :src="orderItem.item.picture" class="w-50px ms-n1" alt="">                                                
                                                    </td>
                                                    <td class="ps-0">
                                                        <span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6 text-start pe-0" v-if="orderItem && orderItem.item && orderItem.item.lang_content" v-text="orderItem.item.lang_content.title"></span>
                                                        <span class="text-gray-500 fw-semibold fs-7 d-block text-start ps-0" v-text="translate(orderItem.status)"></span>
                                                    </td>
                                                    <td>                                            
                                                        <span class="text-gray-800 fw-bold d-block fs-6 ps-0 text-end" v-text="orderItem.quantity"></span>
                                                    </td>
                                                    <td class="text-end pe-0">
                                                        <span class="text-gray-800 fw-bold d-block fs-6" v-text="orderItem.total_amount"></span>
                                                    </td>
                                                </tr>                                     
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card w-full lg:mb-0">
                        <div class="card card-flush h-xl-100  w-full">
                            <div class="card-header pt-7">
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="card-label fw-bold text-gray-800" v-text="translate('Product Orders')"></span>
                                    <span class="text-gray-500 mt-1 fw-semibold fs-6" v-text="translate('Latest orders from customers')"></span>
                                </h3>
                                <div class="card-toolbar">
                                    <div class="d-flex flex-stack flex-wrap gap-4">
                                        <div class="d-flex align-items-center fw-bold">
                                            <div class="text-gray-500 fs-7 me-2" v-text="translate('Status')"></div>
                                            <select v-model="orderStatus" :required="true" class="form-select form-select-transparent text-gray-900 fs-7 lh-1 fw-bold py-0 ps-3 w-auto"
                                                data-control="select2" data-hide-search="true" data-dropdown-css-class="w-150px"
                                                data-placeholder="Select an option" data-kt-table-widget-4="filter_status">
                                                <option value="0" v-text="translate('Show All')"></option>
                                                <option value="new" v-text="translate('New')"></option>
                                                <option value="completed" v-text="translate('Completed')"></option>
                                                <option value="cancelled" v-text="translate('Cancelled')"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body pt-8">
                                <table class="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
                                    <thead>
                                        <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                            <th class="min-w-100px" v-text="translate('Order ID')"></th>
                                            <th class="text-end min-w-100px" v-text="translate('Date')"></th>
                                            <th class="text-end min-w-125px" v-text="translate('Customer')"></th>
                                            <th class="text-end min-w-125px" v-text="translate('Total')"></th>
                                            <th class="text-end min-w-125px" v-text="translate('Status')"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="fw-bold text-gray-600" v-if="content.latest_orders">
                                        
                                        <tr v-for="order in content.latest_orders.map(e=> (orderStatus == 0 || e.status == orderStatus) ? e : null).filter(e => e)" >
                                            <td>
                                                <span v-if="order" class="text-gray-800 text-hover-primary" v-text="'#'+order.order_id"></span>
                                            </td>
                                            
                                            <td class="text-end" v-text="order ? order.date : ''"></td>
                                            
                                            <td class="text-end">
                                                <span class="text-gray-600 text-hover-primary" v-if="order && order.customer" v-text="order.customer.name"></span>
                                            </td>
                                            
                                            <td class="text-end" v-text="order ? order.total_amount : ''"> </td>
                                            
                                            <td class="text-end">
                                                <span v-if="order" v-text="translate(order.status)" :class="orderStatusClass(order.status)" class="badge py-3 px-4 fs-7 "></span>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="w-full py-10">
                    <h4 class="text-base lg:text-lg " v-text="translate('Orders vs Paid Invoices charts')"></h4> 
                    <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="content.orders_charts">
                        <dashboard_pie_chart v-if="content.orders_charts" type="bar"  :key="content" :options="getMixChartData(content.orders_charts, content.invoices_charts)" />
                    </div>
                </div>

                <div class="w-full lg:flex gap gap-6 pb-6">
                    <div class="card mb-0 w-full lg:w-1/3">
                        
                        <div class="w-full p-4">
                            <div class="w-full flex gap-2">
                                <h4 class="w-full ml-4" v-text="translate('Pages charts')"></h4>
                            </div>
                            <p class="text-gray-500 px-4 mb-6" v-text="translate('top pages with high views')"></p>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full" v-if="pie_options">
                                <dashboard_pie_chart v-if="pie_options" type="pie"  :key="pie_options" :options="getPieChartData(content.top_visits, 'times')" />
                            </div>
                        </div>
                    </div>
                    <div class="card w-full lg:w-1/3 lg:mb-0">
                        
                        <div class="w-full p-4">
                            <div class="w-full flex ">
                                <h4 class="w-full ml-4" v-text="translate('Top pages')"></h4>
                            </div>
                            <p class="text-gray-500 px-4 mb-2" v-text="translate('Top pages by views')"></p>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full ">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('Type')"></th>
                                                <th v-text="translate('Title')"></th>
                                                <th v-text="translate('Views')"></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="content.top_visits"  :key="content.top_visits">
                                            <tr :key="index" v-for="(item, index) in content.top_visits"  >
                                                <td v-text="item.class"></td>
                                                <td v-text="item && item.item && item.item.title ? item.item.title : item.class"></td>
                                                <td v-text="item.times"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card w-full lg:w-1/3 lg:mb-0">
                        
                        <div class="w-full p-4">
                            <div class="w-full flex ">
                                <h4 class="w-full ml-4" v-text="translate('Latest pages')"></h4>
                            </div>
                            <p class="text-gray-500 px-4 mb-2" v-text="translate('Latest viewed pages')"></p>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('Type')"></th>
                                                <th v-text="translate('Title')"></th>
                                                <th v-text="translate('Views')"></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="content.latest_visits"  :key="content.latest_visits">
                                            <tr :key="index" v-for="(item, index) in content.latest_visits"  >
                                                <td v-text="item.class"></td>
                                                <td v-text="item && item.item && item.item.title ? item.item.title : item.class"></td>
                                                <td v-text="item.times"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card  w-full  no-mobile">
                    <div class="w-full flex p-4">
                        <h4 class="w-full " v-text="translate('Contact forms')"></h4>
                        <a href="/admin/contact_bookings" class="w-20" v-text="translate('View all')"></a>
                    </div>
                    <div class="card-body w-full">
                        <div class="w-full">
                            <div class="table-responsive w-full">
                                <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                    <thead>
                                        <tr>
                                            <th v-text="translate('Name')"></th>
                                            <th v-text="translate('Mobile')"></th>
                                            <th v-text="translate('Email')"></th>
                                            <th v-text="translate('Message')"></th>
                                            <th v-text="translate('Type')"></th>
                                            <th v-text="translate('date')"></th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr :key="index" v-for="(booking, index) in content.latest_bookings" >
                                            <td v-text="booking.field.name ?? ''"></td>
                                            <td v-text="(booking.field.mobile_key ?? '') + (booking.field.mobile ?? '')"></td>
                                            <td v-text="booking.field.email ?? ''"></td>
                                            <td v-text="booking.field.message ?? ''"></td>
                                            <td v-text="booking.class ?? ''"></td>
                                            <td v-text="dateTimeFormat(booking.created_at)"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Timeline :resources="projects" :events="tasks" /> -->


        

        
    </div>
</template>
<script>
import {ref} from 'vue';
import moment from 'moment';
import dashboard_card from '@/components/includes/dashboard_card.vue';
import dashboard_chart from '@/components/includes/dashboard_chart.vue';
import dashboard_pie_chart from '@/components/includes/dashboard_pie_chart.vue';
import dashboard_card_white from '@/components/includes/dashboard_card_white.vue';
import dashboard_center_squares from '@/components/includes/dashboard_center_squares.vue';
import clean_charts from '@/components/includes/clean_charts.vue';
import line_charts from '@/components/includes/line_charts.vue';
import {translate, handleGetRequest, formatDateTime, formatCustomTime} from '@/utils.vue';

import { AgChartsVue } from 'ag-charts-vue3';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

export default 
{
    components:{
        line_charts,
        clean_charts,
        dashboard_center_squares,
        dashboard_card_white,
        dashboard_card,
        dashboard_chart,
        dashboard_pie_chart,
        AgChartsVue,
        VueTailwindDatepicker,
        // MapChart,
    },
    name:'categories',
    setup(props) {
        
        const invoicesDataset = ref();
        const orderStatus = ref('0');

        const url =  ref(props.path + '?load=json');

        const line_options = ref();
        const merge_line_options = ref();
        const pie_options = ref();

        const content = ref({});

        const activeDate = ref();
        const projects = ref( [] );

        const events = ref( []);
        
        const load = (path) =>
        {
            handleGetRequest( path ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response)); 
                setCharts(JSON.parse(JSON.stringify(response)))
            });
        }

    
        /**
         * Switch date filters
         * 
         */
        const switchDate = (start) =>
        {
            let filters = '&'
            filters += 'start_date=' + start 
            filters += '&end_date='
            filters += (start == 'yesterday') ? 'yesterday' : 'today';

            // Update active date filters
            activeDate.value = start;

            // Load new data
            load(url.value + filters); 
        }

        switchDate('-30days');

        /**
         * Date Time format 
         */
         const dateTimeFormat = (date) =>
        {
            return moment(date).format('YYYY-MM-DD HH:mm a');
        }

        /**
         * Date Time format 
         */
         const dateFormat = (date) =>
        {
            return moment(date).format('YYYY-MM-DD');
        }

        const colors = ref(['rgba(114,57,234, 1)','rgba(23,198,83, 1)','rgba(248,40,90, 1)','rgba(246,192,0, 1)','rgba(30,33,41, 1)']);        

        const optionsbar = ref();
        
        
        const bookingCharts = ref([]);
        /**
         * Set charts based on their values type
         */ 
        const setCharts = async (data) => {

            if (data)
            {

                try {

                    // invoicesDataset.value = {
                    //     labels:  data.invoices_charts.map(e => e.label),
                    //     datasets: [
                    //         {
                    //             label: '',
                    //             opacity: .5,
                    //             backgroundColor: 'rgba(233,94,210, .5)',
                    //             borderRadius: 50,
                    //             data: data.invoices_charts.map(e => e.total_amount),
                    //         },
                    //     ],
                    // };

                    
                    
                    // // Line charts for sales in last days 
                    // pie_options.value  =  {
                    //     labels: content.value.top_visits.map((e) => (e.item && e.item.lang_content) ? e.item.lang_content.title : e.class),
                    //     datasets: [
                    //     {
                    //         backgroundColor: content.value.top_visits.map((e, i) => colors.value[i]),
                    //         data: content.value.top_visits.map((e, i) => e.times),
                    //     },
                    //     ],
                    // };
                } catch (e) {
                    console.log(e)
                }

            };

        }


        const getMixChartData = (orders, invoices) => {
            
            // Line charts for sales in last days 
            return  {
                labels: orders.map((e) => e.label),
                datasets: [
                {
                    label: translate('Orders'),
                    backgroundColor: orders.map((e, i) => colors.value[2]),
                    data: orders.map((e, i) => e.total_amount),
                },
                {
                    label: translate('Paid Invoices'),
                    backgroundColor: invoices.map((e, i) => colors.value[3]),
                    data: invoices.map((e, i) => e.total_amount),
                },
                ],
            };
        }


        const getChartData = (data, k='label', v='y', color='rgba(255,255,255, .5)') => 
        {
            return {
                labels:  data.map(e => e[k]),
                datasets: [
                    {
                        label: '',
                        backgroundColor: color,
                        borderColor: color,
                        opacity: .5,
                        borderRadius: 50,
                        data: data.map(e => e[v]),
                    },
                ],
            }
        }

        const getPieChartData = (data, v='y') => 
        {
            return {
                    labels: data.map((e) => (e.item && e.item.lang_content) ? e.item.lang_content.title : e.class),
                    datasets: [
                    {
                        backgroundColor: data.map((e, i) => colors.value[i]),
                        data: data.map((e, i) => e[v]),
                    },
                    ],
                };
        }


        const chartItem = (value, title, color ) => {
            return {
                label: title,
                backgroundColor: color,
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                data: value
            };
        }

        const dateValue = ref({
            startDate: "",
            endDate: "",
        });

        const formatter = ref({
            date: "YYYY-MM-DD",
            month: "MMM",
        });

        const handleSelectedDate = (event) => {
            handleGetRequest( props.conf.url+props.path+'?start_date='+event.startDate+'&end_date='+event.endDate+'&load=json' ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response))
                setCharts(content);
            });
        }

        const orderStatusClass = (status) => {
            if (status == 'new') {
                return 'badge-light-warning'
            }
            if (status == 'completed') {
                return 'badge-light-primary'
            }
            if (status == 'cancelled') {
                return 'badge-light-danger'
            }
        };

        
        return {
            getMixChartData,
            colors,
            getPieChartData,
            orderStatusClass,
            orderStatus,
            getChartData,
            invoicesDataset,
            projects,
            events,
            bookingCharts,
            handleSelectedDate,
            switchDate,
            optionsbar,
            translate,
            line_options,
            merge_line_options,
            pie_options,
            content,
            activeDate,
            dateTimeFormat,
            dateFormat,
            dateValue,
            formatter,
            
        }
    },
    props: [
        'langs',
        'setting',
        'system_setting',
        'conf',
        'path',
        'auth',
        'currency'
    ]
};
</script>
<style lang="css">
    .rtl #side-cart-container
    {
        right: auto;
        left:0;
    }
    canvas {
        max-width: 100%;
    }
</style>
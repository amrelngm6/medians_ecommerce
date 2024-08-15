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
        <dashboard_chart /> 
        <div class="block w-full overflow-x-auto py-2">
            <div v-if="lang &&  setting" class="w-full overflow-y-auto overflow-x-hidden px-2 mt-6" >
                <div class="w-full gap-6 flex ">
                    <div class="card card-flush h-md-50 mb-5 mb-xl-10 w-full">
                        <div class="card-header pt-5">
                            <div class="card-title d-flex flex-column">   
                                <div class="d-flex align-items-center">
                                    <span class="fs-4 fw-semibold text-gray-500 me-1 align-self-start" v-text="currency.symbol"></span>
                                    <span class="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2" v-text="content.total_invoices_amount"></span>
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
                                    <div class="fw-bolder text-gray-700 text-xxl-end" v-text="currency.symbol+''+invoice.value"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-column h-100 w-full">
                        <div class="w-full flex gap-4">
                            
                        <!--begin::Header-->               
                        <div class="mb-7 w-full">
                            <!--begin::Headin-->               
                            <div class="d-flex flex-stack mb-6">
                                <!--begin::Title-->               
                                <div class="flex-shrink-0 me-5">
                                    <span class="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1" v-text="translate('Welcome')"></span>

                                    <span class="text-gray-800 fs-1 fw-bold" v-text="auth.name"></span>
                                    <span class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7" v-text="translate('Active')"></span>

                                </div>
                                <!--end::Title-->

                            </div>
                            <!--end::Heading-->

                            <!--begin::Items-->               
                            <div class="d-flex align-items-center flex-wrap d-grid gap-2">
                                <!--begin::Item-->                  
                                <div class="d-flex align-items-center me-5 me-xl-13">
                                    <!--begin::Symbol-->
                                    <div class="symbol symbol-30px symbol-circle me-3">                                                   
                                        <img :src="system_setting.logo ?? '/uploads/images/default_logo.png'" class="" alt="">                                                    
                                    </div>
                                    <!--end::Symbol--> 
                                </div>                    
                                <!--end::Item-->  
                            </div>
                        </div>
                        <img :src="'/uploads/img/2.svg'">

                        </div>
                        
                    </div>
                </div>
                <div class="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark" text_class="fs-4 text-white" value_class="text-white" :title="translate('Invoices')" :value="content.invoices_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark" text_class="fs-4 text-white" value_class="text-white" :title="translate('Invoices')" :value="content.invoices_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark" text_class="fs-4 text-white" value_class="text-white" :title="translate('Invoices')" :value="content.invoices_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark" text_class="fs-4 text-white" value_class="text-white" :title="translate('Invoices')" :value="content.invoices_count"></dashboard_card_white>
                    </div>
                    
                    <div class="w-full gap-4 lg:flex">
                        <div class="w-full">
                            <h4 class="text-base lg:text-lg " v-text="translate('Routes Trips')"></h4> 
                            <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="content.trips_charts">
                                <dashboard_chart v-if="routes_trips_options" :key="routes_trips_options" :options="routes_trips_options" /> 
                            </div>
                        </div>
                        <div class="w-full">
                            <h4 class="text-base lg:text-lg " v-text="translate('Taxi Trips')"></h4> 
                            <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="taxi_trips_options">
                                <dashboard_chart v-if="taxi_trips_options" :key="taxi_trips_options" :options="taxi_trips_options" /> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-gradient-danger fw-" :title="translate('Route locations')" :value="content.route_locations_count ?? '0'"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking-paid.png" classes="bg-gradient-info" :title="translate('total route trips')" :value="content.total_trips_count ?? '0'"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking_income.png" classes="bg-gradient-success" :title="translate('Taxi trips')" :value="content.taxi_trips_count ?? '0'"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/products_icome.png" classes="bg-gradient-warning" :title="translate('Help messages')" :value="content.help_messages_count ?? '0'"></dashboard_card_white>
                    </div>

                </div>
                
                <div class="w-full lg:flex gap gap-6 pb-6">
                    <div class="card mb-0 w-1/3">
                        <h4 class="p-4 ml-4" v-text="translate('Top drivers')"></h4>
                        <p class="text-sm text-gray-500 px-4 mb-6" v-text="translate('top_drivers_who_have_most_trips')"></p>
                        <div class="card-body w-full">
                            <div class="w-full" v-if="pie_options">
                                <dashboard_pie_chart v-if="pie_options" type="pie"  :key="pie_options" :options="pie_options" />
                            </div>
                        </div>
                    </div>
                    <div class="card w-1/3 lg:w-1/3 lg:mb-0">
                        <h4 class="p-4 ml-4" v-text="translate('New subscriptions')"></h4>
                        <p class="text-sm text-gray-500 px-4 mb-6" v-text="translate('Latest subscriptions request has been sent')"></p>
                        <div class="card-body w-full">
                            <div class="w-full ">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('User')"></th>
                                                <th v-text="translate('subscription')"></th>
                                                <th v-text="translate('status')"></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="content.applicants"  :key="content.applicants">
                                            <tr :key="index" v-for="(applicant, index) in content.applicants"   >
                                                <td v-if="applicant && applicant.model">
                                                    <div class="flex gap-4 w-full">
                                                        <img width="48" height="48" class="h-10 w-10 rounded-full" :src="'/app/image.php?w=50&h=50&src='+(applicant.model.picture ?? '/uploads/images/default_profile.png')" />
                                                        <div class="text-left">
                                                            <p class="m-0" v-text="applicant.model.name"></p>
                                                            <p class="m-0" v-text="applicant.model.mobile"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-if="applicant && applicant.model" v-text="applicant.subscription ? applicant.subscription.name : ''"></td>
                                                <td v-if="applicant && applicant.model" v-text="applicant.status"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card w-1/3 lg:w-1/3 lg:mb-0">
                        <h4 class="p-4 ml-4" v-text="translate('New Driver applicants')"></h4>
                        <p class="text-sm text-gray-500 px-4 mb-6" v-text="translate('Latest drivers request has been sent')"></p>
                        <div class="card-body w-full">
                            <div class="w-full ">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('User')"></th>
                                                <th v-text="translate('status')"></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="content.driver_applicants"  :key="content.driver_applicants">
                                            <tr :key="index" v-for="(applicant, index) in content.driver_applicants"  >
                                                <td v-if="applicant && applicant.driver" > 
                                                    <div class="flex gap-4 w-full" v-if="applicant.driver">
                                                        <img width="48" height="48" class="h-10 w-10 rounded-full" :src="'/app/image.php?w=50&h=50&src='+(applicant.driver.picture ?? '/uploads/images/default_profile.png')" />
                                                        <div class="text-left">
                                                            <p class="m-0" v-text="applicant.driver.name"></p>
                                                            <p class="m-0" v-text="applicant.driver.mobile"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-if="applicant && applicant.driver"  v-text="applicant.status"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:flex gap gap-6 pb-6 ">

                    <div class="card  w-full  no-mobile">
                        <div class="w-full flex p-4">
                            <h4 class="w-full " v-text="translate('Latest help messages')"></h4>
                            <a href="/admin/help_messages" class="w-20" v-text="translate('View all')"></a>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('name')"></th>
                                                <th v-text="translate('message')"></th>
                                                <th v-text="translate('date')"></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr :key="index" v-for="(message, index) in content.latest_help_messages" >
                                                <td>
                                                    <div v-if="message.user" class="flex gap-2">
                                                        <img :src="message.user.picture ?? '/uploads/images/default_profile.png'" width="40" height="40" class="w-10 h-10 rounded" />
                                                        <div>
                                                            <p class="m-0" v-text="message.user.name"></p>
                                                            <span class="text-xs"v-text="message.user.usertype"></span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-red-500" v-text="message.message"></td>
                                                <td v-text="dateTimeFormat(message.created_at)"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card  w-full  no-mobile">
                        <div class="w-full flex p-4">
                            <h4 class="w-full " v-text="translate('Latest Transactions')"></h4>
                            <a href="/admin/transactions" class="w-20" v-text="translate('View all')"></a>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full">
                                <div class="table-responsive w-full">
                                    <table class="w-full table table-striped table-nowrap custom-table mb-0 datatable">
                                        <thead>
                                            <tr>
                                                <th v-text="translate('ID')"></th>
                                                <th v-text="translate('User')"></th>
                                                <th v-text="translate('Amount')"></th>
                                                <th v-text="translate('Invoice')"></th>
                                                <th v-text="translate('date')"></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr :key="index" v-for="(transaction, index) in content.latest_transactions" >
                                                <td v-text="transaction.transaction_id ?? ''"></td>
                                                <td>
                                                    <div v-if="transaction.model" class="flex gap-2">
                                                        <img :src="transaction.model.picture ?? '/uploads/images/default_profile.png'" width="40" height="40" class="w-10 h-10 rounded" />
                                                        <div>
                                                            <p class="m-0" v-text="transaction.model.name"></p>
                                                            <small  v-if="transaction.model" class="text-xs" v-text="transaction.model.usertype"></small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-text="currency.symbol+''+ transaction.amount"></td>
                                                <td v-text="transaction.invoice ? transaction.invoice.code : ''"></td>
                                                <td v-text="dateTimeFormat(transaction.created_at)"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import {translate, handleGetRequest} from '@/utils.vue';

import { AgChartsVue } from 'ag-charts-vue3';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

export default 
{
    components:{
        dashboard_center_squares,
        dashboard_card_white,
        dashboard_card,
        dashboard_chart,
        AgChartsVue,
        dashboard_pie_chart,
        VueTailwindDatepicker
    },
    name:'categories',
    setup(props) {

        const url =  ref(props.path + '?load=json');

        const pie_options = ref();
        const column_options = ref();

        const content = ref({});

        const activeDate = ref();

        const load = (path) =>
        {
            handleGetRequest( path ).then(response=> {
                content.value = JSON.parse(JSON.stringify(response)); 
                // setCharts(response)
            });
        }

    
        /**
         * Switch date filters
         * 
         */
        const switchDate = (start) =>
        {
            let filters = '&'
            filters += 'start=' + start 
            filters += '&end='
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


        const optionsbar = ref();
        
        const routes_trips_options = ref();
        const taxi_trips_options = ref();
        
        /**
         * Set charts based on their values type
         */ 
        const setCharts = (data) => {

            const colors = ref(['#7239ea','#f8285a','#17c653','#f1ed5c','#1e2129']);        

            routes_trips_options.value  =  {
                labels: content.value.trips_charts.map(e => e ? e.label : null),
                datasets: [
                    chartItem(content.value.trips_charts.map(e => e ? e.y : null), translate('Routes Trips'), colors.value[0]),
                ]
            };


            taxi_trips_options.value  =  {
                labels: content.value.taxi_trips_charts.map(e => e ? e.label : null),
                datasets: [
                    chartItem(content.value.taxi_trips_charts.map(e => e ? e.y : null), translate('Taxi Trips'), colors.value[1]),
                ]
            };

            
            // Line charts for sales in last days 
            pie_options.value  =  {
                labels: content.value.top_drivers.map((e) => e.first_name),
                datasets: [
                {
                    backgroundColor: content.value.top_drivers.map((e, i) => colors.value[i]),
                    data: content.value.top_drivers.map((e, i) => e.y),
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
                // setCharts(content);
            });
        }
        
        return {
            handleSelectedDate,
            switchDate,
            optionsbar,
            translate,
            routes_trips_options,
            taxi_trips_options,
            pie_options,
            content,
            activeDate,
            dateTimeFormat,
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
        'currency',
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
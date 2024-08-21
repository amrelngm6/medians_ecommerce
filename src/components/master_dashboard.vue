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

        <div class="block w-full overflow-x-auto py-2">
            <div class="w-full overflow-y-auto overflow-x-hidden px-2 mt-6" >
                <div class="w-full gap-6 flex ">
                    <div class="card card-flush h-md-50 mb-5 mb-xl-10 w-full">
                        <div class="card-header pt-5">
                            <div class="card-title d-flex flex-column">   
                                <div class="d-flex align-items-center">
                                    <span class="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2" v-text="content.total_visits"></span>
                                </div>
                                <span class="text-gray-500 pt-1 fw-semibold fs-6" v-text="translate('Total visits')"></span>
                            </div>
                        </div>

                        <div class="px-4 pt-2 pb-4 d-flex align-items-center">
                            <div class="d-flex flex-center me-5 pt-2"></div>
                            <div class="d-flex flex-column content-justify-center w-100">
                                <div class="d-flex gap-4 fs-6 fw-semibold align-items-center" v-for="item in content.top_visits">
                                    <div class="text-gray-500 flex-grow-1 me-4" v-text="item.title"></div>
                                    <div class="fw-bolder text-gray-700 text-xxl-end" v-text="item.views_count"></div>
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
                        <dashboard_card_white  icon="/uploads/img/booking-unpaid.png" classes="bg-dark" text_class="fs-4 text-white" value_class="text-white" :title="translate('Doctors Bookings')" :value="content.doctors_bookings_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking-paid.png" classes="bg-info" text_class="fs-4 text-white" value_class="text-white"  :title="translate('Offers Bookings')" :value="content.offers_bookings_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/booking_income.png" classes="bg-success"  text_class="fs-4 text-white" value_class="text-white"  :title="translate('OnlineConsultation Booking')" :value="content.onlineconsultation_bookings_count"></dashboard_card_white>
                        <dashboard_card_white  icon="/uploads/img/products_icome.png" classes="bg-danger"  text_class="fs-4 text-white" value_class="text-white"  :title="translate('Normal Booking')" :value="content.bookings_count"></dashboard_card_white>
                    </div>
                    
                    <div class="w-full ">
                        <div class="w-full">
                            <h4 class="text-base lg:text-lg " v-text="translate('Visitors by country')"></h4> 
                            <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="content.visits_countries">
                                
                                <MapChart
                                    :countryData="content.visits_countries"
                                    highColor="#0c9ba4"
                                    lowColor="#b4dddf"
                                    countryStrokeColor="#eee"
                                    defaultCountryFillColor="#dbdfe9"
                                    /> 
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="w-full lg:flex gap gap-6 pb-6">
                    <div class="card mb-0 w-full lg:w-1/3">
                        
                        <div class="w-full p-4">
                            <div class="w-full flex gap-2">
                                <h4 class="w-full ml-4" v-text="translate('Pages charts')"></h4>
                            </div>
                            <p class="text-sm text-gray-500 px-4 mb-6" v-text="translate('top pages with high views')"></p>
                        </div>
                        <div class="card-body w-full">
                            <div class="w-full" v-if="pie_options">
                                <dashboard_pie_chart v-if="pie_options" type="pie"  :key="pie_options" :options="pie_options" />
                            </div>
                        </div>
                    </div>
                    <div class="card w-full lg:w-1/3 lg:mb-0">
                        
                        <div class="w-full p-4">
                            <div class="w-full flex ">
                                <h4 class="w-full ml-4" v-text="translate('Top pages')"></h4>
                            </div>
                            <p class="text-sm text-gray-500 px-4 mb-2" v-text="translate('Top pages by views')"></p>
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
                            <p class="text-sm text-gray-500 px-4 mb-2" v-text="translate('Latest viewed pages')"></p>
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
                
                <div class="w-full py-10">
                    <h4 class="text-base lg:text-lg " v-text="translate('Filtered Bookings')"></h4> 
                    <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="content.bookings_charts">
                        <dashboard_pie_chart v-if="merge_line_options" type="bar"  :key="merge_line_options" :options="merge_line_options" />
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
import {translate, handleGetRequest, formatDateTime, formatCustomTime, formatCustomTimeMinute} from '@/utils.vue';
import TimelinePage from "@/components/timeline.vue";
import "@teej/vue-timeline/dist/style.css";

import MapChart from 'vue-map-chart'

import { AgChartsVue } from 'ag-charts-vue3';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

export default 
{
    components:{
        dashboard_center_squares,
        dashboard_card_white,
        dashboard_card,
        dashboard_chart,
        dashboard_pie_chart,
        AgChartsVue,
        VueTailwindDatepicker,
        MapChart,
        TimelinePage
    },
    name:'categories',
    setup(props) {

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


        const optionsbar = ref();
        
        
        const bookingCharts = ref([]);
        /**
         * Set charts based on their values type
         */ 
        const setCharts = async (data) => {

            if (data)
            {
                const colors = ref(['rgba(233,94,210, 1)','rgba(69,46,240, 1)','rgba(240,234,46, 1)','rgba(19,180,173, 1)','rgba(201,61,84, 1)']);        

                bookingCharts.value  =  {
                    labels: content.value.bookings_charts.map(e => e ? e.label : null),
                    datasets: [
                        chartItem(content.value.bookings_charts.map(e => e ? e.y : null), translate('Bookings'), colors[0]),
                    ]
                };
                
                merge_line_options.value  =  {
                    labels: content.value.bookings_charts.map(e => e ? e.label : null),
                    datasets: [
                        chartItem(content.value.bookings_charts.map(e => e.class == 'Booking' ? e.y : 0), translate('Booking'), colors[0]),
                        chartItem(content.value.bookings_charts.map(e => e.class == 'Doctor' ? e.y: 0), translate('Doctor'), colors[1]),
                        chartItem(content.value.bookings_charts.map(e => e.class == 'OnlineConsultation' ? e.y : 0), translate('OnlineConsultation'), colors[2]),
                        chartItem(content.value.bookings_charts.map(e => e.class == 'Contact' ? e.y : 0), translate('Contact Msgs'), colors[3]),
                        chartItem(content.value.bookings_charts.map(e => e.class == 'Offers' ? e.y : 0), translate('Offers'), colors[4]),
                    ]
                };

                
                // Line charts for sales in last days 
                pie_options.value  =  {
                    labels: content.value.top_visits.map((e) => e.item ? e.item.title : e.class),
                    datasets: [
                    {
                        backgroundColor: content.value.top_visits.map((e, i) => colors.value[i]),
                        data: content.value.top_visits.map((e, i) => e.times),
                    },
                    ],
                };

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
        
        return {
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
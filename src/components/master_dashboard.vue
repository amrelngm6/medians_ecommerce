<template>
    <div class="w-full overflow-auto">

        <div class="top-0 py-2 w-full px-4 bg-gray-50 mt-0 sticky rounded" style="z-index:9">
            <div class="w-full flex gap-6">
                <h3 class="text-base lg:text-lg whitespace-nowrap" v-text="translate('Dashboard Reports')"></h3>

                <div class="w-full">
                    <vue-tailwind-datepicker class="text-lg" :formatter="formatter"
                        @update:model-value="handleSelectedDate($event)" :separator="' - ' + translate('To') + ' - '"
                        v-model="dateValue" />
                </div>
            </div>
        </div>

        <div class="block w-full overflow-x-auto py-2" v-if="content">
            <div class="w-full overflow-y-auto overflow-x-hidden px-2 mt-6">
                <div class="w-full gap-6 flex ">
                    <div class="flex gap-10 mb-10 w-full">
                        <div class="card card-flush min-h-100 mb-xl-10">
                            <div class="card-header pt-5">
                                <div class="card-title d-flex flex-column">
                                    <span class="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2"
                                        v-text="content.total_media_views"></span>
                                    <span class="text-gray-500 pt-1 fw-semibold fs-6"
                                        v-text="translate('Media Views at date range')"></span>
                                </div>
                            </div>

                            <div class="card-body d-flex flex-column justify-content-end pe-0">
                                <span class="fs-6 fw-bolder text-gray-800 d-block mb-2"
                                    v-text="translate('Total media views')"></span>
                                <div class="symbol-group symbol-hover flex-nowrap">
                                    <a :href="'/'+media.type+'/'+media.media_id"  @mouseover="media.showTip = true" @mouseleave="media.showTip = false" class="relative symbol symbol-35px symbol-circle" v-for="media in content.top_media">
                                        <img alt="Pic" :src="media.picture">
                                        <tooltip v-if="media.showTip" :key="media.showTip" :title="media.name" ></tooltip></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card card-flush min-h-100 mb-xl-10">
                            <div class="card-header pt-5">
                                <div class="card-title d-flex flex-column">
                                    <span class="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2"
                                        v-text="content.customers_count"></span>
                                    <span class="text-gray-500 pt-1 fw-semibold fs-6"
                                        v-text="translate('Registered customers at date range')"></span>
                                </div>
                            </div>

                            <div class="card-body d-flex flex-column justify-content-end pe-0">
                                <span class="fs-6 fw-bolder text-gray-800 d-block mb-2"
                                    v-text="translate('Registered Customers')"></span>
                                <div class="symbol-group symbol-hover flex-nowrap">
                                    
                                    <a :href="'/artist/'+customer.customer_id" @mouseover="customer.showTip = true" @mouseleave="customer.showTip = false" class="relative symbol symbol-35px symbol-circle" v-for="customer in content.new_customers">
                                        <img alt="Pic" :src="customer.picture">
                                        <tooltip v-if="customer.showTip" :key="customer.showTip" :title="customer.name" ></tooltip></a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="d-flex flex-column h-100 w-full">
                        <div class="w-full flex gap-4">
                            <div class="mb-7 w-full">
                                <div class="d-flex flex-stack mb-6">
                                    <div class="flex-shrink-0 me-5">
                                        <span class="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1"
                                            v-text="translate('Welcome')"></span>
                                        <span class="text-gray-800 fs-1 fw-bold" v-text="auth.name"></span>
                                        <span
                                            class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                                            v-text="translate('Active')"></span>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center flex-wrap d-grid gap-2">
                                    <div class="d-flex align-items-center me-5 me-xl-13">
                                        <img :src="system_setting['logo'] ?? '/uploads/images/default_logo.png'"
                                            class="h-20" alt="">
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
                            <dashboard_card_white icon="/uploads/img/booking-unpaid.png" classes="bg-dark pb-30"
                                text_class="fs-4 text-white" value_class="text-white" :title="translate('Audio')"
                                :value="content.audio_count"></dashboard_card_white>
                            <line_charts class="absolute bottom-0 w-full mb-8" v-if="content.audio_charts" type="bar"
                                :key="content" :data="getChartData(content.audio_charts, 'label', 'y')" />
                        </div>

                        <div class="relative overflow-hidden">
                            <dashboard_card_white icon="/uploads/img/booking-paid.png" classes="bg-info pb-30"
                                text_class="fs-4 text-white" value_class="text-white" :title="translate('Videos')"
                                :value="content.video_count"></dashboard_card_white>
                            <line_charts class="absolute bottom-0 w-full mb-8" v-if="content.video_charts" type="bar"
                                :key="content" :data="getChartData(content.video_charts, 'label', 'y')" />
                        </div>

                        <div class="relative overflow-hidden">
                            <dashboard_card_white icon="/uploads/img/booking_income.png" classes="bg-success pb-30"
                                text_class="fs-4 text-white" value_class="text-white"
                                :title="translate('Newsletter Subscriber')" :value="content.subscribers_count">
                            </dashboard_card_white>
                            <line_charts class="absolute bottom-0 w-full mb-8" v-if="content.subscribers_charts"
                                type="bar" :key="content"
                                :data="getChartData(content.subscribers_charts, 'label', 'y')" />
                        </div>

                        <div class="relative overflow-hidden">
                            <dashboard_card_white icon="/uploads/img/products_icome.png" classes="bg-danger pb-30"
                                text_class="fs-4 text-white" value_class="text-white" :title="translate('Total Visits')"
                                :value="content.visits_count"></dashboard_card_white>
                            <line_charts class="absolute bottom-0 w-full mb-8" v-if="content.orders_charts" type="bar"
                                :key="content" :data="getChartData(content.visits_charts, 'date', 'y')" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:flex gap gap-6 pb-6">


                    <div class="card  w-full card-xl-stretch mb-xl-8"
                        v-for="media in ['audio', 'videos', 'audiobooks']">
                        <div class="card-header align-items-center border-0 mt-4">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="fw-bold text-gray-900" v-text="translate(media + ' items')"></span>
                                <span class="text-muted mt-1 fw-semibold fs-7"
                                    v-text="translate('Latest uploaded ' + media + ' items')"></span>
                            </h3>

                            <ul class="absolute flex-none fs-6 fw-semibold gap-2 mb-8 mt-6 nav nav-custom nav-line-tabs nav-line-tabs-2x nav-tabs px-2 right-0"
                                role="tablist">
                                <li class="nav-item" role="presentation" v-for="type in ['top', 'new']">
                                    <a @click="setMediaTab(type, media)"
                                        :class="content[media + '_tab'] == type ? 'border-blue-600 border-b' : ''"
                                        class="align-items-center d-flex hover:bg-gray-100 pb-4 px-2 text-active-primary"
                                        href="javascript:;">
                                        <span v-text="translate(type)"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body pt-3" v-if="content[media]">
                            <div class="d-flex align-items-sm-center mb-7" v-for="mediaItem in content[media]">
                                <div class="d-flex flex-row-fluid flex-wrap align-items-center gap-2">
                                    <img :src="mediaItem.picture" class="w-10 h-10 rounded-full" />
                                    <div class="w-2/3 flex-grow-1 me-2">
                                        <a :href="'/'+mediaItem.type+'/' + mediaItem.media_id" target="_blank"
                                            class="text-gray-800 fw-bold text-hover-primary fs-6"
                                            v-text="mediaItem.name"></a>
                                        <div class="flex w-full gap-4">
                                            <span class="text-muted fw-semibold d-block pt-1"><vue-feather type="eye"
                                                    class="w-4" /> <span v-text="mediaItem.views_sum_times"></span>
                                            </span>
                                            <span class="text-muted fw-semibold d-block pt-1"><vue-feather
                                                    type="message-square" class="w-4" /> <span
                                                    v-text="mediaItem.comments_count"></span> </span>
                                            <span class="text-muted fw-semibold d-block pt-1"><vue-feather type="heart"
                                                    class="w-4" /> <span v-text="mediaItem.likes_count"></span> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full py-10">
                    <h4 class="text-base lg:text-lg " v-text="translate('Visitors Actions charts')"></h4>
                    <div class="w-full bg-white p-4 mb-4 rounded-lg" v-if="content.visits_charts">
                        <dashboard_pie_chart v-if="content.visits_charts" type="bar" :key="content"
                            :options="getMixChartData(content.visits_charts, content.comments_charts, content.likes_charts)" />
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import { ref } from 'vue';
import moment from 'moment';
import dashboard_card from '@/components/includes/dashboard_card.vue';
import dashboard_chart from '@/components/includes/dashboard_chart.vue';
import dashboard_pie_chart from '@/components/includes/dashboard_pie_chart.vue';
import dashboard_card_white from '@/components/includes/dashboard_card_white.vue';
import dashboard_center_squares from '@/components/includes/dashboard_center_squares.vue';
import clean_charts from '@/components/includes/clean_charts.vue';
import line_charts from '@/components/includes/line_charts.vue';
import { translate, handleGetRequest, formatDateTime, formatCustomTime } from '@/utils.vue';
import tooltip from '@/components/includes/tooltip.vue';

import { AgChartsVue } from 'ag-charts-vue3';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

export default
    {
        components: {
            line_charts,
            clean_charts,
            dashboard_center_squares,
            dashboard_card_white,
            dashboard_card,
            dashboard_chart,
            dashboard_pie_chart,
            AgChartsVue,
            VueTailwindDatepicker,
            tooltip,
            // MapChart,
        },
        name: 'categories',
        setup(props) {

            const invoicesDataset = ref();
            const orderStatus = ref('0');

            const url = ref(props.path + '?load=json');

            const line_options = ref();
            const merge_line_options = ref();
            const pie_options = ref();

            const content = ref({});

            const activeDate = ref();
            const projects = ref([]);

            const events = ref([]);

            const load = (path) => {
                handleGetRequest(path).then(response => {
                    content.value = JSON.parse(JSON.stringify(response));
                    setDataTabs(JSON.parse(JSON.stringify(response)))
                });
            }


            /**
             * Switch date filters
             * 
             */
            const switchDate = (start) => {
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
            const dateTimeFormat = (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm a');
            }

            /**
             * Date Time format 
             */
            const dateFormat = (date) => {
                return moment(date).format('YYYY-MM-DD');
            }

            const colors = ref(['rgba(114,57,234, 1)', 'rgba(23,198,83, 1)', 'rgba(248,40,90, 1)', 'rgba(246,192,0, 1)', 'rgba(30,33,41, 1)']);

            const optionsbar = ref();


            const bookingCharts = ref([]);
            /**
             * Set charts based on their values type
             */
            const setDataTabs = async (data) => {

                if (data) {
                    content.value.videos_tab = 'new'
                    content.value.videos = data.new_videos
                    content.value.audio_tab = 'new'
                    content.value.audio = data.new_audio
                    content.value.audiobooks_tab = 'new'
                    content.value.audiobooks = data.new_audiobooks

                };

            }


            const getMixChartData = (views, comments, likes) => {

                // Line charts for sales in last days 
                return {
                    labels: views.map((e) => e.label),
                    datasets: [
                        {
                            label: translate('Views'),
                            backgroundColor: views.map((e, i) => colors.value[1]),
                            data: views.map((e, i) => e.y),
                        },
                        {
                            label: translate('Comments'),
                            backgroundColor: comments.map((e, i) => colors.value[3]),
                            data: comments.map((e, i) => e.y),
                        },
                        {
                            label: translate('Likes'),
                            backgroundColor: likes.map((e, i) => colors.value[2]),
                            data: likes.map((e, i) => e.y),
                        },
                    ],
                };
            }


            const getChartData = (data, k = 'label', v = 'y', color = 'rgba(255,255,255, .5)') => {
                return {
                    labels: data.map(e => e[k]),
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

            const getPieChartData = (data, v = 'y') => {
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


            const chartItem = (value, title, color) => {
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
                handleGetRequest(props.conf.url + props.path + '?start_date=' + event.startDate + '&end_date=' + event.endDate + '&load=json').then(response => {
                    content.value = JSON.parse(JSON.stringify(response))
                    setDataTabs(content);
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

            const setVideosTab = (type) => {
                content.value.videos = content.value[type + '_videos'];
                content.value.videos_tab = type;
            }

            const setMediaTab = (sortType, mediaType) => {
                content.value[mediaType] = content.value[sortType + '_' + mediaType];
                content.value[mediaType + '_tab'] = sortType;
                console.log(content.value)
            }


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
                setVideosTab,
                setMediaTab,

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
.rtl #side-cart-container {
    right: auto;
    left: 0;
}

canvas {
    max-width: 100%;
}
</style>
const baseUrl = `http://122.4.247.156:3333/select`;
export default {
    props: {
        label: 'name',
        value: 'code'
    },
    column: [{
        label: '省份',
        prop: 'province',
        type: 'select',
        cascader: ['city', 'area'],
        cascaderFirst: true,
        dicUrl: `${baseUrl}/getProvince`,
        dicData: 'PROVINCE'
    }, {
        label: '城市',
        prop: 'city',
        type: 'select',
        dicUrl: `${baseUrl}/getCity/{{key}}`,
        dicData: 'CITY'
    }, {
        label: '地区',
        prop: 'area',
        type: 'select',
        dicUrl: `${baseUrl}/getArea/{{key}}`,
        dicData: 'AREA',
    }]
}
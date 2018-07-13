const baseUrl = `https://avue.2bugs.cn/test/select`;
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
        dicData: 'province'
    }, {
        label: '城市',
        prop: 'city',
        type: 'select',
        dicUrl: `${baseUrl}/getCity/{{key}}`,
        dicData: 'city'
    }, {
        label: '地区',
        prop: 'area',
        type: 'select',
        dicUrl: `${baseUrl}/getArea/{{key}}`,
        dicData: 'area',
    }]
}
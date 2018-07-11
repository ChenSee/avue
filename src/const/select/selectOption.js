const baseUrl = 'http://127.0.0.1';
export default {
    column: [{
        label: '小区',
        prop: 'xiaoqu',
        type: 'select',
        cascader: ['louyu', 'danyuan', 'fangjian', 'renyuan'],
        cascaderFirst: true,
        dicUrl: `${baseUrl}/xiaoqu/{{key}}`,
        dicData: 'xiaoqu'
    }, {
        label: '楼宇',
        prop: 'louyu',
        type: 'select',
        dicUrl: `${baseUrl}/louyu/{{key}}`,
        dicData: 'louyu'
    }, {
        label: '单元',
        prop: 'danyuan',
        type: 'select',
        dicUrl: `${baseUrl}/danyuan/{{key}}`,
        dicData: 'danyuan',
    }, {
        label: '房间',
        prop: 'fangjian',
        type: 'select',
        dicUrl: `${baseUrl}/fangjian/{{key}}`,
        dicData: 'fangjian',
    }, {
        label: '人员',
        prop: 'renyuan',
        type: 'select',
        dicUrl: `${baseUrl}/renyuan/{{key}}`,
        dicData: 'renyuan',
    }]
}
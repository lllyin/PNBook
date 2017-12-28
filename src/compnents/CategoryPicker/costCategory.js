const costCategory = [
    {
        value: 'c01',
        label: '吃',
        children: [
            {
                label: '早餐',
                value: 'c0101',
            }, {
                label: '中餐',
                value: 'c0102',
            }, {
                label: '晚餐',
                value: 'c0103',
            }, {
                label: '零食',
                value: 'c0104',
            }, {
                label: '饮料',
                value: 'c0105',
            }, {
                label: '聚会/聚餐',
                value: 'c0106',
            }, {
                label: '水果',
                value: 'c0107',
            }],
    }, {
        value: 'c02',
        label: '住',
        children: [
            {
                label: '房租',
                value: 'c0201',
                disabled: false,
            }, {
                label: '酒店',
                value: 'c0202',
            }, {
                label: '其它',
                value: 'c0203',
            }],
    },
    {
        value: 'c03',
        label: '行',
        isLeaf: false,
        children: [
            {
                label: '公交车',
                value: 'c0301',
            }, {
                label: '打的',
                value: 'c0302',
            }, {
                label: '火车/汽车',
                value: 'c0303',
            },
        ],
    },
    {
        value: 'c04',
        label: '金融',
        isLeaf: false,
        children: [
            {
                label: '股票',
                value: 'c0401',
            },
            {
                label: '基金',
                value: 'c0402',
            },
        ],
    },
];

module.exports = costCategory;
const costCategory = [
    {
        value: '1',
        label: '吃',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: '早餐',
                value: '2',
            }, {
                label: '中餐',
                value: '3',
            }, {
                label: '晚餐',
                value: '4',
            }, {
                label: '零食',
                value: '5',
            }, {
                label: '饮料',
                value: '6',
            }, {
                label: '聚会/聚餐',
                value: '7',
            }, {
                label: '水果',
                value: '8',
            }],
    }, {
        value: '2',
        label: '住',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: '房租',
                value: '2',
                disabled: false,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: '行',
        isLeaf: false,
        children: [
            {
                label: '交通',
                value: '1',
            },
        ],
    },
    {
        value: '4',
        label: '金融',
        isLeaf: false,
        children: [
            {
                label: '股票',
                value: '1',
            },
            {
                label: '基金',
                value: '2',
            },
        ],
    },
];

module.exports = costCategory;
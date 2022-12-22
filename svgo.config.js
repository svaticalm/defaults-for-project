const fs = require('fs');

module.exports = {

    js2svg: {
        indent: 2, // string with spaces or number of spaces. 4 by default
        pretty: true, // boolean, false by default
    },
    plugins: [
    // enable built-in plugins by name
        'prefixIds',
        {
            name: 'removeAttrs',
            params: {
                attrs: '(stroke|fill|opacity|width|height)',
            },
        },
        {
            name: 'customPluginName',
            type: 'perItem', // 'perItem', 'perItemReverse' or 'full'
            params: {
                optionName: [],
            },
            fn: (ast, params, info) => {
                const name = info.path.split('\\').pop().split('/').pop()
                    .replace('.svg', '');
                if (params.optionName.indexOf(name) === -1) {
                    params.optionName.push(name);
                }

                const jsonContent = `/* eslint-disable */\nlet icons = ${JSON.stringify(params.optionName)}; export default icons;`;

                fs.writeFile('./src/assets/icons.js', jsonContent, 'utf8', (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    return false;
                });
            },
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    {
                        fill: 'currentColor',
                        width: '100%',
                        height: '100%',
                    },
                ],
            },
        },
    ],
};

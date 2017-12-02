// libs/templating.js

let template = 
[
    {
        tagName: 'ezInput',
        render: element => {
            return `
            <div>
                <label><b>${element.innerHTML}</b></label>
                <input 
                    type="text" 
                    id="${element.id}"
                    ${element.getAttribute('data-placeholder') ? `placeholder="${element.getAttribute('data-placeholder')}"` : ''}
                    onkeyup="upIt()"
                    class="ezinput"
                >
            </div>
            `
        },
        CSS: [
            'css/input.css',
        ],
        JS: [
            'js/input.js',
        ]
    },
    {
        tagName: 'ezEmail',
        render: element => {
            return `
            <div>
                <label><b>${element.innerHTML}</b></label>
                <input 
                    type="email" 
                    id="${element.id}"
                    ${element.getAttribute('data-placeholder') ? `placeholder="${element.getAttribute('data-placeholder')}"` : ''}
                >
            </div>
            `
        },
        CSS: [
            'css/input.css'
        ]
    }
];

module.exports = template;
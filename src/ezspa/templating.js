
let template = {};

template.tempDef = [];

template.getCSS = (strHTML) => {
    try {
        let cssData = [];
        // Convert string to HTML Element
        let parser = new DOMParser();
        let HTMLDoc = parser.parseFromString(strHTML, 'text/html');

        template.tempDef.forEach((temp) => {
            // Get from the dogument the tag
            let eles = HTMLDoc.getElementsByTagName(temp.tagName);

            // Convert the HTML contenent to array
            let ele = Array.from(eles);

            if (ele.length > 0) {
                if (temp.CSS && temp.CSS.length > 0) temp.CSS.forEach(css => {
                    if (cssData.indexOf(css) < 0) cssData.push(css)
                })
            }
        })

        return cssData;
    } catch (error) {
        throw error
    }
}

template.getJS = (strHTML) => {
    try {
        let jsData = [];

        // Convert string to HTML Element
        let parser = new DOMParser();
        let HTMLDoc = parser.parseFromString(strHTML, 'text/html');

        template.tempDef.forEach((temp) => {
            // Get from the dogument the tag
            let eles = HTMLDoc.getElementsByTagName(temp.tagName);

            // Convert the HTML contenent to array
            let ele = Array.from(eles);

            if (ele.length > 0) {
                if (temp.JS && temp.JS.length > 0) temp.JS.forEach(script => {
                    if (jsData.indexOf(script) < 0) jsData.push(script)
                })
            }
        })

        return jsData;
    } catch (error) {
        throw error;
    }
}

template.render = (strHTML) => {
    try {
        // Convert string to HTML Element
        let parser = new DOMParser();
        let HTMLDoc = parser.parseFromString(strHTML, 'text/html');
        //console.log(HTMLDoc.body.innerHTML);

        // Iterate through all template definitions
        template.tempDef.forEach((temp) => {
            // Get from the dogument the tag
            let eles = HTMLDoc.getElementsByTagName(temp.tagName);

            // Convert the HTML contenent to array
            let ele = Array.from(eles);

            // Itearate through all elements with tag
            ele.forEach((obj) => {
                // Render the Template
                // if(temp.tagName == 'EzspaTable' ) console.log(obj.outerHTML);
                obj.outerHTML = temp.render(obj);
            })
        })
        // Return the string of the rendred contenent
        return HTMLDoc.documentElement.outerHTML
    } catch (error) {
        throw error
    }
}

module.exports = template;
// This function will be called to init the AddUser view in SPA mode
// All the inputs will be cleared when the view is back
function addInit() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';

    console.log('Yeah Init of the page is ongoing, all add User inputs are cleared ...');
}
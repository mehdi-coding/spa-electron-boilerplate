var x;

(function () {
    x = document.getElementsByClassName('ezinput');
})();

function upIt() {
    x[0].value = x[0].value.toUpperCase();
}
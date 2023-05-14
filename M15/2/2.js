const btn = document.querySelector('.btn');


btn.addEventListener('click', () => {
alert(`Размер экрана: ${window.screen.width}px x ${window.screen.height}px. 
Размер окна браузера без полосы прокрутки: ${document.documentElement.clientWidth}px x ${document.documentElement.clientHeight}px.`)
});

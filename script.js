const dinosaur = document.getElementById('dinosaur');
const spaceKey = '32';
let jump = parseInt(window.getComputedStyle(dinosaur).getPropertyValue('bottom'));

window.addEventListener("keydown", dinosaurJump);

function dinosaurJump(event) {
    if (event.keyCode == spaceKey) {
        dinosaur.style.bottom = (jump + 75) + 'px';
        setTimeout(() => {
            dinosaur.style.bottom = 0;
        }, 1000);
    }
}

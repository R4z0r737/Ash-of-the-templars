console.log('Ash of the Templars - Alpha 1.0 initialized');
let stamina = 100;
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        if (stamina > 0) {
            console.log('Sprinting...');
            stamina -= 10;
        } else {
            console.log('Too tired to sprint.');
        }
    }
});

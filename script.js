console.log("Alpha 1.0.2 – Script running");
let stamina = 100;

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
        if (stamina > 0) {
            console.log("Sprinting... Stamina:", stamina);
            stamina -= 10;
        } else {
            console.log("Too tired to sprint.");
        }
    }
});

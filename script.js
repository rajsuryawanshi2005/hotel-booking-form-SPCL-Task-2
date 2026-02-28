const form = document.getElementById("bookingForm");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const message = document.getElementById("message");

// Restrict past dates
const today = new Date().toISOString().split("T")[0];
checkin.setAttribute("min", today);

checkin.addEventListener("change", () => {
    checkout.setAttribute("min", checkin.value);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (checkin.value >= checkout.value) {
        message.style.color = "red";
        message.textContent = "Check-out date must be after check-in date!";
        return;
    }

    message.style.color = "green";
    message.textContent = "Booking Successful!";
    form.reset();
});

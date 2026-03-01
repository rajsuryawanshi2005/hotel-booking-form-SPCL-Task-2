const form = document.getElementById("bookingForm");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");
const totalPrice = document.getElementById("totalPrice");
const message = document.getElementById("message");
const toggleTheme = document.getElementById("toggleTheme");

// Restrict past dates
const today = new Date().toISOString().split("T")[0];
checkin.setAttribute("min", today);

// Update checkout min date dynamically
checkin.addEventListener("change", () => {
    checkout.value = "";
    checkout.setAttribute("min", checkin.value);
    calculatePrice();
});

checkout.addEventListener("change", calculatePrice);
roomType.addEventListener("change", () => {
    setRoomCapacity();
    calculatePrice();
});

// Set room capacity
function setRoomCapacity() {
    if (roomType.value === "single") guests.max = 1;
    else if (roomType.value === "double") guests.max = 2;
    else if (roomType.value === "suite") guests.max = 4;
    else guests.max = 10;
}

// Price calculation
function calculatePrice() {
    if (!checkin.value || !checkout.value || !roomType.value) {
        totalPrice.value = "";
        return;
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const days = (new Date(checkout.value) - new Date(checkin.value)) / oneDay;

    if (days <= 0) {
        totalPrice.value = "";
        return;
    }

    let pricePerDay = 0;

    if (roomType.value === "single") pricePerDay = 2000;
    if (roomType.value === "double") pricePerDay = 3500;
    if (roomType.value === "suite") pricePerDay = 5000;

    totalPrice.value = "₹ " + (days * pricePerDay);
}

// Form submission validation
form.addEventListener("submit", function (e) {
    e.preventDefault();
    message.textContent = "";

    if (!checkin.value || !checkout.value || !roomType.value || !guests.value) {
        showError("Please fill all required fields.");
        return;
    }

    if (checkin.value >= checkout.value) {
        showError("Check-out date must be after check-in date.");
        return;
    }

    if (guests.value > guests.max) {
        showError("Guest count exceeds room capacity.");
        return;
    }

    alert(`
Booking Details:
Check-in: ${checkin.value}
Check-out: ${checkout.value}
Room Type: ${roomType.value}
Guests: ${guests.value}
Total Price: ${totalPrice.value}
`);

    showSuccess("Booking Successful!");
    form.reset();
    totalPrice.value = "";
});

// Message functions
function showError(msg) {
    message.style.color = "red";
    message.textContent = msg;
}

function showSuccess(msg) {
    message.style.color = "green";
    message.textContent = msg;
}

// Dark mode toggle
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

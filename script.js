const form = document.getElementById("bookingForm");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const nightsSpan = document.getElementById("nights");
const roomSelect = document.getElementById("room");
const priceSpan = document.getElementById("price");
const priceInfo = document.getElementById("priceInfo");
const guestsInput = document.getElementById("guests");
const totalPriceSpan = document.getElementById("totalPrice");
const successMsg = document.getElementById("successMsg");

// Set minimum check-in date to today
const today = new Date().toISOString().split("T")[0];
checkin.setAttribute("min", today);

// Update checkout minimum date dynamically
checkin.addEventListener("change", () => {
    checkout.value = "";
    checkout.setAttribute("min", checkin.value);
});

// Calculate total nights
function calculateNights() {
    if (checkin.value && checkout.value) {
        const start = new Date(checkin.value);
        const end = new Date(checkout.value);
        const diffTime = end - start;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const nights = diffDays > 0 ? diffDays : 0;
        nightsSpan.textContent = nights;
        updateTotalPrice();
        return nights;
    }
    nightsSpan.textContent = 0;
    updateTotalPrice();
    return 0;
}

checkin.addEventListener("change", calculateNights);
checkout.addEventListener("change", calculateNights);
roomSelect.addEventListener("change", () => {
    const price = parseInt(roomSelect.selectedOptions[0].dataset.price || 0, 10);
    priceSpan.textContent = price;
    priceInfo.textContent = price ? `₹${price} per night` : "";
    updateTotalPrice();
});
guestsInput.addEventListener("input", updateTotalPrice);

// helper to recompute total price
function updateTotalPrice() {
    const nights = parseInt(nightsSpan.textContent, 10) || 0;
    const pricePerNight = parseInt(roomSelect.selectedOptions[0]?.dataset.price || 0, 10);
    const guests = parseInt(guestsInput.value, 10) || 1;
    // assume charge is per room per night, multiplied by nights and optionally guests
    const total = pricePerNight * nights * guests;
    totalPriceSpan.textContent = total;
}

// Form submission validation
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = true;
    successMsg.textContent = "";

    const inputs = form.querySelectorAll("input[required], select[required]");
    
    inputs.forEach(input => {
        const error = input.nextElementSibling;
        if (!input.value) {
            error.textContent = "This field is required";
            valid = false;
        } else {
            error.textContent = "";
        }
    });

    // Check date logic
    if (checkin.value && checkout.value) {
        if (checkout.value <= checkin.value) {
            checkout.nextElementSibling.textContent = 
                "Check-out must be after check-in date";
            valid = false;
        }
    }

    if (valid) {
        successMsg.textContent = "Booking Successful!";
        form.reset();
        nightsSpan.textContent = "0";
        priceSpan.textContent = "0";
        totalPriceSpan.textContent = "0";
        priceInfo.textContent = "";
    }
});

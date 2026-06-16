// ===============================
// Ranting Event Hall RSVP Website
// ===============================

// IMPORTANT:
// Tukar nombor WhatsApp bawah ini kepada nombor customer.
// Format: guna kod negara tanpa simbol +.
// Contoh Malaysia: 60123456789
const whatsappNumber = "60123456789";

// RSVP Form
const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const attendance = document.getElementById("attendance").value;
  const pax = document.getElementById("pax").value;
  const session = document.getElementById("session").value;
  const note = document.getElementById("note").value.trim();

  const message =
`Assalamualaikum, saya ingin RSVP untuk Grand Opening Ceremony Ranting Event Hall.

Name: ${name}
Phone: ${phone}
Attendance: ${attendance}
Number of Pax: ${pax}
Preferred Session: ${session}
Note: ${note || "-"}`;

  if (whatsappNumber === "60123456789") {
    alert("Sila tukar nombor WhatsApp dalam file script.js dahulu sebelum share website ini.");
    return;
  }

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
});


// Custom dropdown
const customSelects = document.querySelectorAll("[data-select]");

customSelects.forEach((select) => {
  const trigger = select.querySelector(".select-trigger");
  const triggerText = trigger.querySelector("span:first-child");
  const hiddenInput = select.querySelector("input[type='hidden']");
  const options = select.querySelectorAll(".select-menu button");

  trigger.addEventListener("click", () => {
    customSelects.forEach((otherSelect) => {
      if (otherSelect !== select) {
        otherSelect.classList.remove("open");
        otherSelect.querySelector(".select-trigger").classList.remove("active");
      }
    });

    select.classList.toggle("open");
    trigger.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;

      hiddenInput.value = value;
      triggerText.textContent = value;

      options.forEach((btn) => btn.classList.remove("selected"));
      option.classList.add("selected");

      select.classList.remove("open");
      trigger.classList.remove("active");
    });
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-select]")) {
    customSelects.forEach((select) => {
      select.classList.remove("open");
      select.querySelector(".select-trigger").classList.remove("active");
    });
  }
});
// Full premium scroll reveal animation
const revealElements = document.querySelectorAll(`
  .section-tag,
  h2,
  .intro-text,
  .detail-card,
  .timeline-card,
  .feature-card,
  .rsvp-copy,
  .rsvp-form,
  .rsvp-form label,
  .location-text,
  .button-group,
  footer
`);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  // Bagi delay satu-satu supaya tak keluar serentak
  const delayNumber = (index % 5) + 1;
  element.classList.add(`delay-${delayNumber}`);
});

// Animation khas untuk RSVP section
const rsvpCopy = document.querySelector(".rsvp-copy");
const rsvpFormBox = document.querySelector(".rsvp-form");

if (rsvpCopy) {
  rsvpCopy.classList.remove("reveal");
  rsvpCopy.classList.add("reveal-left");
}

if (rsvpFormBox) {
  rsvpFormBox.classList.remove("reveal");
  rsvpFormBox.classList.add("reveal-right");
}

// Observer untuk detect bila user scroll
const premiumRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

const allRevealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

allRevealItems.forEach((item) => {
  premiumRevealObserver.observe(item);
});
// Premium opening screen + background music
const enterOverlay = document.getElementById("enterOverlay");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

async function startMusic() {
  try {
    await bgMusic.play();
    isPlaying = true;
    musicBtn.textContent = "♫ Pause Music";
  } catch (error) {
    isPlaying = false;
    musicBtn.textContent = "♫ Play Music";
  }
}

enterBtn.addEventListener("click", async function () {
  enterOverlay.classList.add("hide");
  await startMusic();
});

musicBtn.addEventListener("click", async function () {
  if (!isPlaying) {
    await startMusic();
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.textContent = "♫ Play Music";
  }
});
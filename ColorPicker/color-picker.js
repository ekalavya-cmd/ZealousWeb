const picker = document.getElementById("color-picker");
const text = document.getElementById("color-value");

picker.addEventListener("input", (e) => {
  text.textContent = e.target.value;
});

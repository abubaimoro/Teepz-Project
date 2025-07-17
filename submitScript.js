// Handle form submission

document
  .getElementById("community-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("name").value,
      phoneNumber: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      role: document.getElementById("role").value,
      agreedToTerms: document.getElementById("terms").checked,
    };

    try {
      const res = await fetch("https://teepz-backend.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Form submitted successfully.");
      } else {
        alert(result.message || "Form submission failed.");
        console.warn("Server responded with an error:", result);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Error submitting form. Check console for details.");
    }
  });
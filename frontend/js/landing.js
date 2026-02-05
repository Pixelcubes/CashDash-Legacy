document.addEventListener("DOMContentLoaded", () => {
    // Navigation buttons
    const loginBtn = document.querySelector("#loginBtn");
    const signupBtn = document.querySelector("#signupBtn");
    const infoLink1 = document.querySelector("#infoLink1");
    const infoLink2 = document.querySelector("#infoLink2");

    // Add click handlers for navigation
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });

    signupBtn.addEventListener("click", () => {
        window.location.href = "register.html";
    });

    infoLink1.addEventListener("click", () => {
        alert("About CashDash:\n\nA unified financial dashboard to help you manage your personal finances. Track expenses, plan budgets, and gain insights into your spending habits.\n\nStudent project for learning Full Stack Development.");
    });

    infoLink2.addEventListener("click", () => {
        alert("Updates:\n\n✓ User registration system\n✓ Modern UI/UX design\n\n🚧 Coming Soon:\n• Login functionality\n• Budget tracking\n• Expense logging\n• Financial insights");
    });
});

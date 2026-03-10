document.addEventListener("DOMContentLoaded", ()=>{
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    const displayName = sessionStorage.getItem('displayName');
    
    if (!username) {
        // Redirect to login if not logged in
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    // Display welcome message
    const contentDisplay = document.querySelector("#content-display");
    contentDisplay.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif;">
            <h1 style="color: #333; margin-bottom: 20px;">Welcome back, ${displayName || username}!</h1>
            <hr style="margin: 20px 0; border: 1px solid #e0e0e0;">
            
            <div style="margin-top: 30px;">
                <h2 style="color: #555; font-size: 24px; margin-bottom: 15px;">At a Glance</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    Your financial dashboard is currently under construction. 
                </p>
                
                <div style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
                        <h3 style="color: #4CAF50; margin-bottom: 10px;">Coming Soon</h3>
                        <p style="color: #666; font-size: 14px;">Budget Tracking</p>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
                        <h3 style="color: #2196F3; margin-bottom: 10px;">Coming Soon</h3>
                        <p style="color: #666; font-size: 14px;">Expense Logger</p>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
                        <h3 style="color: #FF9800; margin-bottom: 10px;">Coming Soon</h3>
                        <p style="color: #666; font-size: 14px;">Financial Insights</p>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 40px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong style="color: #856404;">Note:</strong>
                <p style="color: #856404; margin-top: 8px; line-height: 1.6;">
                    This is a student project for learning Full Stack Development. 
                    Features are being actively developed.
                </p>
            </div>
            
            <button id="logoutBtn" style="
                margin-top: 30px;
                padding: 12px 30px;
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s;
            " onmouseover="this.style.backgroundColor='#d32f2f'" 
               onmouseout="this.style.backgroundColor='#f44336'">
                Logout
            </button>
        </div>
    `;

    // Add logout functionality
    const logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "index.html";
    });

    // Sidebar functionality
    const sidebar = document.querySelector("#sidebar");
    const sliderHandle = document.querySelector("#sidebar #slider .slider-handle");

    var isSideBarClosed = false;
    
    sliderHandle.addEventListener("click", (clickEvent)=>{
        isSideBarClosed = !isSideBarClosed;
        if (isSideBarClosed) {
            sidebar.style.marginLeft = "calc(-15% + 9px)" 
        } else {
            sidebar.style.marginLeft = 0; 
        }
    });

    // Sidebar tabs functionality
    const homeTab = document.querySelector(".home");
    const loggerTab = document.querySelector(".logger");
    const plannerTab = document.querySelector(".planner");
    const insightsTab = document.querySelector(".insights");

    homeTab.addEventListener("click", () => {
        alert("You're already on the home view!");
    });

    loggerTab.addEventListener("click", () => {
        alert("Expense Logger - Coming Soon!\\n\\nThis feature will allow you to log and track your daily expenses.");
    });

    plannerTab.addEventListener("click", () => {
        alert("Budget Planner - Coming Soon!\\n\\nThis feature will help you plan and manage your monthly budget.");
    });

    insightsTab.addEventListener("click", () => {
        alert("Financial Insights - Coming Soon!\\n\\nGet detailed analytics and insights about your spending habits.");
    });
});
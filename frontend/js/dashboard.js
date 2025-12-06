document.addEventListener("DOMContentLoaded", ()=>{

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
});
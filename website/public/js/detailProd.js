window.onload = () => {
    let imgSmall1 = document.querySelector("#img-small1");
    let imgSmall2 = document.querySelector("#img-small2");
    let imgSmall3 = document.querySelector("#img-small3");
    let img1 = document.querySelector("#img1");
    let img2 = document.querySelector("#img2");
    let img3 = document.querySelector("#img3");

    imgSmall1.addEventListener("click", () => {
        console.log("1");
        img1.classList.replace("d-none", "img-selected");
        img2.classList.replace("img-selected", "d-none");
        img3.classList.replace("img-selected", "d-none");
    });
    imgSmall2.addEventListener("click", () => {
        console.log("2");
        img1.classList.replace("img-selected", "d-none");
        img2.classList.replace("d-none", "img-selected");
        img3.classList.replace("img-selected", "d-none");
    });
    imgSmall3.addEventListener("click", () => {
        console.log("3");
        img1.classList.replace("img-selected", "d-none");
        img2.classList.replace("img-selected", "d-none");
        img3.classList.replace("d-none", "img-selected");
    });

    let glassColorInput = document.querySelector(".glass-color input");
    let borderColorInput = document.querySelector(".border-color input");
    let circlesBC = document.getElementsByClassName("circles-bc");
    let circlesGC = document.getElementsByClassName("circles-gc");

    for (i in circlesGC) {
        let circleGC = circlesGC[i];
        circleGC.onclick = (e) => {
            var selectedGC = document.getElementsByClassName("selected-gc");
            while (selectedGC.length) {
                selectedGC[0].classList.remove("selected-gc");
            }
            circleGC.classList.add("selected-gc");
            glassColorInput.value = circleGC.id.split("-").pop();
        };
    }
    for (i in circlesBC) {
        let circle = circlesBC[i];
        circle.onclick = (e) => {
            var selectedBC = document.getElementsByClassName("selected-bc");
            while (selectedBC.length) {
                selectedBC[0].classList.remove("selected-bc");
            }
            circle.classList.add("selected-bc");
            borderColorInput.value = circle.id.split("-").pop();
        };
    }

    let form = document.querySelector(".form-detail");
    let user = document.querySelector('input[name="user_id"]');
    let amount = document.querySelector('input[name="amount"]');
    form.addEventListener("submit", (e) => {
        if (user.value == "") {
            e.preventDefault();
            alert("You should be logged in before using the cart");
        }
        if (amount.value == "0") {
            e.preventDefault();
            alert("Please pick a valid amount");
        }
        if (glassColorInput == ""){
            e.preventDefault()
            alert("Please pick a color for the Glasses")
        }
        if (borderColorInput == ""){
            e.preventDefault()
            alert("Please pick a color for the Border")
        }
    });
};

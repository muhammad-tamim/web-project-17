const showLoadingSpinner = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");
}
const hideLoadingSpinner = () => {
    document.getElementById("loading-spinner").classList.add("hidden");
}

// toast
const showToast = (text) => {
    const toast = document.getElementById("toast");
    toast.innerText = text;

    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.remove("translate-x-full");
        toast.classList.add("translate-x-0");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("translate-x-0");
        toast.classList.add("translate-x-full");
        toast.classList.add("hidden")
    }, 2000);
};
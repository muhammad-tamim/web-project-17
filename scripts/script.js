const loadAllCategoryButtons = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    displayALlCategoryButtons(data.categories)
}
loadAllCategoryButtons()

const displayALlCategoryButtons = (categories) => {

    const categoryButtonContainer = document.getElementById("category-button-container");

    categories.forEach((category) => {

        const div = document.createElement("div");
        div.classList = "active flex items-center justify-center gap-1 lg:gap-4 px-1 md:px-10 xl:px-20 py-1 md:py-2 lg:py-4 xl:py-6 rounded-2xl cursor-pointer border border-primary/20"
        div.innerHTML = `
    <div>
        <img class="size-5 xl:size-14" src=${category.category_icon}
            alt="Category image">
    </div>
    <h2 class="font-bold lg:text-2xl">${category.category}</h2>
    `
        div.addEventListener("click", () => {

            document.querySelectorAll(".active").forEach((btn) => {
                btn.classList.add("rounded-xl")
                btn.classList.remove("rounded-full", "bg-primary/10")
            })

            div.classList.remove("rounded-xl")
            div.classList.add("rounded-full", "bg-primary/10")
        })


        categoryButtonContainer.appendChild(div);

    });

}



const loadAllPets = async () => {
    showLoadingSpinner()
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    const data = await res.json()
    displayPets(data.pets)
}
loadAllPets()

const displayPets = (pets) => {
    const cardContainer = document.getElementById("card-container");

    pets.forEach((pet) => {
        const div = document.createElement("div");
        div.classList = "rounded-xl border border-primary-content/10 p-5";
        div.innerHTML = `
         <div class="pb-6">
        <img class="rounded-lg w-full h-[160px]" src=${pet.image}
            alt="card pet image">
    </div>
    <div class="space-y-2">
        <h2 class="font-bold text-xl">${pet.pet_name || "Name Not Found"}</h2>
        <div class="flex items-center gap-2">
            <img  src="assets/icons/square.png" alt="square icon">
                <p class="text-primary-content/70">Breed: ${pet.breed || "Name Not Found"}</p>
        </div>
        <div class="flex items-center gap-2">
            <img src="assets/icons/calender.png" alt="square icon">
                <p class="text-primary-content/70">Birth: ${pet.date_of_birth}</p>
        </div>
        <div class="flex items-center gap-2">
            <img src="assets/icons/gender.png" alt="square icon">
                <p class="text-primary-content/70">Gender: ${pet.gender}</p>
        </div>
        <div class="flex items-center gap-2">
            <img src="assets/icons/dollar.png" alt="square icon">
                <p class="text-primary-content/70">Price : ${pet.price}$</p>
        </div>
    </div>
    <hr class="my-4 text-primary-content/10">
        <div class="flex justify-center md:justify-start items-center gap-4 ">
            <div><button
                class="btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20  "><i
                    class="fa-solid fa-thumbs-up"></i></button>
            </div>
            <div><button
                class="text-primary btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20   font-bold">Adopt</button>
            </div>
            <div><button
                class="text-primary btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20   font-bold">Details</button>
            </div>
        </div>
        `
        cardContainer.appendChild(div);
    })
    hideLoadingSpinner()
}

# Project Name: 

## Project Description:  

## Live Site Link:

## Project Video:

## Features:


## What I Learned New while Building This Project:

1. How to toggle active buttons: 

```js
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

            // remove rounded-full", "bg-primary/10 on active button full all buttons first
            document.querySelectorAll(".active").forEach((btn) => {
                btn.classList.add("rounded-xl")
                btn.classList.remove("rounded-full", "bg-primary/10")
            })

            // then add rounded-full", "bg-primary/10 clicked active button 
            div.classList.remove("rounded-xl")
            div.classList.add("rounded-full", "bg-primary/10")
        })


        categoryButtonContainer.appendChild(div);

    });

}
```

1. how to show loading spinner while data loading: 

```js
// utilities.js
const showLoadingSpinner = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");
}
const hideLoadingSpinner = () => {
    document.getElementById("loading-spinner").classList.add("hidden");
}
```
```js
// script.js
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
        <img class="rounded-lg" src=${pet.image}
            alt="card pet image">
    </div>
    <div class="space-y-2">
        <h2 class="font-bold text-xl">${pet.pet_name || "Name Not Found"}</h2>
        <div class="flex items-center gap-2">
            <img src="assets/icons/square.png" alt="square icon">
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
```

## Challenges I faced while Building This Project:

1. I tried lots of time to circle by button using rounded full and lots of others things, but i couldn't make it circle. but while trying i found that DaisyUi btn-circle class, and it's worked.

```js
<button class="btn btn-sm bg-transparent rounded-full border border-primary/20">
    <i class="fa-regular fa-user"></i>
</button>
```
```js
<button class="btn btn-sm bg-transparent btn-circle border border-primary/20">
    <i class="fa-regular fa-user"></i>
</button>
```

## Contact With Me: 

tamim.muhammad2005@gmail.com | https://www.linkedin.com/in/tamim-muhammad | +8801586090360 (WhatsApp)

---

Thank you so much for checking out my project! If you have any suggestions or feedback, feel free to share them.


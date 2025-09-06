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


        // fetch all category data by category name
        div.addEventListener("click", () => {
            showLoadingSpinner()
            const url = (`https://openapi.programming-hero.com/api/peddy/category/${category.category}`)
            fetch(url)
                .then(res => res.json())
                .then(data => displayPets(data.data))
        })

        categoryButtonContainer.appendChild(div);

    });

}


let allPetsCollection = [];

const loadAllPets = async () => {
    showLoadingSpinner()
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    const data = await res.json()
    allPetsCollection = data.pets;
    displayPets(data.pets)
}
loadAllPets()



// implement sort by price 
document.getElementById("sort-by-price-btn").addEventListener("click", () => {
    const sortedPets = [...allPetsCollection];

    // selection sort
    for (let i = 0; i < sortedPets.length; i++) {
        let minIndex = i;

        // find the index of the smallest element in the remaining array
        for (let j = i + 1; j < sortedPets.length; j++) {
            if (sortedPets[j].price < sortedPets[minIndex].price) {
                minIndex = j;
            }
        }

        // swap if we found a smaller price
        if (minIndex !== i) {
            let temp = sortedPets[i];
            sortedPets[i] = sortedPets[minIndex]
            sortedPets[minIndex] = temp;
        }
    }

    displayPets(sortedPets)
})



const displayPets = (pets) => {
    document.getElementById("error-container").classList.add("hidden")


    if (pets.length === 0) {
        document.getElementById("error-container").classList.remove("hidden")
    }

    const cardContainer = document.getElementById("card-container");

    cardContainer.innerHTML = "";

    pets.forEach((pet) => {
        const div = document.createElement("div");
        div.classList = "rounded-xl border border-primary-content/10 p-5";
        div.innerHTML = `
         <div class="pb-6">
        <img class="rounded-lg w-full h-[160px]" src=${pet.image}
            alt="card pet image">
    </div>
    <div class="space-y-2">
        <h2 class="font-bold text-xl">${pet.pet_name}</h2>
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
                <p class="text-primary-content/70">Price : ${pet.price || 100}$</p>
        </div>
    </div>
    <hr class="my-4 text-primary-content/10">
        <div class="flex justify-center md:justify-start items-center gap-4 ">
            <div><button
                class="like-btn btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20  "><i
                    class="fa-solid fa-thumbs-up"></i></button>
            </div>
            <div><button
                class="adopt-btn text-primary btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20   font-bold">Adopt</button>
            </div>
            <div><button
                class="details-btn text-primary btn btn-sm lg:btn-md bg-transparent rounded-lg border border-primary/20   font-bold">Details</button>
            </div>
        </div>
        `

        // implement like feature
        div.querySelector(".like-btn").addEventListener("click", (e) => {
            // change the like button color
            const btn = e.target;
            btn.classList.remove("bg-transparent")
            btn.classList.add("bg-primary", "text-white")

            // remove favorite pets container fallback-text
            document.getElementById("favorite-pets-container-fallback-text").classList.add("hidden")
            // add liked image to favorite pets container
            const favoritePetsContainer = document.getElementById("favorite-pets-container")

            const div = document.createElement("div")
            div.innerHTML = `
            <img class="size-[124px] object-cover rounded-lg" src=${pet.image} alt="dag">
            `

            favoritePetsContainer.appendChild(div);
        })


        // Implement adopt feature
        div.querySelector(".adopt-btn").addEventListener("click", (e) => {
            // change the button color
            const btn = e.target;
            btn.classList.remove("bg-transparent")
            btn.classList.add("bg-primary", "text-white")

            // increase the cart value
            const cartValueContainer = document.getElementById("cart-value-container")
            const cartValue = parseInt(cartValueContainer.innerText)
            cartValueContainer.innerText = cartValue + 1;

            showToast(`${pet.pet_name} added to the cart`)


            // set the data to the Checkout sidebar 
            const checkoutItemsContainer = document.getElementById("checkout-items-container")

            const checkoutItemsDiv = document.createElement("div");

            checkoutItemsDiv.innerHTML = `
            <div class="flex justify-between text-primary-content/70 border-b border-primary-content/10 px-3 text-sm">
                <p>${pet.pet_name}</p>
                <p>${pet.breed || "Not Found"}</p>
                <p>${pet.price || 100} $<p>
            </div>
            `
            const price = document.getElementById("total-price").innerText;
            const convertedTotalPrice = parseInt(price)
            let sum = convertedTotalPrice + pet.price;
            document.getElementById("total-price").innerText = sum;

            checkoutItemsContainer.appendChild(checkoutItemsDiv)
        })


        // details modal
        div.querySelector(".details-btn").addEventListener("click", () => {
            document.getElementById("my-modal").showModal()
            loadPetsDetails(pet.petId)
        })

        cardContainer.appendChild(div);
    })
    hideLoadingSpinner()
}


// show checkout sidebar
document.getElementById("cart-icon").addEventListener("click", () => {

    const checkoutSidebar = document.getElementById("checkout-sidebar");

    checkoutSidebar.classList.remove("hidden");

    setTimeout(() => {
        checkoutSidebar.classList.remove("translate-x-full");
        checkoutSidebar.classList.add("translate-x-0");
    }, 50);


})

// Hide checkout sidebar
document.getElementById("checkout-close-icon").addEventListener("click", () => {

    const checkoutSidebar = document.getElementById("checkout-sidebar");

    checkoutSidebar.classList.add("translate-x-full");
    checkoutSidebar.classList.remove("translate-x-0");

    setTimeout(() => {
        checkoutSidebar.classList.add("hidden")
    }, 500);
})


const loadPetsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayModalInfo(data.petData)
}

const displayModalInfo = (petData) => {
    const modalInfoContainer = document.getElementById("modal-info-container")

    modalInfoContainer.innerHTML = "";

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="pb-6">
            <img class="w-full h-[280px] object-center rounded-lg" src=${petData.image} alt="">
        </div>
        <div>
            <h1 class="font-bold text-2xl pb-4">${petData.pet_name || "Name Not Found"}</h1>
            <div class="grid grid-cols-2 justify-start gap-1">
                <div class="flex items-center gap-2">
                    <img src="assets/icons/square.png" alt="square icon">
                    <p class="text-primary-content/70">Breed: ${petData.breed}</p>
                </div>
                <div class="flex items-center gap-2">
                    <img src="assets/icons/calender.png" alt="calender icon">
                    <p class="text-primary-content/70">Birth: ${petData.date_of_birth}</p>
                </div>
                <div class="flex items-center gap-2">
                    <img src="assets/icons/gender.png" alt="gender icon">
                    <p class="text-primary-content/70">Gender: ${petData.gender}</p>
                </div>
                <div class="flex items-center gap-2">
                    <img src="assets/icons/dollar.png" alt="dollar icon">
                    <p class="text-primary-content/70">Price: ${petData.price}$</p>
                </div>
            </div>
        </div>
        <hr class="my-4 text-primary-content/10">
        <div class="pb-4">
            <h1 class="font-semibold pb-2">Details Information</h1>
            <p class="text-primary-content/70">${petData.pet_details}</p>
        </div>
    `;

    modalInfoContainer.appendChild(div)
}

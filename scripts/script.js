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



        categoryButtonContainer.appendChild(div);

    });

}


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

## Challenges I faced while Building This Project:

## Contact With Me: 

tamim.muhammad2005@gmail.com | https://www.linkedin.com/in/tamim-muhammad | +8801586090360 (WhatsApp)

---

Thank you so much for checking out my project! If you have any suggestions or feedback, feel free to share them.


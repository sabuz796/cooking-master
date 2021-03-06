let inputBox = document.querySelector('#input-box')
let searchButton = document.querySelector('#search-button')
const all_food_item_my_container = document.querySelector('#all_food_item_my_container')
let showDisplay = document.querySelector('#show-display')
let modalContainer = document.querySelector("#modal-container")
let modal = document.querySelector('#modal')

const removed_or_show = (block_item, none_item) => { 
    block_item.style.display = 'none'; 
    none_item.style.display = 'block';
};

searchButton.addEventListener('click', () => {
    searchItem = inputBox.value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.meals == null) {
                console.log('error')
                alert('There is no this kind of food in our database')
                inputBox.value = ''
            } else {
                let listItem = ''
                data.meals.forEach(item => {
                    listItem += `
                    <div onclick="displayFoodIngredients('${item.strMeal}')" class="food-item" id="food-item">
                    <img src ="${item.strMealThumb}" >
                    
                    <h4>${item.strMeal}</h4>
                    
                    </div>          
                    `
                    showDisplay.innerHTML = listItem;
                });
                inputBox.value = ''
            }
        })
})

let displayFoodIngredients = (itemName) => {
    removed_or_show(all_food_item_my_container, modalContainer);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
        .then(response => response.json())
        .then(data => {
            modal.innerHTML = `       
            <img src ="${data.meals[0].strMealThumb}" >
    <div class="center">
           <h1>${data.meals[0].strMeal}</h1>
           <h4>Ingredients</h4>        
       <div>
           <p><i class="fas fa-check-square"></i>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure9} ${data.meals[0].strIngredient9}</p>
           <p><i class="fas fa-check-square"></i></i>${data.meals[0].strMeasure10} ${data.meals[0].strIngredient10}</p>
       </div>
            <button onclick="closeButton()" id="modalClose">Close</button>  
    </div>   
                
            ` 
        })

}

function closeButton() {
    removed_or_show(modalContainer, all_food_item_my_container);
}
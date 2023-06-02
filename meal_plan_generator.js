function generateMealPlan() {
  var numOfMeals = document.getElementById("numOfMeals").value;
  var dietPreference = document.getElementById("dietPreference").value;
  var healthSpecification = document.getElementById("healthSpecification").value;
  var calories = document.getElementById("calories").value;

  // Call the API and retrieve recipe information
  // Replace the placeholder API_KEY with your actual Edamam API key
  var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=d274a2ad&app_key=c2131569c6f44750cca1ba268df3de02";

  // Append the user's inputs to the API URL
  apiURL += "&diet=" + dietPreference;
  apiURL += "&health=" + healthSpecification;
  apiURL += "&calories=" + calories;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      // Extract the required recipe information from the API response
      var meals = data.hits.slice(0, numOfMeals).map(hit => {
        return {
          name: hit.recipe.label,
          image: hit.recipe.image,
          ingredients: hit.recipe.ingredientLines.join(", ")
        };
      });

      // Generate the meal plan table
      var table = document.getElementById("mealPlanTable");
      table.style.display = "block";
      table.innerHTML = "";

      var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      for (var i = 0; i < numOfMeals; i++) {
        var meal = meals[i];
        var row = table.insertRow(i);

        var dayCell = row.insertCell(0);
        dayCell.innerHTML = days[i];

        var nameCell = row.insertCell(1);
        nameCell.innerHTML = meal.name;

        var imageCell = row.insertCell(2);
        var image = document.createElement("img");
        image.src = meal.image;
        image.alt = meal.name;
        imageCell.appendChild(image);

        var ingredientsCell = row.insertCell(3);
        ingredientsCell.innerHTML = meal.ingredients;
      }
    })
    .catch(error => {
      console.log("An error occurred while fetching the recipe data:", error);
    });
}

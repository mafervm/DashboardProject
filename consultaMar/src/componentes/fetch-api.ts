const API_KEY = 'EOkVlTm41v1dJn3aFYvY4GQyrNGHH6RN';

const myRequest = fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
);


myRequest.then ((response) => {
    console.log(response);
})

.catch( error =>{
    console.error(error);
})

myRequest
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) =>{
        console.error(err);
    })
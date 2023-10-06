const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
const formData = new FormData(form);
console.log(formData)
fetch('/index/bookStoreLogin', {
    method: 'POST',
    body: formData
})
.then(response => {
    console.log(response)
})
.catch(error => {
    console.error('The data submission has failed:', error);
    

});
});
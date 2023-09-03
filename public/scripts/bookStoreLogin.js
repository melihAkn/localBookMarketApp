const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {

const formData = new FormData(form);
console.log(formData)
fetch('/index/bookStoreLogin', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.catch(error => {
    console.error('Veri gönderimi başarısız oldu:', error);
    

});
});
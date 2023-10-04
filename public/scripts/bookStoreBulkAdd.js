const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token)
const form = document.getElementById('uploadForm')
const jsonFileInput = document.getElementById('jsonFileInput')
const backendURL = "http://localhost:3000/index/bookStoreBulkAddBook"
const formData = new FormData();
formData.append('file', jsonFileInput); // jsonFileInput, input element'inden alınan dosyayı temsil eder
formData.append('data', JSON.stringify(yourDataObject)); // yourDataObject, JSON verisini temsil eder

form.addEventListener('submit', function() {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
    console.log(jsonFileInput)

fetch(backendURL,
{
    method : 'POST',
    headers : {
        'Authorization' : `Bearer ${token}`
    },
    body: formData
})
.then(data => {
console.log(data)
})
.catch(e => {
    console.log('api cagrisi basarisiz oldu ' + e.message)
})

})





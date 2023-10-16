const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token)
const form = document.getElementById('uploadForm')
const jsonFileInput = document.getElementById('jsonFileInput')
const backendURL = "/index/bookStoreBulkAddBook"



form.addEventListener('submit', function() {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
    console.log(jsonFileInput.files[0])
    const formData = new FormData();
    formData.append('jsonFile', jsonFileInput.files[0]); // jsonFileInput, input element'inden alınan dosyayı temsil eder
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





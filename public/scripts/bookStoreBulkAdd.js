const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token)
const jsonFileAddButton = document.getElementById('jsonFileAdd')
const jsonFileInput = document.getElementById('jsonFileInput')
const backendURL = "http://localhost:3000/index/bookStoreBulkAddBook"
const jsonFileToDatabase = (path) => {
console.log(jsonFileInput)

fetch(backendURL,
{
    method : 'POST',
    headers : {
        'Authorization' : `Bearer ${token}`
    }
})
.then(data => {
console.log(data)
})
.catch(e => {
    console.log('api cagrisi basarisiz oldu ' + e.message)
})




};





jsonFileAddButton.addEventListener('click',jsonFileToDatabase)




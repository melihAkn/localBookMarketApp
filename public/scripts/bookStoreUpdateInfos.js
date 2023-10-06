const getInfosApiUrl = "http://localhost:3000/bookStore/findMyInfos";
const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token);

const updateInfobutton = document.querySelector('.updateInfos');
const form = document.getElementById('myForm');
const formData = new FormData(form);

const getMyInfos = _ => {

    fetch(getInfosApiUrl , {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
        .then(data =>  data.json())
        .then( data => {
            form.elements['bookStoreName'].value = data[0].bookStoreName;
            form.elements['bookStoreContactNumber'].value = data[0].bookStoreContactNumber ;
            form.elements['bookStoreContactEmail'].value = data[0].bookStoreContactEmail ;
            form.elements['bookStoreUserName'].value = data[0].bookStoreUserName ;
            form.elements['bookStorePassword'].value = data[0].bookStorePassword ;
            form.elements['bookStoreAddress'].value = data[0].bookStoreAddress ;
            form.elements['bookStoreCity'].value = data[0].bookStoreCity ;
            form.elements['bookStoreWebsite'].value = data[0].bookStoreWebsite ;
        })
        .catch( error => {
            console.error(error)
        });
}

document.addEventListener('DOMContentLoaded',getMyInfos)

form.addEventListener('submit', function() {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
      
    const formData = new FormData(form);
        const data = {
            bookStoreName : formData.get('bookStoreName'),
            bookStoreContactNumber : formData.get('bookStoreContactNumber'),
            bookStoreContactEmail : formData.get('bookStoreContactEmail'),
            bookStoreUserName : formData.get('bookStoreUserName'),
            bookStorePassword : formData.get('bookStorePassword'),
            bookStoreAddress : formData.get('bookStoreAddress'),
            bookStoreCity : formData.get('bookStoreCity'),
            bookStoreWebsite : formData.get('bookStoreWebsite'),
        }
     fetch('/index/bookStoreUpdateInfos', {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`,
     },
         body: JSON.stringify(data),
     })
     .then(data => {
         if(data.ok){
            return data.text()
         }
     })
     .then(data  => {
        console.log(data)
        alert(data)
     })
     .catch(error => {
         console.error('The data submission has failed:', error);
     });
});
const logout = document.getElementById('logout')

function logoutf() {
    // Cookie adı ve domain'i ile çerezi temizle
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
    
    // Kullanıcıyı çıkış sayfasına yönlendirin veya başka bir işlem yapın
}
logout.addEventListener('click',logoutf)
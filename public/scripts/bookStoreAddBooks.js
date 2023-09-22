const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token);
const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
       event.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
      
       const formData = new FormData(form);
       console.log(formData);
           const data = {
               name : formData.get('name'),
               publisher : formData.get('publisher'),
               author : formData.get('author'),
               stock : formData.get('stock'),
               publicationDate : formData.get('publicationDate'),
               pageCount : formData.get('pageCount'),
               ISBN : formData.get('ISBN'),
               language : formData.get('language'),
               genre : formData.get('genre'),
               description : formData.get('description'),
               averageRating : formData.get('averageRating')
           }
        
        fetch('/index/bookStoreAddBooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization' : `Bearer ${token}`,
        },
            body: JSON.stringify(data),
        })
        .then(response => {
            // Backend'den dönen cevabı işle
            console.log(data); 
            if (!response.ok) {
                const errorMessage = response.headers.get('errormessage') 
              throw new Error('HTTP error, status = '+response.status + errorMessage);
            }
            if(response.status == 200){
                alert("kitap basari ile eklendi")
                
                //formdaki veriler silinsin
            }else{
            }
            form.reset()
        })
       
        .catch(error => {
            alert( error.message);
        });
    });   

    const logout = document.getElementById('logout')

    function logoutf() {
        // Cookie adı ve domain'i ile çerezi temizle
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
        
        // Kullanıcıyı çıkış sayfasına yönlendirin veya başka bir işlem yapın
    }
    logout.addEventListener('click',logoutf)
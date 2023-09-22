const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token);

function  getMyBooks() {

const apiUrl = `http://localhost:3000/bookStore/getMyBooks`;

fetch(apiUrl, {
method : 'GET',
headers : {
    Authorization : `Bearer ${token}`
}

})
.then(response => response.json())
.then(bookData => {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.textContent = "";
    bookData.forEach(bookArray => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${bookArray.name}</h5>
                    <p class="card-Publisger">Yayinci: ${bookArray.publisher}</p>
                    <p class="card-Author">Yazar: ${bookArray.author}</p>
                    <p class="card-Stock">Stok: ${bookArray.stock}</p>
                    <p class="card-PublishedDate">Yayinlanma tarihi: ${bookArray.publicationDate}</p>
                    <p class="card-PageCount">Sayfa sayisi: ${bookArray.pageCount}</p>
                    <p class="card-BarcodNo" name = "barkodNo">barkod no: ${bookArray.ISBN}</p>
                    <p class="card-Lang">dil: ${bookArray.language}</p>
                    <p class="card-Category">kategori: ${bookArray.genre}</p>
                    <p class="card-BookDescription">kitap aciklamasi: ${bookArray.description}</p>
                    <p class="card-AvgRate">ortalama puan: ${bookArray.averageRating}</p>
                    <p class="card-BookStoreName">kirtasiye ismi: ${bookArray.addingBookStore}</p>
                    <button class = "card-BookUpdate" >guncelle</button>
                    <button class = "card-BookDelete" >sil</button>
                </div>
            `;
            cardContainer.appendChild(card);
    });
})
.then( _ => {
   const updateButtons = document.querySelectorAll('.card-BookUpdate');
   const deleteButtons = document.querySelectorAll('.card-BookDelete');
   // Her bir buton için aynı işlevi atan bir olay dinleyicisi ekleyin
   updateButtons.forEach(function (button) {
       button.addEventListener('click', function () {
           console.log('Bu butona tıklandı!');


       });
   });
   deleteButtons.forEach(function (button) {
       button.addEventListener('click', function () {
           let cardRemove = button.parentElement.parentElement
           const barcodNo = cardRemove.childNodes[1].childNodes[13].textContent.replace('barkod no: ', '')
           console.log(barcodNo)
           const bookStoreDeleteUrl = `http://localhost:3000/index/bookStoreDeleteBooks/${barcodNo}`
           fetch(bookStoreDeleteUrl, {
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${token}`
            }
           })
           .then(response => {
            if(response.status == 200){
                alert("kitap basari ile silindi")
            }
            else{
                alert("kitap silinemedi")
            }
           })
           
           cardRemove.remove()
           

           
       });
   });
})
.catch(error => {
    console.error("API çağrisi başarisiz oldu:", error);
});
}

document.addEventListener('DOMContentLoaded', async function(){
   getMyBooks()

   // Tüm "card-button" sınıfına sahip butonları seçin

});




const logout = document.getElementById('logout')

function logoutf() {
    // Cookie adı ve domain'i ile çerezi temizle
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
    
    // Kullanıcıyı çıkış sayfasına yönlendirin veya başka bir işlem yapın
}
logout.addEventListener('click',logoutf)
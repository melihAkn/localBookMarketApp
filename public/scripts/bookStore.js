
const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token);

function getMyBooks() {

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
                    <p class="card-text">Yayinci: ${bookArray.publisher}</p>
                    <p class="card-text">Yazar: ${bookArray.author}</p>
                    <p class="card-text">Stok: ${bookArray.stock}</p>
                    <p class="card-text">Yayinlanma tarihi: ${bookArray.publicationDate}</p>
                    <p class="card-text">Sayfa sayisi: ${bookArray.pageCount}</p>
                    <p class="card-text">barkod no: ${bookArray.ISBN}</p>
                    <p class="card-text">dil: ${bookArray.language}</p>
                    <p class="card-text">kategori: ${bookArray.genre}</p>
                    <p class="card-text">kitap aciklamasi: ${bookArray.description}</p>
                    <p class="card-text">ortalama puan: ${bookArray.averageRating}</p>
                    <p class="card-text">kirtasiye ismi: ${bookArray.ownedBookStore}</p>
                </div>
            `;
            cardContainer.appendChild(card);
    });
})
.catch(error => {
    console.error("API çağrisi başarisiz oldu:", error);
});
}
document.addEventListener('DOMContentLoaded',getMyBooks);


//navigation bar da anasayfa ya tıklandıgında yapılacak islemler
const anaSayfa = document.querySelector('.anaSayfa');
anaSayfa.addEventListener('click', _ => {
    console.log('tiklandi')
})


//navigation bar da bilgilerimiGuncelle ya tıklandıgında yapılacak islemler
const bilgilerimiGuncelle = document.querySelector('.bilgilerimiGuncelle');
bilgilerimiGuncelle.addEventListener('click', _ => {
    console.log('tiklandi')
})
const logout = document.getElementById('logout')

function logoutf() {
    // Cookie adı ve domain'i ile çerezi temizle
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
    
    // Kullanıcıyı çıkış sayfasına yönlendirin veya başka bir işlem yapın
}
logout.addEventListener('click',logoutf)
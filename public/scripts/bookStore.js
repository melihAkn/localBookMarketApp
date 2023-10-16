const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
console.log(token);

function  getMyBooks() {

const apiUrl = `/bookStore/getMyBooks`;
let bookStoreUpdateURL = ""
let updateForm
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
                    <button class = "card-BookDelete" >sil</button>
                    <button class = "card-BookUpdate" >guncelle</button>
                </div>
            `;
            cardContainer.appendChild(card);
    });
})
.then( _ => {
   const deleteButtons = document.querySelectorAll('.card-BookDelete');
   const updateButtons = document.querySelectorAll('.card-BookUpdate');
   // Her bir buton için aynı işlevi atan bir olay dinleyicisi ekleyin
   deleteButtons.forEach(function (button) {
       button.addEventListener('click', function () {
           let cardRemove = button.parentElement.parentElement
           const barcodNo = cardRemove.childNodes[1].childNodes[13].textContent.replace('barkod no: ', '')
           console.log(barcodNo)
           const bookStoreDeleteUrl = `/index/bookStoreDeleteBooks/${barcodNo}`
           fetch(bookStoreDeleteUrl, {
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${token}`
            }
           })
           .then(response => {
            if(response.status == 200){
                alert("book delete succesfully")
            }
            else{
                alert("book cannot delete")
            }
           })
           
           cardRemove.remove()
       });
   });
   updateButtons.forEach(async function (button)  {
    button.addEventListener('click', _ => {
        let updatedCard = button.parentElement.parentElement
        const barcodNo = updatedCard.childNodes[1].childNodes[13].textContent.replace('barkod no: ', '')
        bookStoreUpdateURL = `/index/bookStoreUpdateBooks/${barcodNo}`
        console.log(barcodNo)
        console.log(updatedCard)
        //this is the sequence of the book to be updated
        let book = []
        //card data
        const bookData = button.parentElement.children
         for (let i = 0; i < bookData.length - 2; i++) {
            const element = bookData[i].innerText;
            /*here is array index values   
            title => [0] publisher => [1] author => [2] stock => [3]   publishedDate => [4] 
            pageCount => [5] barcodNo => [6] Language => [7] Category => [8] description => [9] avgPoint => [10]
            */
            //this array's 0 element is a title(<h5>) and doesn't have this title : title  
           if(i !=0){
            splittedText = element.split(':'); // ":" split for character
            result = splittedText[1].trim();
            book.push(result)
            
           }else{
            console.log(element)
            book.push(element)
           }
        }
        console.log(book)
        updatedCard.innerHTML = `
        <form id="updateForm">
        <label for="title">Baslik:</label>
            <input type = "text" id="title" name="title" placeholder = "bookTitle" value = ${book[0]}></br>

        <label for="publisher">Yayıncı:</label>
            <input type = "text" id="publisher" name="publisher" placeholder = "bookPublisher" value = ${book[1]}></br>

        <label for="author">Yazar:</label>
             <input type="text" id="author" name="author" placeholder="Yazar adını girin" value = ${book[2]}></br>

        <label for="stock">Stok:</label>
            <input type="text" id="stock" name="stock" placeholder="Stok miktarını girin" value = ${book[3]}></br>

        <label for="publishedDate">Yayınlanma Tarihi:</label>
            <input type="text" id="publishedDate" name="publishedDate" placeholder="Yayınlanma tarihini girin" value = ${book[4]}></br>

        <label for="pageCount">Sayfa Sayısı:</label>
            <input type="text" id="pageCount" name="pageCount" placeholder="Sayfa sayısını girin" value = ${book[5]}></br>

         <label for="barcodNo">Barkod No:</label>
             <input type="text" id="barcodNo" name="barcodNo" placeholder="Barkod numarasını girin" value = ${book[6]}></br>

         <label for="language">Dil:</label>
             <input type="text" id="language" name="language" placeholder="Kitabın dilini girin" value = ${book[7]}></br>

         <label for="category">Kategori:</label>
             <input type="text" id="category" name="category" placeholder="Kitabın kategorisini girin" value = ${book[8]}></br>

        <label for="description">Kitap Açıklaması:</label>
            <textarea id="description" name="description" placeholder="Kitap açıklamasını girin" >${book[9]}</textarea></br>

         <label for="averageRating">Ortalama Puan:</label>
             <input type="text" id="averageRating" name="averageRating" placeholder="Ortalama puanı girin" value = ${book[10]}></br>

  <button type="submit">Kitabı Kaydet</button>
        </form>
        `
        updateForm = document.getElementById('updateForm');
        console.log("sadasds")
        console.log(updateForm)
        updateForm.addEventListener('submit', e => {
            e.preventDefault()
            const formData = new FormData(updateForm);
            console.log(formData)
            const data = {
                name : formData.get('title'),
                publisher : formData.get('publisher'),
                author : formData.get('author'),
                stock : formData.get('stock'),
                publicationDate : formData.get('publishedDate'),
                pageCount : formData.get('pageCount'),
                ISBN : formData.get('barcodNo'),
                language : formData.get('language'),
                genre : formData.get('category'),
                description : formData.get('description'),
                averageRating : formData.get('averageRating')
            }
            fetch(bookStoreUpdateURL ,{
                method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(data),
            }) 
            .then(response => {
                if (response.ok) {
                  // İşlem başarılı, yönlendirme yapabilirsiniz
                  window.location.href = '/index/bookStore'; // Örnek yönlendirme URL'si
                } else {
                  // İşlem hatalı ise hata mesajı alabilirsiniz
                  console.error('İşlem başarısız:', response.status);
                }
            })
           
        })  
    })
   });
})
.catch(error => {
    console.error("api call error:", error);
});
}
document.addEventListener('DOMContentLoaded', async function(){
   getMyBooks()
});

const logout = document.getElementById('logout')

function logoutf() {
    // Cookie adı ve domain'i ile çerezi temizle
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
}
logout.addEventListener('click',logoutf)
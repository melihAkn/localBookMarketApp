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
           const bookStoreDeleteUrl = `http://localhost:3000/index/bookStoreDeleteBooks/${barcodNo}`
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
   updateButtons.forEach(function (button)  {
    button.addEventListener('click', _ => {
        let updatedCard = button.parentElement.parentElement
        const barcodNo = updatedCard.childNodes[1].childNodes[13].textContent.replace('barkod no: ', '')
        console.log(barcodNo)
        console.log(updatedCard)
        //this is the sequence of the book to be updated
        let book = []
        //card data
        console.log(button.parentElement.children[0].innerText)
        const bookData = button.parentElement.children
        console.log(bookData[1])
         for (let i = 0; i < bookData.length - 2; i++) {
            const element = bookData[i].innerText;
            /*here is array index values   
            title => [0] publisher => [1] author => [2] stock => [3]   publishedDate => [4] 
            pageCount => [5] barcodNo => [6] Language => [7] Category => [8] description => [9] avgPoint => [10]
            */
            //this array's 0 element is a title(<h5>) and different other
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
        <label for="bookTitle">Baslik:</label>
            <input type = "text" id="bookTitle" name="bookTitle" placeholder = "bookTitle" value = ${book[0]}></br>

        <label for="bookPublisher">Yayıncı:</label>
            <input type = "text" id="bookPublisher" name="bookPublisher" placeholder = "bookPublisher" value = ${book[1]}></br>

        <label for="bookAuthor">Yazar:</label>
             <input type="text" id="bookAuthor" name="bookAuthor" placeholder="Yazar adını girin" value = ${book[2]}></br>

        <label for="bookStock">Stok:</label>
            <input type="text" id="bookStock" name="bookStock" placeholder="Stok miktarını girin" value = ${book[3]}></br>

        <label for="bookPublishedDate">Yayınlanma Tarihi:</label>
            <input type="text" id="bookPublishedDate" name="bookPublishedDate" placeholder="Yayınlanma tarihini girin" value = ${book[4]}></br>

        <label for="bookPageCount">Sayfa Sayısı:</label>
            <input type="text" id="bookPageCount" name="bookPageCount" placeholder="Sayfa sayısını girin" value = ${book[5]}></br>

         <label for="bookBarcodNo">Barkod No:</label>
             <input type="text" id="bookBarcodNo" name="bookBarcodNo" placeholder="Barkod numarasını girin" value = ${book[6]}></br>

         <label for="bookLanguage">Dil:</label>
             <input type="text" id="bookLanguage" name="bookLanguage" placeholder="Kitabın dilini girin" value = ${book[7]}></br>

         <label for="bookCategory">Kategori:</label>
             <input type="text" id="bookCategory" name="bookCategory" placeholder="Kitabın kategorisini girin" value = ${book[8]}></br>

        <label for="bookDescription">Kitap Açıklaması:</label>
            <textarea id="bookDescription" name="bookDescription" placeholder="Kitap açıklamasını girin" >${book[9]}</textarea></br>

         <label for="bookAVG">Ortalama Puan:</label>
             <input type="text" id="bookAVG" name="bookAVG" placeholder="Ortalama puanı girin" value = ${book[10]}></br>

  <button type="submit">Kitabı Kaydet</button>
        </form>
        `
        const updateForm = document.getElementById('updateForm')
        console.log(updateForm)
        const bookStoreUpdateURL = `http://localhost:3000/index/bookStoreUpdateBooks/${barcodNo}`
        const formData = new FormData;
        updateForm.addEventListener('submit', _ => {
            fetch(bookStoreUpdateURL ,{
                method : "POST",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        })
        .then( response => response.json())
        .then(updatedBookData => {



            updatedCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${updatedBookData.name}</h5>
                <p class="card-Publisger">Yayinci: ${updatedBookData.publisher}</p>
                <p class="card-Author">Yazar: ${updatedBookData.author}</p>
                <p class="card-Stock">Stok: ${updatedBookData.stock}</p>
                <p class="card-PublishedDate">Yayinlanma tarihi: ${updatedBookData.publicationDate}</p>
                <p class="card-PageCount">Sayfa sayisi: ${updatedBookData.pageCount}</p>
                <p class="card-BarcodNo" name = "barkodNo">barkod no: ${updatedBookData.ISBN}</p>
                <p class="card-Lang">dil: ${updatedBookData.language}</p>
                <p class="card-Category">kategori: ${updatedBookData.genre}</p>
                <p class="card-BookDescription">kitap aciklamasi: ${updatedBookData.description}</p>
                <p class="card-AvgRate">ortalama puan: ${updatedBookData.averageRating}</p>
                <button class = "card-BookDelete" >sil</button>
                <button class = "card-BookUpdate" >guncelle</button>
            </div>
        `;
        })



        /*
        const bookStoreUpdateURL = `http://localhost:3000/index/bookStoreUpdateBooks/${barcodNo}`
        fetch(bookStoreUpdateURL,{
            method : 'UPDATE',
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(updatedBookData => {
            console.log(updatedBookData)
            console.log(updatedCard)


        })
*/
    })
   });
})
.catch(error => {
    console.error("api call error:", error);
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
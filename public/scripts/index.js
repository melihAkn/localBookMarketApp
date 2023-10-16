const cityApiUrl = "http://localhost:3000/index/getCityNames";
const getBooksCountURL = "http://localhost:3000/index/getBooksCountAndBookStoreCount";

const  getCityOptions = async _ => {
    await fetch(cityApiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            const selectElement = document.querySelector(".citys");
            const optionElement = document.createElement("option");
            optionElement.value = city; 
            optionElement.textContent = city;
            selectElement.appendChild(optionElement);
             if (city === "Ankara") {
            optionElement.selected = true;
        }
        });
        performSearchByCity()
    })
    .catch(error => {
        console.error("API call error:", error);
    });
}
const getData = (url) => {
    fetch(url) 
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
                        <!-- Diğer alanlari buraya ekleyin -->
                    </div>
                `;
                cardContainer.appendChild(card);
        });  
        if (cardContainer.children.length === 0) {
            console.log('Div content empty.');
            const message = document.createElement("p")
            message.innerHTML = "The book you entered is not in our inventory or you entered it incorrectly"
            cardContainer.appendChild(message)
        } else {
        }
    })
    .catch(error => {
        console.error("API call error:", error);
    });
}
function performSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchValue = searchInput.value;
    if (searchValue.length === 0) {
        performSearchByCity()
        return
    }
    const selectedLocation = document.querySelector(".citys").value;
    const apiUrl = `http://localhost:3000/index/getBooks/${selectedLocation}/${searchValue}`;
    getData(apiUrl)
}
function performSearchByCity() {
    const selectedLocation = document.querySelector(".citys").value;
    console.log(selectedLocation)
    const apiUrl = `http://localhost:3000/index/getBooksByCity/${selectedLocation}`;
    getData(apiUrl)
}

function getBooksCount() {
    fetch(getBooksCountURL)
    .then(response => response.json())
    .then(data => {
        const pElementBooksCount = document.querySelector('.booksCount')
        const pElementBookStoreCount = document.querySelector('.bookStoreCount')
        pElementBooksCount.textContent =`Kayitli kitap sayisi:${data.booksCount} `
        pElementBookStoreCount.textContent = `Kayitli kirtasiye sayisi:${data.bookStoreCount} `

    })
    .catch(e => {

    })
}


const searchButton = document.querySelector('button');
searchButton.addEventListener('click', performSearch);
document.addEventListener('DOMContentLoaded',async () => {
    getBooksCount()
    await getCityOptions()
    performSearchByCity()
})


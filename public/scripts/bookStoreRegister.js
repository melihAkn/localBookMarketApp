const cityApiUrl = "http://localhost:3000/index/getCityNames";
fetch(cityApiUrl)
    .then(response => response.json())
    .then(data => {
        const selectElement = document.querySelector(".citys");
        data.forEach(city => {
            const optionElement = document.createElement("option");
            optionElement.value = city; 
            optionElement.textContent = city;
            selectElement.appendChild(optionElement);
             if (city === "Ankara") {
            optionElement.selected = true;
        }
        });
    })
    .catch(error => {
        console.error("API çağrisi başarisiz oldu:", error);
    });


    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
    
    const formData = new FormData(form);
    console.log(formData)
    fetch('/index/bookStoreRegister', {
        method: 'POST',
        body: formData
    })
    .then(response => alert(response))
    .catch(error => {
        console.error('Veri gönderimi başarısız oldu:', error);
        
    
    });
    });
    const logout = document.getElementById('logout')



## Projenin amacı
şehire gore o şehirdeki kitapların stok bilgisine ve fiyat bilgisine gore listelenmesi

## Kurulum ve Çalıştırma
Aşağıdaki adımları izleyerek projeyi yerel makinenizde çalıştırabilirsiniz
1. projeyi klonlayın:
```shell
git clone https://github.com/melihAkn/localBookMarketApp.git
```

2. Proje klasörüne gidin:

```shell
cd .\localBookMarketApp
```

3. projenin ana dizinine .env adında bir dosya oluşturun ve içine aşağıdaki kodları yazın
```shell
CONNECTION_STRING = "mongodb://127.0.0.1:27017/localBookShop"
SECRET_KEY = "gizliAnahtar"
```

4. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```shell
npm install
```

5. MongoDB veritabanını başlatın:

```shell
mongod
```

6. Projeyi başlatmak için aşağıdaki komutu çalıştırın:

```shell
npm start
```
7. projeyi tarayıcınızda şu adrese giderek goruntuleyeblirsiniz
http://localhost:3000/

yada bu adrese giderek projeyi canlı olarak goruntuleyebilirsiniz
https://gavinortfolio.com.tr






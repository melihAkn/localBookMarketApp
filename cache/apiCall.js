const NodeCache = require('node-cache');
const axios = require('axios');
const apicache = new NodeCache({ stdTTL: 60 * 60 }); // 1 saat önbellekte tutma süresi
/*
const getDataToCache = async _ => {
  const apiResponse = apicache.get('apiResponse'); // Önbellekten veriyi alma

  if (apiResponse) {
    console.log('Önbellekten veri alindi');
    return apiData;
  } else {
    console.log('API çağrisi yapiliyor');
    try {
      const response = await axios.get(`https://turkiyeapi.cyclic.app/api/v1/provinces`); // API çağrısı
      const apiData = response.data.data;
      let cityNames = []
      apiData.forEach(e => {
        cityNames.push(e.name)
      });

      // Veriyi önbelleğe alma
      apicache.set('cityNames', cityNames);
      //console.log(apiData);
      return apiData;
    } catch (error) {
      console.error('API çağrisi hatasi:', error.message);
    }
  }
}
getDataToCache()
*/
module.exports = apicache;


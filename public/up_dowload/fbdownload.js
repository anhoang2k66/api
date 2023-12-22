const axios = require('axios');

exports.name = '/autofb';

exports.index = async (req, res, next) => {
  try {
    const facebookUrl = req.query.url;

    if (!facebookUrl) {
      return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    const rapidAPIKey = 'ec5621ed6dmsh58c17d922fdb878p19b54ejsn36e93a26e44c';
    const rapidAPIHost = 'facebook17.p.rapidapi.com';

    const apiUrl = 'https://facebook17.p.rapidapi.com/api/facebook/links';

    const data = {
      url: facebookUrl
    };

    const requestOptions = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': rapidAPIHost,
      },
      data: data,
    };

    const response = await axios(requestOptions);

    if (response.status === 200) {
      const linksWithInfo = response.data[0].urls.map(urlInfo => ({
        subName: urlInfo.subName,
        url: urlInfo.url,
        extension: urlInfo.extension,
      }));

      res.json(linksWithInfo);
    } else {
      res.json({ error: 'Failed to retrieve data.' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const axios = require('axios');

exports.name = '/downfb';

exports.index = async (req, res, next) => {
  try {
    const facebookUrl = req.query.url;

    if (!facebookUrl) {
      return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    const rapidAPIKey = 'ec5621ed6dmsh58c17d922fdb878p19b54ejsn36e93a26e44c';
    const rapidAPIHost = 'facebook-reel-and-video-downloader.p.rapidapi.com';

    const apiUrl = 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php';

    const requestOptions = {
      method: 'GET',
      url: apiUrl,
      params: {
        url: facebookUrl,
      },
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': rapidAPIHost,
      },
    };

    // Gọi API bằng Axios
    const response = await axios(requestOptions);

    if (response.status === 200 && response.data.success) {
      const { title, media, links } = response.data;

      // Lấy thông tin title
      const result = { title };

      // Lấy danh sách liên kết ảnh từ trường "media"
      const imageLinks = media.map(item => item.image);

      // Thêm danh sách liên kết ảnh vào kết quả
      result.imageLinks = imageLinks;

      // Thêm liên kết tải xuống vào kết quả
      result.downloadLinks = links;

      // Lấy thông tin video nếu có
      const videoInfo = media.find(item => item.type === 'Video');

      if (videoInfo) {
        const { hd_url } = videoInfo;

        // Thêm trường hd_url vào kết quả
        result.hd_url = hd_url;
      }

      res.json(result);
    } else {
      res.json({ error: 'Failed to retrieve data.' });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: 'An error occurred.' });
  }
};

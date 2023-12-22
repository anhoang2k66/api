const axios = require('axios');
const express = require('express');
const app = express();

exports.name = '/capcutauto';
exports.index = async (req, res, next) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: 'Thiếu thông tin URL.' });
  }

  try {
    const response = await axios.get(`https://ssscap.net/api/download/get-url?url=${url}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
        'Referer': 'https://ssscap.net/vi',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
        'Cookie': '__gads=ID=1608a340b6cef02f-226dc7ecece4000b:T=1697357843:RT=1699366530:S=ALNI_MaDL9m03aRU-VZNSr26P7QWi6d9XQ; __gpi=UID=00000c6152dc2e46:T=1697357843:RT=1699366530:S=ALNI_MaZtJLh2IcExr05DXxs3R-dJhDgsA; sign=bdfd8916f42fc94e7a74bbaca11d23a6; device-time=1699366548482',
      },
    });

    // Sử dụng biểu thức chính quy để trích xuất "template_id" từ URL
    const match = response.data.url.match(/template_id=(\d+)/);

    if (match && match[1]) {
      const templateId = match[1];

      // Gọi API khác để lấy dữ liệu từ ssscap.net bằng templateId
      const ssscapResponse = await axios.get(`https://ssscap.net/api/download/${templateId}`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
          'Referer': 'https://ssscap.net/vi',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
          'Cookie': '__gads=ID=1608a340b6cef02f-226dc7ecece4000b:T=1697357843:RT=1699361400:S=ALNI_MaDL9m03aRU-VZNSr26P7QWi6d9XQ; __gpi=UID=00000c6152dc2e46:T=1697357843:RT=1699361400:S=ALNI_MaZtJLh2IcExr05DXxs3R-dJhDgsA; sign=adc74d0f6e4711f469fedaeac8485f13; device-time=1699361408694',
        },
      });

      // Xây dựng URL hoàn chỉnh từ các phần của dữ liệu trả về
      const originalVideoUrl = `https://ssscap.net${ssscapResponse.data.originalVideoUrl}`;
      const coverUrl = `https://ssscap.net${ssscapResponse.data.coverUrl}`;
      const authorUrl = `https://ssscap.net${ssscapResponse.data.authorUrl}`;

      // In ra dữ liệu trả về từ ssscap.net
      console.log('Dữ liệu trả về từ ssscap.net:', ssscapResponse.data);

      // Trả về dữ liệu với URL đã được xây dựng hoàn chỉnh
      res.json({
        data: {
          ...ssscapResponse.data,
          originalVideoUrl,
          coverUrl,
          authorUrl,
        },
      });
    } else {
      res.json({ error: 'Không tìm thấy template_id trong URL.' });
    }
  } catch (error) {
    res.json({ error: 'Lỗi trong quá trình lấy dữ liệu.' });
  }
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại cổng ${port}`);
});

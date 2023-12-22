exports.name = '/capcut/link';
exports.index = async (req, res, next) => {
    const capcutUrl = req.query.url;
    if (!capcutUrl) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });

    const axios = require('axios');

    const url = "https://taivideoaz.com/wp-json/aio-dl/video-data/";

    const data = new URLSearchParams();
    data.append("url", capcutUrl);

    const requestOptions = {
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "pll_language=vi; PHPSESSID=f5ca581787314e6359685ca94baf4f05",
            "Origin": "https://taivideoaz.com",
            "Referer": "https://taivideoaz.com/tai-video-capcut-khong-logo/",
        }
    };

    axios.post(url, data, requestOptions)
        .then(response => {
            if (response.status === 200) {
                res.json(response.data);
            } else {
                res.json({ error: 'Failed to retrieve data.' });
            }
        })
        .catch(error => {
            res.json({ error });
        });
}

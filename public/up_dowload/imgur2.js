exports.name = '/imgur';
exports.index = async (req, res, next) => {
    const request = require('request');
    const link = req.query.url;

    if (!link) {
        return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    const options = {
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: 'Client-ID c76eb7edd1459f3',
        },
        formData: {
            image: link,
        },
    };

    request(options, function (error, response) {
        if (error) {
            return res.json({ error: 'Đã xảy ra lỗi với liên kết của bạn' });
        }

        const data = response.body;
        const upload = JSON.parse(data);

        res.json({
            uploaded: {
                status: 'success',
                image: upload.data.link,
            },
        });
    });
};

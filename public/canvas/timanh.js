const axios = require('axios');
const google = require("googlethis");

exports.name = '/timanh';

async function isImageAccessible(url) {
    try {
        const response = await axios.head(url);
        return response.status === 200;
    } catch {
        return false;
    }
}

function isValidImageOrGifFormat(url) {
    const validFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = url.split('.').pop().toLowerCase();
    return validFormats.includes(extension);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

exports.index = async (req, res, next) => {
    const query = req.query.query;
    const count = parseInt(req.query.count) || 1;

    if (!query) return res.json({ "message": "Thiếu từ khóa tìm kiếm!" });

    let result;
    try {
        result = await google.image(query, { safe: false });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Google:", error);
        return res.json({ "message": "Có lỗi xảy ra khi tìm kiếm ảnh" });
    }

    if (!result || result.length === 0) {
        return res.json({ "message": `Không tìm thấy kết quả cho "${query}"` });
    }

    const validUrls = result.filter(img => isValidImageOrGifFormat(img.url));
    if (validUrls.length === 0) {
        return res.json({ "message": `Không có ảnh hoặc gif hợp lệ cho "${query}"` });
    }

    shuffleArray(validUrls);  // Xáo trộn danh sách liên kết

    const accessibleUrls = [];
    for (let img of validUrls) {
        if (await isImageAccessible(img.url)) {
            accessibleUrls.push(img.url);
            if (accessibleUrls.length >= count) {
                break; // Stop if we have enough images
            }
        }
    }

    res.json({ "data": accessibleUrls });
};

exports.name = '/finduid';
exports.index = async (req, res, next) => {
    const request = require('request');

    function isUrlValid(link) {
        var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res !== null;
    }

    var link = req.query.url;

    // Validate and adjust the URL
    if (!link) return res.jsonp({ error: "Vui lòng nhập link Facebook cần tìm UID" });
    if (!link.startsWith('http://') && !link.startsWith('https://')) link = 'https://' + link;
    if (!link.includes('facebook.com')) link = 'https://www.facebook.com/' + link;
    if (!isUrlValid(link)) return res.jsonp({ error: "Vui lòng nhập link Facebook hợp lệ !" });

    var idfacebook = null;
    var post = link.match(/(.*)\/posts\/([0-9]{8,})/);
    var photo = link.match(/(.*)\/photo.php\?fbid=([0-9]{8,})/);
    var photo2 = link.match(/(.*)\/photo\/\?fbid=([0-9]{8,})/);
    var photo3 = link.match(/(.*)\/photo\?fbid=([0-9]{8,})/);
    var video = link.match(/(.*)\/video.php\?v=([0-9]{8,})/);
    var story = link.match(/(.*)\/story.php\?story_fbid=([0-9]{8,})/);
    var permalink = link.match(/(.*)\/permalink.php\?story_fbid=([0-9]{8,})/);
    var number = link.match(/(.*)\/([0-9]{8,})/);
    var comment = link.match(/(.*)comment_id=([0-9]{8,})/);
    var media = link.match(/(.*)media\/set\/\?set=a\.([0-9]{8,})/);
    var watch = link.match(/(.*)\/watch\/\?v=([0-9]{8,})/);

    if (comment) {
        idfacebook = comment[2];
    } else if (photo) {
        idfacebook = photo[2];
    } else if (photo2) {
        idfacebook = photo2[2];
    } else if (photo3) {
        // Xử lý logic cho trường hợp khác (nếu cần)
    } else if (video) {
        idfacebook = video[2];
    } else if (story) {
        idfacebook = story[2];
    } else if (permalink) {
        idfacebook = permalink[2];
    } else if (number) {
        idfacebook = number[2];
    } else if (media) {
        idfacebook = media[2];
    } else if (watch) {
        idfacebook = watch[2];
    } else if (post) {
        idfacebook += '_' + post[2];
    }

    if (idfacebook == null) {
        var username = link;
        const options = {
            method: 'POST',
            url: 'https://id.traodoisub.com/api.php',
            headers: {
                'referer': 'https://id.traodoisub.com/?link=' + username,
            },
            form: {
                link: username
            }
        };
        request(options, function (error, response, body) {
            try {
                const data = JSON.parse(body);
                if (data.success) {
                    return res.json({
                        success: data.success,
                        id: data.id,
                        author: 'TuanDz'
                    });
                } else {
                    console.error('Lỗi lấy UID: ' + data.error);
                    return res.jsonp({ error: 'Không thể lấy UID từ dịch vụ' });
                }
            } catch (e) {
                console.error('Lỗi phân tích JSON: ' + e);
                return res.jsonp({ error: 'Lỗi phân tích JSON' });
            }
        });
    } else {
        return res.jsonp({
            id: idfacebook,
            author: 'TuanDz'
        });
    }
};

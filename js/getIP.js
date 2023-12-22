document.addEventListener("DOMContentLoaded", function() {
    function show_date_time() {
        const BirthDay = new Date("2022/5/15"); // Đây là ngày bắt đầu hoạt động của web
        const today = new Date();
        const timeold = (today - BirthDay);
        const daysold = Math.floor(timeold / (24 * 60 * 60 * 1000));
        const hrsold = Math.floor((timeold % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minsold = Math.floor((timeold % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeold % (60 * 1000)) / 1000);

        document.getElementById('momk').textContent = `${daysold} ngày ${hrsold} giờ ${minsold} phút ${seconds} giây`;
        setTimeout(show_date_time, 1000);
    }
    show_date_time();
});

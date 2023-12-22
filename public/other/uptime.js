const express = require('express');
const axios = require('axios');

const app = express();

exports.name = '/addurl';
exports.index = async (req, res) => {
  const urlParam = req.query.url;

  if (!urlParam) {
    return res.status(400).json({ error: 'Thiếu tham số "url" trong yêu cầu.' });
  }

  const urlRepl = decodeURIComponent(urlParam);

  try {
    const responseData = await sendUptimeRequest(urlRepl);
    res.json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

async function sendUptimeRequest(url) {
  const apiUrl = `https://uptimev3--user5971666.repl.co/addurl?url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu Uptime:', error.message);
    throw error;
  }
}

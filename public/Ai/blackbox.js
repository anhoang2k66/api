const express = require('express');
const axios = require('axios');

const app = express();

exports.name = '/blackbox/api';
exports.index = async (req, res) => {
  const queryParam = req.query.query;

  if (!queryParam) {
    return res.status(400).json({ error: 'Thiếu tham số "query" trong yêu cầu.' });
  }

  const encodedQuery = encodeURIComponent(queryParam);

  try {
    const responseData = await sendAIRequest(encodedQuery);
    res.json({ success: true, answer: responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

async function sendAIRequest(query) {
  const apiUrl = 'https://useblackbox.io/chat-request-v4';

  try {
    const response = await axios.post(apiUrl, {
      textInput: query,
      allMessages: [{ user: query }],
      stream: '',
      clickedContinue: false,
    });

    return response.data.response[0][0];
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu AI:', error.message);
    throw error;
  }
}
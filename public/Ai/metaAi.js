const express = require('express');
const axios = require('axios');

const app = express();

exports.name = '/meta/api';
exports.index = async (req, res) => {
  try {
    const inputText = req.query.query; // Lấy giá trị của tham số 'query'
    const responseText = await generateResponse(inputText);

    // Dịch nội dung trả về sang tiếng Việt
    const translatedResponse = await translateToVietnamese(responseText);

    res.json({ response: translatedResponse });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.toString() });
  }
};

const CODE_LLAMA_URL = 'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf';
const GOOGLE_TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/single';

async function generateResponse(inputText) {
  const params = {
    input: `[INST] ${inputText} [/INST]`,
    max_new_tokens: 1024,
    temperature: 0.4,
    top_p: 0.9,
    top_k: 0,
    repetition_penalty: 1.2,
    num_responses: 1,
    stream: false
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': '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' 
  };

  const response = await axios.post(CODE_LLAMA_URL, params, { headers });

  if (response.status === 200) {
    const result = response.data;
    const generatedText = result.results[0].generated_text;

    return generatedText;
  } else {
    console.error('Error generating response. Meta Llama API status:', response.status);
    throw new Error('Error generating response');
  }
}

async function translateToVietnamese(text) {
  return new Promise((resolve, reject) => {
    const apiUrl = encodeURI(`${GOOGLE_TRANSLATE_API_URL}?client=gtx&sl=auto&tl=vi&dt=t&q=${text}`);

    axios.get(apiUrl)
      .then(response => {
        const retrieve = response.data;
        let translatedText = '';

        retrieve[0].forEach(item => {
          if (item[0]) {
            translatedText += item[0];
          }
        });

        resolve(`${translatedText}`);
      })
      .catch(error => {
        console.error('Error translating text:', error);
        reject('Đã có lỗi xảy ra khi dịch');
      });
  });
}

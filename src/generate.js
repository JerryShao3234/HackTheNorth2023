import axios from 'axios'

const options = {
    method: 'POST',
    url: 'https://api.cohere.ai/v1/generate',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer nMg4w9QRYmsi5cf9n8sA7HhjjPMsK432K4gcFB8I'
    },
    data: {
        max_tokens: 20,
        truncate: 'END',
        return_likelihoods: 'NONE',
        prompt: 'Please explain to me how LLMs work'
    }
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });

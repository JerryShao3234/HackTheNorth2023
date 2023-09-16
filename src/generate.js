import axios from 'axios'

async function submitInput(text) {
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
            prompt: text
        }
    };

    axios
        .request(options)
        .then(function (response) {
            alert(response.data.generations[0].text);
        })
        .catch(function (error) {
            console.error(error);
        });
}

export {submitInput}



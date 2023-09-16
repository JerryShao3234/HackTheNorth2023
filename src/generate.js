import axios from 'axios'

const stableDiffusionKey = "iDHGfAwoqC50ad3Osu2ZivQ7KgFrLQ2BhYv7vr8wwFejxUrLT6s8aIeWozpW"
const midjourneyKey = 'ae5628d2-7dcf-455a-80d5-c5e3aa8d3a9c';

const promptsOptions = {
    method: 'POST',
    url: 'https://api.cohere.ai/v1/generate',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer nMg4w9QRYmsi5cf9n8sA7HhjjPMsK432K4gcFB8I'
    },
    data: {
        max_tokens: 350,
        truncate: 'END',
        return_likelihoods: 'NONE',
        prompt: ""
    }
}



const stableDiffusionOptions = {
    method: 'POST',
    url: 'https://stablediffusionapi.com/api/v3/text2img',
    headers: {
        'content-type': 'application/json'
    },
    data: {
        key: stableDiffusionKey,
        prompt: "",
        negative_prompt: null,
        width: "512",
        height: "512",
        samples: "1",
        num_inference_steps: "20",
        seed: null,
        guidance_scale: 7.5,
        safety_checker: "yes",
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings_model: null,
        webhook: null,
        track_id: null
    }
}

const getStory = async (text) => {
    const options = {...promptsOptions};
    options.data.prompt = text;
    options.data.temperature = 1.2;

    return axios
        .request(options)
        .then(function (response) {
            const storyText = response.data.generations[0].text

            console.log("generated getStory");
            console.log(storyText)
            return storyText
        })
        .catch(function (error) {
            console.error(error);
        });
}

const getGeneratedImages = async (text) => {
    const promptGenerator = "Generate four image prompts separated by periods to give to stable diffusion in order to accurately represent the following story: \""+text+"\""
    const options = {...promptsOptions}
    options.data.prompt = promptGenerator;
    options.data.temperature = 0.5;

    return axios
        .request(options)
        .then(function (response) {
            const prompts = response.data.generations[0].text

            console.log("generated prompts");
            console.log(prompts)

            let promptList = prompts.split(".");
            if (promptList.length > 4) {
                promptList = promptList.slice(0, 4);
            }
            promptList = promptList.map((prompt) => prompt.trim())
            console.log(promptList)

            const imagePromises = promptList.map((prompt) => {
                const optionCopy = {...stableDiffusionOptions};
                optionCopy.data.prompt = prompt + ", drawn by a child"

                return axios.request(optionCopy).then((response) => {
                    console.log(response);
                    return response.data.output[0];
                })
            })

            return Promise.all(imagePromises);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// MidJourney API

const sendMessageMJ = async (inputMsg) => {
    const URL = 'https://api.thenextleg.io/v2/imagine';
    
    const options = {
        method: 'POST',
        url: URL,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${midjourneyKey}`
        },
        data: {
            msg: inputMsg,
            ref: "",
            webhookOverride: "",
            ignorePrefilter: "false"
        }
    }

    try {
        const response = await axios.request(options);
        if (response.data.success) {
            return response.data.messageId;
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        console.error(error);
    }
};

const retrieveMessageMJ = async (messageId) => {
    const URL = `https://api.thenextleg.io/v2/message/${messageId}?expireMins=2`;
    
    const options = {
        method: 'GET',
        url: URL,
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${midjourneyKey}`
        }
    }

    try {
        const response = await axios.request(options);
        const responseData = response.data;
        if(responseData.progress === 100) {
            return {
                imageUrl: responseData.response.imageUrl,
                imageUrls: responseData.response.imageUrls
            };
        } else {
            throw new Error('Message processing is not yet complete.');
        }
    } catch (error) {
        console.error(error);
    }
};



export {getStory, getGeneratedImages, sendMessageMJ, retrieveMessageMJ}



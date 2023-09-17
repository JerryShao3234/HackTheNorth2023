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

const getCharacterMap = (text) => {
    const promptGenerator = `This is a bot that extracts the characters from short stories. 

Story:
Once upon a time, there was a brave knight named Sir Simon. Sir Simon loved his kingdom and would always defend it from harm. One day, Sir Simon heard rumors of a dragon named Merlin, who lived in a cave nearby. Merlin was known to kidnap princesses and take them to his cave. Sir Simon was determined to rescue the princesses and rid the kingdom of Merlin. He armed himself with his sword and set out on his mission. As Sir Simon approached the cave, he saw Merlin flying in the sky. The dragon spotted the knight and swooped down to attack. Sir Simon stood his ground and fought off the dragon. After a long and difficult battle, he was able to slay Merlin and rescue the princesses. The kingdom was overjoyed and held a grand celebration to honor Sir Simon. He was hailed as a hero and lived happily ever after with his kingdom and his bride.

extract the characters and their type from the story:
<character> Sir Simon, knight
<character> Merlin, dragon
<character> princesses, princesses

--
Story:
Once upon a time, three little pigs were living in a cozy little house in the woods. Each pig had its own favorite thing to do. The first little pig liked to read books, the second little pig liked to play with toys, and the third little pig liked to cook. One day, a big bad bear came along and knocked on the door of their house. He said he wanted to eat the three little pigs for dinner. The first little pig was so scared that he ran all the way to his brother's house. The second little pig was so scared that he ran all the way to his sister's house. The third little pig was so scared that he ran all the way to the bear's house. The bear had a big pot of water boiling on the stove, and he was just about to drop the three little pigs into the pot when the third little pig said, "Wait! I can make a better dinner than you can." The bear was so surprised that he let the third little pig go. The third little pig went back to his house and got some food from the refrigerator. He made a big bowl of porridge and brought it to the bear's house. The bear was so happy that he ate the porridge and forgot all about eating the three little pigs. The three little pigs were so happy that they had escaped from the bear, and they lived happily ever after.

extract the characters and their type from the story:
<character> first little pig, pig
<character> second little pig, pig
<character> third little pig, pig
<character> bear, bear

--
Story: 
Once upon a time, there was a man named Max who lived in a shoe. His shoe was big enough for him to live in comfortably and had everything he needed. He had a kitchen, a bedroom, and even a bathroom. He was very happy living in his shoe and didn't want for anything. One day, Max decided to go for a walk in the forest near his home. He was walking through the forest when he came across a woman who was also walking. Max said "Hello" to the woman, and she said "Hello" back. They started walking together and Max realized that the woman was also happy. They were both so happy that they forgot about their problems and enjoyed the moment. The woman had to go home after a while, but Max kept walking. He walked for miles and miles until he came to a clearing in the forest. In the clearing was a pond, and on the other side of the pond was a beautiful woman. Max was so captivated by her beauty that he forgot to be afraid. He walked over to her and said "Hello". The woman smiled at him and said "Hello". They were both so happy that they got married and had a child. The child's name was John, and he was a very happy child. John grew up and had children of his own, and they all lived in the shoe together. They were all very happy and enjoyed their lives together.

extract the characters and their type from the story:
<character> Max, man
<character> Woman, woman
<character> John, child

--
Story:
Once upon a time, a hedgehog and a frog were the best of friends. They would spend their days exploring the forest and playing games together. They were always there for each other in good times and bad. One day, while they were out exploring, they came across a big, shiny apple. The hedgehog was so excited, he ran over to the apple and started to eat it. The frog was a little more cautious, and he hopped around the apple, trying to figure out if it was safe to eat. The hedgehog had eaten almost the entire apple when he suddenly realized that it was not an apple at all, but a big, shiny mirror. He had eaten the mirror and now he had a big hole in his stomach! The frog was very worried about his friend, and he knew he had to do something to help him. He hopped over to the hedgehog and started to lick the hole in his stomach. He licked and licked until the hole was finally gone. The hedgehog was so grateful to his friend for saving him, and he promised to never eat a mirror again. From that day on, the hedgehog and the frog were closer than ever. They had learned that they could always count on each other, no matter what.

extract the characters and their type from the story:
<character> hedgehog, hedgehog
<character> frog, frog

---
Story:
${text}

extract the characters and their type from the story:
`

    const options = {...promptsOptions}
    options.data.prompt = promptGenerator;
    options.data.temperature = 0.9;

    return axios
        .request(options)
        .then(async function (response) {
            const character = response.data.generations[0].text

            let result = character.split("<character>");
            result = result.map((prompt) => prompt.trim()).filter((prompt) => prompt !== "").map(
                (prompt) => {
                    const splitPrompt = prompt.split(", ");
                    return {
                        name: splitPrompt[0],
                        type: splitPrompt[1]
                    }
                }
            );

            return result
        })
        .catch(function (error) {
            console.error(error);
        });
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
    options.data.prompt = "Write a children's story about " + text + " in ten sentences or less";
    options.data.temperature = 1.2;

    return axios
        .request(options)
        .then(function (response) {
            const storyText = response.data.generations[0].text

            console.log(storyText)
            return storyText
        })
        .catch(function (error) {
            console.error(error);
        });
}

const getGeneratedImages = async (text) => {
    const characterMap = await getCharacterMap(text);
    console.log(characterMap)

    // const promptGenerator = "Generate four image prompts separated by periods to give to stable diffusion in order to accurately represent the following story: \""+text+"\""
    const promptGenerator = `This is a bot that extracts six scenes that would be illustrated in a picture book from stories without using any pronouns. 

Story:
Once upon a time, there was a brave knight named Sir Simon. Sir Simon loved his kingdom and would always defend it from harm. One day, Sir Simon heard rumors of a dragon named Merlin, who lived in a cave nearby. Merlin was known to kidnap princesses and take them to his cave. Sir Simon was determined to rescue the princesses and rid the kingdom of Merlin. He armed himself with his sword and set out on his mission. As Sir Simon approached the cave, he saw Merlin flying in the sky. The dragon spotted the knight and swooped down to attack. Sir Simon stood his ground and fought off the dragon. After a long and difficult battle, he was able to slay Merlin and rescue the princesses. The kingdom was overjoyed and held a grand celebration to honor Sir Simon. He was hailed as a hero and lived happily ever after with his kingdom and his bride.

extract six scenes from the story:
<scene> There was a brave knight
<scene> A dragon lived in a cave and kidnapped princesses
<scene> The knight approached the cave armed with the knight's sword
<scene> The dragon attacked the knight
<scene> The knight rescued the princesses
<scene> The kingdom celebrated the knight
---
Story:
Once upon a time, three little pigs were living in a cozy little house in the woods. Each pig had its own favorite thing to do. The first little pig liked to read books, the second little pig liked to play with toys, and the third little pig liked to cook. One day, a big bad bear came along and knocked on the door of their house. He said he wanted to eat the three little pigs for dinner. The first little pig was so scared that he ran all the way to his brother's house. The second little pig was so scared that he ran all the way to his sister's house. The third little pig was so scared that he ran all the way to the bear's house. The bear had a big pot of water boiling on the stove, and he was just about to drop the three little pigs into the pot when the third little pig said, "Wait! I can make a better dinner than you can." The bear was so surprised that he let the third little pig go. The third little pig went back to his house and got some food from the refrigerator. He made a big bowl of porridge and brought it to the bear's house. The bear was so happy that he ate the porridge and forgot all about eating the three little pigs. The three little pigs were so happy that they had escaped from the bear, and they lived happily ever after. 

extract six scenes from the story: 
<scene> Three little pigs lived in a cozy little house in the woods
<scene> A big bad bear came along and knocked on the door of the pig's house
<scene> The bear had a big pot of water boiling on the stove and was just about to drop the three little pigs into the pot 
<scene> The third little pig made a big bowl of porridge and brought it to the bear
<scene> The bear was so happy that the bear ate the porridge and forgot all about eating the three little pigs
<scene> The three little pigs were so happy that the three little pigs had escaped from the bear, and the three little pigs lived happily ever after

---
Story:
Once upon a time, a hedgehog and a frog met and became friends. They would spend their days exploring the forest and playing together. One sunny day, they decided to go for a swim in the river. The hedgehog was a great swimmer, and the frog was happy to join him. They had so much fun splashing around and chasing each other. They even found a big rock to sit on and rest. The hedgehog and the frog were the best of friends, and they enjoyed spending time together, no matter what they were doing.

extract six scenes from the story: 
<scene> A hedgehog and a frog became friends
<scene> The hedgehog and frog would spend the day exploring the forest and playing games
<scene> The hedgehog and frog went for a swim in the river
<scene> The hedgehog and frog had so fun splashing around and chasing each other
<scene> The hedgehog and frog found a big rock to sit on and rest
<scene> The hedgehog and the frog were the best of friends

---
Story:
Once upon a time, there was a peaceful kingdom that was often visited by a powerful wizard. One day, the wizard was flying over the kingdom's castle when he saw a strange cloud formation in the distance. As he got closer, he realized that it was not a cloud at all, but a giant dragon! The dragon was flying towards the castle, and the wizard could see that it was causing a huge thunderstorm. The dragon's wings were beating so hard that they were creating strong winds, and its fiery breath was turning the rain into huge bolts of lightning. The wizard knew he had to do something to stop the dragon, so he cast a powerful spell that made the dragon's wings too heavy to fly. The dragon crashed to the ground, and the thunderstorm finally stopped. The wizard was a hero, and the kingdom was safe once again. The people of the kingdom thanked the wizard for his bravery and for saving their kingdom from the dragon's thunderstorm.

extract six scenes from the story: 
<scene> A peaceful kingdom was often visited by a powerful wizard
<scene> The wizard saw a strange cloud formation in the distance
<scene> The dragon was flying towards the castle, and the wizard could see that the dragon was causing a huge thunderstorm
<scene> The wizard cast a powerful spell that made the dragon's wings too heavy to fly
<scene> The dragon crashed to the ground, and the thunderstorm finally stopped
<scene> The wizard was a hero, and the kingdom was safe once again

---
Story:
Once upon a time, in a magical forest, there grew a mysterious mushroom. The mushroom was no ordinary fungus, for it had the power to reveal the future. Those who were brave enough to pluck the mushroom and eat it would gain insight into what tomorrow may bring. Some believed that the mushroom brought good luck, while others were skeptical, claiming that it was just a myth. A young girl named Lily wanted to find out for herself. She ventured deep into the forest, searching for the mysterious mushroom. At last, she found it, glowing brightly in the shadows. With a hesitant heart, she plucked it and brought it home. Her parents were skeptical, but they let her eat it anyway. That night, Lily had the most amazing dreams. She saw herself doing things she had never done before, meeting new people, and going on adventures. When she woke up, she knew that the mushroom had given her a glimpse of her future. From that day on, Lily visited the magical forest often, seeking out the mysterious mushroom. Each time she ate it, she gained a little more insight into what her future held. She knew that it was not just a myth, but a powerful tool that could help her make the most of her life.

extract six scenes from the story: 
<scene> Once upon a time, in a magical forest, there grew a mysterious mushroom
<scene> The mushroom had the power to reveal the future
<scene> The girl ventured into the forest
<scene> The girl found the mushroom and brought the mushroom home
<scene> The girl ate the mushroom and had amazing dreams
<scene> From that day on, the girl visited the magical forest often, seeking out the mysterious mushroom

---
Story:
${text}

extract six scenes from the story:
`

    const options = {...promptsOptions}
    options.data.prompt = promptGenerator;
    options.data.temperature = 0.9;

    return axios
        .request(options)
        .then(async function (response) {
            const prompts = response.data.generations[0].text

            let promptList = prompts.split("<scene>");
            promptList = promptList.map((prompt) => prompt.trim()).filter((prompt) => prompt !== "").map(
                (prompt) => {
                    characterMap.forEach((character) => {
                        prompt = prompt.replace(character.name, character.type)
                    })
                    return prompt
                }
            );
            console.log(promptList)

            let resultPromises = []
            const waitTime = (promptList.length + 1) * 2400

            for (let i = 0; i < promptList.length; i++) {
                resultPromises.push("")
            }

            for (let i = 0; i < promptList.length; i++) {
                setTimeout(() => {
                    const realPrompt = promptList[i] + ", drawn by a child, watercolor --q .25"

                    sendMessageMJ(realPrompt).then(async (messageId) => {
                        if (messageId === undefined) {
                            return "Image failed to generate"
                        }

                        await wait(1100);
                        return retrieveMessageMJ(messageId, waitTime);
                    }).then((url) => {
                        resultPromises[i] = url
                    })
                }, (i + 1) * 2400)

            }

            while (resultPromises.includes("")) {
                await wait(2000);
                console.log("Checking if all images are done")
            }

            console.log(resultPromises)

            return resultPromises
        })
        .catch(function (error) {
            console.error(error);
        });
}

const getTitle = async (text) => {
    const promptGenerator = `This is a bot that predicts a title for the short story.

    Story:
    Once upon a time, there was a brave knight named Sir Simon. Sir Simon loved his kingdom and would always defend it from harm. One day, Sir Simon heard rumors of a dragon named Merlin, who lived in a cave nearby. Merlin was known to kidnap princesses and take them to his cave. Sir Simon was determined to rescue the princesses and rid the kingdom of Merlin. He armed himself with his sword and set out on his mission. As Sir Simon approached the cave, he saw Merlin flying in the sky. The dragon spotted the knight and swooped down to attack. Sir Simon stood his ground and fought off the dragon. After a long and difficult battle, he was able to slay Merlin and rescue the princesses. The kingdom was overjoyed and held a grand celebration to honor Sir Simon. He was hailed as a hero and lived happily ever after with his kingdom and his bride.
    
    extract the title: 
    <title> The dragon and the knight </title>
    ---
    Story:
    Once upon a time, three little pigs were living in a cozy little house in the woods. Each pig had its own favorite thing to do. The first little pig liked to read books, the second little pig liked to play with toys, and the third little pig liked to cook. One day, a big bad bear came along and knocked on the door of their house. He said he wanted to eat the three little pigs for dinner. The first little pig was so scared that he ran all the way to his brother's house. The second little pig was so scared that he ran all the way to his sister's house. The third little pig was so scared that he ran all the way to the bear's house. The bear had a big pot of water boiling on the stove, and he was just about to drop the three little pigs into the pot when the third little pig said, "Wait! I can make a better dinner than you can." The bear was so surprised that he let the third little pig go. The third little pig went back to his house and got some food from the refrigerator. He made a big bowl of porridge and brought it to the bear's house. The bear was so happy that he ate the porridge and forgot all about eating the three little pigs. The three little pigs were so happy that they had escaped from the bear, and they lived happily ever after. 
    
    extract the title: 
    <title> The Three Little Pigs and the Hungry Bear </title>
    ---
    Story:
    Once upon a time, a hedgehog and a frog met and became friends. They would spend their days exploring the forest and playing together. One sunny day, they decided to go for a swim in the river. The hedgehog was a great swimmer, and the frog was happy to join him. They had so much fun splashing around and chasing each other. They even found a big rock to sit on and rest. The hedgehog and the frog were the best of friends, and they enjoyed spending time together, no matter what they were doing.
    
    extract the title: 
    <title> The Hedgehog and the Frog </title>
    ---
    Story:
    Once upon a time, there was a peaceful kingdom that was often visited by a powerful wizard. One day, the wizard was flying over the kingdom's castle when he saw a strange cloud formation in the distance. As he got closer, he realized that it was not a cloud at all, but a giant dragon! The dragon was flying towards the castle, and the wizard could see that it was causing a huge thunderstorm. The dragon's wings were beating so hard that they were creating strong winds, and its fiery breath was turning the rain into huge bolts of lightning. The wizard knew he had to do something to stop the dragon, so he cast a powerful spell that made the dragon's wings too heavy to fly. The dragon crashed to the ground, and the thunderstorm finally stopped. The wizard was a hero, and the kingdom was safe once again. The people of the kingdom thanked the wizard for his bravery and for saving their kingdom from the dragon's thunderstorm.
    
    extract the title: 
    <title> Stopping the Dragon </title>
    
    ---
    Story:
    Once upon a time, in a magical forest, there grew a mysterious mushroom. The mushroom was no ordinary fungus, for it had the power to reveal the future. Those who were brave enough to pluck the mushroom and eat it would gain insight into what tomorrow may bring. Some believed that the mushroom brought good luck, while others were skeptical, claiming that it was just a myth. A young girl named Lily wanted to find out for herself. She ventured deep into the forest, searching for the mysterious mushroom. At last, she found it, glowing brightly in the shadows. With a hesitant heart, she plucked it and brought it home. Her parents were skeptical, but they let her eat it anyway. That night, Lily had the most amazing dreams. She saw herself doing things she had never done before, meeting new people, and going on adventures. When she woke up, she knew that the mushroom had given her a glimpse of her future. From that day on, Lily visited the magical forest often, seeking out the mysterious mushroom. Each time she ate it, she gained a little more insight into what her future held. She knew that it was not just a myth, but a powerful tool that could help her make the most of her life.
    
    extract the title: 
    <title> Magic Mushrooms </title>
    
    ---
    Story:
    Once upon a time, there was a fox named Freddie. Freddie was a cunning fox, and he loved to play tricks on his friends. He would often disguise himself as an attractive female human to trick them. One day, Freddie was out playing in the forest when he came across a group of other foxes. They were all having a great time, chasing each other around and playing games. Freddie wanted to join in, so he pretended to be injured and helpless. The other foxes saw Freddie and came to help him. They took him back to their den and nursed him back to health. Freddie was so grateful that he decided to join the group and become their friend. The group of foxes had so much fun with Freddie that they decided to go on adventures together. They traveled far and wide, exploring new places and meeting new friends. Freddie loved every minute of it, and he was grateful to have found such a great group of friends. The end.
    
    extract the title: 
    <title> The Fox and his Friends </title>
    
    ---
    Story:
    Once upon a time, there was a snail named Shelly. Shelly was a slow snail, and she loved to eat. She would often eat plants and vegetables, but her favourite food was lettuce. One day, Shelly was out eating in the garden when she came across a group of other snails. They were all having a great time, eating and slithering around. Shelly wanted to join in, so she pretended to be injured and helpless. The other snails saw Shelly and came to help her. They took her back to their garden and showed her all the best plants to eat. Shelly was so grateful that she decided to join the group and become their friend. The group of snails had so much fun with Shelly that they decided to go on adventures together. They traveled far and wide, eating all the best food and meeting new friends. Shelly loved every minute of it, and she was grateful to have found such a great group of friends. The end.
    
    extract the title: 
    <title> The Snail and her Friends </title>
    
    ---
    Story:
    ${text}
    
    extract the title:`

    const options = {...promptsOptions}
    options.data.prompt = promptGenerator;
    options.data.temperature = 0.9;

    return axios
        .request(options)
        .then(async function (response) {
            console.log("title " + response)
            const title = response.data.generations[0].text
            return title.substring(8, title.length - 8) //remove <title> and </title>
        })
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
            console.log(response.data)
            return response.data.messageId;
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        console.error(error);
    }
};

const retrieveMessageMJ = async (messageId, waitTime) => {
    const URL = `https://api.thenextleg.io/v2/message/${messageId}?expireMins=7`;

    const options = {
        method: 'GET',
        url: URL,
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${midjourneyKey}`
        }
    }

    try {
        while (true) {
            console.log("polling for " + messageId);
            await wait(waitTime);

            const response = await axios.request(options);
            const responseData = response.data;
            console.log(response.data)
            if (responseData.progress === 100) {
                return responseData.response.imageUrls[0]
            }
        }
    } catch (error) {
        console.error(error);
    }

};

const wait = function (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};



export {getStory, getGeneratedImages, getTitle, sendMessageMJ, retrieveMessageMJ}



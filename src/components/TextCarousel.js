import React, { useState, useEffect } from 'react';

const TextCarousel = () => {
    const messages = [
        "Generating your story...",
        "Coming up with a plot...",
        "Thinking up a moral to the story...",
        "Building up the suspense...",
        "Adding the unexpected plot twist...",
        "Taking a washroom break...",
        "Making the illustrations....",
        "Procrastinating...",
        "Scrolling on TikTok..."
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly select a message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            // Update the state with the new message
            setCurrentMessage(randomMessage);
        }, 2000);  // Change the message every 2 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", fontSize: "2em" }}>{currentMessage}</div>;
};

export default TextCarousel;

import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomCharacter = () => characters.charAt(Math.floor(Math.random() * characters.length));

const getRandomString = (length) => Array(length).fill('').map(getRandomCharacter).join('');

const CyclingCharacters = ({ length = 10 }) => {
    const [display, setDisplay] = useState(getRandomString(length));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplay(getRandomString(length));
        }, 10);

        return () => clearInterval(intervalId);
    }, [length]);

    return <span>{display}</span>;
};

export default CyclingCharacters;

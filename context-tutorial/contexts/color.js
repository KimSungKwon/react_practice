import React, { createContext, useState } from 'react';

// createContext의 기본값은 Provider의 value에 넣는 객체의 형태와 일치 시켜주기
const ColorContext = createContext({ 
    state: { color: 'black', subcolor: 'red' },
    actions: {
        setColor: () => {},
        setSubcolor: () => {}
    }
});

const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
        state: { color, subcolor },
        actions: { setColor, setSubcolor }
    };
    
    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

const { Consumer: ColorConsumer } = ColorContext;   // const ColorConsumer = ColorContext.Consumer 와 같은 의미

export { ColorProvider, ColorConsumer };

export default ColorContext;


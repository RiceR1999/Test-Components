import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({children, startingTheme}) => {
    
    const [theme, setTheme] = useState(startingTheme);
    return (
         <ThemeContext.Provider value={
            {setTheme, theme}
    }>
      {children}
    </ThemeContext.Provider>
    );

}
export { ThemeProvider };
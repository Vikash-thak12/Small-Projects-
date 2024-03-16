import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)    
        setShowResult(true)
        setRecentPrompts(input)
        const response = await runChat(input);
        let responseArray = response.split("**");
        let newArray;
        for(let i = 0; i<responseArray.length; i++) {
            if(i===0 || i%2 == 0) {
                newArray += responseArray[i];
            } else 
            {
                newArray +="<b>"+responseArray[i]+"</b>"
            }
        }

        setResultData(newArray)
        setLoading(false)
        setInput("")
    }

    // onSent("What is Software Engineering")

    const contextvalue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextvalue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider; 
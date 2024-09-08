import { useState } from "react";



export function MainPageFunctions() {

    const [isStartChangePopupOpen, setIsStartChangePopupOpen] = useState(false);
    const [selectedStart, setSelectedStart] = useState(null);

    const handleStartClick = (title, value, changingValue) => {
        console.log(title, value, changingValue)

        setSelectedStart({ title, fromValue: value, toValue: changingValue });
        setIsStartChangePopupOpen(true);

        console.log(selectedStart, isStartChangePopupOpen)


    };

    const handleConfirmStart = () => {
        console.log(selectedStart)
        if (selectedStart) {
            // Implement the logic to start the change
            console.log(`Starting change for ${selectedStart.title}`);
            // You might want to call an API or update the state here
        }
        console.log(selectedStart)
        setIsStartChangePopupOpen(false);
    };



    return {
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        setSelectedStart,
        handleStartClick,
    }
    
}
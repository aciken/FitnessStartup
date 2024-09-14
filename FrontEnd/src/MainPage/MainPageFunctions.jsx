import { useState } from "react";



export function MainPageFunctions() {

    const [isStartChangePopupOpen, setIsStartChangePopupOpen] = useState(false);
    const [selectedStart, setSelectedStart] = useState(null);
    const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [postId, setPostId] = useState(null);

    const getFromBetterName = (key) => {
        const nameMap = {
            'Diet Type': 'diet',
            'Meals Per Day': 'meals',
            'Fasting': 'fast',
            'Fasting Hours': 'fastHours',
            'Exercise 1': 'exercise1',
            'Exercise 1 Frequency': 'exercise1Times',
            'Exercise 2': 'exercise2',
            'Exercise 2 Frequency': 'exercise2Times',
            'Exercise 3': 'exercise3',
            'Exercise 3 Frequency': 'exercise3Times',
            'Sleep Duration': 'sleep',
            'Bedtime': 'bed',
            'Sleep Variation': 'varies',
            'Calorie Intake': 'calories'
        };
        return nameMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };


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

    const handleConfirmComment = () => {
        
        if (commentValue) {
            console.log(commentValue)
        }
        setIsCommentPopupOpen(false);
    };

    const handleCommentOpen = (id) => {
        setIsCommentPopupOpen(true);
        setPostId(id);
        
        console.log('set')
    };

    const handleCommentClose = () => {
        setIsCommentPopupOpen(false);
    };



    return {
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        setSelectedStart,
        handleStartClick,
        handleConfirmStart,
        isCommentPopupOpen,
        setIsCommentPopupOpen,
        commentValue,
        setCommentValue,
        handleConfirmComment,
        handleCommentOpen,
        handleCommentClose,
        getFromBetterName,
        postId
    }
    
}
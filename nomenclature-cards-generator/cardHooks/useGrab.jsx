import { useState, useRef, useCallback } from 'react';

export default function useGrab() {
    const [action, setAction] = useState('');
    const isLongPress = useRef;
    const [position, setPosition] = useState({ x: 50.0 });
    const timerRef = useRef();

    const startPressTimer = () => {
        setAction('Start');
        isLongPress = false
        timerRef.current = setTimeout(() => {
            isLongPress = true;
            setAction('longpress');
            console.log(action);
            window.addEventListener("mousemove", updateMove);
        }, 260)
    }

    const updateMove = useCallback(
        (e) => {
            setPosition((position) => {
                if (position.x - e.movementX <= 100 && position.x - e.movementX >= 0) {
                    return {
                        x: position.x - e.movementX
                    }
                } else {
                    return position;

                }
            })
        });



    const handleOnMouseDown = () => {
        setAction('Start');
        console.log(action);
        startPressTimer();
        window.addEventListener("mouseup", handleOnMouseUp);

    }

    const handleOnMouseUp = useCallback(() => {
        if (isLongPress) {
            window.removeEventListener("mousemove", updateMove);
        } else {
            setAction("click")
        }
        window.removeEventListener("mouseup", handleOnMouseUp);
        clearTimeout(timerRef.current);


    });

    const handleOnTouchStart = () => {
        window.addEventListener("touchstart", handleOnMouseUp);
        startPressTimer();
    }

    const handleOnTouchEnd = useCallback(() => {
        if (action === 'longpress') {
            window.removeEventListener("mousemove", updateMove);

        } else {
            setAction("click");
        }
        window.removeEventListener("touchend", handleOnTouchEnd);
        clearTimeout(timerRef.current);

    })

    return {
        action,
        handlers: {
            onMouseDown: handleOnMouseDown,
            onTouchStart: handleOnTouchStart,
        },
        styleGrab: {
            objectPosition: position.x + "%"
        }
    }
}
// Here this hook will be used to showcase next or before element on swipe 

import { useRef, useState } from "react";

export default function useSwiper(swipePx = 40, callbackFn,directionRef) {

    const startXRef = useRef(0);
    const isSwipe = useRef(false)

    function onTouchStart(e) {
        const touch = e.touches[0];
        startXRef.current = touch.clientX;
    }

    function onTouchMove(e) {
        const touch = e.touches[0];

        const dx = Math.abs(touch.clientX - startXRef.current);

        // If user moves finger → it's scroll, cancel long press
        if (dx > swipePx) {
            isSwipe.current = true;
            if(touch.clientX - startXRef.current>=0)directionRef.current='RTL'
            if(touch.clientX - startXRef.current<0)directionRef.current='LTR'
        } else {
            isSwipe.current = false;
            directionRef.current=null
        }
    }
    function onTouchEnd() {
        if (isSwipe.current) callbackFn()
    }
    return {
        Handlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd
        },
    }
}
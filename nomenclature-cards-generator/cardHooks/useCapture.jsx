import React from 'react'

import * as htmlToImage from 'html-to-image';

export default function useCapture(node) {

    const filter = (node) => {
        const exclusionClasses = ['remove-me'];
        return !exclusionClasses.some(classname => node.classList.contains(classname));
    }

    const Capture = async (node) => {
        let scale = 10;
        return htmlToImage.toPng(node, { filter: filter, pixelRatio: 6})
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                return img.src;
                
            })
            .catch(function (error) {
                console.log('oops, la fonction onCapture ne fonctionne pas', error);
            });

    }

  return (Capture)
}

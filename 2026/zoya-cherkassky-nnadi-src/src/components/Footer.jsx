import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function Credits() {
    return (
        <div className="w-[80%] md:w-[80%] mx-auto">
            <div className="w-full h-[3px] bg-black rounded-md"></div>
            <div className="py-5">
                <p className="text-[16px] mb-2">
                    Unless otherwise noted, photos courtesy of BOB (Robert Chase
                    Heishman) via the Neubauer Collegium.
                </p>
                <p className="text-[16px]">
                    Find the code for this interactive on{' '}
                    <a href="https://github.com/chicagomaroon/data-visualizations/tree/main/2026/zoya-cherkassky-nnadi-src/">
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

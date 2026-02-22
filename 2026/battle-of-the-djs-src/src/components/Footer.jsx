import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function Credits() {
    return (
        <div className="w-[90%] md:w-[80%] mx-auto">
            <div className="w-full h-[3px] bg-black rounded-md"></div>
            <div className="py-5">
                <p className="text-[16px] mb-2">
                    <a href="https://chicagomaroon.com/staff_name/nolan-shaffer/">
                        Nolan Shaffer
                    </a>{' '}
                    contributed additional reporting.
                </p>
                <p className="text-[16px]">
                    Find the code for this interactive on{' '}
                    <a href="https://github.com/chicagomaroon/data-visualizations/tree/main/2026/battle-of-the-djs-src">
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

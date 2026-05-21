import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
    methodologyHeader,
    methodologyDataHeader,
    methodologyDataSubhead,
    methodologyData,
    methodologySampleHeader,
    methodologySampleSubhead,
    methodologySample,
    methodologyClassificationHeader,
    methodologyClassificationSubhead,
    methodologyClassification,
    methodologyMeasurementHeader,
    methodologyMeasurementSubhead,
    methodologyMeasurement
} from '../../public/content.js';

export default function Credits() {
    const [showMethods, setShowMethods] = useState(false);

    return (
        <div className="w-[90%] md:w-[80%] mx-auto">
            <div className="w-full h-[3px] bg-black rounded-md" />
            <div className="py-5">
                <p
                    id="method-show"
                    className="text-[16px] cursor-pointer select-none flex items-center font-serif"
                    onClick={() => setShowMethods(!showMethods)}
                >
                    <span
                        className="inline-flex shrink-0 -ml-[0.35em]"
                        style={{
                            transition: 'transform 0.3s',
                            transform: showMethods
                                ? 'rotate(90deg)'
                                : 'rotate(0deg)'
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretRight} size="lg" />
                    </span>
                    Read about our methodology.
                </p>

                {showMethods && (
                    <div id="methods" className="mt-6 max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4 font-serif">
                            {methodologyHeader}
                        </h2>

                        <h3 className="text-xl font-bold mt-8 mb-2 font-serif">
                            {methodologyDataHeader}
                        </h3>
                        <p className="text-sm italic mb-4 text-gray-700 font-serif">
                            {methodologyDataSubhead}
                        </p>
                        {methodologyData.map((p, i) => (
                            <p
                                key={i}
                                className="method-text text-base leading-relaxed mb-4 font-serif"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}

                        <h3 className="text-xl font-bold mt-8 mb-2 font-serif">
                            {methodologySampleHeader}
                        </h3>
                        <p className="text-sm italic mb-4 text-gray-700 font-serif">
                            {methodologySampleSubhead}
                        </p>
                        {methodologySample.map((p, i) => (
                            <p
                                key={i}
                                className="method-text text-base leading-relaxed mb-4 font-serif"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}

                        <h3 className="text-xl font-bold mt-8 mb-2 font-serif">
                            {methodologyClassificationHeader}
                        </h3>
                        <p className="text-sm italic mb-4 text-gray-700 font-serif">
                            {methodologyClassificationSubhead}
                        </p>
                        {methodologyClassification.map((p, i) => (
                            <p
                                key={i}
                                className="method-text text-base leading-relaxed mb-4 font-serif"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}

                        <h3 className="text-xl font-bold mt-8 mb-2 font-serif">
                            {methodologyMeasurementHeader}
                        </h3>
                        <p className="text-sm italic mb-4 text-gray-700 font-serif">
                            {methodologyMeasurementSubhead}
                        </p>
                        {methodologyMeasurement.map((p, i) => (
                            <p
                                key={i}
                                className="method-text text-base leading-relaxed mb-4 font-serif"
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}
                    </div>
                )}

                <p className="text-[16px] mt-3 font-serif">
                    Cover photo by{' '}
                    <a href="https://chicagomaroon.com/staff_name/nolan-shaffer/">
                        Nolan Shaffer
                    </a>
                    .
                </p>
                <p className="text-[16px] mt-3 font-serif">
                    Find the code for this interactive on{' '}
<<<<<<< HEAD
                    <a href="https://github.com/nshaff3r/folkfest-src">
=======
                    <a href="https://github.com/chicagomaroon/data-visualizations/tree/main/2026/liberal-arts-decline-src">
>>>>>>> origin/main
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

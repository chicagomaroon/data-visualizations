import React, { useState, useEffect } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import D3Visualization from './visualizations/D3Visualization';
import GrantExplorer from './GrantExplorer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { preBody, scrollOne, bodyOne, scrollTwo, bodyTwo, scrollThree, bodyThree, scrollFour, bodyFour, scrollFive, bodyFive, bodySix, bodySeven, bodyEight, bodyNine, end, method } from '../../public/data/scrollContent';

const Credits = () => {
  const [showMethods, setShowMethods] = useState(false);

  return (
    <div>
      <div className="credits_container">
        <p className="credits_font">
          Find the <a href="https://github.com/chicagomaroon/data-visualizations/tree/main/2025/maroon-grants-story-src">code for this project</a> on GitHub.
        </p>
        <p className="credits_font">
          Cover Photo by <a href="https://chicagomaroon.com/staff_name/damian-almeida-baray/">Damian Almeida Baray</a>.
        </p>
        <p className="credits_font" id="method-show" onClick={() => setShowMethods(!showMethods)}>
          <FontAwesomeIcon
            icon={faCaretRight}
            size="lg"
            onClick={() => setShowMethods(!showMethods)}
            style={{
              transition: 'transform 0.3s',
              transform: showMethods ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          />
          Read about our Methodology.
        </p>
        
        {showMethods && (
          <div id="methods">
            {method.map((text, index) => (
              <p className="method-text" key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ScrollContainer = (props) => {
  const { start, onStepEnter, onStepExit, textArray, height, first = false } = props;
  
  return (
    <div className="scroll_container" >
      {first && <div className="offset_container" height={0.9 * height + "px"}></div>}
        <Scrollama onStepEnter={onStepEnter} onStepExit={onStepExit} offset={1}>
          {textArray.map((text, index) => (
            <Step data={start + index} key={start + index}>
              <div className="text_container" style={{ marginBottom: 0.9 * height + "px" }}>
                <p className="scroll_font" dangerouslySetInnerHTML={{ __html: text }}></p>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
  )
}
export const TreemapAnimations = ({ currentStepIndex, scrollY, direction, highlighted=[] }) => {
  return (
    <div className="scroll__graphic" >
      <div id="graphic-title-container"
        style={{
          height: Math.min(50, 300-scrollY/5),
          display: 300-scrollY/5 <= 0 ? 'none' : 'block'
        }}>
        <h1
          id="graphic_title" 
          style={{ opacity: 1 }}
        >Terminated Federal Grants Identified by the <i>Maroon</i>
        </h1>
      </div>
      <D3Visualization currentStepIndex={currentStepIndex} direction={direction} highlighted={highlighted} />
    </div>
  )
}

const ScrollTest = ({ height }) => {
  const [scrollY, setScrollY] = useState(() => {
    const saved = localStorage.getItem('scrollY');
    return saved !== null ? parseInt(saved) : 0;
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const saved = localStorage.getItem('currentStepIndex');
    return (saved !== null && scrollY > 2000) ? parseInt(saved) : -1;
  });
  const [direction, setDirection] = useState(() => {
    const saved = localStorage.getItem('direction');
    return saved !== null ? saved : 'down';
  });

  useEffect(() => {
    localStorage.setItem('currentStepIndex', currentStepIndex.toString());
  }, [currentStepIndex]);

  useEffect(() => {
    localStorage.setItem('scrollY', scrollY.toString());
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }) => {
    setCurrentStepIndex(data);
    if (direction === "up") {
      setCurrentStepIndex(data - 1); // move back a step
      setDirection("up");
    } else if (direction === "down") {
      setCurrentStepIndex(data); // move forward
      setDirection("down");
    }
  };


  return (
    <div>
      <div className="pre_body_container">
          <div className="body_text_container">
            {preBody.map((text, index) => (
              <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </div>
      </div>
      <div id="scroll">
        <TreemapAnimations currentStepIndex={currentStepIndex} direction={direction} scrollY={scrollY} />
        <ScrollContainer onStepEnter={onStepEnter} onStepExit={onStepExit} textArray={scrollOne} start={0} height={ height } first={true}/>
        <div className="body_container">
          <div className="body_text_container">
            {bodyOne.map((text, index) => (
              <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </div>
          <TreemapAnimations currentStepIndex={currentStepIndex + 1} direction={direction} scrollY={scrollY} />
          <ScrollContainer onStepEnter={onStepEnter} onStepExit={onStepExit} textArray={scrollTwo} start={6} height={ height }/>
          <div className="inner_body_container">
            <div className="body_text_container">
              {bodyTwo.map((text, index) => (
                <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
              </div>
              <TreemapAnimations currentStepIndex={currentStepIndex + 2} direction={direction} scrollY={scrollY} />
              <ScrollContainer onStepEnter={onStepEnter} onStepExit={onStepExit} textArray={scrollThree} start={8} height={ height }/>
              <div className="inner_body_container">
                  <div className="body_text_container">
                  {bodyThree.map((text, index) => (
                    <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                  ))}
                  </div>
                  <TreemapAnimations currentStepIndex={currentStepIndex + 3} direction={direction} scrollY={scrollY} />
                  <ScrollContainer onStepEnter={onStepEnter} onStepExit={onStepExit} textArray={scrollFour} start={11} height={ height }/>
                  <div className="inner_body_container">
                      <div className="body_text_container">
                      {bodyFour.map((text, index) => (
                        <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                      ))}
                      </div>
                      <TreemapAnimations currentStepIndex={currentStepIndex + 4} direction={direction} scrollY={scrollY} />
                      <ScrollContainer onStepEnter={onStepEnter} onStepExit={onStepExit} textArray={scrollFive} start={14} height={ height }/>
                      <div className="inner_body_container">
                          <div className="body_text_container">
                          {bodyFive.map((text, index) => (
                            <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                          ))}
                          <h2 className="section-header">{bodySix}</h2>
                          {bodySeven.map((text, index) => (
                            <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                          ))}
                          <h2 className="section-header">{bodyEight}</h2>
                          {bodyNine.map((text, index) => (
                            <p className="body_font" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                          ))}
                          <p className="body_font">
                            {end}<img id="maroon_end" src="maroon_logo_m_black.svg"/>
                          </p>
                          </div>
                          <div className="contentdiv"></div>
                          <h2 className="section">Highlight Grants by...</h2>
                          <GrantExplorer />
                          <div className="contentdiv"></div>
                          <Credits />
                      </div>
                  </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollTest;

import React from 'react';
import styled from 'styled-components';
import Article from './components/Article';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;


const isMobile = {
	android: () => navigator.userAgent.match(/Android/i),

	blackberry: () => navigator.userAgent.match(/BlackBerry/i),

	ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

	opera: () => navigator.userAgent.match(/Opera Mini/i),

	windows: () => navigator.userAgent.match(/IEMobile/i),

	any: () => (
		isMobile.android() ||
		isMobile.blackberry() ||
		isMobile.ios() ||
		isMobile.opera() ||
		isMobile.windows()
	),
}
function App() {
  return (
    <AppContainer>
      <Article />
    </AppContainer>
  );
}

export default App; 
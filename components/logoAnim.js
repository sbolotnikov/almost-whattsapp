import styled from 'styled-components';
import { useEffect } from 'react';
function LogoAnim() {
  useEffect(() => {
    let el = document.querySelectorAll('#cardImage1>path');
    console.log(el);
    let i = 0;
    // var timerInterval = setInterval(function () {
    //   if (!el[i]) {

    //     clearInterval(timerInterval)

    //     return
    //   }
    //   el[i].style.opacity = '1'
    //   i++
    // }, 100)
  }, []);
  return (
    <Logo>
      <svg
        id="cardImage1"
        viewBox="0 0 148 147"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 468 */}
          <path
            style={{
              strokeDasharray: 468,
              strokeDashoffset: 468,
              animation: 'dash .5s linear 0s  forwards',
              animation: 'dash .5s reverse .5s  forwards'
            }}
            d="M60.7568 134.66C78.0015 137.755 95.8424 134.49 110.716 125.523L137.909 138.782L127.112 111.805C138.388 98.8962 144.177 82.4074 143.347 65.6315C142.517 48.8552 135.125 32.9987 122.627 21.2314C110.127 9.46262 93.441 2.65381 75.8961 2.17852C58.3512 1.70322 41.2543 7.59695 28.0173 18.6723C14.7814 29.7468 6.38434 45.1808 4.47953 61.8851C2.57492 78.5877 7.29803 95.3568 17.7219 108.848C28.1477 122.342 43.5122 131.565 60.7568 134.66Z"
            fill="white"
            stroke="gray"
          />
        
        <g filter="url(#filter0_d_0_1)">
          <path
            style={{
              opacity: 0, animation: 'reveal .25s linear .5s  forwards'
            }}
            d="M60.7568 134.66C78.0015 137.755 95.8424 134.49 110.716 125.523L137.909 138.782L127.112 111.805C138.388 98.8962 144.177 82.4074 143.347 65.6315C142.517 48.8552 135.125 32.9987 122.627 21.2314C110.127 9.46262 93.441 2.65381 75.8961 2.17852C58.3512 1.70322 41.2543 7.59695 28.0173 18.6723C14.7814 29.7468 6.38434 45.1808 4.47953 61.8851C2.57492 78.5877 7.29803 95.3568 17.7219 108.848C28.1477 122.342 43.5122 131.565 60.7568 134.66Z"
            fill="white"
          />
        </g>
        {/* 369 */}
        <g filter="url(#filter1_i_0_1)">
          <path
            style={{
              strokeDasharray: 369,
              strokeDashoffset: 369,
              animation: 'dash .25s linear .25s  forwards',
            }}
            d="M64.24 120.962C77.8022 123.425 91.8317 120.836 103.526 113.716L124.914 124.257L116.417 102.821C125.281 92.5686 129.83 79.4703 129.172 66.1422C128.515 52.8139 122.698 40.2147 112.867 30.8628C103.034 21.5098 89.9098 16.0962 76.1122 15.7142C62.3146 15.3321 48.8708 20.0101 38.4639 28.8057C28.0579 37.6006 21.4582 49.8603 19.9645 63.1308C18.4709 76.3998 22.1895 89.7235 30.3903 100.444C38.5927 111.167 50.6778 118.499 64.24 120.962Z"
            stroke="#44B253"
          />
        </g>
        <g filter="url(#filter1_i_0_1)">
        <path
          id="grad"
          style={{ opacity: 0, animation: 'gradient 2s linear .5s forwards' }}
          d="M64.24 120.962C77.8022 123.425 91.8317 120.836 103.526 113.716L124.914 124.257L116.417 102.821C125.281 92.5686 129.83 79.4703 129.172 66.1422C128.515 52.8139 122.698 40.2147 112.867 30.8628C103.034 21.5098 89.9098 16.0962 76.1122 15.7142C62.3146 15.3321 48.8708 20.0101 38.4639 28.8057C28.0579 37.6006 21.4582 49.8603 19.9645 63.1308C18.4709 76.3998 22.1895 89.7235 30.3903 100.444C38.5927 111.167 50.6778 118.499 64.24 120.962Z"
          fill="#44B253"
        />
        </g>
        {/* 258 */}
        
        <path
          style={{
            strokeDasharray: 258,
            strokeDashoffset: 258,
            animation: 'dash .5s linear .5s  forwards',
          }}
          d="M95.393 80.9511C96.8516 80.9511 98.1943 81.4743 99.1506 82.4335L111.457 94.7876C113.572 96.9096 113.505 100.437 111.302 102.646L108.472 105.427L107.786 105.969C106.347 107.093 104.724 108.014 102.976 108.702C101.353 109.331 99.7495 109.738 98.0688 109.942C97.9335 109.952 97.4698 110 96.6874 110C92.1377 110 75.7936 108.469 56.2425 88.8576C39.7439 72.3081 33.6583 60.1575 35.2425 46.9314C35.4357 45.323 35.8317 43.7145 36.4692 42.0286C37.1551 40.2554 38.0727 38.6276 39.2029 37.1839L39.483 36.7188L42.5065 33.6666C43.5594 32.6007 45.047 32 46.5925 32C48.0608 32 49.3938 32.5329 50.3501 33.4922L62.6662 45.8365C64.7816 47.9585 64.7044 51.4855 62.502 53.7043L55.8368 60.3901L56.8124 62.1438L56.8314 62.1781C59.0321 66.1574 62.0355 71.5882 67.7665 77.3272C73.4772 83.0652 78.8892 86.0782 82.8386 88.277L82.8548 88.286L84.6515 89.284L91.307 82.6079C92.3599 81.5518 93.8475 80.9511 95.393 80.9511Z"
          stroke="white"
        />
        <path
          style={{ opacity: 0, animation: 'reveal .5s linear 1s  forwards' }}
          d="M95.393 80.9511C96.8516 80.9511 98.1943 81.4743 99.1506 82.4335L111.457 94.7876C113.572 96.9096 113.505 100.437 111.302 102.646L108.472 105.427L107.786 105.969C106.347 107.093 104.724 108.014 102.976 108.702C101.353 109.331 99.7495 109.738 98.0688 109.942C97.9335 109.952 97.4698 110 96.6874 110C92.1377 110 75.7936 108.469 56.2425 88.8576C39.7439 72.3081 33.6583 60.1575 35.2425 46.9314C35.4357 45.323 35.8317 43.7145 36.4692 42.0286C37.1551 40.2554 38.0727 38.6276 39.2029 37.1839L39.483 36.7188L42.5065 33.6666C43.5594 32.6007 45.047 32 46.5925 32C48.0608 32 49.3938 32.5329 50.3501 33.4922L62.6662 45.8365C64.7816 47.9585 64.7044 51.4855 62.502 53.7043L55.8368 60.3901L56.8124 62.1438L56.8314 62.1781C59.0321 66.1574 62.0355 71.5882 67.7665 77.3272C73.4772 83.0652 78.8892 86.0782 82.8386 88.277L82.8548 88.286L84.6515 89.284L91.307 82.6079C92.3599 81.5518 93.8475 80.9511 95.393 80.9511Z"
          fill="white"
        />
        
        <defs>
          <filter
            id="filter0_d_0_1"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_1"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_1"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_i_0_1"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_0_1"
            />
          </filter>
        
        </defs>
      </svg>
    </Logo>
  );
}
export default LogoAnim;

const Logo = styled.div`
  height: 200px;
  width: 200px;
`;

import React from 'react';

export default function StartButton() {
  return (
    <>
      <style>
        {`
          .button-shadow {
            box-shadow: 5px 5px 20px -5px rgba(0, 0, 0, 0.4), inset 5px 10px 10px 2px rgba(256,256, 256, 0.4), inset -5px -5px 10px 2px rgba(0, 0, 0, 0.4);
            line-height: 12rem;
          }

          /* inset 2px 5px 10px 2px rgba(256,256, 256, 0.4) */

          .button-shadow:hover, .button-shadow:focus-within {
            box-shadow: inset 2px 5px 10px 2px rgba(256,256, 256, 0.4), inset -2px -2px 5px 2px rgba(0, 0, 0, 0.4);
            animation-name: press;
            animation-duration: 0.4s;
          }

          @keyframes press {
            from {
                box-shadow: 5px 5px 20px -5px rgba(0, 0, 0, 0.4), inset 5px 10px 10px 2px rgba(256,256, 256, 0.4), inset -5px -5px 10px 2px rgba(0, 0, 0, 0.4);
            }
            to {
              box-shadow: inset 2px 5px 10px 2px rgba(256,256, 256, 0.4), inset -2px -2px 5px 2px rgba(0, 0, 0, 0.4);
            }
          }
        `}
      </style>
      <div className="bg-blue-400 w-48 h-48 rounded-full text-center button-shadow text-4xl">
        <button>Start</button>
      </div>
    </>
  );
}

import { useState } from 'react';
import "../assets/styles/spinner.css"
import logo from "../assets/images/icone.png"

function IsLoading() {

  return (
<div id="root">
  <div className="divLoader" style={{ position: 'relative' }}>
    <svg className="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
      <path
        ng-attr-d="{{config.pathCmd}}"
        ng-attr-fill="{{config.color}}"
        stroke="none"
        d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        fill="#24377b"
        transform="rotate(179.719 50 51)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 51;360 50 51"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <img
      src={logo}
      alt="Logo"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width:"80px",
        transform: 'translate(-50%, -50%)',
      }}
    />
  </div>
</div>





  )
}

export default IsLoading

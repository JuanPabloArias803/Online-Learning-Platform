import styles from './reports.css';
import img from '../../../assets/galaxy.mp4'
import cursor from '../../../assets/rocket-coursor.png'

export function ReportScene() {

  const randomColor = () => {
    let r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0'); 
    let g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let color = "#" + r + g + b;

    return color;
  };

  let simRouteDB=[{id:1,name:"FrontEnd"},{id:2,name:"BackEnd"},{id:3,name:"IA"}];

  let styleTag=`

  `;

  let aux = `
      <a href="https://www.youtube.com/" class="link" style="cursor: url(${cursor}), auto;"><div class=${styles.sun}></div></a>
      <video
        class=${styles.reportsBackgroundVideo}
        src="${img}"
        autoplay
        muted
        loop
      ></video>
  `;

  simRouteDB.forEach(element => {
    aux+=`
      <a href="https://www.youtube.com/" class="link"><div class=${styles.planet} id="planet${element.id}">
        <p>${element.name}</p>
      </div></a>
    `;
    styleTag+=`
    #planet${element.id}{
      background: linear-gradient(to bottom right, ${randomColor()}, ${randomColor()});
      animation: orbit${element.id} ${5*element.id}s linear infinite;
    }
    a.link{
      color:black;
      font-size:10px;
      text-decoration: none;
      cursor: url(${cursor}), auto;
    }
    @keyframes orbit${element.id} {
      from {
          transform-origin: 50% 0;
          transform: rotate(0deg) translateX(${120*element.id}px) rotate(0deg);
      }
      to {
          transform-origin: 50% 0;
          transform: rotate(360deg) translateX(${120*element.id}px) rotate(-360deg);
      }
    }
    `;
  });

  let pageContent=`
    <style>
      ${styleTag}
    </style>
    <div class=${styles.reportsContainer} style="cursor: url(${cursor}), auto;">
      ${aux}
    </div>
  `;

  const logic = () => {
    console.log("hello from reports logic")
  }

  return {
    pageContent,
    logic
  }
}
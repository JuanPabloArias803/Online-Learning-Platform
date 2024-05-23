import { navigateTo } from '../../../Router';
import img from '../../../assets/galaxy.mp4';
import styles from './learn-routes.css';
import cursor from '../../../assets/rocket-coursor.png'

const randomColor = () => {
    let r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0'); 
    let g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let color = "#" + r + g + b;

    return color;
};

function extractNumber(str) {
    const match = str.match(/planet(\d+)/);
    if (match) {
        return parseInt(match[1], 10);
    } else {
        return null;
    }
}

export function RoutesScene(params){
    let pageContent=`
    <style id="estilos"></style>
    <div id="routes-container"></div>
    `;
    let logic= async ()=>{
        const resp = await fetch('http://localhost:3000/routes');
        const routes = await resp.json();
        const routesContainer = document.getElementById('routes-container');
        const estilos = document.getElementById('estilos');
        routesContainer.innerHTML=`
        <video
            class=${styles.reportsBackgroundVideo}
            src="${img}"
            autoplay
            muted
            loop
        ></video>
        <div class=${styles.sun}></div>
        ${routes.map(route => `
            <div class="${styles.planet}" id="planet${route.id}">
                <p>${route.name}</p>
            </div>`
        ).join('')}
        `;
        let estilosDinamicos=""
        routes.forEach(element => {
            estilosDinamicos+= 
            `
            #planet${element.id}{
                background: linear-gradient(to bottom right, ${randomColor()}, ${randomColor()});
                animation: orbit${element.id} ${5*element.id}s linear infinite;
              }
              @keyframes orbit${element.id} {
                from {
                    transform-origin: 50% 0;
                    transform: rotate(0deg) translateX(${100*element.id}px) rotate(0deg);
                }
                to {
                    transform-origin: 50% 0;
                    transform: rotate(360deg) translateX(${100*element.id}px) rotate(-360deg);
                }
              }`
        });
        estilos.innerHTML=`
            #routes-container{
                position: relative;
                height: 90vh;
                overflow: hidden;
                cursor: url(${cursor}), auto;
            }
            ${estilosDinamicos}
        `;
        document.querySelectorAll(`.${styles.planet}`).forEach(div => {
            div.addEventListener('click', (e) => {
                navigateTo(`/dashboard/routes/languages?routeID=${extractNumber(e.currentTarget.id)}`);
            });
        });
    }

    return {
        pageContent,
        logic
    };
}

import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'
import { Menu } from '../../../components/menu/menu';
export function ModuleChallengesScene(params){
    let pageContent = `
        <style>
            .module-challenges-container{
                background-image: url(${img});
                background-size: cover;
                min-height: 90vh;
                cursor: url(${cursor}), auto;
                width: 100%;
                position:relative;
                padding:20px;
                overflow:hidden;
                display: flex;
                flex-direction:column;
                align-content: center;
                gap: 20px;
            }

            .menu-challenge-child div{
                padding:20px;
            }

            .menu-challenge-child div:hover{
                cursor:pointer;
                background: linear-gradient(rgb(118, 38, 247,0.3),rgb(118, 38, 247,0.3));
            }
        </style>    
        <div class="module-challenges-container"></div>
    `;
    let logic=function(){};
    if (params.get('moduleID')) {
        const moduleID = params.get('moduleID');

        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/modules?id=${moduleID}`);
            const module = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/challenges?sectionType=module`);
            const moduleChallenges = await resp2.json();
            const moduleChallengesContainer = document.querySelector('.module-challenges-container');
            moduleChallengesContainer.innerHTML=Menu(module[0].name,module[0].content,`Módulos de ${module[0].name}`);
            const fixMenu= document.querySelector(".menu-children");
            fixMenu.style.display="none";
            moduleChallenges.filter(challenge=>challenge.idSection==module[0].id).forEach(e => {
                let selectSection=document.querySelector(`.menu-challenge-child`);
                let newChallenge=document.createElement('div');
                newChallenge.textContent=e.name;
                newChallenge.className="challengeDiv";
                newChallenge.style.textAlign="center";
                selectSection.appendChild(newChallenge);
            });
            document.querySelectorAll(".challengeDiv").forEach(div => {
                div.addEventListener('click', (e) => {
                    alert("funciona")
                    //navigateTo(`/dashboard/users`);
                });
            });
        };
    }
    
    
    return {
        pageContent,
        logic
    };
}
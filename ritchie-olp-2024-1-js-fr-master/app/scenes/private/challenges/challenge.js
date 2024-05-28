import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'
import { Menu } from '../../../components/menu/menu';
import { QuillDeltaToHtmlConverter  } from 'quill-delta-to-html';
import Quill from 'quill'; // Importa Quill desde node_modules
import 'quill/dist/quill.snow.css';
import { ToolbarContainer } from '../../../components/quill-toolbar/toolbar';
import styles from './challenge.css';

export function ChallengeScene(params){
    let pageContent=`
    <style>
    .challenge-container{
        background-image: url('../../../assets/galaxy.jpg');
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
    </style>
    <section class="challenge-container"></section>
    `;

    const persistContent = (quill) => {
        const content = quill.getContents();  // Obtén el contenido como Delta
        localStorage.setItem('quillContent', JSON.stringify(content));
    }

    let logic=function () {};
    if (params.get('challengeID')){
        const challengeID = params.get('challengeID');
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/challenges?id=${challengeID}`);
            const challenge = await resp.json();
            const challengeContainer = document.querySelector('.challenge-container');
            challengeContainer.innerHTML=`
                ${Menu(`Reto: ${challenge[0].name}`)}
            `;
            const fixMenu3_1= document.querySelector(".menu-challenge-title");
            const fixMenu3_2= document.querySelector(".menu-challenge-child");
            const fixMenu2_1=document.querySelector(".menu-children-title");
            const fixMenu2_2=document.querySelector(".menu-children-child");
            const fixMenu1=document.querySelector(".menu-theory-content");
            fixMenu2_1.textContent="Tiempo:"
            fixMenu2_2.innerHTML=`
                <div id="timer">00:00</div>
            `;
            fixMenu1.innerHTML=`
                <div id="editor"></div>
            `;
            //editor
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(challenge[0].content).ops, {});
            const htmlContent = converter.convert();
            console.log(htmlContent);
            const editor = document.querySelector('#editor');
            editor.innerHTML = `${htmlContent}`;
            //timer
            const timer = document.getElementById("timer");
            let timerInterval;
            let startTimer = () => {
                let second = 0,
                minute = 0,
                timerInterval = setInterval(function () {          
                    timer.innerHTML =
                    (minute < 10 ? "0" + minute : minute) +
                    ":" +
                    (second < 10 ? "0" + second : second);
                    second++;
                    if (second == 60) {
                        minute++;
                        second = 0;
                    }
                }, 1000);
                if(timer.textContent=="59:59"){
                    clearInterval(timerInterval)
                }
            };
            document.addEventListener('onload',startTimer());
            //answers
            fixMenu3_1.textContent="Tu respuesta:"
            const editorContent = `<div id="answerEditor" class="${styles.editor}"></div>`
            fixMenu3_2.innerHTML=`
                <form class="${styles.newForm}" id="create-challenge-form">
                    <div>
                        ${ToolbarContainer()}
                        ${editorContent}
                    </div>
                    <div class="${styles["action-buttons"]}">
                        <button type="submit">Enviar Respuesta</button>
                    </div>
                </form>
            `;
            const quill = new Quill('#answerEditor', {
                modules: {
                    toolbar: '#toolbar-container',
                },
                placeholder: 'Escribe aquí tu respuesta...',
                theme: 'snow',
                // modules: {
                //     formula: true,
                // }
            });
            document.querySelector('#create-challenge-form')
            .addEventListener('submit', async (e) => {
                // Evita que el formulario se envíe
                e.preventDefault();
                // Valida que el título y la descripción no estén vacíos
                persistContent(quill);
                if (!localStorage.getItem('quillContent')) {
                    alert('Por favor, ingresa una descripción para tu reto');
                    return;
                }
                if (confirm("¿Estás seguro de que deseas terminar el reto?")) {
                    // Aquí va la lógica para enviar el contenido a la base de datos
                    try {
                        // const data = {
                        //     id: Math.floor((Math.random()*1000000000)+1),
                        //     name: titleValue,
                        //     content: localStorage.getItem('quillContent'),
                        //     sectionType: sectionType,
                        //     idSection: sectionId
                        // }
                        // const response = await fetchApi('http://localhost:3000/challenges', {
                        //     method: 'POST',
                        //     body: JSON.stringify(data),
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //     }
                        // });
                        alert('Reto finalizado');
                        document.querySelector('#create-challenge-form').reset(); // Resetea el formulario
                        navigateTo('back');
                    } catch (error) {
                        alert('Ha ocurrido un error al publicar el reto. Por favor, inténtalo de nuevo más tarde.');
                        console.error('Error al publicar el reto:', error);
                    }
                } });
    }
    return {
        pageContent,
        logic
    }
}
}
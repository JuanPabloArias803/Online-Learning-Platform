import Quill from 'quill'; // Importa Quill desde node_modules
import 'quill/dist/quill.snow.css';
//import 'quill/dist/quill.bubble.css'; // para el tema bubble
import { ToolbarContainer } from '../../../components/quill-toolbar/toolbar';
import styles from './challenge.css';
import { fetchApi } from '../../../helpers/fetch-api';
import { navigateTo } from '../../../Router';
import { Menu } from '../../../components/menu/menu';
import cursor from '../../../assets/rocket-coursor.png'


export function CreateChallengeScene(params) {
    let pageContent="";
    let logic=function () {};
    if(params.get('sectionId')){
    // Inicializa el contenedor HTML para el editor y un botón para guardar el contenido
    const sectionTitle = params.get('sectionTitle');
    const sectionType = params.get('sectionType');
    const sectionId = params.get('sectionId');

    const editorContent = `<div id="editor" class="${styles.editor}"></div>`
    pageContent = `
    <style>
        .createChallenge-container{
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
        }
        </style>
        <section class="createChallenge-container">
            ${Menu(`Crear Reto de ${sectionTitle}`)}
        </section>
    `;

    const persistContent = (quill) => {
        const content = quill.getContents();  // Obtén el contenido como Delta
        localStorage.setItem('quillContent', JSON.stringify(content));
    }

    // Lógica para inicializar y configurar Quill
    logic = () => {
        // Quill.register('modules/formula', MathQuillBlot);
        // Espera a que el DOM esté completamente cargado
        const fixMenu= document.querySelector(".menu-children");
        const fixMenu2=document.querySelector(".menu-challenges");
        const fixMenu3=document.querySelector(".menu-theory-content")
        fixMenu.style.display="none";
        fixMenu2.style.display="none";
        fixMenu3.innerHTML=`
            <form class="${styles.newForm}" id="create-challenge-form">
                <div class="${styles["challenge_title-container"]}">
                    <label for="title">Título</label>
                    <input type="text" id="title" name="title" class="${styles["challenge_title-input"]}">
                </div>
                <div>
                    ${ToolbarContainer()}
                    ${editorContent}
                </div>
                <div class="${styles["action-buttons"]}">
                    <button type="submit">Publicar</button>
                </div>
            </form>
        `;

        const quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar-container',
            },
            placeholder: 'Crea tu mejor reto aquí...',
            theme: 'snow',
            // modules: {
            //     formula: true,
            // }
        });

        // Listener para manejar la publicación del contenido, o sea, enviar a base de datos.
        document.querySelector('#create-challenge-form')
            .addEventListener('submit', async (e) => {
                // Evita que el formulario se envíe
                e.preventDefault();
                // Valida que el título y la descripción no estén vacíos
                const titleValue = document.querySelector('#title').value;
                if (!titleValue) {
                    alert('Por favor, ingresa un título para tu reto');
                    return;
                }
                persistContent(quill);
                if (!localStorage.getItem('quillContent')) {
                    alert('Por favor, ingresa una descripción para tu reto');
                    return;
                }
                if (confirm("¿Estás seguro de que deseas publicar el reto?")) {
                    // Aquí va la lógica para enviar el contenido a la base de datos
                    try {
                        const data = {
                            id: Math.floor((Math.random()*1000000000)+1),
                            name: titleValue,
                            content: localStorage.getItem('quillContent'),
                            sectionType: sectionType,
                            idSection: sectionId
                        }
                        const response = await fetchApi('http://localhost:3000/challenges', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        alert('Reto publicado con éxito');
                        document.querySelector('#create-challenge-form').reset(); // Resetea el formulario
                        navigateTo('/dashboard/challenges');
                    } catch (error) {
                        alert('Ha ocurrido un error al publicar el reto. Por favor, inténtalo de nuevo más tarde.');
                        console.error('Error al publicar el reto:', error);
                    }
                } });
    };

    // Retorna el contenido de la página y la función de lógica
    
}
return {
    pageContent,
    logic
}
}

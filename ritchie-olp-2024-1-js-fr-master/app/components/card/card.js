import styles from './card.css';

export function Card(title,id) {

  return `
    <article id="card${id}" class="${styles.card}">
        <header>
            <h3 class="${styles["card-title"]}">${title}</h3>
        </header>
        <hr>
        <ul class="${styles["card-content"]}">
            
        </ul>
        <footer class="${styles["card-footer"]}">
            <button id="${id}" class="card-btn ${styles["card-btn"]}">Ver más...</button>
        </footer>
    </article>
  `;
}
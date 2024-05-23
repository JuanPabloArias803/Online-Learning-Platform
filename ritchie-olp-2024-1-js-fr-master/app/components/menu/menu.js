import styles from './menu.css';

export function Menu(title,content,parent) {

  return `
    <section class="menu-theory ${styles["menu-section"]}">
        <div class="menu-theory-title ${styles["menu-title"]}">${title}</div>
        <div class="menu-theory-content ${styles["menu-content-theory"]}">${content}</div>
    </section>
    <section class="menu-children ${styles["menu-section"]}">
        <div class="menu-children-title ${styles["menu-title"]}">${parent}</div>
        <div class="menu-children-child ${styles["menu-content-child"]}"></div>
    </section>
    <section class="menu-challenges ${styles["menu-section"]}">
        <div class="menu-challenge-title ${styles["menu-title"]}">Retos de ${title}</div>
        <div class="menu-challenge-child ${styles["menu-content-challenge"]}"></div>
    </section>
  `;
}
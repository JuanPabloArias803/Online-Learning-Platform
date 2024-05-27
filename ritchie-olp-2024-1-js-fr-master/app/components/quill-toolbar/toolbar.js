import styles from './toolbar.css'
export function ToolbarContainer() {
    return `
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
    <div id="toolbar-container" class="${styles["toolbar-container"]}">
    <span class="ql-formats">
        <select class="ql-font"></select>
    </span>
    <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
    </span>
    <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
    </span>
    <span class="ql-formats">
        <button class="ql-image"></button>
    </span>
</div>
    `
}
import styles from './global.scss';

const globalCss = new CSSStyleSheet();

globalCss.replaceSync(styles.toString());

export default globalCss;
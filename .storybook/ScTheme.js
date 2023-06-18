import { create } from '@storybook/theming';
import LogoImg from './assets/sc-logo-blue.svg'

export default create({
  base: 'light',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,  

  brandTitle: 'Snowaxis',
  brandUrl: 'https://www.snowcommerce.com/',
  brandImage: LogoImg,
  brandTarget: '_self',
});
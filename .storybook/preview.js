import '../src/assets/css/main.css'
import 'tw-elements'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'light',
    classTarget: 'html',
    stylePreview: true,
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
}

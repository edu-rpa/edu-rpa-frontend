import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#F8F9FA',
      },
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: '14px',
        marginTop: '10px',
      },
    },
  },
});
export default theme;

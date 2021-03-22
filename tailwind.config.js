module.exports = {
  purge: {
    content: ['./src/**/*.js', './next.config.js']
  },
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      3: '3 3 0%'
    },
    fontFamily: {
      display: ['Quicksand', 'sans-serif'],
      body: ['Quicksand', 'sans-serif']
    },
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem'
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.700'),
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900')
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900')
            },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500')
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400')
            },
            code: {
              color: theme('colors.gray.900')
            },
            a: {
              color: theme('colors.gray.900')
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800')
            },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200')
            }
          }
        }
      })
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')]
};

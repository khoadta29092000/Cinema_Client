module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {
            spacing: {
                '500': '500px',
              },
              height: {
                '500': '500px',
                '300': '300px',
              },
            colors: {
                'lightblue2': '#005B88',
                'lightblue1': '#B2E5FF',
                
              },
            backgroundImage: () => ({
                'login-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('https://images.unsplash.com/photo-1666860157040-61004ad58d3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')",
                'slide1-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://top10vietnam.vn/wp-content/uploads/2020/07/rap-chieu-phim-galaxy-cinema-1.jpg)',
                'slide2-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://langgo.edu.vn/public/files/upload/default/images/ielts/ielts-speaking-part-1-chu-de-film-movie-va-mau-tra-loi-band-9.jpg)',
                'slide3-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://images.unsplash.com/photo-1666860157040-61004ad58d3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)',
                'profile-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://images.unsplash.com/photo-1666860157040-61004ad58d3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)",
                   
                        'status-pending': "url('https://images.unsplash.com/photo-1666860157040-61004ad58d3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')",
                        'footer-texture': "url('/img/footer-texture.png')",
                    
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

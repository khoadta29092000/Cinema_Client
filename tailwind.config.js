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
              },
            colors: {
                'lightblue2': '#005B88',
                'lightblue1': '#B2E5FF',
              },
            backgroundImage: () => ({
                'login-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('https://imgproxy4.tinhte.vn/1j2lLcwj3mf_RI8_Ope-M1kAV_W2p0Z6Q4UIPSOTwHE/w:600/plain/https://images2.imgbox.com/d6/ab/3h5rYDCb_o.jpg')",
                'slide1-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png)',
                'slide2-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png)',
                'slide3-background':
                    'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://movieapi.cyberlearn.vn/hinhanh/game-of-throne_gp01.jpg)',
                'profile-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png')",
                   
                        'status-pending': "url('http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png')",
                        'footer-texture': "url('/img/footer-texture.png')",
                    
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

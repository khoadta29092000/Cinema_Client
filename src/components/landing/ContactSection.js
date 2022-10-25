import Title from 'components/landing/Title';

import Form from 'components/landing/Form';

export default function ContactSection() {
    return (
        <section className="pb-20 relative block bg-white">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <Title heading="Các bộ phim hot trong năm">
                </Title>

                <div className="grid mx-auto justify-items-center grid-cols-1 md:grid-cols-2  2xl:grid-cols-4">               
                    <div>
                    
                        <h3 className='font-bold text-2xl text-center mb-2'>1.skytour</h3>
                
                        <img src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700_skytour.jpg" width="200" /> 
                       
                    </div>
                     <div>
                       
                        <h3 className='font-bold text-2xl text-center mb-2'>2.Bỗng dưng trúng số</h3>
                        <img className='center' src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/b/d/bdts_main-poster_vi_print_1_.jpg" width="200" /> 
                    </div>
                    <div>
                        <h3 className='font-bold text-2xl  mb-2'>3.Thám tử Lừng Danh conan</h3>
                        <img src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/r/s/rsz_conan_movie_2022-_vnese_poster_1_.jpg" width="200" /> 
                    </div>
                    <div>
                        <h3 className='font-bold text-xl text-center mb-2'>4.BLACK ADAM</h3>
                        <img src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202209/10764_103_100003.jpg" width="200" /> 
                    </div>
                </div>

                <Form />
            </div>
        </section>
    );
}

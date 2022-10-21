export default function DefaultFooterDashboard() {
    return (
        <>
            <footer className="bg-gray-100 mt-0 -mt-44">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-700 font-medium py-1">
                                Copyright © {new Date().getFullYear()} Subscription Milk Delivery by{' '}
                                <a
                                    href="https://www.creative-tim.com?ref=mtk"
                                    className="text-gray-700 hover:text-gray-900 transition-all"
                                >
                                    Creative by FBT-Team
                                </a>
                                .
                            </div>
                        </div>
                    </div>
            </footer>
        </>
    );
}

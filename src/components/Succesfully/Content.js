
import { useEffect, useState } from "react";
import * as React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { NavLink } from 'react-router-dom';
import { Button } from "antd";
export default function Content() {

    return (
        <section className="relative pt-32 mb-32 py-16 w-full ">
            <div className="max-w-7xl mx-auto p-10  items-center " >
                <div className='container  mb-32  gap-4'>
                    <div className='col-span-2 mb-5'>
                        <h2 className="text-3xl font-semibold mb-5"> Chúc mừng quý khách đã đặt vé thành công </h2>
                        <div>
                            Chúc mừng quý khách hàng đã thanh toán thành công đơn hàng.
                        </div>
                        <div>Nhân viên sẽ checking cho khách hàng khi khách hàng đến cinema.
                        </div>
                      
                        Quý khách  cũng có thể theo dõi lịch sử bằng cách vô lịch sử và theo dõi đơn trên website của chúng tôi

                        <Button >
                            <NavLink to={{
                                pathname: "/"
                            }
                            } className="hover:text-red-600 " >
                                Về trang chủ
                            </NavLink>
                        </Button>

                    </div>
                    <div className=" ml-20 w-screen ">
                        <img src="https://cdn4.iconfinder.com/data/icons/round-buttons/512/green_tick.png" className=" ml-20 pl-20 text-center text-green-400 h-40 w-40" />
                    </div>

                </div>

            </div>

        </section>
    );
}

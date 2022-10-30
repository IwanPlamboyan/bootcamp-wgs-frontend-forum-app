import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen bg-[#28254C] relative">
      <div className="box">
        <div className="box__ghost">
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>

          <div className="box__ghost-container">
            <div className="box__ghost-eyes">
              <div className="box__eye-left"></div>
              <div className="box__eye-right"></div>
            </div>
            <div className="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="box__ghost-shadow"></div>
        </div>

        <div className="box__description bottom-[30px] sm:bottom-[80px]">
          <div className="box__description-container w-[200px] sm:w-[300px]">
            <div className="text-4xl">404</div>
            <div className="box__description-title">Halaman Tidak Ditemukan</div>
            <div className="box__description-text">Kami tidak dapat menemukan halaman yang Anda cari.</div>
          </div>

          <Link to="/" className="box__button">
            Pergi ke Halaman Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

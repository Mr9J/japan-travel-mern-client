import React from "react";

const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="banner">
        <div className="banner-overlay"></div>
        <h3>
          休閒旅遊，快樂假期
          <br />
          安排一趟日本旅遊行程，放鬆一下
        </h3>
      </div>
      <div className="information">
        <h3>遊玩主題</h3>
        <div className="circles">
          <div className="circle">
            <img src="images/Road covered in snow.jpg" alt="北海道雪景" />
            <p>北海道雪景，滑雪勝地</p>
          </div>
          <div className="circle">
            <img src="images/Sushi.jpg" alt="日本壽司" />
            <p>日本道地壽司與美食</p>
          </div>
          <div className="circle">
            <img src="images/Fujiyama.jpg" alt="富士山" />
            <p>富士山美景，美不勝收</p>
          </div>
          <div className="circle">
            <img src="images/Kiyomizudera.jpg" alt="清水寺" />
            <p>京都清水寺，千年古都</p>
          </div>
        </div>
      </div>
      <div className="banner-2">
        <h3>今天就開始規劃行程，找到最適合的方案 !</h3>
      </div>
      <div className="google-map">
        <h3>日本地理位置</h3>
        <p>
          日本在地理上屬於東北亞，東鄰太平洋，西以日本海、朝鮮海峽、東海與歐亞大陸的西伯利亞、朝鮮半島、中國大陸鄰接，南以菲律賓海與台灣、馬里亞納群島鄰接，北以宗谷海峽、鄂霍次克海與庫頁島、千島群島鄰接。日本一年四季都是舒爽怡人的氣候，四季變化分明。
          南部暖和，越往北部越寒冷。
          特別是冬天吹西北季風，在日本海側會下很多雪。
          另一方面、在太平洋側會持續是被稱為「冬晴」的乾燥晴天。
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5300755.760441594!2d137.10323600911116!3d35.18148688884259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2sus!4v1664253921541!5m2!1sen!2sus"
          style={{ border: 0 }}
          loading="lazy"
          title="google-map"
        ></iframe>
      </div>
    </div>
  );
};

export default Homepage;

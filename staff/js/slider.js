const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 0, // 次の画像に切替する時間
  },
  loop: true,
  loopedSlides: 5,
  speed: 8000, // 次の画像を読み込む速さ
  allowTouchMove: false, // スワイプ無効
  centeredSlides: true,
  preventInteractionOnTransition: true,

  breakpoints: {
    //画面幅による表示枚数と余白の指定
    0: {
      slidesPerView: 1.775, //200+20+155 = 375 355/200 = 1.775
      // spaceBetween: 10,
    },
    500: {
      slidesPerView: 2.3,
    },
    700: {
      slidesPerView: 3.3,
    },
    900: {
      slidesPerView: 4.3,
    },
    1025: {
      slidesPerView: 3,
    },

    1100: {
      slidesPerView: 3.5,
    },
    1250: {
      slidesPerView: 3.97, //305*3+20*4 = 985 1280-985 = 295 295/305 = 0.967 3+0.97 = 3.97
      // spaceBetween: 20,
    },
    1600: {
      slidesPerView: 4.97,
    },
    1900: {
      slidesPerView: 5.97,
    },
  },
});

// const mySwiper = new Swiper(".swiper", {
//   //名前を変える
//   loop: true, //最後→最初に戻るループ再生を有効に
//   loopedSlides: 5,
//   autoplay: {
//     delay: 3000, //何秒ごとにスライドを動かすか
//     stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
//     disableOnInteraction: true, //ユーザーの操作時に止める
//     reverseDirection: false, //自動再生を逆向きにする
//   },
//   speed: 1000, //表示切り替えのスピード
//   effect: "slide", //切り替えのmotion (※1)
//   centeredSlides: true, //中央寄せ

//   allowTouchMove: false, // スワイプで表示の切り替えを無効に
//   slidesPerView: 3, // 一度に表示する枚数
//   breakpoints: {
//     //画面幅による表示枚数と余白の指定
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     375: {
//       slidesPerView: 1.2,
//       spaceBetween: 15,
//     },
//     600: {
//       slidesPerView: 1.2,
//       spaceBetween: 15,
//     },
//     1025: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     1500: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     },
//   },
// });

/* =================================================== 
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
    fadeEffect: {
        crossFade: true
    },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullet：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/

const swiper = new Swiper(".swiper", {
  speed: 500, // 次の画像を読み込む速さ
  loop: true,
  loopedSlides: 6,
  spaceBetween: 0,

  autoplay: {
    delay: 500000, // 次の画像に切替する時間
    disableOnInteraction: false, // スライドのドラッグ等の操作時でも自動再生を無効にしない：false
  },
  effect: "fade", // フワッと切替
  fadeEffect: {
    crossFade: true, // 画像が重ならないように制御
  },
  // ボタンタイプのページネーション
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  // 左右の矢印アイコン
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// モーダル表示時に別スライドが表示されてしまうと、ボタンがクリックできなくなるので、
// モーダル表示時はスライドを止め、モーダルを閉じたらスライドを再開する
jQuery(".js-modal__btn--open").on("click", function () {
  swiper.autoplay.stop(); // モーダル表示時にスライドを止める
});
jQuery(".js-modal__btn--close").on("click", function () {
  swiper.autoplay.start(); // モーダルを閉じたらスライドを再開する
});

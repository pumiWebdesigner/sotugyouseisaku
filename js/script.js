{
  // ページ外からの遷移
  // ページがロードされた後にhash有無をチェックして処理
  $(document).ready(function () {
    if (window.location.hash) {
      // URLのhashが遷移する先（例：#access）
      var hash = window.location.hash; // #～を取得
      // 遷移する先とheaderの高さからスクロールする距離を計算
      scrollDistance = calcDistance(hash);
      // スムーズスクロール
      smoothScroll(scrollDistance, 0);
    }
  });

  // ページ内の遷移
  // aタグのクリック（ドロワー関連は専用処理あり）
  jQuery('a[href^="#"]').on("click", function (e) {
    e.preventDefault(); // aタグの通常の処理を止める
    // aタグのhrefが遷移する先
    var id = jQuery(this).attr("href"); // スクロール先のhrefを取得
    // 遷移する先とheaderの高さからスクロールする距離を計算
    scrollDistance = calcDistance(id);
    // スムーズスクロール
    smoothScroll(scrollDistance, 300);
    // ドロワーを閉じる
    if (jQuery(this).hasClass("js-drawer__nav--link")) {
      jQuery("body").removeClass("drawer-open");
    }
  });
  // 遷移する先とheaderの高さからスクロールする距離を計算
  function calcDistance(id) {
    var scrollDistance = 0; // #は初期値0
    console.log(id);
    if (id && id !== "#" && $(id).length) {
      // idが存在しない場合は$(id)がエラーになるので、idが存在する場合のみ処理を行う
      // id == "#"の場合、elementDistanceの取得でエラーになるので、#の場合はスクロールしない
      // ページ内にidと同名のDOM要素の数が1つ以上ある場合のみ処理を行う
      var elementDistance = $(id).offset().top; //画面最上部から要素の上端の距離
      var headerHeight = $(".header").outerHeight(); // ヘッダーの高さ（マージン含む）
      scrollDistance = elementDistance - headerHeight; // ヘッダーの高さを考慮した位置にスクロール
      scrollDistance -= 20; // 20px余裕を持たせる
    }
    return scrollDistance;
  }
  // 距離とスピードを渡してスムーズスクロール
  function smoothScroll(scrollDistance, speed) {
    jQuery("html,body").animate(
      {
        scrollTop: scrollDistance,
      },
      speed
    );
  }

  //ドロワーボタン（ハンバーガーボタン）
  jQuery("#js-drawer__btn").on("click", function (e) {
    e.preventDefault();
    jQuery("body").toggleClass("drawer-open");
  });

  //スクロール後処理__画面最上部からtargetの場所を超えたら起動
  jQuery(window).on("scroll", function () {
    // target：スマホのheader色、to-topボタン
    var target = 300;
    if (jQuery(this).scrollTop() > target) {
      jQuery("body").addClass("is-scroll");
    } else {
      jQuery("body").removeClass("is-scroll");
    }
  });
}

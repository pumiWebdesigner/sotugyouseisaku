{
  // form全体
  const form = jQuery("#js-form");
  // form送信ボタン
  const submit = jQuery("#js-submit");
  // 送信ボタンは初期値disabled
  submit.prop("disabled", true);

  // const email = jQuery(".input-email");
  // email.prop("invalid", false);
  form.submit(function () {
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          window.location.href = "./thanks/index.html";
          // form.slideUp();
          // jQuery("#js-success").slideDown();
        },
        200: function () {
          //送信に失敗したときの処理
          window.location.href = "./index.html";
          // form.slideUp();
          // jQuery("#js-error").slideDown();
        },
      },
    });
    return false;
  });

  form.on("change", function () {
    // jQueryは直接chedkValidity()をformに対して使用できない
    // 対象のDOM要素を取得（.get(0)や[0]を使用してから）checkValidityを行う
    // checkboxはrequired設定されているcheckboxのみをチェック対象としてしまうので、
    // 全てのcheckboxをチェックさせるよう個別にチェックを行う
    if (form.get(0).checkValidity()) {
      if ($('input[name="checkbox"]').length > 0) {
        if ($('input[name="checkbox"]:checked').length > 0) {
          submit.prop("disabled", false);
        } else {
          submit.prop("disabled", true);
        }
      } else {
        submit.prop("disabled", false);
      }
    } else {
      submit.prop("disabled", true);
    }
  });

  // 入力後もplaceholderが表示され続ける＆入力値が表示されない問題への対処
  $(document).ready(function () {
    var $date = $("input[type='date']");
    $date.on("input", function () {
      console.log("test");
      if ($(this).val().trim() !== "") {
        $(this).addClass("is-input");
      } else {
        $(this).removeClass("is-input");
      }
    });
  });

  // $(document).ready(function () {
  //   var $date = $("input [date]");

  //   // blur: フォーカスが外れた時
  //   $require.on("blur", function () {
  //     // this=requreied属性を持つ要素のうち、フォーカスが外れた要素
  //     var $this = $(this); // 毎回$(this)を実行するのは無駄なので変数に格納

  //     // input要素が単体：input要素のnextにエラーメッセージ
  //     // text, kana, tel, mail
  //     var $errorContainerInputNext = $this.next(".error-message"); //thisに対するエラーメッセージの要素
  //     // input要素が複数：input要素の親要素のjs-form-wrapperのnextにエラーメッセージ
  //     // radio, select
  //     // checkboxは別途処理
  //     var $errorMessageWrapperNext = $this.closest(".js-form--wrapper").next(".error-message");

  //     // お名前、お問い合わせ内容のバリデーション
  //     if ($this.hasClass("js-text")) {
  //       // お名前、お問い合わせ内容が入力必須の場合は、空文字か否かのチェックのみ行う
  //       // trimで空白を削除し、空白削除後が空文字かチェック
  //       if ($this.val().trim() === "") {
  //         $errorContainerInputNext.text("このフィールドは必須です。").show();
  //       } else {
  //         $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
  //       }
  //     }
  //   });
}

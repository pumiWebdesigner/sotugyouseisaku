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
          form.slideUp();
          jQuery("#js-success").slideDown();
        },
        200: function () {
          //送信に失敗したときの処理
          form.slideUp();
          jQuery("#js-error").slideDown();
        },
      },
    });
    return false;
  });

  form.on("change", function () {
    // jQueryは直接chedkValidity()をformに対して使用できない
    // 対象のDOM要素を取得（.get(0)や[0]を使用してから）checkValidityを行う
    if (form.get(0).checkValidity()) {
      submit.prop("disabled", false);
    } else {
      submit.prop("disabled", true);
    }
  });

  // var $require; // バリデータ対象を抽出
  $(document).ready(function () {
    var $require = $("#js-form [required]"); // 必須フィールドを選択
    console.log($require);
    // blur: フォーカスが外れた時
    $require.on("blur", function () {
      var $this = $(this); // 毎回$(this)を実行するのは無駄なので変数に格納
      var $errorContainer = $this.next(".error-message");
      $errorContainer.hide(); // 一旦エラーメッセージを隠す

      // お名前、お問い合わせ内容のバリデーション
      if ($this.hasClass("js-text")) {
        console.log("text");
        // お名前、お問い合わせ内容のパターン(入力必須ですが、特にフォーマットは強制しない)
        if ($this.val().trim() === "") {
          $errorContainer.text("このフィールドは必須です。").show();
        } else {
          $errorContainer.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // カナ入力のバリデーション
      if ($this.hasClass("js-kana")) {
        // カナ入力のパターン
        var kanaPattern = /^([ァ-ンー\s]+)$/;
        // カタカナ、長音符、空白以外が入っていた際の処理
        if (!$this.val().match(kanaPattern)) {
          $errorContainer.text("全角カタカナ（スペース含む）で入力してください。").show();
        } else {
          $errorContainer.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // 電話番号のバリデーション
      if ($this.hasClass("js-tel-number")) {
        // 電話番号のパターン
        var telPattern = /^\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
        if (!$this.val().match(telPattern)) {
          $errorContainer.text("有効な電話番号を入力してください。（例: 0123-456-789）").show();
        } else {
          $errorContainer.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // メールアドレスのバリデーション
      if ($this.hasClass("js-mail")) {
        // メールアドレスのパターン
        var mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$this.val().match(mailPattern)) {
          $errorContainer.text("有効なメールアドレスを入力してください。（例: user@example.com）").show();
        } else {
          $errorContainer.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });
}

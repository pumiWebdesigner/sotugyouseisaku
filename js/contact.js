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
    // checkboxはrequired設定されているcheckboxのみをチェック対象としてしまうので、
    // 全てのcheckboxをチェックさせるよう個別にチェックを行う
    if (form.get(0).checkValidity()) {
      if ($('input[name="checkbox"]:checked').length > 0) {
        submit.prop("disabled", false);
      } else {
        submit.prop("disabled", true);
      }
    }
  });

  // チェックボックスのみ一つだけ選択したらバリデーションチェックエラーの解除ができなかった
  $(document).ready(function () {
    var $require = $("#js-form [required]");

    // blur: フォーカスが外れた時
    $require.on("blur", function () {
      // this=requreied属性を持つ要素のうち、フォーカスが外れた要素
      var $this = $(this); // 毎回$(this)を実行するのは無駄なので変数に格納

      // input要素が単体：input要素のnextにエラーメッセージ
      // text, kana, tel, mail
      var $errorContainerInputNext = $this.next(".error-message"); //thisに対するエラーメッセージの要素
      // input要素が複数：input要素の親要素のjs-form-wrapperのnextにエラーメッセージ
      // radio, select
      // checkboxは別途処理
      var $errorMessageWrapperNext = $this.closest(".js-form--wrapper").next(".error-message");

      // お名前、お問い合わせ内容のバリデーション
      if ($this.hasClass("js-text")) {
        // お名前、お問い合わせ内容が入力必須の場合は、空文字か否かのチェックのみ行う
        // trimで空白を削除し、空白削除後が空文字かチェック
        if ($this.val().trim() === "") {
          $errorContainerInputNext.text("このフィールドは必須です。").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // カナ入力のバリデーション
      if ($this.hasClass("js-kana")) {
        // カナ入力のパターン
        var kanaPattern = /^([ァ-ンー\s]+)$/;
        // カタカナ、長音符、空白以外が入っていた際の処理
        if (!$this.val().match(kanaPattern)) {
          $errorContainerInputNext.text("全角カタカナ（スペース含む）で入力してください。").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // 電話番号のバリデーション
      if ($this.hasClass("js-tel-number")) {
        // 電話番号のパターン
        var telPattern = /^\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
        if (!$this.val().match(telPattern)) {
          $errorContainerInputNext.text("有効な電話番号を入力してください。（例: 0123-456-789）").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // メールアドレスのバリデーション
      if ($this.hasClass("js-mail")) {
        // メールアドレスのパターン
        var mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$this.val().match(mailPattern)) {
          $errorContainerInputNext.text("有効なメールアドレスを入力してください。（例: user@example.com）").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // ラジオボタンのバリデーション
      if ($this.hasClass("js-radio")) {
        if ($('input[name="radio"]:checked').length === 0) {
          $errorMessageWrapperNext.text("初診・再診どちらか選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // セレクトボックスのバリデーション
      if ($this.hasClass("js-select")) {
        if ($this.val() === "") {
          $errorMessageWrapperNext.text("プルダウンよりご連絡方法を選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });

  $(document).ready(function () {
    var $checkbox = $(".js-checkbox");

    // blur: フォーカスが外れた時
    $checkbox.on("blur", function () {
      // this=requreied属性を持つ要素のうち、フォーカスが外れた要素
      var $this = $(this); // 毎回$(this)を実行するのは無駄なので変数に格納
      var $errorMessageWrapperNext = $this.closest(".js-form--wrapper").next(".error-message");

      // input要素が複数：input要素の親要素のjs-form-wrapperのnextにエラーメッセージ
      // チェックボックスのバリデーション
      if ($this.hasClass("js-checkbox")) {
        if ($('input[name="checkbox"]:checked').length === 0) {
          $errorMessageWrapperNext.text("一つ以上の診療内容を選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });
}

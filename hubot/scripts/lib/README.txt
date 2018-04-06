[command]
	redmine [option] [issue_id]
	[issue_detail]

	# [issue_detail]は必ず改行後に指定してください。

[option]
	-l, --list
		: [issue_detail]で指定した条件に合致するチケットを一覧で取得します。
		: [issue_id]は指定不可です。
	-o, --open
		: [issue_detail]で指定した値でチケットを新規作成します。
		: [issue_id]は指定不可です。
	-c, --close
		: [issue_id]で指定したチケットをクローズします。
		: [issue_detail]は指定不可です。
	-o, --update
		: [issue_id]で指定した値でチケットを更新します。
		: [issue_detail]で更新内容を指定します。
	-m, --merged
	    : [issue_id]で画面IDを指定します。省略不可です。
		  特定の画面がARI様マージにおいてどのステータスなのかを表示します。
		: [issue_detail]は指定不可です。
	-ml, --mergedlist
	    : [issue_id]で画面IDを指定します。省略した場合、マージ作業済の全件リストを表示します。
		  画面IDは、(MP|MS)のみ必須のため、例えば"redmine -m MP"と実行した場合、PC版の全件リストを表示します。
		  ヒットした＝マージ作業済み(修正する場合、ARI様に連絡が必要)、となります。
		: [issue_detail]は指定不可です。
	-h, --help
		: ヘルプを表示します。
	さとみ翻訳
		: macの文字入力が、Windowsでは文字化けして見えなくなることがあります。
		  文字化けを検知し、さとみが自動で文字化けしていない文章を投稿してくれます。

[issue_id]
	チケット番号を指定します。

[issue_detail]
	*は新規作成の際の必須項目です。参照及び更新には必須項目はありません。

		*トラッカー：${tracker_id}
		*題名：${subject}
		説明：${description}
		*ステータス：${status_id}
		*優先度：${priority_id}
		担当者：${assigned_to_id}
		親チケット：${parent_issue_id}
		開始日：${start_date}(yyyy-MM-DD) # 検索の場合、>=yyyy-MM-DD などの指定も可能、使用可能な演算子は[<=][>=][=]のみ、何も指定しない場合は[=]
		期日：${due_date}(yyyy-MM-DD )# 検索の場合、>=yyyy-MM-DD などの指定も可能、使用可能な演算子は[<=][>=][=]のみ、何も指定しない場合は[=]
		予定工数：${estimated_hours}
		進捗率：${done_ratio}(0 - 100)
		*対応内容(デザイン):${custom_fields[22]}(なぜか日本語指定)
		*カテゴリ(デザイン):${custom_fields[23]}(なぜか日本語指定)
		注記:${notes}

[ex1)チケット新規登録]
redmine -o
トラッカー：13
題名：チケットのタイトルを指定します。
説明：チケットの説明文を指定します。
ステータス：6
優先度：2
担当者：131
親チケット：5037
開始日：2017-01-01
期日：2018-01-01
予定工数：40
進捗率：0
対応内容(デザイン):アイスタジオに対応中
カテゴリ(デザイン):WF読み合わせ
注記:コメントが入ります。

[ex2)現在デザイン作成の画面チケットを一覧表示]
redmine -l
トラッカー：13
カテゴリ(デザイン)：デザイン作成

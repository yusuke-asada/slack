module.exports = function(msg) {

	var Con = require('./constants');
	var con = new Con();

	var f_query_string = function(f_query) {

		var query_string = '';
		var delimiter = '&';
		var f_name = 'f[]='

		if(!f_query) {
			return '';
		}

		f_query.forEach(function(val) {

			query_string += delimiter + f_name + val;
		});

		return query_string;
	};

	var getViewId = function(msg) {

		var ret = '';

		msg.message.text.split(/[ 　\n]/g).forEach(function(val) {

			if(val.match(/^(MP|MS)/)){
				ret =  val;
			}
		});

		return ret;
	};

	var findIssue = function(query, fields, callback) {

		var uri = con.uri + 'issues.json';

		var xhr = new con.xml_http_request();
		xhr.onreadystatechange = function(){

			if (this.readyState === 4) {

				if(this.status === 200) {
					callback(this.responseText);
				}
				else {
					msg.send('error:' + this.status);
				}
			}
		};

		console.log(con.querystring.stringify(query) + f_query_string(fields));
		xhr.open('GET', uri + '?' + con.querystring.stringify(query) + f_query_string(fields));
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('X-Redmine-API-Key', con.redmine_api_key);
		xhr.send();
	};

	var buildMessage = function(issue) {

		message = issue.subject + ' ';
		message += con.uri + 'issues/' + issue.id;

		return message;
	};

	var output = function(responseText) {

		var responseJSON = JSON.parse(responseText);
		var issues = responseJSON.issues;
		var message = '';

		issues.forEach(function(issue) {

			message += buildMessage(issue) + '\n';
		});

//		msg.send(message);
	};

	var result_message = function(total, limit, offset) {

		var start = offset + 1;
		var end = start + limit -1;

		if(end > total) {
			end = total;
		}

		if(start > end) {
			start = 0;
			end = 0;
		}

		//msg.send( '検索結果：' + String(start) + '-' + String(end) + '/' + String(total));
		msg.send( 'ごめんなさいメンテ中です！Redmine直接確認してください。');
	};

	var message = 'redmine -l\n';
	message += 'トラッカー：13\n';
	message += 'ステータス：*\n';
	message += '題名：' + getViewId(msg) + '\n';

	var query = new con.query_builder(message);

	findIssue(query.search, query.search_fields, function(responseText){

		var json = JSON.parse(responseText);

		console.log(json);

		if(json.total_count == 0) {
			msg.send('指定した画面IDのチケットが存在しません。');
			return;
		}

		if(json.issues[0].parent.id === 5504) {
			msg.send('ARI様マージ作業中です。');
			return;
		}

		if(json.issues[0].parent.id === 7188) {
			msg.send('ARI様マージ完了です。');
			return;
		}
	});
};

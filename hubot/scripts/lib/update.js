module.exports = function(msg) {

	var Con = require('./constants');
	var con = new Con();

	var getIssueId = function(msg) {

		var ret = '';

		msg.message.text.split(/[ 　\n]/g).forEach(function(val) {

			if(val.match(/^[0-9]{4}.*/)){
				ret =  val;
			}
		});

		return ret;
	};

	var updateIssue = function(issue_id, query, callback) {

		var uri = con.uri_issues + issue_id + '.json';

		var xhr = new con.xml_http_request();
		xhr.onreadystatechange = function(){

			if(this.readyState == 4) {

				callback(this.responseText, this.status);
			}
		};

		xhr.open('PUT', uri);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('X-Redmine-API-Key', con.redmine_api_key);
		xhr.send(JSON.stringify(query));
	};

	var query = new con.query_builder(msg.message.text);
	var issue_id = getIssueId(msg);

	updateIssue(issue_id, query, function(responseText, responseCode){

		if(responseCode == 200) {

			msg.send('チケットを更新しました。');
			msg.send(con.uri_issues + issue_id);
		}else{

			msg.send('チケット更新に失敗しました。');
			msg.send(responseText);
		}
	});
};

module.exports = function(msg) {

	var Con = require('./constants');
	var con = new Con();

	var openIssue = function(query, callback) {

		var xhr = new con.xml_http_request();
		xhr.onreadystatechange = function(){

			if(this.readyState == 4) {

				callback(this.responseText, this.status);
			}
		};

		xhr.open('POST', con.uri_issues_json);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('X-Redmine-API-Key', con.redmine_api_key);
		xhr.send(JSON.stringify(query));
	};

	var query = new con.query_builder(msg.message.text);

	openIssue(query, function(responseText, responseCode){

		if(responseCode == 201) {

			msg.send('チケットを新規作成しました。');
			msg.send(con.uri_issues + JSON.parse(responseText).issue.id);
		}else{

			msg.send('チケット新規作成に失敗しました。');
			msg.send(responseText);
		}
	});
};

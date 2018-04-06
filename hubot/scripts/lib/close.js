module.exports = function(msg) {

	var Con = require('./constants');
	var con = new Con();

	const query = { issue:
		{
 			"status_id":"5",
			"done_ratio":"100",
			"assigned_to_id":"249",
		}
	};

	var getIssueId = function(msg) {

		var ret = '';

		msg.message.text.split(/[ 　\n]/g).forEach(function(val) {

			if(val.match(/^[0-9]{4}.*/i)){
				ret =  val;
			}
		});

		return ret;
	};

	var closeIssue = function(issue_id, query, callback) {

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

	var issue_id = getIssueId(msg);

	closeIssue(issue_id, query, function(responseText, responseCode){

		if(responseCode == 200) {

			msg.send('チケットをクローズしました。');
			msg.send(con.uri_issues + issue_id);
		}
		else{

			msg.send('チケットクローズに失敗しました。');
			msg.send(responseText);
		}
	});
};

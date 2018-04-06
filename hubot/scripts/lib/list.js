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

		msg.send(message);
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

		msg.send( '検索結果：' + String(start) + '-' + String(end) + '/' + String(total));
	};

	var query = new con.query_builder(msg.message.text);

	findIssue(query.search, query.search_fields, function(responseText){

		output(responseText);
		result_message(Number(JSON.parse(responseText).total_count), Number(query.search.limit), Number(query.search.offset)); 
	});
};

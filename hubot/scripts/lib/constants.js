var Constants = function() {

//	this.host = '************************'; //masked
	this.uri = 'https://' + this.host + '/';
	this.uri_issues = this.uri + 'issues/'
	this.uri_issues_json = this.uri + 'issues.json'
//	this.redmine_api_key = '***********************'; //masked

	this.xml_http_request = require('xmlhttprequest').XMLHttpRequest;
	this.querystring = require('querystring');
	this.query_builder = require('./query_builder');
	this.fs = require('fs');

}

module.exports = Constants;

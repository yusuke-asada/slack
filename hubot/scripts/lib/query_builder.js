module.exports = function(msg) {

	var query = {
		issue: {
			"project_id": "40",
		},
		search: {
			"project_id": "40",
			"limit": "100",
			"offset": "0",
		},

		search_fields: [],
	};

	const regex_tracker_id =  /^トラッカー(:|：)/;
	const regex_subject = /^題名(:|：)/;
	const regex_description = /^説明(:|：)/;
	const regex_status_id = /^ステータス(:|：)/;
	const regex_priority_id = /^優先度(:|：)/;
	const regex_assigned_to_id = /^担当者(:|：)/;
	const regex_parent_issue_id = /^親チケット(:|：)/;
	const regex_start_date = /^開始日(:|：)/;
	const regex_due_date = /^期日(:|：)/;
	const regex_estimated_hours = /^予定工数(:|：)/;
	const regex_done_ratio = /^進捗率(:|：)/;
	const regex_notes = /^注記(:|：)/;
	const regex_cf_22 = /^対応内容\(デザイン\)(:|：)/;
	const regex_cf_23 = /^カテゴリ\(デザイン\)(:|：)/;
	const regex_limit = /^limit(:|：)/;
	const regex_offset = /^offset(:|：)/;

	var build_formula = function(val, callback) {

		var regex = /^[<>=]{1,}/;
		var operator = val.match(regex);
		var date_string = val.replace(operator, '');

		if(!operator) {
			operator = '=';
		}

		console.log('ope:' + operator);
		console.log('date_string:' + date_string);

		callback(operator, date_string);
	};

	msg.split(/\n/g).forEach(function(val) {

		switch(true) {
			case regex_tracker_id.test(val):
				query.issue['tracker_id'] = decodeURIComponent(val.replace(regex_tracker_id, ''));
//				query.search['tracker_id'] = decodeURIComponent(val.replace(regex_tracker_id, ''));
				query.search_fields.push('tracker_id');
				query.search['op[tracker_id]'] = '=';
				query.search['v[tracker_id][]'] = decodeURIComponent(val.replace(regex_tracker_id, ''));
				break;
			case regex_subject.test(val):
				query.issue['subject'] = decodeURIComponent(val.replace(regex_subject, ''));
//				query.search['subject'] = decodeURIComponent(val.replace(regex_subject, ''));
				query.search_fields.push('subject');
				query.search['op[subject]'] = '~';
				query.search['v[subject][]'] = decodeURIComponent(val.replace(regex_subject, ''));
				break;
			case regex_description.test(val):
				query.issue['description'] = decodeURIComponent(val.replace(regex_description, ''));
//				query.search['description'] = decodeURIComponent(val.replace(regex_description, ''));
				query.search_fields.push('description');
				query.search['op[description]'] = '~';
				query.search['v[description][]'] = decodeURIComponent(val.replace(regex_description, ''));
				break;
			case regex_status_id.test(val):
				query.issue['status_id'] = decodeURIComponent(val.replace(regex_status_id, ''));
//				query.search['status_id'] = decodeURIComponent(val.replace(regex_status_id, ''));
				query.search_fields.push('status_id');

				var replaced = decodeURIComponent(val.replace(regex_priority_id, ''));
				if(replaced.match(/[\*oc]/).length > 0) {
					query.search['op[status_id]'] = replaced.match(/[\*oc]/);
				}
				else {
					query.search['op[status_id]'] = '=';
					query.search['v[status_id][]'] = replaced;
				}

				break;
			case regex_priority_id.test(val):
				query.issue['priority_id'] = decodeURIComponent(val.replace(regex_priority_id, ''));
//				query.search['priority_id'] = decodeURIComponent(val.replace(regex_priority_id, ''));
				query.search_fields.push('priority_id');
				query.search['op[priority_id]'] = '=';
				query.search['v[priority_id][]'] = decodeURIComponent(val.replace(regex_priority_id, ''));
				break;
			case regex_assigned_to_id.test(val):
				query.issue['assigned_to_id'] = decodeURIComponent(val.replace(regex_assigned_to_id, ''));
//				query.search['assigned_to_id'] = decodeURIComponent(val.replace(regex_assigned_to_id, ''));
				query.search_fields.push('assigned_to_id');
				query.search['op[assigned_to_id]'] = '=';
				query.search['v[assigned_to_id][]'] = decodeURIComponent(val.replace(regex_assigned_to_id, ''));
				break;
			case regex_parent_issue_id.test(val):
				query.issue['parent_issue_id'] = decodeURIComponent(val.replace(regex_parent_issue_id, ''));
//				query.search['parent_id'] = decodeURIComponent(val.replace(regex_parent_issue_id, ''));
				query.search_fields.push('parent_id');
				query.search['op[parent_id]'] = '=';
				query.search['v[parent_id][]'] = decodeURIComponent(val.replace(regex_parent_issue_id, ''));
				break;
			case regex_start_date.test(val):
				query.issue['start_date'] = decodeURIComponent(val.replace(regex_start_date, ''));
//				query.search['start_date'] = decodeURIComponent(val.replace(regex_start_date, ''));
				query.search_fields.push('start_date');
				build_formula(val.replace(regex_start_date, ''), function(operator, date_string) {
					query.search['op[start_date]'] = operator;
					query.search['v[start_date][]'] = date_string;
				});

				break;
			case regex_due_date.test(val):
				query.issue['due_date'] = decodeURIComponent(val.replace(regex_due_date, ''));
//				query.search['due_date'] = decodeURIComponent(val.replace(regex_due_date, ''));
				query.search_fields.push('due_date');
				build_formula(val.replace(regex_due_date, ''), function(operator, date_string) {
					query.search['op[due_date]'] = operator;
					query.search['v[due_date][]'] = date_string;
				});
				break;
			case regex_estimated_hours.test(val):
				query.issue['estimated_hours'] = decodeURIComponent(val.replace(regex_estimated_hours, ''));
//				query.search['estimated_hours'] = decodeURIComponent(val.replace(regex_estimated_hours, ''));
				query.search_fields.push('estimated_hours');
				query.search['op[estimated_hours]'] = '=';
				query.search['v[estimated_hours][]'] = decodeURIComponent(val.replace(regex_estimated_hours, ''));
				break;
			case regex_done_ratio.test(val):
				query.issue['done_ratio'] = decodeURIComponent(val.replace(regex_done_ratio, ''));
//				query.search['done_ratio'] = decodeURIComponent(val.replace(regex_done_ratio, ''));
				query.search_fields.push('done_ratio');
				query.search['op[done_ratio]'] = '=';
				query.search['v[done_ratio][]'] = decodeURIComponent(val.replace(regex_done_ratio, ''));
				break;
			case regex_notes.test(val):
				query.issue['notes'] = decodeURIComponent(val.replace(regex_notes, ''));
//				query.search['notes'] = decodeURIComponent(val.replace(regex_notes, ''));
				query.search_fields.push('notes');
				query.search['op[notes]'] = '~';
				query.search['v[notes][]'] = decodeURIComponent(val.replace(regex_notes, ''));
				break;
			case regex_cf_22.test(val):

				if(!query.issue['custom_fields']) {
					query.issue['custom_fields'] = [];
				}

				var name = val.replace(regex_cf_22, '');
				var value = val.replace(regex_cf_22, '');

				query.issue['custom_fields'].push({"value": value, "name": name, "id":22});
//				query.search['cf_22'] = value;
				query.search_fields.push('cf_22');
				query.search['op[cf_22]'] = '=';
				query.search['v[cf_22][]'] = decodeURIComponent(val.replace(regex_cf_22, ''));

				break;
				case regex_cf_23.test(val):

				if(!query.issue['custom_fields']) {
					query.issue['custom_fields'] = [];
				}

				var name = val.replace(regex_cf_23, '');
				var value = val.replace(regex_cf_23, '');

				query.issue['custom_fields'].push({"value": value, "name": name, "id":23});
//				query.search['cf_23'] = value;
				query.search_fields.push('cf_23');
				query.search['op[cf_23]'] = '=';
				query.search['v[cf_23][]'] = decodeURIComponent(val.replace(regex_cf_23, ''));

				break;
			case regex_limit.test(val):
				query.search['limit'] = decodeURIComponent(val.replace(regex_limit, ''));
				break;
			case regex_offset.test(val):
				query.search['offset'] = decodeURIComponent(val.replace(regex_offset, ''));
				break;
			default:
				break;
		}
	});

	return query;
};

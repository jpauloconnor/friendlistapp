var $topics = $('#topics');
var $concept = $('#concept');
var $example = $('#example');
var $challenge = $('#challenge');


var topicTemplate = "" + 
	"<tr>" +
	"<td>" +
	"{{concept}}" +
	"</td>" +
	"<td>" +
	"{{challenge}}" +
	"</td>" +
	"<td valign='top'>" +
    '<code>' +
    '<textarea id="update" rows="4" style="width:300px">' +
    '{{example}}' +
    '</textarea>' +
    '</code>' +
	"</td>" +
	"<td>"	+
	"<button id='{{id}}' class='remove btn btn-info'>X</button>" +
	"</td>" +
	 "</tr> <br>";

function addTopic(topic){
	$topics.append(Mustache.render(topicTemplate, topic));
	$concept.val('');
	$example.val('');
	$challenge.val('');
};


$(document).ready(function(){
	
//GET
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/paul/jquery',
		success: function(topics) {
			$.each(topics, function(i, topic){
				addTopic(topic);	
			});
		},
		error: function(){
			alert('error loading friends');
		}	
	});


//POST
$('#add-topic').on('click', function(){

		var topic = {
			concept: $concept.val(),
			example: $example.val(),
			challenge: $challenge.val()
		};
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/paul/jquery',
			data: topic,
			success: function(newTopic){
				addTopic(newTopic);	
			},

			error: function(){
				console.log('error saving');
			}
		});
	});

//PUT(UPDATE THE CODE IN THE TABLE)
// $('#example-update').on('click', function(){

// 		var update = {
// 			update: $update.val()
// 		};
// 		$.ajax({
// 			type: 'PUT',
// 			url: 'http://rest.learncode.academy/api/paul/jquery',
// 			data: update,
// 			success: function(newTopic){
// 				addTopic(newTopic);	
// 			},

// 			error: function(){
// 				console.log('error saving');
// 			}
// 		});
// 	});

//DELETE
	$topics.delegate('.remove', 'click', function(){

		var $li = $(this).closest('tr');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/paul/jquery/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});


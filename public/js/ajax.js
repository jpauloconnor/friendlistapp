/*
//alert('hello world');

$(document).ready(function(){

	//alert("hello world");
});
*/
var $friends = $('#friends');
var $name = $('#name');
var $occupation = $('#occupation');
var $age = $('#age');


var friendTemplate = "" + 
	"<tr>" +
	"<td>" +
	"{{name}}" +
	"</td>" +
	"<td>" +
	"{{occupation}}" +
	"</td>" +
	"<td>" +
	"{{age}}" +
	"</td>" +
	"<td>"	+
	"<button id='{{id}}' class='remove btn btn-info'>X</button>" +
	"</td>" +
	 "</tr> <br>";

var searchTemplate = "" +
	"<div><a href='http://rest.learncode.academy/api/learncode/friends/'>" + 
	"{{name}}" + 
	"</a>" + 
	"</div>";
          

function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
	$name.val('');
	$occupation.val('');
	$age.val('');
};

function searchTerm(term){
	$friends.append(Mustache.render(searchTemplate, term));
	$name.val('');
}
$(document).ready(function(){

	//AJAX GET Function - then loop through and create the DOM element to display it
	//success and error are promises - when we get the information do this if not
	//do this
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/friends',
		success: function(friends) {
		// console.log("I have friends!", data); //returns all of johnbob's friends
			$.each(friends, function(i, friend){
				addFriend(friend);	
			});

		},

		error: function(){
			alert('error loading friends');
		}	
	});

	//the above is an older way of using asynchronous calls and promises.  The succes and error still work but 
	//the newer syntax would be written like this:
	/*
	
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/friends'
	}).done(function(friends){
		$.each(friends, function(i, friend){
			addFriend(friend);
		});
	}).fail(function(){
		alert('error loading friends');
	});




	*/


	$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			occupation: $occupation.val(),
			age: $age.val()
		};
		//AJAX POST Function - click the button w/ id add-friend and then pass it to the API
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/learncode/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);	
			},

			// error: function(){
			// 	alert('error saving order');
			// }
		});

	});

	$friends.delegate('.remove', 'click', function(){

		var $li = $(this).closest('tr');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});

      $("#searchterm").keyup(function(e){
        var q = $("#searchterm").val();
        $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
        {
          srsearch: q,
          action: "query",
          list: "search",
          format: "json"
        },
        function(data) {
          $("#results").empty();
          $("#results").append("<b>" + q + "</b>");
          $.each(data.query.search, function(i,item){
            $("#results").append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>");
          });
        });
      });


	 // $("#searchterm").keyup(function(e){
  //       var q = $("#searchterm").val();
  //       $.getJSON("http://rest.learncode.academy/api/learncode/friends/",
  //       {
  //         srsearch: q,
  //         action: "query",
  //         list: "search",
  //         format: "json"
  //       },
  //       function(data) {
  //         $("#results").empty();
  //         $("#results").append("Results for <b>" + q + "</b");
  //         $.each(data.query.search, function(i,item){
  //           $("#results").append("<div><a href='http://rest.learncode.academy/api/learncode/friends/'>" + item.name + "</a>" + item.name + "</div>");
  //         });
  //       });
  //     });

 //  	$('#searchterm').keyup(function(e){
	// 	var q = $("#searchterm").val();
	// $.ajax({
	// 	type: 'GET',
	// 	url: 'http://rest.learncode.academy/api/learncode/friends',
	// 	},
	// 	function(data){
	// 		  $("#results").empty();
 //  	          $("#results").append("Results for <b>" + q + "</b");
 //  	          $.each(data.query.search, function(i,item){
 //            $("#results").append("<div><a href='http://rest.learncode.academy/api/learncode/friends/'" + encodeURIComponent(item.name) + ">" + item.name + "</a>" + item.name + "</div>");
 //          });
	// 	});	
	// });





});


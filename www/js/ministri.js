
myurl = 'http://gov.ro/ro/json-ministri';
$.ajax({
  dataType: "jsonp",
  url: myurl,
  jsonpCallback: 'callback',
  type: 'GET',
  }).done(function ( data ) {
   $.each(data.rez, function(i, item){

   content = '<div data-role="collapsible"><h3>' + '<div class="nume">' + item.prenume + ' ' + item.nume + "</div>" + '<img class="resize" src="' + item.image + '"/>'  + '<div class="functie">' + item.functie + '</div></h3>' + '<p><div class="descriere">' + item.descriere.replace(/\n/g,'<br />') + '</div></p></div>' 
  
  
   $('.container-ministri--items').append(content);
   $('.container-ministri').collapsibleset('refresh');
	
	
	
	
   })
  });

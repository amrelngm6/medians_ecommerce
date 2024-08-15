
$(document).ready(function() {
  // This is the part where jSignature is initialized.
  var $sigdiv = $("#signature").jSignature({'UndoButton':true})
  
  // All the code below is just code driving the demo. 
  , $tools = $('#tools')
  , $extraarea = $('#displayarea')
  , pubsubprefix = 'jSignature.demo.'
  
  var export_plugins = $sigdiv.jSignature('listPlugins','export')
  , chops = ['<select style="display:none">','<option></option>']
  , name
  for(var i in export_plugins){
    if (export_plugins.hasOwnProperty(i)){
      name = export_plugins[i]
      if (name == 'image')
      {
        chops.push('<option value="' + name + '">' + name + '</option>')
      }
    }
  }
  chops.push('</select>')
  
  $(chops.join('')).bind('change', function(e){
    if (e.target.value !== ''){
      var data = $sigdiv.jSignature('getData', e.target.value)
      $.publish(pubsubprefix + 'formatchanged')
      if (typeof data === 'string'){
        $('textarea#ToolsTextarea', $tools).val(data)
      } else if($.isArray(data) && data.length === 2){
        $('textarea#ToolsTextarea', $tools).val(data.join(','))
        $.publish(pubsubprefix + data[0], data);
      } else {
        try {
          $('textarea#ToolsTextarea', $tools).val(JSON.stringify(data))
        } catch (ex) {
          $('textarea#ToolsTextarea', $tools).val('Not sure how to stringify this, likely binary, format.')
        }
      }
    }
  }).appendTo($tools)

  
  $('<input type="button" id="resetSignature" value="Reset E-Signature">').bind('click', function(e){
    $sigdiv.jSignature('reset')
  }).appendTo($tools)
  
  $('<div><textarea id="ToolsTextarea" name="order_fields[e_signature]" value="test" style="width:100%;height:7em; display:none"></textarea></div>').appendTo($tools)
  
  $.subscribe(pubsubprefix + 'formatchanged', function(){
    $extraarea.html('')
  })

  
  $.subscribe(pubsubprefix + 'image/png;base64', function(data) {
    var i = new Image()
    i.src = 'data:' + data[0] + ',' + data[1]
    // $(i).appendTo($extraarea)
  });
  
  // jQuery('body').on('click','canvas',function()
  // {
        // $.post('{{CONFIG ajax_url}}/submit_order', {
       //      data: '',
       //      order_fields: $("form#submitOrder").serialize()
       //  }, function (data) {
       //      if (data.status == 200) {
       //          window.location = data.url;
       //      }else{
       //          jQuery('#output-general-errors').text(data.message);
       //      }
       //  });
  // });
  
  jQuery('body').on('change','#agreement-btn',function(elem)
  {
    if ($( '#agreement-btn' ).is( ":checked" ))
    {
      var check = checkCartFields();

      if (!check)
      {
        jQuery('#paypal-button-container').removeClass('dimmed');
      }

    } else {
      jQuery('#paypal-button-container').addClass('dimmed');
    }
    jQuery('#output-general-errors').html(check);

  });

  jQuery('body').on('click','canvas',function()
  {
    var data = $sigdiv.jSignature('getData', 'image')
    $.publish(pubsubprefix + 'formatchanged')
    if (typeof data === 'string'){
      $('textarea#ToolsTextarea', $tools).val(data)
    } else if($.isArray(data) && data.length === 2){
      $('textarea#ToolsTextarea', $tools).val(data.join(','))
      $.publish(pubsubprefix + data[0], data);
    } else {
      try {
        $('textarea#ToolsTextarea', $tools).val(JSON.stringify(data))
      } catch (ex) {
      }
    }
  });
  
  jQuery('body').on('click','#paypal-check-btn',function()
  {
    var check = checkCartFields();

    if (check)
    {
      jQuery('#output-general-errors').html(check);
    }

  });
  
})




function checkCartFields(element)
{
    jQuery('#output-general-errors').html('');
    var EMPTY_MSG = 'Please fill all fields first ';
    
    var EMPTY_TEXT = ' field is empty </p>';
    
    if (!jQuery('#stagename-field').val()) { var empty = ' :  <p><b>Stage name</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#firstname-field').val()) { var empty = ' :  <p><b>First name</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#lastname-field').val()) { var empty = ' :  <p><b>Last name</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#email-field').val()) { var empty = ' :  <p><b>Email</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#address-field').val()) { var empty = ' :  <p><b>Address</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#city-field').val()) { var empty = ' :  <p><b>City</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#state-field').val()) { var empty = ' :  <p><b>State</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#country-field').val()) { var empty = ' :  <p><b>Country</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#zip-field').val()) { var empty = ' :  <p><b>ZIP</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 
    if (!jQuery('#ToolsTextarea').val()) { var empty = ' :  <p><b>Signature</b>';  return EMPTY_MSG + empty + EMPTY_TEXT ;} 

    if (!$( '#agreement-btn' ).is( ":checked" ))
    {
      return "You must Agree to all Lease/Contract terms & our terms & polices";
    }
    jQuery('#paypal-check-btn').removeClass('dimmed');
  }

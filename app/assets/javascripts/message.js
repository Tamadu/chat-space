$(function(){
  function buildHTML(message){

    if (message.image) {
      let html = 
        `<div class="message_box">
          <div class="message_info">
            <div class="message_info__username">
              ${message.user_name}
            </div>
            <div class="message_info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
        `<div class="message_box">
          <div class="message_info">
            <div class="message_info__username">
              ${message.user_name}
            </div>
            <div class="message_info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message_list').append(html);
      $('.message_list').animate({ scrollTop: $('.message_list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
$('#btn-like' ).click(function (e) { 
    e.preventDefault();
    // pidiendo el nombre de la imagen mas la extension
    let imgID = $(this).data('id');
    console.log(imgID);
    // /image/:image_id/likes
    $.post('/image/'+imgID+'/likes')
        .done(data=>{
            
            
            $('.likes-count').text(data.likes);
            
            
            
        });
});

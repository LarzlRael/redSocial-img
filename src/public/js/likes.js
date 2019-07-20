// para darle like :D
$('#btn-like').click(function (e) {
    e.preventDefault();
    // pidiendo el nombre de la imagen mas la extension
    let imgID = $(this).data('id');
    console.log(imgID);
    // /image/:image_id/likes
    $.post('/image/' + imgID + '/likes')
        .done(data => {

            $('.likes-count').text(data.likes);

        });
});

// para eliminar :D
$('#btn-delete').click(function (e) {
    e.preventDefault();
    // pidiendo el nombre de la imagen mas la extension
    let $this = $(this);
    const response = confirm('Are you sure you want yo delete this image? ')

    if (response) {

        let imageId = $this.data('id');
        console.log('imagen recibida del front ' + imageId);

        $.ajax({
            url: '/image/' + imageId,
            type: 'DELETE'
        })
            .done(function (res) {
                $this.removeClass('btn-danger').addClass('btn btn-success').text('Eliminado correctamente');
                $this.find('i').removeClass('fa-times').addClass('fa-check');
            })


    }
    // $.post('/image/' + imgID + '/likes')
    //     .done(data => {

    //         $('.likes-count').text(data.likes);

    //     });
});
// para mostrar y ocultar el panel de comentarios
$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
    console.log('me tocaste prro');
    
    e.preventDefault();
    $('#post-comment').slideToggle();
})
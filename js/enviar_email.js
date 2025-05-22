// Enviar email
function enviarEmail(){
    let assuntoInserido = document.getElementById('assuntoInserido').value
    let corpoInserido = document.getElementById('corpoInserido').value
    const destinatario = 'leonardomelati1@gmail.com'
    const assunto = encodeURIComponent(assuntoInserido);
    const corpo = encodeURIComponent(corpoInserido);
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${assunto}&body=${corpo}`
    window.open(url, '_blank')
}
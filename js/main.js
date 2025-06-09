// // Enviar email
// function enviarEmail(){
//     let assuntoInserido = document.getElementById('assuntoInserido').value
//     let corpoInserido = document.getElementById('corpoInserido').value
//     const destinatario = 'leonardomelati1@gmail.com'
//     const assunto = encodeURIComponent(assuntoInserido);
//     const corpo = encodeURIComponent(corpoInserido);
//     const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${assunto}&body=${corpo}`
//     window.open(url, '_blank')
// }

//Trocar imagem
function trocar(imagemElement, novaImagem){
    imagemElement.classList.toggle("imgEfeito");
    imagemElement.src = novaImagem 
}

function enviarEmail(){}
emailjs.init("dyjrDHda6rLlc81fS")
    document.getElementById('emailForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        emailjs.sendForm('service_mrbmjwk', 'template_qrcptw4', form)
        .then(function(response) {
            alert('E-mail enviado com sucesso!');
        }, function(error) {
            alert('Erro ao enviar o e-mail: ' + error.text);
        });
    });

var erro = false;
function request_support() {
    var nome = input_nome.value;
    var email = input_email.value;
    var assunto = input_assunto.value;
    var categoria = input_categoria.value;
    var mais = input_mais.value;
    check_support(nome, email, assunto, categoria, mais);
    console.log(erro);
    if (!erro) {
        submit_support(nome, email, assunto, categoria, mais);
    }
}
function check_support(nome, email, assunto, categoria, mais) {
    erro = false;
    if (nome.length == 0) {
        input_nome.style.border = '2px solid #25559f';
        erro = true;
    }
    if (email.length == 0 || email.search('@') == -1) {
        input_email.style.border = '2px solid #25559f';
        erro = true;
    }
    if (assunto.length == 0) {
        input_assunto.style.border = '2px solid #25559f';
        erro = true;
    }
    if (categoria.length == 0) {
        input_categoria.style.border = '2px solid #25559f';
        erro = true;
    }
    if (mais.length == 0) {
        input_mais.style.border = '2px solid #25559f';
        erro = true;
    }

}
   /*
       function submit_support(nome, email, assunto, categoria, mais) {
           let iframe = parent.document.getElementsByClassName('mousetrap');
           iframe.getElementsByName('customFields.nome').value = nome;
           iframe.document.getElementsByName('customFields.qual_e_o_seu_e_mail').value = email;
           iframe.document.getElementsByName('customFields.qual_o_assunto_do_seu_pedido').value = assunto;
           iframe.document.getElementsByName('customFields.qual_a_categoria_desta_solicitacao').value = categoria;
           iframe.document.querySelectorAll('.pp-action-add')[0].click();
           iframe.document.getElementsByName('customFields.mais_informa_es').value = mais;
           document.querySelectorAll('.pp-btn')[0].click();
       }
      */

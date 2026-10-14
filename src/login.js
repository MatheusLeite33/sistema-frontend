window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Os campos acima são obrigatórios.");
        }
        else if (senha == "") {
            exibirMensagemErro("Os campos acima são obrigatórios.");
        }
        else {
            realizarLogin(email, senha);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 3000);

    }

    function realizarLogin(email, senha) {

        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "Email": email,
            "Senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var loginResult = JSON.parse(this.responseText);

                if (loginResult.sucesso)
                {
                    localStorage.setItem("usuarioGuid", loginResult.usuarioGuid);

                    window.location.href = "home.html";

                }
                else {
                    exibirMensagemErro(loginResult.mensagem)
                }
            }
        });

        xhr.open("POST", "https://localhost:5001/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }
}
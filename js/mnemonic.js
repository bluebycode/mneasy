
document.addEventListener('DOMContentLoaded', function() {
    const messageDiv = document.getElementById('message');
    const passwordInput = document.getElementById('password');
    const mnemonicTextArea = document.getElementById('mnemonic');
    const unlockButton = document.getElementById('unlock');
    const copyButton = document.getElementById('copy');

    /* showing the message*/
    const showMessage = (message) => messageDiv.innerText = message;

    if (core.existsMnemonic()){
        showMessage('A mnemonic was found, please unlock.');
        unlockButton.innerHTML="Unlock"
        unlockButton.onclick = () => {
            const password = passwordInput.value;
            const mnemonic = core.getAndDecipherMnemonic(password);
            mnemonicTextArea.value = mnemonic;
        }
    } else {
        showMessage('A mnemonic was not found, please provide a password and click on generate');
        unlockButton.innerHTML="Generate/safe"
        unlockButton.onclick = () => {
            const password = passwordInput.value;
            const mnemonic = core.generateAndSaveMnemonic(password);
            mnemonicTextArea.value = mnemonic;
            showMessage('A new mnemonic has been generated. Please save it, and use the password to unlock it');
        }
    }

    copyButton.onclick = () => {
        mnemonicTextArea.select();
        document.execCommand('copy');
        showMessage('Mnemonic copied to clipboard!');
    };

    // if we click on X will clear the local storage
    document.getElementById('clear').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    // clicking to uncover the password
    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    document.getElementById('clearAndReload').addEventListener('click', function () {
        document.getElementById('password').value = '';
        document.getElementById('mnemonic').value = '';
        location.reload();
    });
});

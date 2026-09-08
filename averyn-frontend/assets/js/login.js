(function () {
  'use strict';

  var MOCK = { email: 'admin@averyn.test', password: 'Averyn2026' };

  var form = document.getElementById('login-form');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var passwordHelp = document.getElementById('password-help');
  var forgotLink = document.getElementById('forgot-link');
  var toggleBtn = document.getElementById('toggle-password');
  var submitBtn = document.getElementById('submit-btn');
  var idleLabel = document.getElementById('submit-idle');
  var loadingLabel = document.getElementById('submit-loading');
  var alertError = document.getElementById('alert-error');
  var alertSuccess = document.getElementById('alert-success');
  var alertInfo = document.getElementById('alert-info');

  var show = function (el, msg) {
    el.querySelector('span').textContent = msg || '';
    el.hidden = false;
  };
  var hide = function (el) { el.hidden = true; };
  var setLoading = function (loading) {
    submitBtn.disabled = loading;
    idleLabel.hidden = loading;
    loadingLabel.hidden = !loading;
  };
  var setErrorState = function (msg) {
    emailInput.classList.toggle('av-input--error', msg && !/^\S+@\S+\.\S+$/.test(emailInput.value));
    passwordHelp.textContent = msg && emailInput.classList.contains('av-input--error') ? '' : msg;
    passwordInput.classList.toggle('av-input--error', Boolean(msg));
    if (msg) { show(alertError, msg); } else { hide(alertError); }
  };
  var resetState = function () {
    hide(alertError);
    hide(alertSuccess);
    hide(alertInfo);
    setErrorState('');
  };

  toggleBtn.addEventListener('click', function () {
    var showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    toggleBtn.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
    toggleBtn.querySelector('i').className = showing ? 'bi bi-eye' : 'bi bi-eye-slash';
  });

  forgotLink.addEventListener('click', function () {
    resetState();
    show(alertInfo, 'Te enviaremos instrucciones de recuperación cuando el servicio esté conectado.');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    resetState();

    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (!email || !password) {
      setErrorState('Completa tu correo electrónico y contraseña para continuar.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorState('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    window.setTimeout(function () {
      setLoading(false);
      if (email.toLowerCase() === MOCK.email && password === MOCK.password) {
        setErrorState('');
        show(alertSuccess, 'Autenticación exitosa. Redirigiendo al panel de control...');
        window.setTimeout(function () {
          window.location.href = 'dashboard/index.html';
        }, 900);
      } else {
        setErrorState('Credenciales inválidas. Verifica tu correo y contraseña e inténtalo nuevamente.');
      }
    }, 850);
  });
})();
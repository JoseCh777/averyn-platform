(function () {
  'use strict';

  var MOCK = { email: 'admin@averyn.test', password: 'Averyn2026' };

  var authCard = document.getElementById('auth-card');

  /* ---------- Modos (slide entre login y registro) ---------- */
  var hide = function (el) { el.hidden = true; };

  var loginAlertIds = ['alert-error', 'alert-success', 'alert-info'];
  var regAlertIds = ['reg-alert-error', 'reg-alert-success'];

  var copies = document.querySelectorAll('.av-auth-copy');
  var forms = document.querySelectorAll('.av-auth-form');
  var currentMode = 'login';

  var resetAlerts = function () {
    loginAlertIds.concat(regAlertIds).forEach(function (id) {
      hide(document.getElementById(id));
    });
  };

  var showMode = function (mode) {
    Array.prototype.forEach.call(copies, function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-mode') === mode);
    });
    Array.prototype.forEach.call(forms, function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-mode') === mode);
    });
  };

  var setMode = function (mode) {
    currentMode = mode;
    var register = mode === 'register';
    authCard.classList.toggle('is-signed-up', register);
    resetAlerts();
    window.setTimeout(function () {
      showMode(mode);
      var target = document.getElementById(register ? 'reg-name' : 'email');
      if (target) { target.focus(); }
    }, 280);
  };

  /* ---------- Alto del card (sin recorte de contenido) ---------- */
  var authForms = document.querySelector('.av-auth-forms');
  var loginModeForm = document.querySelector('.av-auth-form[data-mode="login"]');
  var registerModeForm = document.querySelector('.av-auth-form[data-mode="register"]');

  var measureForm = function (el, other) {
    var otherActive = other.classList.contains('is-active');
    other.classList.remove('is-active');
    el.classList.add('is-active');
    var prevDisplay = el.style.display;
    el.style.position = 'static';
    el.style.height = 'auto';
    el.style.display = 'block';
    var h = el.offsetHeight;
    el.style.position = '';
    el.style.height = '';
    el.style.display = prevDisplay;
    el.classList.remove('is-active');
    other.classList.toggle('is-active', otherActive);
    return h;
  };

  var syncAuthHeight = function () {
    var h1 = measureForm(loginModeForm, registerModeForm);
    var h2 = measureForm(registerModeForm, loginModeForm);
    authForms.style.height = (Math.max(h1, h2) + 8) + 'px';
    showMode(currentMode);
  };

  syncAuthHeight();
  window.addEventListener('load', syncAuthHeight);
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(syncAuthHeight, 150);
  });

  document.getElementById('switch-to-register').addEventListener('click', function () {
    setMode('register');
  });
  document.getElementById('switch-to-login').addEventListener('click', function () {
    setMode('login');
  });

  /* ---------- Inicio de sesión ---------- */
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

  /* ---------- Registro: fortaleza de contraseña ---------- */
  var regForm = document.getElementById('register-form');
  var regName = document.getElementById('reg-name');
  var regEmail = document.getElementById('reg-email');
  var regPassword = document.getElementById('reg-password');
  var regConfirm = document.getElementById('reg-confirm');
  var regTogglePassword = document.getElementById('toggle-reg-password');
  var regToggleConfirm = document.getElementById('toggle-reg-confirm');
  var regBar = document.getElementById('pw-bar');
  var regLabel = document.getElementById('pw-label');
  var regSubmit = document.getElementById('reg-submit-btn');
  var regSubmitIdle = document.getElementById('reg-submit-idle');
  var regSubmitLoading = document.getElementById('reg-submit-loading');
  var regAlertError = document.getElementById('reg-alert-error');
  var regAlertSuccess = document.getElementById('reg-alert-success');
  var regConfirmHelp = document.getElementById('reg-confirm-help');

  var SYMBOL_RE = (function () {
    try { return new RegExp('[^\\p{L}\\p{N}_]', 'u'); } catch (e) { return /[^A-Za-z0-9_]/; }
  })();

  var RULES = [
    { key: 'length', test: function (v) { return v.length >= 8; } },
    { key: 'case', test: function (v) { return /[a-z]/.test(v) && /[A-Z]/.test(v); } },
    { key: 'number', test: function (v) { return /\d/.test(v); } },
    { key: 'symbol', test: function (v) { return SYMBOL_RE.test(v); } }
  ];

  RULES.forEach(function (rule) {
    rule.elm = document.querySelector('.av-pw-item[data-rule="' + rule.key + '"]');
  });

  var passwordScore = function () {
    var value = regPassword.value;
    return RULES.filter(function (rule) { return rule.test(value); }).length;
  };

  var refreshStrength = function () {
    var value = regPassword.value;
    var score = passwordScore();

    RULES.forEach(function (rule) {
      rule.elm.classList.toggle('is-met', rule.test(value));
    });

    regBar.classList.remove('is-weak', 'is-medium', 'is-strong');
    regLabel.classList.remove('is-weak', 'is-medium', 'is-strong');
    regBar.style.width = value ? (score * 25) + '%' : '0';

    if (score === 0) {
      regLabel.textContent = '';
    } else if (score <= 1) {
      regBar.classList.add('is-weak');
      regLabel.classList.add('is-weak');
      regLabel.textContent = 'Débil';
    } else if (score <= 3) {
      regBar.classList.add('is-medium');
      regLabel.classList.add('is-medium');
      regLabel.textContent = 'Media';
    } else {
      regBar.classList.add('is-strong');
      regLabel.classList.add('is-strong');
      regLabel.textContent = 'Muy fuerte';
    }

    regSubmit.disabled = score < 4;
  };

  regPassword.addEventListener('input', refreshStrength);
  refreshStrength();

  var bindEyeToggle = function (toggle, input) {
    toggle.addEventListener('click', function () {
      var showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      toggle.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
      toggle.querySelector('i').className = showing ? 'bi bi-eye' : 'bi bi-eye-slash';
    });
  };
  bindEyeToggle(regTogglePassword, regPassword);
  bindEyeToggle(regToggleConfirm, regConfirm);

  regConfirm.addEventListener('input', function () {
    regConfirmHelp.textContent = regConfirm.value && regConfirm.value !== regPassword.value
      ? 'Las contraseñas no coinciden.'
      : '';
  });

  var setRegLoading = function (loading) {
    regSubmit.disabled = loading;
    regSubmitIdle.hidden = loading;
    regSubmitLoading.hidden = !loading;
  };

  var showRegError = function (msg) {
    hide(regAlertSuccess);
    show(regAlertError, msg);
  };

  regForm.addEventListener('submit', function (event) {
    event.preventDefault();
    hide(regAlertError);
    hide(regAlertSuccess);
    regConfirmHelp.textContent = '';

    var name = regName.value.trim();
    var email = regEmail.value.trim();
    var password = regPassword.value;
    var confirm = regConfirm.value;

    if (!name) { return showRegError('Completa tu nombre completo para continuar.'); }
    if (!/^\S+@\S+\.\S+$/.test(email)) { return showRegError('Ingresa un correo electrónico válido.'); }
    if (passwordScore() < 4) { return showRegError('Aún no se cumplen todos los requisitos de la contraseña.'); }
    if (password !== confirm) {
      regConfirmHelp.textContent = 'Las contraseñas no coinciden.';
      return showRegError('Las contraseñas no coinciden. Revísalas e inténtalo nuevamente.');
    }

    setRegLoading(true);
    window.setTimeout(function () {
      setRegLoading(false);
      refreshStrength();
      show(regAlertSuccess, 'Cuenta creada con éxito. Ahora puedes iniciar sesión.');
      window.setTimeout(function () {
        setMode('login');
        show(alertSuccess, 'Cuenta creada con éxito. Bienvenido a Averyn.');
      }, 1000);
    }, 850);
  });
})();
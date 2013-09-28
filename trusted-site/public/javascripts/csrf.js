(function (document) {
  var sessionID = document.cookie.match(/connect.sid=([^$]*)/)[1],
      forms = document.getElementsByTagName('form'),
      i, len, form, hiddenInput;

  hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'sessionID';
  hiddenInput.value = decodeURIComponent(sessionID);

  for (i = 0, len = forms.length; i < len; i++) {
    form = forms[i];

    if (form.method === 'post') {
      form.appendChild(hiddenInput.cloneNode());
    }
  }
})(document);
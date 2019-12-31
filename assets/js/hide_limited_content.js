'use strict';

const nowMonth = new Date().getMonth();
// January
if (nowMonth === 0) {
  document.getElementById('limited').style.display = '';
}

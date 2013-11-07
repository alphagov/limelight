define(['jquery'], function ($) {
  return function () {
    $(document).ready(function () {
      $('.more-info-link').click(function (e) {
        $(this).next('ul').toggleClass('js-clicked');
        e.preventDefault();
      });
    });
  };
});

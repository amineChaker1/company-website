import "@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js";
import "@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "../sass/style.scss";
import "@fortawesome/fontawesome-free/js/all.min.js";

$(function () {
  $(".thumbnail").hover(function () {
    $(this).find(".project-category").hide();
    $(this).find(".caption").slideDown(250);
  }),
    function () {
      $(this).find(".caption").slideUp(250);
      $(this).find(".project-category").show();
    };
});

let modalId = $("#image-gallery");

$(document).ready(function () {
  loadGallery(true, "a.thumbnail");

  //This function disables buttons when needed
  function disableButtons(counter_max, counter_current) {
    $("#show-previous-image, #show-next-image").show();
    if (counter_max === counter_current) {
      $("#show-next-image").hide();
    } else if (counter_current === 1) {
      $("#show-previous-image").hide();
    }
  }

  /**
   *
   * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
   * @param setClickAttr  Sets the attribute for the click handler.
   */

  function loadGallery(setIDs, setClickAttr) {
    let current_image,
      selector,
      counter = 0;

    $("#show-next-image, #show-previous-image").click(function () {
      if ($(this).attr("id") === "show-previous-image") {
        current_image--;
      } else {
        current_image++;
      }

      selector = $('[data-image-id="' + current_image + '"]');
      updateGallery(selector);
    });

    function updateGallery(selector) {
      let $sel = selector;
      current_image = $sel.data("image-id");
      $("#image-gallery-title").text($sel.data("title"));
      $("#image-gallery-image").attr("src", $sel.data("image"));
      disableButtons(counter, $sel.data("image-id"));
    }

    if (setIDs == true) {
      $("[data-image-id]").each(function () {
        counter++;
        $(this).attr("data-image-id", counter);
      });
    }
    $(setClickAttr).on("click", function () {
      updateGallery($(this));
    });
  }
});

// build key actions
$(document).keydown(function (e) {
  switch (e.which) {
    case 37: // left
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        $("#show-previous-image").is(":visible")
      ) {
        $("#show-previous-image").click();
      }
      break;

    case 39: // right
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        $("#show-next-image").is(":visible")
      ) {
        $("#show-next-image").click();
      }
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

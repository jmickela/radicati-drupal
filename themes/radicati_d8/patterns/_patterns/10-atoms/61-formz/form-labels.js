/*
Ok. This script does a lot of stuff.

* It checks each input to see whether its label is before or after the input and attaches a class of "label-before" or "label-after" to the label so it can be appropriately styled. (Note: labels that wrap around an input are rendered as before, at least in Chrome...)

* It checks the width of all inputs and checks to see whether their width is 100% of the containing element. If so, it attaches a class of "full-width" to both the input and its label.

* It finds each input of type text, email, or password and each textarea and adds a "placeholder" class to input and the matching label. ("Matching" labels can either use the "for" attribute or can wrap around the input.)

* It finds each textarea and adds a "textarea-label" class to its matching label.

* Each time focus is on one of the placeholder inputs a "busy" class is added.

* Each time focus moves away from one of the placeholder inputs, the "busy" class is removed. Meanwhile, if there is text in the input, a "filled" class is added. If there is no content, the "filled" class is removed.
*/


jQuery(document).ready(function($) {
  // Find all the textareas
  var $textareas = $("form textarea");

  // Add a "textarea-label" class to each of those labels
  if (typeof $textareas == "object") {
    Object.keys($textareas).forEach( function(textarea) {
      if (textarea != "length" && textarea != "prevObject") {
        addTextarea($textareas[textarea]);
      }
    });
  } else if (typeof $textareas == "array") {
    $textareas.forEach(function(textarea) {
      addTextarea(textarea);
    });
  }

  // For each input...
  var $allInputs = $("form input, form textarea");

  // check if the label is before or after the input, and if it's full width. Add descriptive classes.
  if (typeof $allInputs == "object") {
    Object.keys($allInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        checkIfLabelFirst($allInputs[input]);
        tagFullWidth($allInputs[input]);
      }
    });
  } else if (typeof $allInputs == "array") {
    $allInputs.forEach(function(input) {
      checkIfLabelFirst(input);
      tagFullWidth(input);
    });
  }

  // Find the inputs that need placeholder labels
  // We're having trouble with them in safari on an iphone 7, so I'm removing 'form textarea' from this variable...
  var $placeholderInputs = $(
    "form input[type='text'], form input[type='email'], form input[type='password'], form input[type='tel']"
  );

  // Add a "placeholder" class to each of those labels
  // Also assign height and top position
  if (typeof $placeholderInputs == "object") {
    Object.keys($placeholderInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        addPlaceholder($placeholderInputs[input]);
        setLabelHeight($placeholderInputs[input]);
        setPlaceholderLabelPosition($placeholderInputs[input]);
      }
    });
  } else if (typeof $placeholderInputs == "array") {
    $placeholderInputs.forEach(function(input) {
      addPlaceholder(input);
      setLabelHeight(input);
      setPlaceholderLabelPosition(input);
    });
  }

  // These placeholders get cool effects on interaction
  $placeholderInputs
    .on("focus", addBusy)
    .on("blur", removeBusy)
    .on("blur change", toggleFilled);

  // Lastly, check each input one last time.
  // If an input is somehow prefilled, set its class
  // to filled
  // If an input has focus on pageload, set its class
  // to busy and its top to 0
  if (typeof $allInputs == "object") {
    Object.keys($allInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        checkFilled($allInputs[input]);
        checkFocus($allInputs[input]);
      }
    });
  } else if (typeof $allInputs == "array") {
    $allInputs.forEach(function(input) {
      checkFilled(input);
      checkFocus(input);
    });
  }


  function checkFocus(target) {
    if (document.activeElement === target && document.hasFocus()) {
      var $label = getLabel(target);
      if ($label !== undefined) {
        if (typeof $label === "object" && $label.length > 0) {
          $label = $label[0];
        }
        $($label).addClass("busy");
        $label.style.top = 0 + 'px';
      }
    }
  }

  function addPlaceholder(input) {
    var $label = getLabel(input);
    if ($label !== undefined) {
      $(input).addClass("placeholder");
      $($label).addClass("placeholder");
    }
    var $parent = getParent(input);
    if ($parent !== undefined) {
      $($parent).addClass("placeholder");
    }
  }

  function setLabelHeight(input) {
    var $label = getLabel(input);
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      $label.style.height = $label.offsetHeight + 'px';
    }
  }

  function setPlaceholderLabelPosition(input) {
    // note that $inputBoxHeight should match the $textbox-height variable in _forms.scss
    var $inputBoxHeight = 53;
    // note that $lineHeight should match the $label-line-height variable in _forms.scss
    var $lineHeight = 1.5;
    // note that $fontSize should match the $lable-font-size variable in _forms.scss
    var $fontSize = 16;
    // note that $shrinkRatio should match the $label-shrink-ratio variable in _forms.scss
    var $shrinkRatio = 0.8;

    var $label = getLabel(input);
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      // This vertically centers all labels inside their inputs
      // if ($label.style !== undefined && $label.style.height !== undefined) {
      //   var $positionTop =
      //     (parseInt($label.style.height, 10) + input.offsetHeight) / 2;
      // } else {
      //   var $positionTop = ($label.offsetHeight + input.offsetHeight) / 2;
      // }
      // if ($label.classList.contains("label-before")) {
      //   $label.style.marginTop =
      //     -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      // } else if ($label.classList.contains("label-after")) {
      //   $label.style.marginBottom =
      //     -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      //   $positionTop *= -1;
      // } else {
      //   var $positionTop = 0;
      // }

      // This centers a single line label in a text input and puts it an equal amount down in a textarea
      if ($label.classList.contains("label-before")) {
        if ($label.style !== undefined && $label.style.height !== undefined) {
          var $positionTop =
            parseInt($label.style.height, 10) +
            ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        } else {
          var $positionTop =
            $label.offsetHeight +
            ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        }
        // $label.style.marginTop =
        //   -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      } else if ($label.classList.contains("label-after")) {
        var $positionTop = -1 * input.offsetHeight + ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        // $label.style.marginBottom =
        //   -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      } else {
        var $positionTop = 0;
      }
      setLabelPosition($label, $positionTop);
    }
  }

  function setLabelPosition($label, $positionTop) {
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      $label.style.top = String($positionTop) + "px";
    }
  }

  function addTextarea(target) {
    var $label = getLabel(target);
    if ($label !== undefined) {
      $($label).addClass("textarea-label");
    }
  }

  function toggleFilled(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      if (event.target.value) {
        $($label).addClass("filled");
        setLabelPosition($label, 0);
      } else {
        $($label).removeClass("filled");
        setPlaceholderLabelPosition(event.target);
      }
    }
  }

  function checkFilled(element) {
    var $label = getLabel(element);
    if ($label !== undefined) {
      if (element.value) {
        $($label).addClass("filled");
        setLabelPosition($label, 0);
      } else {
        $($label).removeClass("filled");
        setPlaceholderLabelPosition(element);
      }
    }
  }

  function addBusy(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      $($label).addClass("busy");
      setLabelPosition($label, 0);
    }
  }

  function removeBusy(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      $($label).removeClass("busy");
    }
  }

  function getLabel(target) {
    var $form = $(target).closest('form');
    var $id = target.id;
    if ($id !== undefined && $id !== "") {
      var $label = $form.find("label[for=" + $id + "]");
    }
    if ($label == undefined || $label.length <= 0) {
      var parentElem = $(target).parent();
      var parentTagName = parentElem.get(0).tagName.toLowerCase();

      if (parentTagName == "label") {
        $label = parentElem;
      }
    }

    if ($label == undefined || $label.length <= 0) {
      return undefined;
    } else {
      return $label;
    }
  }

  function getParent(target) {
    // we're looking for drupal webform parent divs
    return $(target).parent('.form-item');
  }

  function checkIfLabelFirst(target) {
    var $label = getLabel(target);

    var $parent = getParent(target);

    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      if ($label !== undefined) {
        // remember that compareDocumentPosition is a bitwise operator that adds up the various possibilities (like file permissions). So you get 10 when it spits out both 8 and 2
        switch ($label.compareDocumentPosition(target)) {
          case 2: // input comes first
          case 8: // input contains label (???)
          case 10: // input contains label (yeah right!) & thus input comes first
            $(target).addClass("label-after");
            $($label).addClass("label-after");
            if ($parent !== undefined) {
              $($parent).addClass("label-after");
            }
            break;
          case 4: // label comes first
          case 16: // label contains input
          case 20: // label contains input & thus label is first
            $(target).addClass("label-before");
            $($label).addClass("label-before");
            if ($parent !== undefined) {
              $($parent).addClass("label-before");
            }
            break;
          default:
            console.log("I'm having trouble comparing the position of this input and its label:");
            console.log(target);
            console.log($label);
        }
      }
    }
  }

  function checkIfWidth100(target) {
    var parent = $(target).parent()[0];
    var padding =
      parseInt($(parent).css("padding-left")) +
      parseInt($(parent).css("padding-right"));
    var percent = (
      (target.offsetWidth / (parent.offsetWidth - padding)) *
      100
    ).toFixed(0);

    if (percent == 100) {
      return true;
    } else {
      return false;
    }
  }

  function tagFullWidth(target) {
    if (checkIfWidth100(target)) {
      $(target).addClass("full-width");
      var $label = getLabel(target);
      if ($label !== undefined) {
        $($label).addClass("full-width");
      }
    }
  }
});


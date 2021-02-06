// Form validation script
(function () {
  'use strict'

  const bookForm = document.getElementById('booking-form');
  const msgBox = document.getElementById('booking-form-msg');
  bookForm.addEventListener('submit', function (e) {
    // Always stop default behaviour on submitting
    e.preventDefault();
    e.stopPropagation();

    // Set the alert on the fly
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.setAttribute('role', 'alert');
    const alertHead = document.createElement('div');
    alertHead.classList.add('alert-heading');
    const alertMsg = document.createElement('div');
    let errorList = undefined;

    // Check validity
    if (!bookForm.checkValidity()) {
      // Set alert as danger
      alert.classList.add('alert-danger');
      alertHead.textContent = 'Oops! There is an error.';
      alertMsg.textContent = 'Please fix the following and try again:';

      // Set error list
      errorList = document.createElement('div');
      errorList.classList.add('alert-errors');
      const errorFields = bookForm.querySelectorAll('input:invalid');
      errorFields.forEach(function(field) {
        const fieldValidState = field.validity;
        const errorMsg = `${getLabel(field)} ${getErrorMsg(fieldValidState)}`;
        // Set individual errors
        document.getElementById(`book-error-${field.name}`).textContent = errorMsg;
        // End setting individual errors
        const errorItem = document.createElement('span');
        errorItem.textContent = errorMsg;
        errorList.appendChild(errorItem);
      });

      // Unset errors for valid inputs (not required because they are display:none, but better)
      bookForm.querySelectorAll('input:valid').forEach( function(field) {
        document.getElementById(`book-error-${field.name}`).textContent = '';
      });
    } else {
      // Set alert as Thank you
      alert.classList.add('alert-success');
      alertHead.textContent = 'Thank you!';
      alertMsg.textContent = 'Your reservation has been submitted. One of our representatives will call you back to' +
        ' confirm the reservation within 1 hour on our working hours.';

      // Remove the form from the page.
      bookForm.remove();
    }

    // Set the alert element
    alert.appendChild(alertHead);
    alert.appendChild(alertMsg);
    if (errorList !== undefined) { // only when there are errors
      alert.appendChild(errorList);
    }

    // Add button for focus manipulation
    const alertBtn = document.createElement('div');
    alertBtn.className = 'alert-focus';
    alertBtn.setAttribute('tabindex', '-1');
    msgBox.after(alertBtn);

    // Remove last alert from DOM
    msgBox.innerHTML = '';

    // Append new alert to DOM
    msgBox.appendChild(alert);

    // jump focus
    alertBtn.focus();

    bookForm.classList.add('was-validated')
  });
})();

function getLabel(element) {
  let labelName = '';
  const elLabels = element.labels;
  elLabels.forEach(function (label) {
    labelName += label.textContent;
  });
  return labelName;
}

function getErrorMsg(validityState) {
  let errorMsg = '';
  if (validityState.valueMissing) {
    errorMsg += 'is required field.';
  } else if (validityState.typeMismatch) {
    errorMsg += 'is not valid.';
  } else if (validityState.patternMismatch) {
    errorMsg += 'is in wrong format.';
  } else if (validityState.tooLong) {
    errorMsg += 'is too long.';
  } else if (validityState.tooShort) {
    errorMsg += 'is too short.';
  } else if (validityState.rangeUnderflow) {
    errorMsg += 'is under the minimum.';
  } else if (validityState.rangeOverflow) {
    errorMsg += 'is over the maximum.';
  } else if (validityState.stepMismatch) {
    errorMsg += 'is not in step.';
  } else if (validityState.badInput) {
    errorMsg += 'can\'t be resolved.';
  }
  return errorMsg;
}

$(document).ready(function() {
  $('#slider .slick-carousel').slick({
    arrows: false,
    dots: true
  });
});

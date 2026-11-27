/**
 * Custom JavaScript for the lab Contact form.
 * All logic lives here (no inline handlers, no edits to main.js).
 */
(function() {
  "use strict";

  // ------------------------------------------------------------------
  // DOM references (exact ID contract)
  // ------------------------------------------------------------------
  const fields = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    rating1: document.getElementById('rating-1'),
    rating2: document.getElementById('rating-2'),
    rating3: document.getElementById('rating-3')
  };

  const errorSpans = {
    firstName: document.getElementById('error-first-name'),
    lastName: document.getElementById('error-last-name'),
    email: document.getElementById('error-email'),
    phone: document.getElementById('error-phone'),
    address: document.getElementById('error-address'),
    rating1: document.getElementById('error-rating-1'),
    rating2: document.getElementById('error-rating-2'),
    rating3: document.getElementById('error-rating-3')
  };

  const submitBtn = document.getElementById('submit-btn');
  const clearBtn = document.getElementById('clear-btn');
  const formResults = document.getElementById('form-results');
  const averageResult = document.getElementById('average-result');
  const form = document.querySelector('form');

  if (!submitBtn || !clearBtn || !formResults || !averageResult || !form) {
    return;
  }

  // ------------------------------------------------------------------
  // Validation rules
  // ------------------------------------------------------------------
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const LETTERS_REGEX = /^[A-Za-z]+$/;

  function isRequiredValid(value) {
    return value.trim() !== '';
  }

  function isEmailValid(value) {
    return EMAIL_REGEX.test(value.trim());
  }

  function isNameValid(value) {
    return LETTERS_REGEX.test(value.trim());
  }

  function isRatingValid(value) {
    const num = Number(value);
    return Number.isInteger(num) && num >= 1 && num <= 10;
  }

  // ------------------------------------------------------------------
  // Show / clear field error + .input-invalid class
  // ------------------------------------------------------------------
  function showError(fieldKey, message) {
    const el = fields[fieldKey];
    const err = errorSpans[fieldKey];
    if (el) el.classList.add('input-invalid');
    if (err) err.textContent = message;
  }

  function clearError(fieldKey) {
    const el = fields[fieldKey];
    const err = errorSpans[fieldKey];
    if (el) el.classList.remove('input-invalid');
    if (err) err.textContent = '';
  }

  // ------------------------------------------------------------------
  // Real-time validation for a single field (everything except phone)
  // ------------------------------------------------------------------
  function validateField(fieldKey) {
    const value = fields[fieldKey] ? fields[fieldKey].value : '';

    switch (fieldKey) {
      case 'firstName':
        if (!isRequiredValid(value)) {
          showError(fieldKey, 'First name is required.');
          return false;
        }
        if (!isNameValid(value)) {
          showError(fieldKey, 'Letters only.');
          return false;
        }
        clearError(fieldKey);
        return true;

      case 'lastName':
        if (!isRequiredValid(value)) {
          showError(fieldKey, 'Last name is required.');
          return false;
        }
        if (!isNameValid(value)) {
          showError(fieldKey, 'Letters only.');
          return false;
        }
        clearError(fieldKey);
        return true;

      case 'email':
        if (!isRequiredValid(value)) {
          showError(fieldKey, 'Email is required.');
          return false;
        }
        if (!isEmailValid(value)) {
          showError(fieldKey, 'Enter a valid email address.');
          return false;
        }
        clearError(fieldKey);
        return true;

      case 'address':
        if (!isRequiredValid(value)) {
          showError(fieldKey, 'Address is required.');
          return false;
        }
        clearError(fieldKey);
        return true;

      case 'rating1':
      case 'rating2':
      case 'rating3':
        if (!isRequiredValid(value)) {
          showError(fieldKey, 'Rating is required.');
          return false;
        }
        if (!isRatingValid(value)) {
          showError(fieldKey, 'Integer between 1 and 10.');
          return false;
        }
        clearError(fieldKey);
        return true;

      default:
        clearError(fieldKey);
        return true;
    }
  }

  // ------------------------------------------------------------------
  // Re-validate all fields and toggle submit button state
  // ------------------------------------------------------------------
  function validateAll() {
    const results = {
      firstName: validateField('firstName'),
      lastName: validateField('lastName'),
      email: validateField('email'),
      address: validateField('address'),
      rating1: validateField('rating1'),
      rating2: validateField('rating2'),
      rating3: validateField('rating3')
    };

    const allValid = Object.values(results).every(Boolean);
    submitBtn.disabled = !allValid;
    return allValid;
  }

  // ------------------------------------------------------------------
  // Phone number auto-formatting: Lithuanian format +370 6xx xxxxxx
  // ------------------------------------------------------------------
  function formatPhone(value) {
    // Keep digits only.
    const digits = value.replace(/\D/g, '');
    let formatted = '+370';

    if (digits.length === 0) {
      return '';
    }

    // Country code digits consumed: 370
    const afterCC = digits.replace(/^370/, '');

    if (afterCC.length === 0) {
      return '+370';
    }

    formatted += ' ';

    // First digit after country code should be 6 (mobile prefix).
    const firstDigit = afterCC.charAt(0);
    if (firstDigit !== '6') {
      // Not a Lithuanian mobile number; still show what was typed after +370.
      return '+370 ' + afterCC.slice(0, 9);
    }

    formatted += '6';

    const rest = afterCC.slice(1);
    if (rest.length === 0) {
      return formatted;
    }

    // 6xx -> two more digits after the 6
    const xx = rest.slice(0, 2);
    if (xx.length > 0) {
      formatted += xx;
    }

    if (rest.length <= 2) {
      return formatted;
    }

    formatted += ' ';

    // xxxxxx -> up to six remaining digits
    const remaining = rest.slice(2).slice(0, 6);
    if (remaining.length > 0) {
      formatted += remaining;
    }

    return formatted;
  }

  function handlePhoneInput() {
    const input = fields.phone;
    const raw = input.value;
    const digitsOnly = raw.replace(/\D/g, '');
    // Limit total digits: 370 (3) + 6 (1) + 2 + 6 = 12 digits max
    const cappedDigits = digitsOnly.slice(0, 12);
    const formatted = formatPhone('+' + cappedDigits);
    input.value = formatted;

    // Real-time validation: phone is not a "required" field in this lab,
    // but keep its error span clear / format-only. No invalid state enforced.
    clearError('phone');

    // Phone does not gate the submit button (per spec, required fields gate it).
    validateAll();
  }

  // ------------------------------------------------------------------
  // Render form results below the form
  // ------------------------------------------------------------------
  function renderResults(data) {
    formResults.innerHTML = '';
    const lines = [
      'First name: ' + data.firstName,
      'Last name: ' + data.lastName,
      'Email: ' + data.email,
      'Phone: ' + data.phone,
      'Address: ' + data.address,
      'Rating 1: ' + data.rating1,
      'Rating 2: ' + data.rating2,
      'Rating 3: ' + data.rating3
    ];

    const ul = document.createElement('ul');
    lines.forEach(function(text) {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    formResults.appendChild(ul);
  }

  // ------------------------------------------------------------------
  // Compute and display average rating
  // ------------------------------------------------------------------
  function renderAverage(data) {
    const r1 = Number(data.rating1);
    const r2 = Number(data.rating2);
    const r3 = Number(data.rating3);

    if (!Number.isInteger(r1) || !Number.isInteger(r2) || !Number.isInteger(r3)) {
      averageResult.textContent = '';
      return;
    }

    const avg = ((r1 + r2 + r3) / 3).toFixed(2);
    averageResult.textContent = data.firstName + ' ' + data.lastName + ': ' + avg;
  }

  // ------------------------------------------------------------------
  // Form submission handler
  // ------------------------------------------------------------------
  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      address: fields.address.value.trim(),
      rating1: fields.rating1.value.trim(),
      rating2: fields.rating2.value.trim(),
      rating3: fields.rating3.value.trim()
    };

    console.log(data);

    renderResults(data);
    renderAverage(data);
  }

  // ------------------------------------------------------------------
  // Clear form functionality
  // ------------------------------------------------------------------
  function handleClear() {
    // Empty all fields.
    fields.firstName.value = '';
    fields.lastName.value = '';
    fields.email.value = '';
    fields.phone.value = '';
    fields.address.value = '';
    fields.rating1.value = '';
    fields.rating2.value = '';
    fields.rating3.value = '';

    // Clear display containers.
    formResults.innerHTML = '';
    averageResult.textContent = '';

    // Remove all validation errors and .input-invalid classes.
    Object.keys(fields).forEach(function(key) {
      clearError(key);
    });

    // Reset submit button to disabled.
    submitBtn.disabled = true;
  }

  // ------------------------------------------------------------------
  // Wire up event listeners
  // ------------------------------------------------------------------
  function init() {
    // Submit button starts disabled.
    submitBtn.disabled = true;

    // Real-time validation on every field except phone (auto-formatted).
    ['firstName', 'lastName', 'email', 'address', 'rating1', 'rating2', 'rating3']
      .forEach(function(key) {
        fields[key].addEventListener('input', function() {
          validateField(key);
          validateAll();
        });
      });

    // Phone auto-formats as the user types.
    fields.phone.addEventListener('input', handlePhoneInput);

    // Form submission.
    form.addEventListener('submit', handleSubmit);

    // Clear form.
    clearBtn.addEventListener('click', function(event) {
      event.preventDefault();
      handleClear();
    });
  }

  init();
})();

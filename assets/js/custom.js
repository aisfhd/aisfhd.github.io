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

/* ------------------------------------------------------------------
 * User Competency Progress Module — Interactive functionality (Lab 12)
 * All logic lives here (no inline handlers, no edits to main.js).
 * ------------------------------------------------------------------ */
(function() {
  "use strict";

  // ------------------------------------------------------------------
  // Config & DOM references
  // ------------------------------------------------------------------
  const STORAGE_KEY = 'lw12_skill_progress';

  // Initial skill states (used when no Local Storage data is available).
  // Total XP across all skills >= 300 XP.
  const INITIAL_SKILLS = [
    { name: 'Python', status: 'completed', xp: 50 },
    { name: 'Java', status: 'completed', xp: 45 },
    { name: 'SQL', status: 'completed', xp: 40 },
    { name: 'TypeScript', status: 'in-progress', xp: 35 },
    { name: 'React', status: 'in-progress', xp: 30 },
    { name: 'GraphQL', status: 'in-progress', xp: 25 },
    { name: 'Cloud Architecture', status: 'planned', xp: 40 },
    { name: 'Kubernetes', status: 'planned', xp: 35 }
  ];

  const STATUS_LABELS = {
    planned: 'Planned',
    'in-progress': 'In Progress',
    completed: 'Completed'
  };

  // Level table per Laboratory Work 10.
  const LEVEL_TABLE = [
    { min: 0, max: 49, level: 1, rank: 'Beginner' },
    { min: 50, max: 149, level: 2, rank: 'Trainee' },
    { min: 150, max: 299, level: 3, rank: 'Specialist' },
    { min: 300, max: Infinity, level: 4, rank: 'Professional' }
  ];

  const board = document.querySelector('#skill-progress');
  if (!board) return;

  const columns = {
    planned: document.getElementById('column-planned'),
    'in-progress': document.getElementById('column-in-progress'),
    completed: document.getElementById('column-completed')
  };
  const counts = {
    planned: document.getElementById('count-planned'),
    'in-progress': document.getElementById('count-in-progress'),
    completed: document.getElementById('count-completed')
  };

  // Top stats.
  const statTotalXp = document.getElementById('stat-total-xp');
  const statLevel = document.getElementById('stat-level');
  const statRank = document.getElementById('stat-rank');

  // Statistics.
  const statTotalSkills = document.getElementById('stat-total-skills');
  const statCompletedSkills = document.getElementById('stat-completed-skills');
  const statCompletionPct = document.getElementById('stat-completion-pct');

  // Progress bar.
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressCurrent = document.getElementById('progress-current');
  const progressTarget = document.getElementById('progress-target');

  // Mutable skill data (restored from Local Storage or initial).
  let skills = loadSkills();

  // ------------------------------------------------------------------
  // Local Storage helpers
  // ------------------------------------------------------------------
  function saveSkills() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    } catch (e) {
      // Local Storage unavailable; silently ignore.
    }
  }

  function loadSkills() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return INITIAL_SKILLS.map(s => Object.assign({}, s));
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_SKILLS.map(s => Object.assign({}, s));
      // Validate each entry has required fields; fall back to initial if invalid.
      const valid = parsed.every(s => s && typeof s.name === 'string' && typeof s.xp === 'number' && STATUS_LABELS[s.status] !== undefined);
      return valid ? parsed : INITIAL_SKILLS.map(s => Object.assign({}, s));
    } catch (e) {
      return INITIAL_SKILLS.map(s => Object.assign({}, s));
    }
  }

  // ------------------------------------------------------------------
  // Function 1: Render skill cards into kanban columns
  // ------------------------------------------------------------------
  function renderSkillCards() {
    // Clear existing cards in all columns.
    Object.values(columns).forEach(col => { if (col) col.innerHTML = ''; });

    skills.forEach(function(skill) {
      const col = columns[skill.status];
      if (!col) return;

      const card = document.createElement('div');
      card.className = 'skill-card';
      card.dataset.name = skill.name;

      // Status dropdown to change status to any of the three statuses.
      const optionsHtml = Object.keys(STATUS_LABELS).map(function(key) {
        const selected = key === skill.status ? ' selected' : '';
        return '<option value="' + key + '"' + selected + '>' + STATUS_LABELS[key] + '</option>';
      }).join('');

      card.innerHTML =
        '<div class="skill-card-status ' + skill.status + '">' + STATUS_LABELS[skill.status] + '</div>' +
        '<div class="skill-card-info">' +
        '<div class="skill-card-name">' + escapeHtml(skill.name) + '</div>' +
        '<div class="skill-card-xp">+' + skill.xp + ' XP</div>' +
        '</div>' +
        '<div class="skill-card-actions">' +
        '<label for="status-' + skill.name + '">Change status:</label>' +
        '<select id="status-' + skill.name + '" class="status-select">' + optionsHtml + '</select>' +
        '</div>';

      // Wire up the status change (no page reload).
      const select = card.querySelector('.status-select');
      select.addEventListener('change', function() {
        changeSkillStatus(skill.name, select.value);
      });

      col.appendChild(card);
    });

    updateColumnCounts();
  }

  // ------------------------------------------------------------------
  // Change a skill's status and move the card automatically.
  // ------------------------------------------------------------------
  function changeSkillStatus(name, newStatus) {
    const skill = skills.find(s => s.name === name);
    if (!skill || skill.status === newStatus) return;

    skill.status = newStatus;
    saveSkills();           // Complementary Task: persist state.
    renderSkillCards();     // Re-render moves card to correct category.
    recalculateProgressInfo(); // Recalculate XP, level, rank, progress bar, stats.
  }

  // ------------------------------------------------------------------
  // Update column header counts.
  // ------------------------------------------------------------------
  function updateColumnCounts() {
    const tally = { planned: 0, 'in-progress': 0, completed: 0 };
    skills.forEach(s => { tally[s.status]++; });
    if (counts.planned) counts.planned.textContent = tally.planned;
    if (counts['in-progress']) counts['in-progress'].textContent = tally['in-progress'];
    if (counts.completed) counts.completed.textContent = tally.completed;
  }

  // ------------------------------------------------------------------
  // Function 2: Recalculate XP, level, rank, progress bar & statistics
  // ------------------------------------------------------------------
  function recalculateProgressInfo() {
    // Total XP only from Completed skills.
    const totalXp = skills.reduce(function(sum, s) {
      return s.status === 'completed' ? sum + s.xp : sum;
    }, 0);

    const completedCount = skills.filter(s => s.status === 'completed').length;
    const totalCount = skills.length;

    // Determine current level / rank.
    let levelEntry = LEVEL_TABLE[0];
    for (let i = 0; i < LEVEL_TABLE.length; i++) {
      if (totalXp >= LEVEL_TABLE[i].min && totalXp <= LEVEL_TABLE[i].max) {
        levelEntry = LEVEL_TABLE[i];
      }
    }

    // Top stats.
    if (statTotalXp) statTotalXp.textContent = totalXp;
    if (statLevel) statLevel.textContent = levelEntry.level;
    if (statRank) statRank.textContent = levelEntry.rank;

    // Statistics.
    if (statTotalSkills) statTotalSkills.textContent = totalCount;
    if (statCompletedSkills) statCompletedSkills.textContent = completedCount;
    if (statCompletionPct) {
      const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
      statCompletionPct.textContent = pct + '%';
    }

    // Progress bar: from beginning of current level to threshold of next level.
    // After reaching Level 4, display maximum progress.
    let pct, currentLabel, targetLabel;
    if (levelEntry.level >= 4) {
      pct = 100;
      currentLabel = totalXp + ' XP';
      targetLabel = 'max level reached';
    } else {
      const nextEntry = LEVEL_TABLE[LEVEL_TABLE.indexOf(levelEntry) + 1];
      const range = nextEntry.min - levelEntry.min;
      const progress = totalXp - levelEntry.min;
      pct = Math.min(100, Math.max(0, (progress / range) * 100));
      currentLabel = totalXp + ' XP';
      targetLabel = '/ ' + nextEntry.min + ' XP';
    }

    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', Math.round(pct));
      progressBar.style.width = Math.round(pct) + '%';
    }
    if (progressText) progressText.textContent = Math.round(pct) + '%';
    if (progressCurrent) progressCurrent.textContent = currentLabel;
    if (progressTarget) progressTarget.textContent = targetLabel;
  }

  // ------------------------------------------------------------------
  // Function 3: Escape HTML for safe insertion.
  // ------------------------------------------------------------------
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ------------------------------------------------------------------
  // Initialize the interactive skill progress module.
  // ------------------------------------------------------------------
  function initSkillProgressInteractive() {
    renderSkillCards();
    recalculateProgressInfo();
  }

  // Run on window load, after main.js (which is loaded first). Rendering here
  // clears the kanban columns first, so it replaces any cards main.js created.
  window.addEventListener('load', initSkillProgressInteractive);
})();

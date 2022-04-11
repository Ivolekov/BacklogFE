function patternLockInit() {
  var lock = new PatternLock("#lock", {
    onPattern: function (pattern) {
      if (Number(pattern) && pattern > 9) {
        $('#lockPattern').val(pattern)
        $('#lock').addClass('disabled');
        $('.lockPatternBtn').removeClass('hide');
      } else {
        $('#lockPattern').val('');
      }
    }
  });
  return lock;
}

function releaseLockPattern() {
  $('#lock').removeClass('disabled');
  $('.lockPatternBtn').addClass('hide');
}

function resetLockPattern() {
  patternLockInit().clear();
  $('#lock').removeClass('disabled');
  $('.lockPatternBtn').addClass('hide');
}

function showFormLoader() {
  $('#form-loader').removeClass('hide');
  $('form :input').prop('disabled', true);
  $('form :button').prop('disabled', true);
}

function hideFormLoader() {
  $('#form-loader').addClass('hide');
  $('form :input').prop('disabled', false);
  $('form :button').prop('disabled', false);
  $('#lockPattern').prop('disabled', true);
}

function showTableLoader() {
  $('#table-loader').removeClass('hide');
}

function hideTableLoader() {
  $('#table-loader').addClass('hide');
}

function deactivateRow() {
  $('tr').removeClass('active');
}

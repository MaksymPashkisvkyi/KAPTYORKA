

$('#responsiblePersonSelector').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    $('#responsiblePerson')[0].value = $('#responsiblePersonSelector')[0][clickedIndex].dataset.tokens;
  });
(function () {

function toArray (obj) {
  return Array.prototype.slice.apply(obj);
}

function $ (selector, parent) {
  parent = parent || document;
  return parent.querySelector(selector);
}

function $$ (selector, parent) {
  parent = parent || document;
  return toArray(parent.querySelectorAll(selector));
}

function equalisePersonItems () {
  // It would be too much hassle and would result in unsemantic markup
  // if we split each person in a column using flexbox. So instead we
  // set the `min-height` of the rows manually.
  var personItems = $$('.person__item');
  var personHeight = 0;

  var personHeights = {};

  personItems.forEach(function (person) {
    personHeight = person.offsetHeight;
    var idx = person.getAttribute('data-person-idx');
    if (!(idx in personHeights) || personHeight > personHeights[idx]) {
      personHeights[idx] = personHeight;
    }
  });

  Object.keys(personHeights).forEach(function (personIdx) {
    $$('[data-person-idx="' + personIdx + '"]').forEach(function (person) {
      person.style.minHeight = personHeights[personIdx] + 'px';
    });
  });
}

window.addEventListener('load', equalisePersonItems);
window.addEventListener('resize', equalisePersonItems);

})();

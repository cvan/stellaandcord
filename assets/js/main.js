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

function Debounce(func, ms) {
  this.timeout = null;
  this.func = func;
  this.ms = ms;
}

Debounce.prototype.start = function () {
  this.timeout = window.setTimeout(this.func, this.ms);
};

Debounce.prototype.reset = function () {
  this.abort();
  this.start();
};

Debounce.prototype.abort = function () {
  window.clearTimeout(this.timeout);
};

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

window.addEventListener('scroll', function () {
  debouncedScroll.reset();
});

var sections = $$('section[id]').map(function (el) {
  return {
    top: el.offsetTop,
    id: el.name || el.id
  };
});

function closestSection () {
  var section;
  var top = window.scrollY;
  var i = sections.length;
  while (i--) {
    section = sections[i];
    if (top >= section.top - document.documentElement.offsetHeight + 200) {
      return section;
    }
  }
}

var debouncedScroll = new Debounce(function () {
  var heading = closestSection();
  if (heading && heading.id === 'story') {
    $$('.story__take').forEach(function (storyTake) {
      storyTake.classList.add('animated');
    });
    $('.section__wrap--story').classList.add('animated');
  }
}, 25);

})();

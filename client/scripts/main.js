import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';

document.addEventListener('DOMContentLoaded', function () {
  // make hover effects work on touch devices
  oHoverable.init();

  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // YOUR CODE HERE!

  // detach all the map elements from the page and keep them in an object
  var maps = {};
  select('[data-map]').forEach(function (el) {
    var slug = el.getAttribute('data-map');
    maps[slug] = el;
    el.parentNode.removeChild(el);
  });

  // put the HTML from the spreadsheet (originally markdown) into the story div
  var story = document.querySelector('.story');
  story.innerHTML = spreadsheet.content[0].content;


  // inside the story div, replace all the "MAP:" h1s with their corresponding map element
  select('h1', story).forEach(function (h1) {
    console.log(h1, h1.textContent.substring(0, 5));
    if (h1.textContent.substring(0, 5) === 'MAP: ') {
      var slug = h1.textContent.substring(5);
      h1.parentNode.replaceChild(maps[slug], h1);
    }
  });
});



function select(selector, parent=document) {
  // return an array of elements matching the selector
  return [].slice.apply(parent.querySelectorAll(selector));
}

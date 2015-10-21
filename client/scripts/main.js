import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';
import marked from 'marked';
import storyItem from '../templates/_story_item.hbs';
import storiesTemplate from '../templates/stories.hbs';
import Share from './share.js';

const content = marked(spreadsheet.content[0].content);


document.addEventListener('DOMContentLoaded', function () {

  
  // make hover effects work on touch devices
  oHoverable.init();

  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // YOUR CODE HERE!

  var credits = spreadsheet.credits
  console.log(spreadsheet);

  // detach all the map elements from the page and keep them in an object
  var maps = {};
  var bullets = []
  select('[data-map]').forEach(function (el) {
    var slug = el.getAttribute('data-map');
    maps[slug] = el;
    el.parentNode.removeChild(el);
  });

  // put the HTML from the spreadsheet (originally markdown) into the story div
  var story = document.querySelector('.content-holder');
  story.innerHTML = content;

  // inside the story div, replace all the "MAP:" h1s with their corresponding map element
  select('h1', story).forEach(function (h1) {
    if (h1.textContent.substring(0, 5) === 'MAP: ') {
      var slug = h1.textContent.substring(5);
      h1.parentNode.replaceChild(maps[slug], h1);
    }

    if (h1.textContent.substring(0, 7) === 'SHARE: ') {
      var slug = h1.textContent.substring(7);
      h1.parentNode.replaceChild(maps[slug], h1);
    }

    if (h1.textContent.substring(0, 8) === 'BULLET: ') {
      var bulletText = h1.textContent.substring(8);
      bullets.push(bulletText);
      select('.market__text').forEach(function (bullet, indx) {
        bullet.innerHTML = bullets[indx];

      })
      h1.parentNode.removeChild(h1);
    }
  });

  document.querySelector('.moresharelinks').innerHTML = maps.sharelinks.innerHTML;

  var storiesHTML = storiesTemplate(spreadsheet.stories, {
    partials: {
      story_item: storyItem,
    }
  });
  
  document.querySelector('.stories__container').innerHTML = storiesHTML;
  
  document.querySelector('#byline').innerHTML = writeCredits(credits);

  document.body.classList.add('ready');
});


function select(selector, parent=document) {
  // return an array of elements matching the selector
  return [].slice.apply(parent.querySelectorAll(selector));
}

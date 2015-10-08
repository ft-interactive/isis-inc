var writeCredits = function writeCredits (creditsData) {
  var credits = [];
  var source = [];
  var other = [];
  var sourceHtml = '';
 
  creditsData.forEach(function (row) {
    if (row.type === 'credit') {
      credits.push(row)
    } else if (row.type === 'source') {
      source.push(row)
    } else if (row.type === 'other') {
      other.push(row)
    }
  });
  
  console.log(creditsData)
  var creditsLength = credits.length;
  var sourceLength = source.length;
  var otherLength = other.length;
  console.log(sourceLength)
  var creditHtml = '';
  var sourceHtml = '';
  var otherHtml = '';
  var creditHtmlTrimmed = '';
  var sourceHtmlTrimmed = '';

  if (creditsLength > 0) {
    creditHtml = '<span class="by">Graphic by: </span>';

    credits.forEach(function (row, indx) {
      if (indx < creditsLength -2) {
            creditHtml += '<a href="' + credits[indx].link + '">' + credits[indx].name + '</a>, ';
          } else {
            creditHtml += '<a href="' + credits[indx].link + '">' + credits[indx].name + '</a> and ';
          }
    })
    creditHtmlTrimmed = '<div class="byline__credit">' + creditHtml.substr(0, creditHtml.length -4) + '</div>';
  }
  
      console.log('source');
  if (sourceLength > 0) {
    if (sourceLength > 1) {
      sourceHtml = '<span class="source">Sources: </span>';
    } else {
      sourceHtml = '<span class="source">Source: </span>';
    }

    source.forEach(function (row, indx) {
      if (sourceLength > 1) {
          sourceHtml += source[indx].name + '; ';
        } else {
          sourceHtml += source[indx].name;
        }
    });
  
    if (sourceLength > 1) {
      sourceHtmlTrimmed = sourceHtml.substr(0, sourceHtml.length -2);
    } else {
      sourceHtmlTrimmed = sourceHtml;
    }
  }

  if (otherLength > 0) {
    otherHtml = '<div class="byline__other">' + other[0].name + '<div>';
  }

  return creditHtmlTrimmed + '<div class="byline__source">' + sourceHtmlTrimmed + '</div>' + otherHtml;

};

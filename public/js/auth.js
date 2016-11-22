function getImgs(yearmonth, code, className, level) {
  var year = yearmonth.slice(0, 4),
      month = yearmonth.slice(4, 6),
      day = yearmonth.slice(6, 8) || "01",
      token = '' + className.charCodeAt(0) + className.slice(1).charCodeAt(0) + parseInt(code, 16),
      key = token.slice(1) + token.slice(2) + token.slice(3) + token.slice(4),
      sum = Number(year) + Number(month) + Number(day) + 16,
      imgs = [],
      num;

  for(var i = 0; i < 40; i++) {
    if(i % 2) {
      sum += Number(key.charAt(i)) + Number(key.charAt(i+1));
    } else {
      sum -= Number(key.charAt(i)) + Number(key.charAt(i+1));
    }
    sum = Math.abs(sum) % level.length;
    num = sum + 1;
    if(num < 10) {
      num = '0' + num;
    } else {
      num = '' + num;
    }
    imgs.push(num);
  }
  return imgs;
}

// level.length

// if(levelLogin == 'A'){ levelLogin = 'A레벨' }
//   else if (levelLogin == 'B') { levelLogin = 'B레벨' }
//   else if (levelLogin == 'C') { levelLogin = 'C레벨' }
//   else { levelLogin = 'default' }

// Math.floor(Math.random()*(Object.keys(level.default).length))+1;

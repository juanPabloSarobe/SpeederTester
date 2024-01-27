var array = [129, 139, 155, 176],
  average =
    array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;

console.log(average);

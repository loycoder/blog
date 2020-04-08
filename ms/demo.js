var a = Number('')

// var a = parseInt("2", 2)

let arr = [1, 2, 4]

let obj = {
  a: function () {
    console.log('test');

  }
}

arr.map(function (item, index, arr) {
  console.log(this);
}, obj)
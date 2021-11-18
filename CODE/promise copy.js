function Liugezhou(executor) {
  this.state = 'pending';
  this.result = null;

  //保存then的回调函数，使用数组主要是为了链式调用的场景，多个then方法的回调
  this.callbacks = [];
  const self = this;

  function fun1(data) {
    if (self.state !== 'pending') return;
    self.state = 'resolved';
    self.result = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResoled(data);
      });
    });
  }
  function fun2(data) {
    if (self.state !== 'pending') return;
    self.state = 'rejected';
    self.result = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }
  executor(fun1, fun2);
}

Liugezhou.prototype.then = function (onResolved, onRejected) {
  const self = this;
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason;
    };
  }
  if (typeof onResolved !== 'function') {
    onResolved = (value) => value;
  }

  // 返回值必须是Promise才能实现链式调用
  return new Liugezhou((fun1, fun2) => {
    function callback(type) {
      try {
        const result = type(self.result);
        if (result instanceof Liugezhou) {
          result.then(
            (v) => {
              fun1(v);
            },
            (r) => {
              fun2(r);
            }
          );
        }
      } catch (error) {
        reject(error);
      }
    }
    if (this.state === 'resolved') {
      setTimeout(() => {
        callback(onResolved);
      });
    }
    if (this.state === 'rejected') {
      setTimeout(() => {
        callback(onRejected);
      });
    }
    if (this.state === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};
Liugezhou.prototype.catch = function (onRejected) {
  return Liugezhou.prototype.then(null, onRejected);
};
// resolve方法 作用： 快速创建promise对象
Liugezhou.fun1 = function (value) {
  return new Promise((fun1, fun2) => {
    if (value instanceof Liugezhou) {
      value.then(
        (v) => {
          fun1(v);
        },
        (r) => {
          fun2(r);
        }
      );
    } else {
      fun1(value);
    }
  });
};
Liugezhou.fun2 = function (value) {
  return new Liugezhou((fun1, fun2) => {
    fun2(value);
  });
};
Promise.all = function () {};
Promise.race = function () {};
Promise.any = function () {};
Promise.allSettled = function () {};

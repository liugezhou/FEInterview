function Promise(executor) {
  this.state = 'pending';
  this.result = null;

  //保存then的回调函数，使用数组主要是为了链式调用的场景，多个then方法的回调
  this.callbacks = [];
  const self = this;

  function resolve(data) {
    if (self.state !== 'pending') return;
    self.state = 'resolved';
    self.result = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResoled(data);
      });
    });
  }
  function reject(data) {
    if (self.state !== 'pending') return;
    self.state = 'rejected';
    self.result = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }
  executor(resolve, reject);
}


Promise.prototype.then = function (onResolved, onRejected) {
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
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        const result = type(self.result);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
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
Promise.prototype.catch = function (onRejected) {
  return Promise.prototype.then(null, onRejected);
};
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then((v) => {
        resolve(v), (r) => reject(r);
      });
    }else{
      resolve(value)
    }
  });
};
Promise.reject = function (value) {
  return new Promise((resolve,reject)=>{
    reject(value)
  })
};
Promise.all = function () {};
Promise.race = function () {};
Promise.any = function () {};
Promise.allSettled = function () {};

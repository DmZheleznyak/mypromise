// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
class MyPromise {
  constructor( executor ) {
    this._status = 'pending'
    this._value = null         // сохраняю значения чтобы воспользоватся ими в ф-ии
    this._reason = null       //

    const resolve = ( value ) => {
      this._status = 'fulfilled'
      this._value = value
      return MyPromise.resolve(value)
    }

    const reject = ( reason ) => {  // вернёт причину
      this._status = 'rejected'
      this._reason = reason
      // return this.catch
    }
    console.log(executor)
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) { 
     // должен вернуть новое обещание promise1
    // если значение в ф-иях новый promise2 , то promise1 выключается
    if (this._status === 'fulfilled') return MyPromise.resolve(onFulfilled(this._value))
    if (this._status === 'rejected') return onRejected(this._reason)
  }

  catch(err) {                        // реализовать try , catch
    try {
      throw new Error(err)
    } catch (err) {
      console.log(`Ошибка: ${err}`)
    }
  } 

  finally( fn ) { return fn() }
      // возвращается новый промис, благодоря этому, есть возможность создавать цепочки
     // в не зависимости успешно или с ошибкой, указаная функция будет выполнена. 
    // Это дает возможность запустить один раз определенный участок кода, 
   // который должен выполнится вне зависимости от того, 
  // с каким результатом выполнился Promise.  
  
  static resolve(value) {
    this._value = value 
    return new MyPromise(value=>value)
  }

  static reject(reason) {
    this._reason = reason
    return new Promise(reason)
  }

  // static all([p1, p2, p3]) {
  //   [].map(p => if (p._status === 'fulfilled') return [].push(p) )
  //   // если одно из обещаний будет отклонено, вернётся отмена , то есть вызов reject
  // }
  
  
  static race() {}

}

var promise = new MyPromise( ( res, rej ) => res(5) )
promise.then( a => a * a ).then(x => console.log(x))

// MyPromise.resolve("hello")

// function showName(name) {
// 	if (name !== 'Dima') {
// 		throw new Error('Gde Dima?')
// 	}
	
// 	alert('Zdarova Dimon!');
//  }
 
//  try {
// 	showName('Dima');
//  } catch (err) {
// 	 alert(`Произошла какая-то ошибка с сообщением: ${err.message}`)
//  }

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// Promise.reject() - возвращает отклоненное обещание.
// Promise.resolve() - возвращает разрешенное обещание.
// Promise.race() - берет массив (или любой итерабельный) и возвращает обещание, 
// 									которое разрешает со значением первого разрешенного обещания в итерируемом, 
// 									или отклоняет по причине первого обещания, которое отвергается.
// Promise.all() - берет массив (или любой итерабельный) и возвращает обещание, 
// 								которое разрешает, когда все обещания в итерируемом аргументе разрешаются, 
// 								или отклоняется по причине первого обещанного обещания, которое отклоняет.
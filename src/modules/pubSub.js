export function pubSub() {
  const events = {};

  function subscribe(eventName, callback) {
    events[eventName] = events[eventName] || [];
    events[eventName].push(callback);
  }

  function publish(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach(f => {
        f(data);
      })
    }
  }

  function unsubscribe(eventName, callback) {
    if (events[eventName]){
      events[eventName] = events[eventName].filter(f => f !== callback);
    }
  }

  return {
    subscribe, 
    publish,
    unsubscribe
  }
}
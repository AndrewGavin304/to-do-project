export const pubSub = (function () {
  const events = {};

  function sub(eventName, callback) {
    events[eventName] = events[eventName] || [];
    events[eventName].push(callback);
  }

  function pub(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((f) => f(data));
    }
  }

  function unsub(eventName, callback) {
    if (events[eventName]) {
      events[eventName] = events[eventName].filter((f) => f !== callback);
    }
  }

  return {
    sub,
    pub,
    unsub,
  };
})();

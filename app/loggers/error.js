import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';
// import express from 'express'

export default EmberObject.extend({
  store: service(),

  async errorLog(message) {
    let ipAddress;
    await $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
      //console.log(JSON.stringify(data, null, 2));
      ipAddress = data.ipAddress;
    });

    let newError = this.get('store').createRecord('error',
    {
      dateError: new Date(),
      ip: ipAddress,
      url: document.location.href,
      text: message,  
    });
    await newError.save();
  }
});

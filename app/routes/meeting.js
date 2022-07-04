import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { PER_PAGE } from '../controllers/meeting';

export default Route.extend({
  queryParams: {
    book: {
      refreshModel: true 
    },
    speaker: {
      refreshModel: true
    },
    dateMeeting: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },

  model({ book, speaker, dateMeeting, page }) {
    const query = {
      _page: page,
      _limit: PER_PAGE
    };

    if (book) {
      query.book = book;
    }
    if (speaker) {
      query.speaker = speaker;
    }
    if (dateMeeting) {
      query.dateMeeting = dateMeeting;
    }

    return RSVP.hash({
      books: this.get('store').findAll('book'),
      speakers: this.get('store').findAll('speaker'),
      meetings: this.get('store').query('meeting', query)
    });
  },

  actions: {
    sessionChanged: function() {
      this.refresh();
    },
    
    loading() {
      return false;
    }
  }
});

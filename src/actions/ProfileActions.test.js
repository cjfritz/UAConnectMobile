import * as actions from './ProfileActions';
import * as types from './types';

describe('profileUpdate action creator', () => {
  it('can dispatch update action with correct payload', () => {
    const payload = {
      prop: 'someProp',
      value: 'someValue',
    };

    expect(actions.profileUpdate(payload)).toEqual({
      type: types.PROFILE_UPDATE,
      payload,
    });
  });
});

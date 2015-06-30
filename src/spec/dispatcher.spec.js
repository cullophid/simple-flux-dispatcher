'use strict';

import {expect} from 'chai';
import sinon from 'sinon';
import dispatcher from '../dispatcher';


describe('register', function () {
  it('should call all registered function once when an action is dispatched', function () {
    let dp = dispatcher();
    let listener1 = sinon.spy();
    let listener2 = sinon.spy();
    dp.register(listener1);
    dp.register(listener2);

    dp.dispatch('ok');

    expect(listener1.calledOnce).to.equal(true);
    expect(listener1.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')

    expect(listener2.calledOnce).to.equal(true);
    expect(listener2.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')
  });
});

describe('unregister', function () {
  it('should not call listeners that has been unregistered', function () {
    let dp = dispatcher();
    let listener1 = sinon.spy();
    let listener2 = sinon.spy();
    let id = dp.register(listener1);
    dp.register(listener2);

    dp.unregister(id);
    dp.dispatch('ok');

    expect(listener1.called).to.equal(false);

    expect(listener2.calledOnce).to.equal(true);
    expect(listener2.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')
  });
});

describe('waitFor', function () {
  it('should waitFor listeners when waitFor is called', function () {
    let id;
    let dp = dispatcher();
    let listener2 = sinon.spy();
    let listener3 = sinon.spy();
    let listener1 = sinon.spy(() => {
      dp.waitFor(id);
      expect(listener2.called).to.equal(true);
      expect(listener3.called).to.equal(false);

    });
    dp.register(listener1);
    id = dp.register(listener2);
    dp.register(listener3);

    dp.dispatch('ok');

    expect(listener1.calledOnce).to.equal(true);
    expect(listener1.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')

    expect(listener2.calledOnce).to.equal(true);
    expect(listener2.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')

    expect(listener3.calledOnce).to.equal(true);
    expect(listener3.calledWithExactly('ok')).to.equal(true, 'should be called with "ok"')
  });
});

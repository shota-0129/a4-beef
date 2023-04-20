import { chrome as browser } from 'jest-chrome';

describe('background', () => {
  // Chrome APIイベントが正しく発生することをテストする
  test('chrome api events', () => {
    // モック関数の作成
    const listenerSpy = jest.fn();
    const sendResponseSpy = jest.fn();

    // リスナー関数を登録
    browser.runtime.onMessage.addListener(listenerSpy);

    // まだリスナー関数が呼び出されていないことと、リスナーが登録されていることをテスト
    expect(listenerSpy).not.toBeCalled();
    expect(browser.runtime.onMessage.hasListeners()).toBe(true);

    // リスナー関数を呼び出し、引数が正しく渡されていることをテスト
    browser.runtime.onMessage.callListeners(
      { greeting: 'hello' }, // message
      {}, // MessageSender object
      sendResponseSpy // SendResponse function
    );

    expect(listenerSpy).toBeCalledWith({ greeting: 'hello' }, {}, sendResponseSpy);
    expect(sendResponseSpy).not.toBeCalled();
  });
});

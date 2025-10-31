import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    this.getPurchase();
  }

  async getPurchase() {
    const inputcost = await Console.readLineAsync("구입금액을 입력해 주세요");
  }
}

export default App;
